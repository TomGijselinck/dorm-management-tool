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
    if (localStorage.getItem('user')) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token;
    }
  })
  .controller('GarbageCtrl', ['$http', function ($http) {
    this.bags = [
      {
        "name": "purple",
        "status": "full",
        "responsible": "Bilbo"
      },
      {
        "name": "yellow",
        "status": "ok",
        "responsible": "Pippin"
      },
      {
        "name": "indigo",
        "status": "full",
        "responsible": "Merry"
      }
    ];
    var mv = this;
    this.getGarbageBags = function () {
      $http({method: 'GET', url: 'http://localhost:3000/garbage_bags.json'})
        .then(function (response) {
          mv.bags = response.data;
        });
    };
    this.getGarbageBags();
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
  }]);
