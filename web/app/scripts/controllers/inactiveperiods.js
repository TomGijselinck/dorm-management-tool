'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:InactiveperiodsCtrl
 * @description
 * # InactiveperiodsCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('InactiveperiodsCtrl', function () {
    var mv = this;
    this.periods = [
      {
        "start": "2016-07-15T13:44:06.197Z",
        "end": "2016-07-15T13:44:06.197Z"
      },
      {
        "start": "2016-07-15T13:44:06.197Z",
        "end": "2016-07-15T13:44:06.197Z"
      },
      {
        "start": "2016-07-15T13:44:06.197Z",
        "end": "2016-07-15T13:44:06.197Z"
      }
    ];
    for (var i = 0; i < mv.periods.length; i++) {
      mv.periods[i].start = new Date(mv.periods[i].start);
      mv.periods[i].end = new Date(mv.periods[i].end);
    }
    this.create = function () {
      console.log("inactive period created [not implemented yet]");
    };
    this.save = function () {
      console.log("inactive period saved [not implemented yet]");
    };
  });
