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
                    if (request.headers.Accept === "application/json;odata=verbose") {
                        request.url = decodeURIComponent(request.url);
                    }
                    return request;

                }
            };
        }])

        .config(['$httpProvider', function ($httpProvider) {
            //$httpProvider.defaults.useXDomain = true;
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.interceptors.push('SharePointInterceptor');
        }]);
})();
/*
 (function () {
 'use strict';
 function SharePointInterceptor($q){
 return {
 response: function (response) {
 var deferred = $q.defer();
 response.headers["Access-Control-Allow-Origin"] = "*";
 response.headers["Access-Control-Allow-Headers"] = "X-Requested-With";
 response.headers["Access-Control-Allow-Methods"] = '"GET, POST", "PUT", "DELETE"';
 if (response.headers()['content-type'] === "application/json;odata=verbose;charset=utf-8" && response.data) {
 response.data = response.data.d ? response.data.d : response.data;
 }
 deferred.resolve(response);
 return deferred.promise;
 }
 };
 }

 SharePointInterceptor.$inject = ['$q'];

 function SharePointConfigurator($httpProvider) {
 $httpProvider.defaults.useXDomain = true;
 delete $httpProvider.defaults.headers.common['X-Requested-With'];
 $httpProvider.interceptors.push('SharePointInterceptor');
 }

 SharePointConfigurator.$inject = ['$httpProvider'];

 function SharePoint($http, ngSecurity, ngSite, ngWeb) {

 function Configure(value) {
 return $http.get('/api/maa')
 .then(getAvengersComplete)
 .catch(getAvengersFailed);

 function getAvengersComplete(response) {
 return response.data.results;
 }

 function getAvengersFailed(error) {
 logger.error('XHR Failed for getAvengers.' + error.data);
 }
 }

 function OpenWeb(value) {
 var web = ngWeb(value);
 return $http.get('/api/maa')
 .then(getAvengersComplete)
 .catch(getAvengersFailed);

 function getAvengersComplete(response) {
 return response.data.results;
 }

 function getAvengersFailed(error) {
 logger.error('XHR Failed for getAvengers.' + error.data);
 }
 }

 return {
 Security: ngSecurity,
 Site: ngSite,
 Web: ngWeb,
 Configure: Configure,
 OpenWeb: OpenWeb
 };

 }

 SharePoint.$inject = ['$http', 'ngSecurity', 'ngSite', 'ngWeb'];

 angular.module('ngSharePoint', ['ngResource'])

 .factory('SharePointInterceptor', SharePointInterceptor)
 .config('SharePointConfigurator', SharePointConfigurator)
 .factory('SharePoint', SharePoint);
 })();
 */
/*
 (function () {
 'use strict';

 angular.module('ngSharePoint', ['ngResource'])

 .factory('SharePoint', ['ngSecurity', 'ngSite', 'ngWeb', function (ngSecurity, ngSite, ngWeb) {

 var ngSharePoint = {
 Security: ngSecurity,
 Site: ngSite,
 Web: ngWeb,

 Configure : function(username, password, endpoint) {
 //ngSecurity.SetConfiguration(null,null,username, password, endpoint);
 },
 OpenWeb : function(value) {
 //return angular.isDefined(value) ? (ngWeb.OpenWeb(value)) : ngWeb.OpenWeb();
 }
 };

 return ngSharePoint;

 }])
 .factory('SharePointInterceptor', ['$q', function ($q) {
 return {
 response: function (response) {
 var deferred = $q.defer();
 response.headers["Access-Control-Allow-Origin"] = "*";
 response.headers["Access-Control-Allow-Headers"] = "X-Requested-With";
 response.headers["Access-Control-Allow-Methods"] = '"GET, POST", "PUT", "DELETE"';
 if (response.headers()['content-type'] === "application/json;odata=verbose;charset=utf-8" && response.data) {
 response.data = response.data.d ? response.data.d : response.data;
 }
 deferred.resolve(response);
 return deferred.promise;
 }
 };
 }])

 .config(['$httpProvider', function ($httpProvider) {
 $httpProvider.defaults.useXDomain = true;
 delete $httpProvider.defaults.headers.common['X-Requested-With'];
 $httpProvider.interceptors.push('SharePointInterceptor');
 }]);
 })();
 */
