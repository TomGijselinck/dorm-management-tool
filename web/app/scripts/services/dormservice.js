'use strict';

/**
 * @ngdoc service
 * @name dormManagementToolApp.DormService
 * @description
 * # DormService
 * Service in the dormManagementToolApp.
 */
angular.module('dormManagementToolApp')
  .service('DormService', ['$filter', 'ApiService', 'UserService',
    function ($filter, ApiService, UserService) {
      var mv = this;

      this.dormId = UserService.getDormId();

      ApiService.getDormSummary(this.dormId).then(
        function (response) {
            mv.residents = response.data;
          },
          function () {
            console.log('Failed to GET residents summary');
          });

      this.getNextResponsible = function (garbage_bag, transferred) {
        var current_resident = $filter('filter')(mv.residents, {id: garbage_bag.responsible.id})[0];
        var current_duty = $filter('filter')(current_resident.garbage_bag_duties,
          {name: garbage_bag.name})[0];
        current_duty.completed++;
        var responsible = null;
        var min = Infinity;
        var min_total = Infinity;
        for (var i = 0; i < mv.residents.length; i++) {
          //TODO: catch exception if no one is active
          if (mv.residents[i].active && !(transferred
                                          && mv.residents[i].id == UserService.getId())) {
            for (var j = 0; j < mv.residents[i].garbage_bag_duties.length; j++) {
              if (mv.residents[i].garbage_bag_duties[j].name == garbage_bag.name) {
                if (mv.residents[i].garbage_bag_duties[j].completed < min
                    || (mv.residents[i].garbage_bag_duties[j].completed == min
                        && mv.residents[i].number_of_completed_duties
                           + mv.residents[i].number_of_active_duties < min_total)) {
                  responsible = i;
                  min = mv.residents[i].garbage_bag_duties[j].completed;
                  min_total = mv.residents[i].number_of_completed_duties
                    + mv.residents[i].number_of_active_duties;
                }
              }
            }
          }
        }
        return mv.residents[responsible];
      };
  }]);
