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

    $scope.message = {
      chatId: $stateParams.chatId,
      userId: auth.getCurrentUser().id
    };

    $scope.comment = {
      chatId: $stateParams.chatId,
      userId: auth.getCurrentUser().id
    };

    $scope.canSendMessage = function() {
      return $scope.messageForm.$valid;
    };

    $scope.canSendComment = function() {
      return $scope.commentForm.$valid;
    };

    $scope.sendMessage = function() {
      chats.sendMessage($scope.message)
        .then(function (response) {
          var message = angular.copy($scope.message);
          message.userId = auth.getCurrentUser();
          $scope.messages.push(message);
          $scope.message.body = '';
          // Scroll to the list's bottom
          $('#messagesList').animate({ scrollTop: $('#messagesList').prop("scrollHeight") }, 1000);
        }, function (response) {
          $translate('CHATS.MESSAGES.SEND_MESSAGE_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
    };

    $scope.sendComment = function() {
      chats.sendComment($scope.comment)
        .then(function (response) {
          var comment = angular.copy($scope.comment);
          comment.userId = auth.getCurrentUser();
          $scope.comments.push(comment);
          $scope.comment.body = '';
          // Scroll to the list's bottom
          $('#commentsList').animate({ scrollTop: $('#commentsList').prop("scrollHeight") }, 1000);
        }, function (response) {
          $translate('CHATS.MESSAGES.SEND_COMMENT_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
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
