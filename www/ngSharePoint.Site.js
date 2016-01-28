(function () {
  'use strict';

  var SharePoint = angular.module('ngSharePoint');

  SharePoint.factory('ngSite', ['ngSecurity', 'ngWeb', '$resource', '$q', function (ngSecurity, ngWeb, $resource, $q) {
    var ngSite = {
      Security: ngSecurity,
      Web: ngWeb
    };

    return ngSite;
  }]);

})();
