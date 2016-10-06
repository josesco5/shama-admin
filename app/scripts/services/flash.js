'use strict';

angular.module('shamaAdminApp')
  .factory('flash', function () {
    var flash = {};
    var messages = [];

    flash.getMessages = function () {
      return messages;
    };

    flash.showSuccess = function (message) {
      messages.push({ text: message, type: 'success'});
    };

    flash.showWarning = function (message) {
      messages.push( { text: message, type: 'warning' });
    };

    flash.showError = function (message) {
      messages.push( { text: message, type: 'danger' });
    };

    flash.closeMessage = function (index) {
      messages.splice(index, 1);
    };

    return flash;
  });