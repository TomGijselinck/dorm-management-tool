'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.DormService
 * @description
 * # DormService
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('DormService', function () {
    var mv = this;
    this.residents = [
      {
        "name": "Tom",
        "user_id": 1,
        "waste_bag_duties": [
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
        "waste_bag_duties": [
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
    this.getNextResponsible = function (bag) {
      var responsible = null;
      var min = Infinity;
      var duty = 0;
      for (var i = 0; i < mv.residents.length; i++) {
        for (var j = 0; j < mv.residents[i].waste_bag_duties.length; j++) {
          if (mv.residents[i].waste_bag_duties[j].name == bag && mv.residents[i].waste_bag_duties[j].completed < min) {
            responsible = i;
            duty = j;
            min = mv.residents[i].waste_bag_duties[j].completed;
          }
        }
      }
      mv.residents[responsible].waste_bag_duties[duty].completed++;
      return mv.residents[responsible];
    };
  });
