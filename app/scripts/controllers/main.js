'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('MainCtrl', function ($scope, auth) {
    $scope.loggedIn = auth.loggedIn;
  });
