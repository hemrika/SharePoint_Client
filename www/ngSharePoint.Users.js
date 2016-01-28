(function () {
  'use strict';

  var SharePoint = angular.module('ngSharePoint');

  SharePoint.factory('ngUsers', ['$resource', '$q', function ($resource, $q) {
    var ngUsers = {
    };

    return ngUsers;
  }]);

})();
