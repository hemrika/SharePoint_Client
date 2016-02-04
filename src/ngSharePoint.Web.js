(function () {
    'use strict';
    //test
    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngWeb', ['ngSecurity', 'ngList', '$resource', '$q', function (ngSecurity, ngList, $resource, $q) {

        var Endpoint = null;

        var _ngWeb = {
            "AllProperties": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/AllProperties"
            }
            },
            "AvailableContentTypes": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/AvailableContentTypes"
            }
            },
            "AvailableFields": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/AvailableFields"
            }
            },
            "ContentTypes": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/ContentTypes"
            }
            },
            "CurrentUser": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/CurrentUser"
            }
            },
            "Features": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Features"
            }
            },
            "Fields": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Fields"
            }
            },
            "Folders": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Folders"
            }
            },
            "Lists": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists"
            }
            },
            "ListTemplates": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/ListTemplates"
            }
            },
            "Navigation": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Navigation"
            }
            },
            "ParentWeb": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/ParentWeb"
            }
            },
            "RegionalSettings": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/RegionalSettings"
            }
            },
            "RootFolder": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/RootFolder"
            }
            },
            "ThemeInfo": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/ThemeInfo"
            }
            },
            "Webs": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Webs"
            }
            },
            "WebInfos": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/WebInfos"
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
                    params: {   EndPoint: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {   EndPoint: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }                    
                },
                save: {
                    method: 'POST',
                    params: {   EndPoint: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }                    
                }
            }
        );

        //var ngWeb;
        var ngWeb = function(value) {

            this.List = ngList;

            angular.isDefined(value) ? (Endpoint = value) : Endpoint = ngSecurity.Endpoint;

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
                var operator = _ngWeb.AllProperties.__deferred.uri.split('/').pop();

                ngSecurity.GetSecurityInformation().then(function () {
                    API.deferred({ EndPoint: Endpoint, Deferred: operator }).$promise.then(
                       function (data) {
                           if (angular.isDefined(data.d.results)) {
                               deferred.resolve(data.d.results);
                           }
                           else {
                               deferred.resolve(data.d);
                           }
                       })
                });
                return deferred.promise;
            };
            this.AvailableFields = function () {
                var deferred = $q.defer();
                var operator = _ngWeb.AvailableFields.__deferred.uri.split('/').pop();

                ngSecurity.GetSecurityInformation().then(function () {
                    API.deferred({ EndPoint: Endpoint, Deferred: operator }).$promise.then(
                       function (data) {
                           if (angular.isDefined(data.d.results)) {
                               deferred.resolve(data.d.results);
                           }
                           else {
                               deferred.resolve(data.d);
                           }
                       })
                });
                return deferred.promise;

            };
            this.CurrentUser = function () {
                var deferred = $q.defer();
                var operator = _ngWeb.CurrentUser.__deferred.uri.split('/').pop();

                ngSecurity.GetSecurityInformation().then(function () {
                    API.deferred({ EndPoint: Endpoint, Deferred: operator }).$promise.then(
                       function (data) {
                           if (angular.isDefined(data.d.results)) {
                               deferred.resolve(data.d.results);
                           }
                           else {
                               deferred.resolve(data.d);
                           }
                       })
                });
                return deferred.promise;
            };
            this.Lists = function () {
                var deferred = $q.defer();
                var operator = _ngWeb.Lists.__deferred.uri.split('/').pop();

                ngSecurity.GetSecurityInformation().then(function () {
                    API.deferred({ EndPoint: Endpoint, Deferred: operator }).$promise.then(
                       function (data) {
                           if (angular.isDefined(data.d.results)) {
                               deferred.resolve(data.d.results);
                           }
                           else {
                               deferred.resolve(data.d);
                           }
                       })
                });
                return deferred.promise;
            };
            this.ParentWeb = function(){
                return _ngWeb.ParentWeb.__deferred.uri.valueOf();
            };
            this.RegionalSettings = function(){
                return _ngWeb.RegionalSettings.__deferred.uri.valueOf();
            };
            this.RootFolder = function(){
                return _ngWeb.RootFolder.__deferred.uri.valueOf();
            };
            this.ThemeInfo = function(){
                return _ngWeb.ThemeInfo.__deferred.uri.valueOf();
            };
            this.Webs = function(){
                return _ngWeb.Webs.__deferred.uri.valueOf();
            };
            this.WebInfos = function(){
                return _ngWeb.WebInfos.__deferred.uri.valueOf();
            };
            /*
            GetContextWebInformation : this.prototype.GetContextWebInformation = function (){
                return "";
            },
            GetDocumentLibraries : this.prototype.GetDocumentLibraries = function (){
                return "";
            },
            GetFileByServerRelativeUrl : this.prototype.GetFileByServerRelativeUrl = function (){
                return "";
            },
            GetFolderByServerRelativeUrl : this.prototype.GetFolderByServerRelativeUrl = function (){
                return "";
            },
            GetList : this.prototype.GetList = function (){
                //ngList
                return "";
            },
            */
            //,
            //OpenWeb : this.prototype.OpenWeb = function(value) {
            //  var security = ngSecurity.GetContextWebInformation(value);
            //  console.log(security);
              /*
              .then(
                function (data) {
                  var context = data;
                web.get({ siteUrl:value}).$promise.then(
                  function (data) {
                    var d  = data;
                  }
                )})
              */
              //angular.isDefined(value) ? (_ngWeb.Title = value) : _ngWeb.Title;
            //  return this;
            //}
           
            ngSecurity.GetSecurityInformation().then(function () {
                API.get({ EndPoint: Endpoint }).$promise.then(
                    function (data) {
                        _ngWeb = data.d;
                        
                    });
            });
            SharePoint.CurrentWeb = this;
            deferred.resolve(this);

            return deferred.promise;

        };

        return ngWeb;
  }]);
})();
