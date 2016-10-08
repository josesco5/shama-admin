'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamDetailCtrl
 * @description
 * # TeamDetailCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamDetailCtrl', function ($scope, $state, $stateParams, $translate, auth, flash, users) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

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
