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
    var mv = this;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getName = function () {
      return mv.user.name;
    };
    this.getId = function () {
      return mv.user.id;
    };
    this.getDormId = function () {
      return mv.user.dorm_id;
    };
  });
