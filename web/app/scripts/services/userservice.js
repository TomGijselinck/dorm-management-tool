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
      if (localStorage.getItem('user'))
        if (mv.user != null)
          return mv.user.name;
        else {
          mv.user = JSON.parse(localStorage.getItem('user'));
          return mv.user.name
        }
      else
        return null
    };
    this.getId = function () {
      if (localStorage.getItem('user'))
        if (mv.user != null)
          return mv.user.id;
        else {
          mv.user = JSON.parse(localStorage.getItem('user'));
          return mv.user.id
        }
      else
        return null
    };
    this.getDormId = function () {
      if (localStorage.getItem('user'))
        if (mv.user != null)
          return mv.user.dorm_id;
        else {
          mv.user = JSON.parse(localStorage.getItem('user'));
          return mv.user.dorm_id
        }
      else
        return null
    };
  });
