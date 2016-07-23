'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.helper
 * @description
 * # helper
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('HelperService', ['$mdToast', function ($mdToast) {
    this.showMessage = function (message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position('top right')
          .hideDelay(3000)
      );
    }
  }]);
