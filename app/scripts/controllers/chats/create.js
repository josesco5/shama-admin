'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:ChatCreateCtrl
 * @description
 * # ChatCreateCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('ChatCreateCtrl', function ($scope, $state, $translate, auth, flash, chats, comments, users) {
    $scope.chat = {
      enabled: false
    };

    $scope.team = [];

    $scope.formHolder = {};

    $scope.canSubmitForm = function() {
      return $scope.formHolder.chatForm.$valid;
    };

    $scope.submitForm = function () {
      var comment = $scope.chat.comments;
      delete $scope.chat.comments;
      $scope.chat.type = 'public';

      chats.create($scope.chat)
        .then(function (response) {
          if (comment) {
            var commentPayload = {
              body: comment,
              userId: auth.getCurrentUser().id,
              chatId: response.data._id
            };
            comments.create(commentPayload)
              .then(function (commentResponse) {
                return response;
              }, function (commentResponse) {
                console.log('Error creating comment with status: ' + commentResponse.status);
              });
          } else {
            return response;
          }
        }, function (response) {
          reject(response);
        })
        .then(function (response) {
          $translate('CHATS.MESSAGES.ADD_CHAT_SUCCESS').then(function (msg) {
            flash.showSuccess(msg);
          });
          $state.go('chats.list');
        }, function (response) {
          console.log('Error creating chat with status: ' + response.status);
          $translate('CHATS.MESSAGES.ADD_CHAT_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
    };

    users.all('team')
      .then(function (response) {
        $scope.team = response.data;
      }, function (response) {
        console.log('Error getting the members list, with status: ' + response.status);
        $translate('TEAM.MESSAGES.LIST_MEMBERS_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });
  });
