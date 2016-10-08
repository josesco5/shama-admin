'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('UserDetailCtrl', function ($scope, $state, $stateParams, $translate, auth, flash, users) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    if (auth.getCurrentUser().role != 'admin') {
      $translate('USERS.MESSAGES.UNAUTHORIZED_ACCESS').then(function (msg) {
        flash.showError(msg);
      });
      $state.go('chats.list');
      return;
    }

    $scope.user = {};
    users.get($stateParams.userId)
      .then(function (response) {
        $scope.user = response.data;
      }, function (response) {
        console.log('Error getting user detail, with status: ' + response.status);
        $translate('USERS.MESSAGES.GET_USER_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });
  });
