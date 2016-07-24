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

      this.getData = function () {
        ApiService.getGarbageBags()
          .then(function (response) {
            mv.bags = response.data;
          },
          function () {
            console.log('GET garbage_bags.json failed!');
            mv.bags = [
              {
                "id": 1,
                "name": "purple",
                "status": "full",
                "responsible": {
                  "id": 1,
                  "name": "Bilbo"
                }
              },
              {
                "id": 2,
                "name": "yellow",
                "status": "ok",
                "responsible": {
                  "id": 2,
                  "name": "Pippin"
                }
              },
              {
                "id": 3,
                "name": "indigo",
                "status": "full",
                "responsible": {
                  "id": 3,
                  "name": "Merry"
                }
              }
            ];
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

      this.tryToEmptyTrash = function (garbage_id, garbage_name, assigned_user_id, status, event) {
        var user_id = UserService.getId();
        if (assigned_user_id != user_id) {
          mv.showConfirmNotAssigned(garbage_id, garbage_name, event);
        } else if (status =='ok') {
        //  this check is not done when not signed in, as it is assumed that if a user
        //  tries to empty a waste bag not assigned to him, he knows if it is not empty
          mv.showConfirmNotFull(garbage_id, garbage_name, event)
        } else {
          this.emptyTrash(garbage_id, garbage_name)
        }
      };

      this.emptyTrash = function (garbage_id, garbage_name, assigned_user_id) {
        var user_id = UserService.getId();
        var newResponsible = DormService.getNextResponsible(garbage_name, user_id);
        var bag = $filter('filter')(mv.bags, {name: garbage_name})[0];
        bag.status = 'ok';
        bag.responsible.name = newResponsible.name;
        bag.responsible.id = newResponsible.id;
        var resident = $filter('filter')(DormService.residents, {id: assigned_user_id})[0];
        resident.number_of_completed_duties++;
        var body = JSON.stringify(
          {
            "garbage_bag": {
              "status": "ok",
              "user_id": newResponsible.id
            }
          });
        ApiService.patchGarbageBag(garbage_id, body).then(function () {
            console.log('successfully updated garbage bag status and responsible');
          },
          function () {
            console.log('failed to empty trash');
          });
        GarbageDutyService.addCompletedDuty(user_id, garbage_id, new Date());
      };

      this.showConfirmNotAssigned = function(garbage_id, garbage_name, event) {
        var confirm = $mdDialog.confirm()
          .title('Empty waste bag not assigned to you?')
          .textContent('This will be added to your completed garbage duties.')
          .targetEvent(event)
          .ok('Empty trash')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          mv.emptyTrash(garbage_id, garbage_name);
        }, function() {
          console.log('You decided not to empty the trash.');
        });
      };

      this.showConfirmNotFull = function(garbage_id, garbage_name, event) {
        var confirm = $mdDialog.confirm()
          .title('Empty waste bag which is not full?')
          .textContent('Looks like this garbage bag is not full yet (or it\'s status it not up to date). ' +
            'Are you sure you want to empty it while not being stated as full? ' +
            'This will be added to your completed garbage duties.')
          .targetEvent(event)
          .ok('Empty trash')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          mv.emptyTrash(garbage_id, garbage_name);
        }, function() {
          console.log('You decided not to empty the trash.');
        });
      };
  }]);
