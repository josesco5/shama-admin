'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamListCtrl
 * @description
 * # TeamListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamListCtrl', function ($scope, users, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.team = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withPaginationType('full_numbers')
                        .withDisplayLength(10)
                        .withBootstrap();

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];

    $scope.enable = function (userId, enabled) {
      users.enable(userId, enabled)
        .then(function (response) {
          // ToDo: Display success message
          console.log(response);
        }, function (response) {
          // ToDo: Display error message
          console.log('Error trying to enable/disable the user, with status: ' + response.status);
        });
    };

    users.all('team')
      .then(function (response) {
        $scope.team = response.data;
      });
  });
