'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamDetailCtrl
 * @description
 * # TeamDetailCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamDetailCtrl', function ($scope, $state, $stateParams, users) {
    $scope.user = {};
    users.get($stateParams.userId)
      .then(function (response) {
        $scope.user = response.data;
      });
  });