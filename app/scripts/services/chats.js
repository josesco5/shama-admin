'use strict';

angular.module('shamaAdminApp')
  .factory('chats', function (ShamaRestangular, auth) {
    var chats = {};

    chats.all = function (type) {
      var headers = {
        authorization: auth.getToken()
      };
      var params = {
        type: type
      };
      return ShamaRestangular.all('chats').getList(params, headers);
    };

    chats.create = function (chat) {
      var headers = {
        authorization: auth.getToken()
      };
      return ShamaRestangular.all('chats').post(chat, null, headers);
    };

    chats.enable = function (chatId, enabled) {
      var headers = {
        authorization: auth.getToken()
      };
      var payload = {
        enabled: enabled
      };
      return ShamaRestangular.one('chats', chatId).post('enable', payload, null, headers);
    };

    return chats;
  });