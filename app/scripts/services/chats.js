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

    return chats;
  });
