'use strict';

/**
 * @ngdoc function
 * @name shamaAdminApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the shamaAdminApp
 */
angular.module('shamaAdminApp')
  .controller('NavigationCtrl', function ($scope) {
    $scope.messages = [
      { id: 1, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' },
      { id: 2, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' },
      { id: 3, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' },
      { id: 4, user: 'John Smith', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...' }
    ];
  });