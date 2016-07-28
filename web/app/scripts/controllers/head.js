'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:HeadCtrl
 * @description
 * # HeadCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('HeadCtrl', ['ENV', function (ENV) {
    this.baseUrl = ENV.baseUrl;
  }]);
