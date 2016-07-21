'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:GarbageCtrl
 * @description
 * # GarbageCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .run(function($http) {
    if (localStorage.getItem('token')) {
      $http.defaults.headers.common.Authorization = 'Token = ' + JSON.parse(localStorage.getItem('token')).token;
    }
  })
  .controller('GarbageCtrl', ['$http', '$filter', '$mdDialog', 'DormService', 'GarbageDutyService', 'UserService',
    function ($http, $filter, $mdDialog, DormService, GarbageDutyService, UserService) {
      var mv = this;
      this.getData = function () {
        $http({method: 'GET', url: 'https://tomgijselinck.com/dorm-manager/api/garbage_bags.json'})
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
        var body = JSON.stringify({"garbage_bag": {"status": status}});
        var url = 'https://tomgijselinck.com/dorm-manager/api/garbage_bags/' + id + '.json';
        $http({method: 'PATCH', url: url, data: body}).then(function (response) {
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
      this.emptyTrash = function (garbage_id, garbage_name) {
        var user_id = UserService.getId();
        var newResponsible = DormService.getNextResponsible(garbage_name, user_id);
        var bag = $filter('filter')(mv.bags, {name: garbage_name})[0];
        bag.status = 'ok';
        bag.responsible.name = newResponsible.name;
        bag.responsible.id = newResponsible.id;
        var body = JSON.stringify(
          {
            "garbage_bag": {
              "status": "ok",
              "user_id": newResponsible.id
            }
          });
        var url = 'https://tomgijselinck.com/dorm-manager/api/garbage_bags/' + garbage_id + '.json';
        $http({method: 'PATCH', url: url, data: body}).then(function () {
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
          .textContent('Looks like this garbage bag is not full yet (or his status it not up to date). ' +
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
