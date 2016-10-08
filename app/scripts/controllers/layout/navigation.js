'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('NavigationCtrl', function ($scope, $state, auth) {
    var ADMIN_RESOURCES = ['chats', 'surveys', 'private-messages', 'team', 'users', 'reports'];
    var SUPERVISOR_RESOURCES = ['chats', 'surveys', 'private-messages', 'team'];
    var EXPERT_RESOURCES = ['chats', 'private-messages'];

    $scope.messages = [
      { id: 1, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' },
      { id: 2, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' },
      { id: 3, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' },
      { id: 4, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' }
    ];

    $scope.verifyState = function(state) {
      return $state.includes(state);
    };

    $scope.hasAccess = function (resource) {
      var role = auth.getCurrentUser().role;
      if (role === 'admin') {
        return ADMIN_RESOURCES.indexOf(resource) != -1;
      } else if (role === 'supervisor') {
        return SUPERVISOR_RESOURCES.indexOf(resource) != -1;
      } else if (role === 'expert') {
        return EXPERT_RESOURCES.indexOf(resource) != -1;
      }
    }

    $scope.logout = function () {
      auth.removeToken();
      $state.go('login');
    }
  });