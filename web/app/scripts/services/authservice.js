'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.AuthService
 * @description
 * # AuthService
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('AuthService', function () {
    this.isAuthenticated = function () {
      return !!localStorage.getItem('user');
    }
  });
