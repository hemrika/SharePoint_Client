(function () {
    'use strict';
    //test
    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngWeb', ['ngSecurity', 'ngList', '$resource', '$q', function (ngSecurity, ngList, $resource, $q) {

        //var Endpoint = null;

        var _ngWeb = {
            "AllProperties": {
                "__deferred": {
                    "uri": "/AllProperties"
                }
            },
            "AvailableContentTypes": {
                "__deferred": {
                    "uri": "/AvailableContentTypes"
                }
            },
            "AvailableFields": {
                "__deferred": {
                    "uri": "/AvailableFields"
                }
            },
            "ContentTypes": {
                "__deferred": {
                    "uri": "/ContentTypes"
                }
            },
            "CurrentUser": {
                "__deferred": {
                    "uri": "/CurrentUser"
                }
            },
            "Features": {
                "__deferred": {
                    "uri": "/Features"
                }
            },
            "Fields": {
                "__deferred": {
                    "uri": "/Fields"
                }
            },
            "Folders": {
                "__deferred": {
                    "uri": "/Folders"
                }
            },
            "Lists": {
                "__deferred": {
                    "uri": "/Lists"
                }
            },
            "ListTemplates": {
                "__deferred": {
                    "uri": "/ListTemplates"
                }
            },
            "Navigation": {
                "__deferred": {
                    "uri": "/Navigation"
                }
            },
            "ParentWeb": {
                "__deferred": {
                    "uri": "/ParentWeb"
                }
            },
            "RegionalSettings": {
                "__deferred": {
                    "uri": "/RegionalSettings"
                }
            },
            "RootFolder": {
                "__deferred": {
                    "uri": "/RootFolder"
                }
            },
            "ThemeInfo": {
                "__deferred": {
                    "uri": "/ThemeInfo"
                }
            },
            "Webs": {
                "__deferred": {
                    "uri": "/Webs"
                }
            },
            "WebInfos": {
                "__deferred": {
                    "uri": "/WebInfos"
                }
            },
            "AllowRssFeeds": true,
            "AlternateCssUrl": "",
            "Configuration": 0,
            "Created": "",
            "CustomMasterUrl": "",
            "Description": "",
            "Id": "",
            "IsMultilingual": true,
            "Language": 1033,
            "LastItemModifiedDate": "",
            "MasterUrl": "",
            "ServerRelativeUrl": "",
            "SiteLogoUrl": "",
            "SyndicationEnabled": true,
            "Title": "",
            "UIVersion": 15,
            "UIVersionConfigurationEnabled": false,
            "Url": "",
            "WebTemplate": ""
        };

        var API = $resource('https://:EndPoint/_api/web/:Deferred',
            {},//{   EndPoint: '', Deferred: ''},
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
                },
                save: {
                    method: 'POST',
                    params: {EndPoint: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        var ngWeb = function (value) {

            var deferred = $q.defer();

            this.AllowRssFeeds = function (value) {
                return angular.isDefined(value) ? (_ngWeb.AllowRssFeeds = value) : _ngWeb.AllowRssFeeds;
            };
            this.AlternateCssUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.AlternateCssUrl = value) : _ngWeb.AlternateCssUrl;
            };
            this.Configuration = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Configuration = value) : _ngWeb.Configuration;
            };
            this.Created = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Created = value) : _ngWeb.Created;
            };
            this.CustomMasterUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.CustomMasterUrl = value) : _ngWeb.CustomMasterUrl;
            };
            this.Description = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Description = value) : _ngWeb.Description;
            };
            this.Id = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Id = value) : _ngWeb.Id;
            };
            this.IsMultilingual = function (value) {
                return angular.isDefined(value) ? (_ngWeb.IsMultilingual = value) : _ngWeb.IsMultilingual;
            };
            this.Language = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Language = value) : _ngWeb.Language;
            };
            this.LastItemModifiedDate = function (value) {
                return angular.isDefined(value) ? (_ngWeb.LastItemModifiedDate = value) : _ngWeb.LastItemModifiedDate;
            };
            this.ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.ServerRelativeUrl = value) : _ngWeb.ServerRelativeUrl;
            };
            this.SiteLogoUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.SiteLogoUrl = value) : _ngWeb.SiteLogoUrl;
            };
            this.SyndicationEnabled = function (value) {
                return angular.isDefined(value) ? (_ngWeb.SyndicationEnabled = value) : _ngWeb.SyndicationEnabled;
            };
            /**
             * @return {string}
             */
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Title = value) : _ngWeb.Title;
            };
            //UIVersion : function (value) {
            //    return angular.isDefined(value) ? (_ngWeb.UIVersion = value) : _ngWeb.UIVersion;
            //},
            /**
             * @return {int}
             */
            this.UIVersion = function (value) {
                return angular.isDefined(value) ? (_ngWeb.UIVersion = value) : _ngWeb.UIVersion;
            };
            //Url : function (value) {
            //    return angular.isDefined(value) ? (_ngWeb.Url = value) : _ngWeb.Url;
            //},
            /**
             * @return {string}
             */
            this.Url = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Url = value) : _ngWeb.Url;
            };
            this.WebTemplate = function (value) {
                return angular.isDefined(value) ? (_ngWeb.WebTemplate = value) : _ngWeb.WebTemplate;
            };
            this.AllProperties = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.AllProperties.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.AvailableFields = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.AvailableFields.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.CurrentUser = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.CurrentUser.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            this.Lists = function (value) {

                if (angular.isDefined(value)) {
                    return new ngList(value);
                }
                else {

                    var deferred = $q.defer();

                    var Operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                    if (ngSecurity.CurrentUser !== null) {
                        API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                            function (data) {
                                if (angular.isDefined(data.results)) {
                                    deferred.resolve(data.results);
                                }
                                else {
                                    deferred.resolve(data);
                                }
                            });
                    }
                    return deferred.promise;
                }
            };

            this.ParentWeb = function () {

                var deferred = $q.defer();

                var Operator = _ngWeb.ParentWeb.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.RegionalSettings = function () {

                var deferred = $q.defer();

                var Operator = _ngWeb.RegionalSettings.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.RootFolder = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.RootFolder.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.ThemeInfo = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.ThemeInfo.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.Webs = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.Webs.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            this.WebInfos = function () {
                var deferred = $q.defer();

                var Operator = _ngWeb.WebInfos.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            /*
            this.GetList = function (value) {

                var deferred = $q.defer();

                var Operator = "getlist('" + value + "')";
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };
            */
            this.GetUserById = function (int) {

                var deferred = $q.defer();

                var Operator = "getuserbyid(" + int + ")";
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
                return deferred.promise;
            };

            var self = this;

            if (ngSecurity.CurrentUser !== null) {
                API.get({EndPoint: ngSecurity.Endpoint}).$promise.then(
                    function (data) {
                        _ngWeb = data;
                        ngSecurity.CurrentWeb = self;
                        self.Properties = _ngWeb;
                        deferred.resolve(self);
                    });
            }

            return deferred.promise;

        };

        return ngWeb;

    }]);
})();
