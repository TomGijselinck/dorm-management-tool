'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:GarbageCtrl
 * @description
 * # GarbageCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
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
        "status": "almost full",
        "responsible": "Merry"
      }
    ];
    var mv = this;
    $http({method: 'GET', url: 'http://localhost:3000/garbage_bags.json'})
      .then(function (response) {
        mv.bags = response.data;
    });
  }]);
