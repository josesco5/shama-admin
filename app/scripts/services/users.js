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

    /*
     * Params:
     * type: Users' type to be received ('adolescent' or 'team')
     */
    users.all = function (type) {
      var headers = {
        authorization: auth.getToken()
      };
      var role = auth.getCurrentUser().role;
      var params = {
        type: type,
        role: role
      };
      return ShamaRestangular.all('users').getList(params, headers);
    };

    users.create = function (user) {
      var headers = {
        authorization: auth.getToken()
      };
      return ShamaRestangular.all('users').post(user, null, headers);
    };

    return users;
  });
