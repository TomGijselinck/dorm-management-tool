'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:GarbageCtrl
 * @description
 * # GarbageCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('GarbageCtrl', ['$filter', '$mdDialog', 'ApiService', 'DormService', 'GarbageDutyService', 'UserService', 'HelperService',
    function ($filter, $mdDialog, ApiService, DormService, GarbageDutyService, UserService, HelperService) {
      var mv = this;

      this.user_id = UserService.getId();

      this.getData = function () {
        ApiService.getGarbageBags()
          .then(function (response) {
            mv.bags = response.data;
          });
      };

      this.setStatus = function (id, status) {
        if (status == 'full') {
          var bag = $filter('filter')(mv.bags, {id: id})[0];
          HelperService.showMessage('a mail has been send to ' + bag.responsible.name);
        }
        var body = JSON.stringify({"garbage_bag": {"status": status}});
        ApiService.patchGarbageBag(id, body).then(function (response) {
          //ok!
        },
        function () {
          console.log('failed to set garbage status');
        });
      };

      this.tryToEmptyTrash = function (garbage_bag, event) {
        var user_id = UserService.getId();
        if (garbage_bag.responsible.id != user_id) {
          mv.showConfirmNotAssigned(garbage_bag, event);
        } else if (garbage_bag.status =='ok') {
        //  this check is not done when not signed in, as it is assumed that if a user
        //  tries to empty a waste bag not assigned to him, he knows if it is not empty
          mv.showConfirmNotFull(garbage_bag, event)
        } else {
          this.emptyTrash(garbage_bag)
        }
      };

      this.emptyTrash = function (garbage_bag) {
        var user_id = UserService.getId();
        updateGarbageBag(garbage_bag, newResponsible, 'ok');
        var transferred = false;
        var newResponsible = DormService.getNextResponsible(garbage_bag, transferred);
        GarbageDutyService.addCompletedDuty(user_id, garbage_bag.id, new Date());
      };

      this.transferDuty = function (garbage_bag) {
        updateGarbageBag(garbage_bag, newResponsible, garbage_bag.status);
        var transferred = true;
        var newResponsible = DormService.getNextResponsible(garbage_bag, transferred);
      };

      this.showConfirmNotAssigned = function(garbage_bag, event) {
        var confirm = $mdDialog.confirm()
          .title('Empty waste bag not assigned to you?')
          .textContent('This will be added to your completed garbage duties.')
          .targetEvent(event)
          .ok('Empty trash')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          mv.emptyTrash(garbage_bag);
          console.log('empty trash not assigned')
        }, function() {
          console.log('You decided not to empty the trash.');
        });
      };

      this.showConfirmNotFull = function(garbage_bag, event) {
        var confirm = $mdDialog.confirm()
          .title('Empty waste bag which is not full?')
          .textContent('Looks like this garbage bag is not full yet (or it\'s status it not up to date). ' +
            'Are you sure you want to empty it while not being stated as full? ' +
            'This will be added to your completed garbage duties.')
          .targetEvent(event)
          .ok('Empty trash')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          mv.emptyTrash(garbage_bag);
        }, function() {
          console.log('You decided not to empty the trash.');
        });
      };

      function updateGarbageBag(garbage_bag, responsible, status, is_transfer) {
        garbage_bag.status = status;
        garbage_bag.responsible = responsible;
        var resident = $filter('filter')(DormService.residents,
          {id: garbage_bag.responsible.id})[0];
        resident.number_of_completed_duties++;
        var body = JSON.stringify(
          {
            "garbage_bag": {
              "status": status,
              "user_id": responsible.id
            }
          });
        ApiService.patchGarbageBag(garbage_bag.id, body).then(function () {
            console.log('successfully updated garbage bag status and responsible');
          },
          function () {
            console.log('failed to update garbage bag');
          });
      }
  }]);
