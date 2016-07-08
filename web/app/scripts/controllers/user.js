'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('UserCtrl',  function (UserService) {
    this.name = UserService.getName();
    this.duties = ['brown waste bags', 'blue waste bags'];
    if (localStorage.getItem('user')) {
      this.name = JSON.parse(localStorage.getItem('user')).name;
    }
  });
