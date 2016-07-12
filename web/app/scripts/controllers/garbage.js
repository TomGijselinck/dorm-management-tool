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
              "name": "purple",
              "status": "full",
              "responsible": {
                "id": 1,
                "name": "Bilbo"
              }
            },
            {
              "name": "yellow",
              "status": "ok",
              "responsible": {
                "id": 2,
                "name": "Pippin"
              }
            },
            {
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
    this.emptyTrash = function (id, name) {
      var newResponsible = DormService.getNextResponsible(name);
      var bag = $filter('filter')(mv.bags, {name: name})[0];
      bag.status = 'ok';
      bag.responsible = newResponsible.name;
      var body = JSON.stringify(
        {"garbage_bag": {
          "status": "ok",
          "user_id": newResponsible.user_id
          }
        });
      var url = 'http://localhost:3000/garbage_bags/' + id + '.json';
      $http({method: 'PATCH', url: url, data: body}).then(function (response) {
          //ok!
        },
        function () {
          console.log('failed to empty trash');
        });
    }
  }]);
