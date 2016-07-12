'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.DormService
 * @description
 * # DormService
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('DormService', ['$filter', function ($filter) {
    var mv = this;
    this.residents = [
      {
        "name": "Tom",
        "user_id": 1,
        "garbage_bag_duties": [
          {
            "name": "brown",
            "completed": 5
          },
          {
            "name": "green",
            "completed": 2
          },
          {
            "name": "blue",
            "completed": 3
          }
        ]
      },
      {
        "name": "Jim",
        "user_id": 10,
        "garbage_bag_duties": [
          {
            "name": "brown",
            "completed": 3
          },
          {
            "name": "green",
            "completed": 4
          },
          {
            "name": "blue",
            "completed": 3
          }
        ]
      }
    ];
    this.getNextResponsible = function (bag_name, current_responsible_id) {
      var current_resident = $filter('filter')(mv.residents, {user_id: current_responsible_id})[0];
      var current_duty = $filter('filter')(current_resident.garbage_bag_duties, {name: bag_name})[0];
      current_duty.completed++;
      var responsible = null;
      var min = Infinity;
      for (var i = 0; i < mv.residents.length; i++) {
        for (var j = 0; j < mv.residents[i].garbage_bag_duties.length; j++) {
          if (mv.residents[i].garbage_bag_duties[j].name == bag_name && mv.residents[i].garbage_bag_duties[j].completed < min) {
            responsible = i;
            min = mv.residents[i].garbage_bag_duties[j].completed;
          }
        }
      }
      return mv.residents[responsible];
    };
  }]);
