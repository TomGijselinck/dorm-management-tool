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
    'ui.router',
    'angularMoment'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$mdDateLocaleProvider', function ($stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {
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
      .state('inactive_periods', {
        url: '/inactive_periods',
        templateUrl: 'views/inactive_periods.html',
        authenticate: true
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        authenticate: true
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
