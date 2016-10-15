'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:ChatDetailCtrl
 * @description
 * # ChatDetailCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('ChatDetailCtrl', function ($scope, $state, $stateParams, $translate, auth, flash, chats) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.chat = {};
    $scope.messages = [];
    $scope.comments = [];

    chats.get($stateParams.chatId)
      .then(function (response) {
        $scope.chat = response.data;
      }, function (response) {
        console.log('Error getting chat detail, with status: ' + response.status);
        $translate('CHATS.MESSAGES.GET_CHAT_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });

    chats.getMessages($stateParams.chatId)
      .then(function (response) {
        $scope.messages = response.data;
      }, function (response) {
        console.log('Error getting chat messages, with status: ' + response.status);
        $translate('CHATS.MESSAGES.GET_CHAT_MESSAGES_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });

    chats.getComments($stateParams.chatId)
      .then(function (response) {
        $scope.comments = response.data;
      }, function (response) {
        console.log('Error getting chat comments, with status: ' + response.status);
        $translate('CHATS.MESSAGES.GET_CHAT_COMMENTS_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });
  });
