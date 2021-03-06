﻿(function () {
    'use strict';

    angular.module('ngSharePoint', ['ngResource'])

        .factory('SharePoint', ['ngSecurity', 'ngUserProfile', 'ngSite', 'ngWeb', function (ngSecurity, ngUserProfile, ngSite, ngWeb) {

            var SharePoint = {};

            //region  Default SharePoint functions

            var EndPoint = function (value) {

                if (angular.isDefined(value)) { ngSecurity.Endpoint = value; }
                return ngSecurity.EndPoint;
            };

            var Hostname = function () {
                return ngSecurity.Hostname;
            };

            var CurrentUser = function () {
                return ngSecurity.CurrentUser;
            };

            var CurrentUserProfile = function () {
                return ngSecurity.CurrentUserProfile;
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

            //endregion

            SharePoint.Security = ngSecurity;
            SharePoint.Site = ngSite;
            SharePoint.Web = ngWeb;
            SharePoint.UserProfile = ngUserProfile;
            SharePoint.EndPoint = EndPoint;
            SharePoint.Hostname = Hostname;
            SharePoint.CurrentUserProfile = CurrentUserProfile;
            SharePoint.CurrentUser = CurrentUser;
            SharePoint.CurrentWeb = CurrentWeb;
            SharePoint.CurrentList = CurrentList;
            SharePoint.CurrentItem = CurrentItem;
            SharePoint.CurrentFile = CurrentFile;

            return SharePoint;
        }])

        /*
         SharePointInterceptor :
         */
        .factory('SharePointInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
            return {
                response: function (response) {
                    var deferred = $q.defer();
                    if (response.headers()['content-type'] === 'application/json;odata=verbose;charset=utf-8' && response.data) {
                        response.data = response.data.d ? response.data.d : response.data;
                    }

                    if (response.headers()['content-type'] === 'text/xml; charset="UTF-8"') { }

                    deferred.resolve(response);
                    return deferred.promise;
                },
                request: function (request) {

                    delete request.headers['X-Requested-With'];
                    if (request.method.toLowerCase() === "post" && angular.isDefined($rootScope.FormDigestValue)) {
                        request.headers['X-RequestDigest'] = $rootScope.FormDigestValue;
                        request.url = decodeURIComponent(request.url);
                    }
                    if (request.headers.Accept === "application/json;odata=verbose") {
                        request.url = decodeURIComponent(request.url);
                    }
                    return request;
                }
            };
        }])

        /*

         */
        .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist(['self'], 'https://*.sharepoint.com/**');
            $sceDelegateProvider.resourceUrlWhitelist(['self'], 'file://*');
        }])

        /*

         */
        .config(['$compileProvider', function ($compileProvider) {

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|callto|tel|file|ghttps?|ms-appx|ms-appx-web|x-wmapp0|ms-drive-to|ms-windows-store|bingmaps|google.navigation):/);
            // Use $compileProvider.urlSanitizationWhitelist(...) for Angular 1.2
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|ms-appx-web|x-wmapp0):|data:image\//);
        }])

        /*

        */
        .config(['$httpProvider', '$sceProvider', function ( $httpProvider, $sceProvider){
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.withCredentials = false;

            $httpProvider.defaults.headers.common = {Accept: "application/json, text/plain, */*"};
            $httpProvider.defaults.headers.post = {"Content-Type": "application/json;charset=utf-8"};

            $httpProvider.interceptors.push('SharePointInterceptor');
        }]);
})();
