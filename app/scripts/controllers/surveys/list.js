'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:SurveysListCtrl
 * @description
 * # SurveysListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('SurveysListCtrl', function ($scope, $state, auth) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.surveys = [];
  });
