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
      $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token;
    }
  })
  .controller('GarbageCtrl', ['$http', '$filter', 'DormService', 'GarbageDutyService',
    function ($http, $filter, DormService, GarbageDutyService) {
    var mv = this;
    this.getData = function () {
      $http({method: 'GET', url: 'http://localhost:3000/garbage_bags.json'})
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
      var url = 'http://localhost:3000/garbage_bags/' + id + '.json';
      $http({method: 'PATCH', url: url, data: body}).then(function (response) {
        //ok!
      },
      function () {
        console.log('failed to set garbage status');
      });
    };
    this.emptyTrash = function (garbage_id, garbage_name, user_id) {
      var newResponsible = DormService.getNextResponsible(garbage_name, user_id);
      var bag = $filter('filter')(mv.bags, {name: garbage_name})[0];
      bag.status = 'ok';
      bag.responsible.name = newResponsible.name;
      bag.responsible.id = newResponsible.user_id;
      var body = JSON.stringify(
        {"garbage_bag": {
          "status": "ok",
          "user_id": newResponsible.user_id
          }
        });
      var url = 'http://localhost:3000/garbage_bags/' + garbage_id + '.json';
      $http({method: 'PATCH', url: url, data: body}).then(function (response) {
          //ok!
        },
        function () {
          console.log('failed to empty trash');
        });
      GarbageDutyService.addCompletedDuty(user_id, garbage_id, new Date());
    };
  }]);
