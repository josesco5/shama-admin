'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:PrivateMessagesListCtrl
 * @description
 * # PrivateMessagesListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('PrivateMessagesListCtrl', function ($scope, $state, auth) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.privateMessages = [];
  });
