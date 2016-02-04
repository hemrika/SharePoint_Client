(function () {
  'use strict';

        angular.module('ngSharePoint', ['ngResource'])

        .factory('SharePoint', ['ngSecurity', 'ngSite', 'ngWeb', function (ngSecurity, ngSite, ngWeb) {

            var ngSharePoint = {
                Security: ngSecurity,
                Site: ngSite,
                Web: ngWeb//,
                /*
              Configure : function(username, password, endpoint) {
                //ngSecurity.SetConfiguration(null,null,username, password, endpoint);
              }
              *//*,
              OpenWeb : function(value) {
                return angular.isDefined(value) ? (ngWeb(value)) : ngWeb();
              },
                Web : function(value){
                return angular.isDefined(value) ? (ngWeb.Open(value)) : ngWeb;
                }
                */
            };

            return ngSharePoint;

        }])
        /*
        .factory('SharePointInterceptor', ['$q', function ($q) {
            return {
                response: function (response) {
                    var deferred = $q.defer();
                    //response.headers["Access-Control-Allow-Origin"] = "*";
                    //response.headers["Access-Control-Allow-Headers"] = "X-Requested-With";
                    //response.headers["Access-Control-Allow-Methods"] = '"GET, POST", "PUT", "DELETE"';
                    if (response.headers()['content-type'] === "application/json;odata=verbose;charset=utf-8" && response.data) {
                      response.data = response.data.d ? response.data.d : response.data;
                    }
                    deferred.resolve(response);
                    return deferred.promise;
                }
            };
        }])
        */
        .config(['$httpProvider', function ($httpProvider) {
            //$httpProvider.defaults.useXDomain = true;
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            //$httpProvider.interceptors.push('SharePointInterceptor');
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
