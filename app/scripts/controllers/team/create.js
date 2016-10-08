'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamCreateCtrl
 * @description
 * # TeamCreateCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamCreateCtrl', function ($scope, $state, $translate, auth, flash, users) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.user = {
      enabled: false
    };

    $scope.formHolder = {};

    $scope.canSubmitForm = function() {
      return $scope.formHolder.teamForm.$valid;
    };

    $scope.submitForm = function () {
      console.log($scope.user);
      users.create($scope.user)
        .then(function (response) {
          $translate('TEAM.MESSAGES.ADD_MEMBER_SUCCESS').then(function (msg) {
            flash.showSuccess(msg);
          });
          $state.go('team.detail', { userId: response.data._id });
        }, function (response) {
          console.log('Error creating user with status: ' + response.status);
          $translate('TEAM.MESSAGES.ADD_MEMBER_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
    };
  });
