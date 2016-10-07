'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamEditCtrl
 * @description
 * # TeamEditCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamEditCtrl', function ($scope, $state, $stateParams, $translate, flash, users) {
    $scope.user = {};

    $scope.formHolder = {};

    $scope.canSubmitForm = function() {
      return $scope.formHolder.teamForm.$valid;
    };

    $scope.submitForm = function () {
      users.update($scope.user)
        .then(function (response) {
          $translate('TEAM.MESSAGES.EDIT_MEMBER_SUCCESS').then(function (msg) {
            flash.showSuccess(msg);
          });
          $state.go('team.detail', { userId: response.data._id });
        }, function (response) {
          console.log('Error updating user with status: ' + response.status);
          $translate('TEAM.MESSAGES.EDIT_MEMBER_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
    };

    users.get($stateParams.userId)
      .then(function (response) {
        $scope.user = response.data;
      });
  });