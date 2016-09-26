'use strict';

angular.module('shamaAdminApp')
  .factory('auth', function (localStorageService) {
    var auth = {};

    auth.saveToken = function (token) {
      localStorageService.set('token', token);
    };

    auth.getToken = function () {
      return localStorageService.get('token');
    };

    auth.removeToken = function () {
      localStorageService.remove('token');
    };

    auth.loggedIn = function () {
      return auth.getToken();
    };

    return auth;
  });