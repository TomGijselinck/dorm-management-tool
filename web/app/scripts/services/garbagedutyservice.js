'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.GarbageDuty
 * @description
 * # GarbageDuty
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('GarbageDutyService', [ 'ApiService', function (ApiService) {
    this.addCompletedDuty = function (user_id, garbage_bag_id, datetime) {
      var body = JSON.stringify(
        {
          "garbage_bag_duty": {
            "user_id": user_id,
            "garbage_bag_id": garbage_bag_id,
            "datetime": datetime
          }
        });
      ApiService.createDuty(body).then(function (response) {
        console.log('successfully created completed garbage bag duty')
      },
      function () {
        console.log('failed to create new completed garbage bag duty');
      });
    };
  }]);
