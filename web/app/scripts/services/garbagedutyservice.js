'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.GarbageDuty
 * @description
 * # GarbageDuty
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .run(function($http) {
    if (localStorage.getItem('token')) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token;
    }
  })
  .service('GarbageDutyService', [ '$http', function ($http) {
    this.addCompletedDuty = function (user_id, garbage_bag_id, datetime) {
      var body = JSON.stringify(
        {
          "garbage_bag_duty": {
            "user_id": user_id,
            "garbage_bag_id": garbage_bag_id,
            "datetime": datetime
          }
        });
      var url = "http://localhost:3000/garbage_bag_duties.json";
      $http({method: 'POST', url: url, data: body}).then(function (response) {
        //ok!
      },
      function () {
        console.log('failed to create new completed garbage bag duty');
      });
    };
  }]);
