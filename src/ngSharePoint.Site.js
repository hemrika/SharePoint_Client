(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngSite', ['ngSecurity', 'ngWeb', '$resource', '$q', function (ngSecurity, ngWeb, $resource, $q) {

        var ngSite = {};

        //region Default Properties

        var _ngSite = {
            "CompatibilityLevel": 15,
            "Id": "",
            "PrimaryUri": "",
            "ReadOnly": false,
            "RequiredDesignerVersion": "15.0.0.0",
            "ServerRelativeUrl": "/",
            "Url": "",
            "Features": {
                "__deferred": {
                    "uri": "/Features"
                }
            },
            "RootWeb": {
                "__deferred": {
                    "uri": "/RootWeb"
                }
            }
        };

        //endregion

        //region REST resource

        var API = $resource('https://:EndPoint/_api/Site/:Deferred',
            {},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {EndPoint: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        //endregion

        //region Site

        ngSite = function (value) {

            var deferred = $q.defer();

            /**
             * Are we Authenticated ?
             */
            if (!ngSecurity.Authenticated) {
                deferred.reject("Not Authenticated");
            }

            //region Properties

            this.CompatibilityLevel = function (value) {
                return angular.isDefined(value) ? (_ngSite.CompatibilityLevel = value) : _ngSite.CompatibilityLevel;
            };
            this.PrimaryUri = function (value) {
                return angular.isDefined(value) ? (_ngSite.PrimaryUri = value) : _ngSite.PrimaryUri;
            };
            this.ReadOnly = function (value) {
                return angular.isDefined(value) ? (_ngSite.ReadOnly = value) : _ngSite.ReadOnly;
            };
            this.ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngSite.ServerRelativeUrl = value) : _ngSite.ServerRelativeUrl;
            };
            this.Url = function (value) {
                return angular.isDefined(value) ? (_ngSite.Url = value) : _ngSite.Url;
            };

            //endregion

            //region Deferred

            this.Features = function () {
                var deferred = $q.defer();

                var Operator = _ngSite.Features.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                data.results.__deferred = _ngSite.Features.__deferred;
                                deferred.resolve(data.results);
                            }
                            else {
                                data.__deferred = _ngSite.Features.__deferred;
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            //endregion

            //region Methods
            this.RootWeb = function () {

                return new ngWeb();
            };

            //endregion

            //region Get Site

            var self = this;

            if (ngSecurity.CurrentSite !== null) {
                self.Properties = _ngSite;
                ngSecurity.CurrentSite = self;
                deferred.resolve(self);
            }
            else {
                API.get({EndPoint: ngSecurity.Endpoint}).$promise.then(
                    function (data) {
                        _ngSite = data;
                        self.Properties = _ngSite;
                        ngSecurity.CurrentSite = self;
                        deferred.resolve(self);
                    });
            }

            //endregion

            return deferred.promise;
        };

        //Attach Web Object
        ngSite.Web = ngWeb;

        //endregion

        return ngSite;
    }]);
})();
