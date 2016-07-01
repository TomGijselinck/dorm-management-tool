'use strict';

/**
 * @ngdoc overview
 * @name dormManagementToolApp
 * @description
 * # dormManagementToolApp
 *
 * Main module of the application.
 */
angular
  .module('dormManagementToolApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'views/dashboard.html',
        authenticate: true
      })
  }]);
