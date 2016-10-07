'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:UsersListCtrl
 * @description
 * # UsersListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('UsersListCtrl', function ($scope, $translate, flash, users, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.users = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withPaginationType('full_numbers')
                        .withDisplayLength(10)
                        .withBootstrap();

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];

    $scope.enable = function (userId, enabled) {
      users.enable(userId, enabled)
        .then(function (response) {
          $translate('USERS.MESSAGES.EDIT_USER_SUCCESS').then(function (msg) {
            flash.showSuccess(msg);
          });
        }, function (response) {
          console.log('Error trying to enable/disable the user, with status: ' + response.status);
          $translate('USERS.MESSAGES.EDIT_USER_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
    };

    users.all('adolescent')
      .then(function (response) {
        $scope.team = response.data;
      }, function (response) {
        console.log('Error getting the users list, with status: ' + response.status);
        $translate('USERS.MESSAGES.LIST_USERS_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });
  });
