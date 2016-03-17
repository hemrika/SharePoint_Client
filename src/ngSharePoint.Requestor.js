(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngRequestor', ['$rootScope', function ($rootScope) {

        var Requestor = {};

        //Requestor.SetConfiguration = Configure;

        return Requestor;

    }]);
})();