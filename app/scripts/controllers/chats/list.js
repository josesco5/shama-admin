'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:ChatsListCtrl
 * @description
 * # ChatsListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('ChatsListCtrl', function ($scope, $state, $translate, auth, chats, flash, DTOptionsBuilder, DTColumnDefBuilder) {

    if (!auth.loggedIn()) {
      $state.go('login');
      return;
    }

    $scope.chats = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withPaginationType('full_numbers')
                        .withDisplayLength(10)
                        .withBootstrap();

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).withOption('orderData', [2, 3]),
        DTColumnDefBuilder.newColumnDef(4).notSortable()
    ];

    $scope.enable = function (chatId, enabled) {
      chats.enable(chatId, enabled)
        .then(function (response) {
          $translate('CHATS.MESSAGES.EDIT_CHAT_SUCCESS').then(function (msg) {
            flash.showSuccess(msg);
          });
        }, function (response) {
          console.log('Error trying to enable/disable the chat, with status: ' + response.status);
          $translate('CHATS.MESSAGES.EDIT_CHAT_ERROR').then(function (msg) {
            flash.showError(msg);
          });
        });
    };

    chats.all('public')
      .then(function (response) {
        $scope.chats = response.data;
      }, function (response) {
        console.log('Error getting the chats list, with status: ' + response.status);
        $translate('CHATS.MESSAGES.LIST_ITEMS_ERROR').then(function (msg) {
          flash.showError(msg);
        });
      });
  });
