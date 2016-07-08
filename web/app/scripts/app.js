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
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl as login',
        authenticate: false
      })
  }])
  .run(function ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !AuthService.isAuthenticated()) {
        $state.transitionTo("login");
        event.preventDefault();
      }
    })
  })
  .controller('AppCtrl', ['$mdSidenav', '$state', 'UserService', function ($mdSidenav, $state, UserService) {
    this.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };
    this.logout = function () {
      localStorage.removeItem('token');
      $state.go('login');
    };
    this.userName = UserService.getName();
  }]);
