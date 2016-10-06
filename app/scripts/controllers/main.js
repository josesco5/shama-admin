'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('MainCtrl', function ($scope, auth, flash) {
    $scope.loggedIn = auth.loggedIn;

    $scope.flashMessages = flash.getMessages();
    $scope.closeFlashMessage = flash.closeMessage;
  });
