'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:ChatDetailCtrl
 * @description
 * # ChatDetailCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('ChatDetailCtrl', function ($scope, $state, $stateParams, $translate, auth, flash, chats, users, websocket) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.chat = {};
    $scope.messages = [];
    $scope.comments = [];

    $scope.message = {
      chatId: $stateParams.chatId,
      userId: auth.getCurrentUser().id
    };

    $scope.comment = {
      chatId: $stateParams.chatId,
      userId: auth.getCurrentUser().id
    };

    websocket.joinChat($stateParams.chatId);

    websocket.onMessage(function (message) {
      // ToDo: Display sender's info only to admin user
      users.get(message.userId)
        .then(function(response) {
          message.userId = response.data;
          $scope.messages.push(message);
          $('#messagesList').animate({ scrollTop: $('#messagesList').prop("scrollHeight") }, 1000);
        });
    });

    websocket.onComment(function (comment) {
      $scope.comments.push(comment);
      // Scroll to the list's bottom
      $('#commentsList').animate({ scrollTop: $('#commentsList').prop("scrollHeight") }, 1000);
    });

    $scope.canSendMessage = function() {
      return $scope.messageForm.$valid;
    };

    $scope.canSendComment = function() {
      return $scope.commentForm.$valid;
    };

    $scope.sendMessage = function() {
      var message = angular.copy($scope.message);
      websocket.sendMessage(message);
      $scope.message.body = '';
    };

    $scope.sendComment = function() {
      var comment = angular.copy($scope.comment);
      websocket.sendComment(comment);
      $scope.comment.body = '';
    };

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
