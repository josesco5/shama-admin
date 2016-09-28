'use strict';

angular.module('shamaAdminApp')
  .factory('users', function (ShamaRestangular, auth) {
    var users = {};

    users.me = function () {
      var headers = {
        authorization: auth.getToken()
      };
      return ShamaRestangular.all('users').customGET('me', null, headers);
    };

    return users;
  });
