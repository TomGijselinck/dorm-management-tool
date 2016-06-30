'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:GarbageCtrl
 * @description
 * # GarbageCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('GarbageCtrl', function () {
    this.bags = {
      "green": {
        "status": "full",
        "responsible": "John"
      },
      "brown": {
        "status": "ok",
        "responsible": "Tom"
      },
      "blue": {
        "status": "almost full",
        "responsible": "John"
      }
    };
  });
