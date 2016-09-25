'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:UsersListCtrl
 * @description
 * # UsersListCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('UsersListCtrl', function ($scope) {
    $scope.users = [];
  });