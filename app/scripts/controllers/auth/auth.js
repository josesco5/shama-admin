'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('AuthCtrl', function ($scope, $state, auth, users) {
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
      auth.login($scope.user)
        .then(function (response) {
          auth.saveToken('JWT ' + response.data.token);
          users.me()
            .then(function (response) {
              var user = response.data;
              auth.saveCurrentUser({
                id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                enabled: user.enabled
              });
              $state.go('chats.list');
            });
        }, function (response) {
          console.log('Login error with status: ' + response.status);
          // ToDo: Display Error message
        });
    };
  });
