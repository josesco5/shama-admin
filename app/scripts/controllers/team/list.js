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

    users.all('team')
      .then(function (response) {
        $scope.team = response.data;
      });
  });
