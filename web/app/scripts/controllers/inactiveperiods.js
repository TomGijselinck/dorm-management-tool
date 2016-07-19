'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:InactiveperiodsCtrl
 * @description
 * # InactiveperiodsCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .run(function($http) {
    if (localStorage.getItem('token')) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token;
    }
  })
  .controller('InactiveperiodsCtrl', ['UserService', '$http', '$filter', function (UserService, $http, $filter) {
    var mv = this;
    this.getData = function () {
      $http({method: 'GET', url: 'http://localhost:3000/users/' + UserService.getId() + '/inactive_periods.json'})
        .then(function (response) {
          mv.periods = response.data;
        },
        function () {
          mv.periods = [
            {
              "id": 1,
              "start": "2016-07-15",
              "end": "2016-07-15"
            },
            {
              "id": 2,
              "start": "2016-07-15",
              "end": "2016-07-15"
            },
            {
              "id": 3,
              "start": "2016-07-15",
              "end": "2016-07-15"
            }
          ];
        })
        .finally(function () {
          // parse dates
          var startDate;
          var endDate;
          for (var i = 0; i < mv.periods.length; i++) {
            startDate = new Date(mv.periods[i].start);
            endDate = new Date(mv.periods[i].end);
            mv.periods[i].start = startDate;
            mv.periods[i].end = endDate;
          }
        });
    };
    this.create = function (start, end) {
      //TODO: filter to simple date yyyy-mm-dd
      var startMoment = moment(start).format('DD/MM/YYYY');
      var endMoment = moment(end).format('DD/MM/YYYY');
      var period = {
        "start": startMoment,
        "end": endMoment,
        "user_id": UserService.getId()
      };
      var body = JSON.stringify({"inactive_period": period});
      var url = "http://localhost:3000/inactive_periods.json";
      $http({method: 'POST', url: url, data: body}).then(function (response) {
        //ok
      },
      function () {
        console.log('failed to create new inactive period');
      });
      period.start = new Date(start);
      period.end = new Date(end);
      mv.periods.push(period);
    };
    this.save = function (id, start, end) {
      start = moment(start).format('DD/MM/YYYY');
      end = moment(end).format('DD/MM/YYYY');
      var body = JSON.stringify(
        {
          "inactive_period": {
            "start": start,
            "end": end
          }
        }
      );
      $http({method: 'PATCH', url: 'http://localhost:3000/inactive_periods/' + id + '.json', data: body})
        .then(function () {
          console.log('successfully saved inactive period');
        },
        function () {
          console.log('failed to save inactive period');
        });
    };
    this.delete = function (id) {
      var period = $filter('filter')(mv.periods, {id: id})[0];
      mv.periods.splice(mv.periods.indexOf(period), 1);
      $http({method: 'DELETE', url: 'http://localhost:3000/inactive_periods/' + id + '.json'})
        .then(function () {
          console.log('successfully removed inactive period');
        },
        function () {
          console.log('failed to remove inactive period');
        });
    };
  }])
  .config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('DD/MM/YYYY') : '';
    };
    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'DD/MM/YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
  });
