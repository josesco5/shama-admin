'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:ChatsListCtrl
 * @description
 * # ChatsListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('ChatsListCtrl', function ($scope, $state, auth) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.chats = [];
  });
