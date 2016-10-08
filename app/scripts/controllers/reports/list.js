'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:ReportsListCtrl
 * @description
 * # ReportsListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('ReportsListCtrl', function ($scope, $state, auth) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.reports = [];
  });
