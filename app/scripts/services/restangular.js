'use strict';

angular.module('shamaAdminApp')
  .factory('ShamaRestangular', function (Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setFullResponse(true);
      RestangularConfigurer.setBaseUrl('http://localhost:3000');
    });
  });