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
    'angularMoment',
    'config'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

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
  .controller('AppCtrl', ['$mdSidenav', '$state', 'UserService', '$http', '$q', 'ENV', function ($mdSidenav, $state, UserService, $http, $q, ENV) {
    this.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };
    this.logout = function () {
      localStorage.removeItem('token');
      $state.go('login');
    };
    this.userName = UserService.getName();

    function removeToken() {
      var q = $q.defer();
      localStorage.removeItem('token');
      q.resolve();
      return q.promise;
    }

    function validate_token () {
      var deferred = $q.defer();
      if (!localStorage.getItem('token')) {
        deferred.reject('no existing token');
      } else {
        $http.defaults.headers.common.Authorization = 'Token =  ' + JSON.parse(localStorage.getItem('token')).token;
        $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/users/' + UserService.getId() + '/valid_token'
        })
          .then(
            function () {
              deferred.resolve('valid token');
            },
            function () {
              deferred.reject('invalid token');
            });
      }
      return deferred.promise
    }
    validate_token().then(function (status) {
      console.log(status);
    }, function (status) {
      console.log(status);
      removeToken().then(function () {
        $state.go('login');
      })
    });
  }]);
