(function () {
    'use strict';

    angular.module('ngSharePoint', ['ngResource'])

        .factory('SharePoint', ['ngSecurity', 'ngSite', 'ngWeb', function (ngSecurity, ngSite, ngWeb) {

            var EndPoint = function () {
                return ngSecurity.EndPoint;
            };

            var CurrentUser = function () {
                return ngSecurity.CurrentUser;
            };

            var CurrentWeb = function () {
                return ngSecurity.CurrentWeb;
            };

            var CurrentList = function () {
                return ngSecurity.CurrentList;
            };

            var CurrentItem = function () {
                return ngSecurity.CurrentItem;
            };

            var CurrentFile = function () {
                return ngSecurity.CurrentFile;
            };

            var SharePoint = {};

            //var ngSharePoint = {
            SharePoint.Security = ngSecurity;
            SharePoint.Site = ngSite;
            SharePoint.Web = ngWeb;
            SharePoint.EndPoint = EndPoint;
            SharePoint.CurrentUser = CurrentUser;
            SharePoint.CurrentWeb = CurrentWeb;
            SharePoint.CurrentList = CurrentList;
            SharePoint.CurrentItem = CurrentItem;
            SharePoint.CurrentFile = CurrentFile;

            return SharePoint;

        }])

        .factory('SharePointInterceptor', ['$q', function ($q) {
            return {
                response: function (response) {
                    var deferred = $q.defer();
                    if (response.headers()['content-type'] === "application/json;odata=verbose;charset=utf-8" && response.data) {
                        response.data = response.data.d ? response.data.d : response.data;
                    }

                    deferred.resolve(response);
                    return deferred.promise;
                },
                request: function (request) {
                    //request.headers.Authorization = "Bearer " + ngSecurity.SecurityToken;
                    if (request.headers.Accept === "application/json;odata=verbose") {
                        request.url = decodeURIComponent(request.url);
                    }
                    //console.log(SharePoint.Security.ContextInfo.FormDigestTimeoutSeconds);
                    return request;

                }
            };
        }])
        .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist(['self'], 'https://*.sharepoint.com/**');
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.withCredentials = true;

            $httpProvider.defaults.headers.common = {Accept: "application/json, text/plain, */*"};
            $httpProvider.defaults.headers.post = {"Content-Type": "application/json;charset=utf-8"};

            $httpProvider.interceptors.push('SharePointInterceptor');
        }]);
})();