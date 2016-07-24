'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.ApiService
 * @description
 * # API
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('ApiService', ['UserService', 'ENV', '$http', function (UserService, ENV, $http) {
    if (localStorage.getItem('token')) {
      $http.defaults.headers.common.Authorization = 'Token = ' + JSON.parse(localStorage.getItem('token')).token;
    }

    // DORMS

    this.getDormName = function (id) {
      return $http.get(ENV.apiEndpoint + '/dorms/' + id + '.json');
    };

    this.getDormSummary = function (id) {
      return $http.get(ENV.apiEndpoint + '/dorms/'+ id +'/residents_summary.json');
    };


    //GARBAGE BAGS

    this.getGarbageBags = function () {
      return $http.get(ENV.apiEndpoint + '/garbage_bags.json');
    };

    //todo!
    this.patchGarbageBag = function (id, garbage_bag) {
      return $http.patch(ENV.apiEndpoint + '/garbage_bags/' + id + '.json', garbage_bag);
    };
    
    
    //GARBAGE BAG DUTIES
    
    this.createDuty = function (duty) {
      return $http.post(ENV.apiEndpoint + '/garbage_bag_duties.json', duty);
    };


    //INACTIVE PERIODS

    this.getInactivePeriods = function (id) {
      return $http.get(ENV.apiEndpoint + '/users/' + id + '/inactive_periods.json');
    };

    this.createInacivePeriod = function (period) {
      return $http.post(ENV.apiEndpoint + '/inactive_periods.json', period);
    };

    this.updateInactivePeriod = function (id, period) {
      return $http.patch(ENV.apiEndpoint + '/inactive_periods/' + id + '.json', period);
    };

    this.deleteInactivePeriod = function (id) {
      return $http.delete(ENV.apiEndpoint + '/inactive_periods/' + id + '.json');
    };
    
    
    //USERS
    
    this.getGarbageBagsOfUser = function (id) {
      return $http.get(ENV.apiEndpoint + '/users/' + id + '/garbage_bags.json');
    };
    
    this.createUser = function (user) {
      return $http.post(ENV.apiEndpoint + '/users.json', user);
    };

  }]);
