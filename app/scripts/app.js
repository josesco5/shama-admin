'use strict';

/**
 * @ngdoc overview
 * @name shamaAdminApp
 * @description
 * # shamaAdminApp
 *
 * Main module of the application.
 */
angular
  .module('shamaAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',

    // Third dependencies
    'ui.bootstrap',
    'ui.router',
    'LocalStorageModule',
    'restangular',
    'datatables',
    'datatables.bootstrap',
    'pascalprecht.translate',
    'ui.select'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/chats');
    $urlRouterProvider.otherwise('/chats');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/login.html',
        controller: 'AuthCtrl'
      })
      .state('chats', {
        abstract: true,
        url: '/chats',
        template: '<ui-view/>'
      })
      .state('chats.list', {
        url: '',
        templateUrl: 'views/chats/list.html',
        controller: 'ChatsListCtrl'
      })
      .state('chats.create', {
        url: '/new',
        templateUrl: 'views/chats/create.html',
        controller: 'ChatCreateCtrl'
      })
      .state('surveys', {
        abstract: true,
        url: '/surveys',
        template: '<ui-view/>'
      })
      .state('surveys.list', {
        url: '',
        templateUrl: 'views/surveys/list.html',
        controller: 'SurveysListCtrl'
      })
      .state('private-messages', {
        abstract: true,
        url: '/private-messages',
        template: '<ui-view/>'
      })
      .state('private-messages.list', {
        url: '',
        templateUrl: 'views/private-messages/list.html',
        controller: 'PrivateMessagesListCtrl'
      })
      .state('team', {
        abstract: true,
        url: '/team',
        template: '<ui-view/>'
      })
      .state('team.list', {
        url: '',
        templateUrl: 'views/team/list.html',
        controller: 'TeamListCtrl'
      })
      .state('team.create', {
        url: '/new',
        templateUrl: 'views/team/create.html',
        controller: 'TeamCreateCtrl'
      })
      .state('team.detail', {
        url: '/:userId',
        templateUrl: 'views/team/detail.html',
        controller: 'TeamDetailCtrl'
      })
      .state('team.edit', {
        url: '/:userId/edit',
        templateUrl: 'views/team/edit.html',
        controller: 'TeamEditCtrl'
      })
      .state('users', {
        abstract: true,
        url: '/users',
        template: '<ui-view/>'
      })
      .state('users.list', {
        url: '',
        templateUrl: 'views/users/list.html',
        controller: 'UsersListCtrl'
      })
      .state('users.detail', {
        url: '/:userId',
        templateUrl: 'views/users/detail.html',
        controller: 'UserDetailCtrl'
      })
      .state('reports', {
        abstract: true,
        url: '/reports',
        template: '<ui-view/>'
      })
      .state('reports.list', {
        url: '',
        templateUrl: 'views/reports/list.html',
        controller: 'ReportsListCtrl'
      });
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('shamaAdminApp');
  })
  .config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: '/languages/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('es');

    $translateProvider.useSanitizeValueStrategy('escapeParameters');
  })
  .config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  });
