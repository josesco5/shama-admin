'use strict';

angular.module('shamaAdminApp')
  .factory('comments', function (ShamaRestangular, auth) {
    var comments = {};

    comments.create = function (comment) {
      var headers = {
        authorization: auth.getToken()
      };
      return ShamaRestangular.all('comments').post(comment, null, headers);
    };

    return comments;
  });