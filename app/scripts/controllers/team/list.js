'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamListCtrl
 * @description
 * # TeamListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamListCtrl', function ($scope, $state, $translate, auth, flash, users, DTOptionsBuilder, DTColumnDefBuilder) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

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
          $translate('TEAM.MESSAGES.EDIT_MEMBER_SUCCESS').then(function (msg) {
            flash.showSuccess(msg);
          });
        }, function (response) {
          console.log('Error trying to enable/disable the user, with status: ' + response.status);
          $translate('TEAM.MESSAGES.EDIT_MEMBER_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
    };

    users.all('team')
      .then(function (response) {
        $scope.team = response.data;
      }, function (response) {
        console.log('Error getting the members list, with status: ' + response.status);
        $translate('TEAM.MESSAGES.LIST_MEMBERS_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });
  });
