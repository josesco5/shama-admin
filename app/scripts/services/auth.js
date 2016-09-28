'use strict';

angular.module('shamaAdminApp')
  .factory('auth', function (localStorageService, ShamaRestangular) {
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

    auth.saveCurrentUser = function (user) {
      localStorageService.set('currentUser', JSON.stringify(user));
    };

    auth.getCurrentUser = function () {
      return JSON.parse(localStorageService.get('currentUser'));
    };

    auth.removeCurrentUser = function () {
      localStorageService.remove('currentUser');
    };

    auth.loggedIn = function () {
      return auth.getToken();
    };

    auth.login = function (payload) {
      return ShamaRestangular.all('auth/sign-in').post(payload);
    };

    return auth;
  });
