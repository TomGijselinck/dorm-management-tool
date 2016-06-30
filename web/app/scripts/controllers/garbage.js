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
        "responsible": "John Doe"
      },
      "brown": {
        "status": "ok",
        "responsible": "Johny Appleseed"
      },
      "blue": {
        "status": "almost full",
        "responsible": "John Doe"
      }
    };
  });
