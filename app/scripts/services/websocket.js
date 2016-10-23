'use strict';

angular.module('shamaAdminApp')
  .factory('websocket', function ($rootScope, $window) {
    // Initializing socket
    $window.socket = io('http://localhost:3000');
    var ws = {};
    var onMessage, onComment;

    ws.joinChat = function (chatId) {
      $window.socket.emit('join chat', chatId);
    };

    ws.sendMessage = function (message) {
      $window.socket.emit('message', message);
    };

    ws.sendComment = function (comment) {
      $window.socket.emit('comment', comment);
    };

    ws.on = function (eventName, callback) {
      $window.socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply($window.socket, args);
        });
      });
    };

    ws.onMessage = function (callback) {
      onMessage = callback;
    };

    ws.onComment = function (callback) {
      onComment = callback;
    };

    ws.on('message', function (message) {
      if (onMessage) {
        onMessage(message);
      }
    });

    ws.on('comment', function (comment) {
      if (onComment) {
        onComment(comment);
      }
    });


    return ws;
  });