'use strict';

angular.module('shamaAdminApp')
  .factory('websocket', function ($rootScope, $window) {
    // Initializing socket
    $window.socket = io('http://localhost:3000');
    var ws = {};
    var onMessage;

    ws.joinChat = function (chatId) {
      $window.socket.emit('join chat', chatId);
    };

    ws.sendMessage = function (message) {
      $window.socket.emit('message', message);
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

    ws.on('message', function (message) {
      if (onMessage) {
        onMessage(message);
      }
    });

    return ws;
  });