'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('AuthCtrl', function ($scope, $state, auth) {
    if (auth.loggedIn()) {
      $state.go('chats.list');
    }
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.canSubmitLogin = function() {
      return $scope.loginForm.$valid;
    };

    $scope.login = function() {
      // Saving email as the token for the moment
      auth.saveToken($scope.user.email);
      $state.go('chats.list');
    };
  });