'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:ChatsListCtrl
 * @description
 * # ChatsListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('ChatsListCtrl', function ($scope) {
    $scope.chats = [];
  });