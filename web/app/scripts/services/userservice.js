'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.userService
 * @description
 * # userService
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('UserService', function () {
    this.getName = function () {
      return JSON.parse(localStorage.getItem('user')).name;
    }
  });
