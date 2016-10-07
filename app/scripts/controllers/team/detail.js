'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamDetailCtrl
 * @description
 * # TeamDetailCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamDetailCtrl', function ($scope, $state, $stateParams, $translate, flash, users) {
    $scope.user = {};
    users.get($stateParams.userId)
      .then(function (response) {
        $scope.user = response.data;
      }, function (response) {
        console.log('Error getting user detail, with status: ' + response.status);
        $translate('TEAM.MESSAGES.GET_MEMBER_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });
  });
