'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('UserDetailCtrl', function ($scope, $state, $stateParams, $translate, flash, users) {
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
