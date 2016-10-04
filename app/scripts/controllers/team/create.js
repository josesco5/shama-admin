'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:TeamCreateCtrl
 * @description
 * # TeamCreateCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('TeamCreateCtrl', function ($scope, $state, users) {
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
          // ToDo: Display success message
          // ToDo: Display user detail view
          console.log(response.data);
          $state.go('team.list');
        }, function (response) {
          // ToDo: Display error message
          console.log('Error creating user with status: ' + response.status);
          console.log(response.data);
        });
    };
  });
