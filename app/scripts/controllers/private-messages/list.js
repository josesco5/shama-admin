'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:PrivateMessagesListCtrl
 * @description
 * # PrivateMessagesListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('PrivateMessagesListCtrl', function ($scope) {
    $scope.privateMessages = [];
  });