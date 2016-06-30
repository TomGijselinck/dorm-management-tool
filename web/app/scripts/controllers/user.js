'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('UserCtrl', function () {
    this.name = "John";
    this.duties = ['brown waste bags', 'blue waste bags'];
  });
