(function () {
    'use strict';
    //test
    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngWeb', ['ngSecurity', 'ngList', '$resource', '$q', function (ngSecurity, ngList, $resource, $q) {

        //var Endpoint = null;

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

        var EndPoint = function () {
            return ngSecurity.EndPoint;
        };

        var GetDeferred = function (Operator) {

            var deferred = $q.defer();

            if(ngSecurity.CurrentUser !== null) {
                //ngSecurity.GetSecurityInformation().then(function () {
                API.deferred({EndPoint: ngSecurity.Endpoint, Deferred: Operator}).$promise.then(
                    function (data) {
                        if (angular.isDefined(data.results)) {
                            deferred.resolve(data.results);
                        }
                        else {
                            deferred.resolve(data);
                        }
                    });
                //});
            }
            return deferred.promise;
        };

        //var ngWeb;
        var ngWeb = function(GUID) {


            var deferred = $q.defer();

            //if(angular.isDefined(value)){ ngSecurity.Endpoint = value; }

            var AllowRssFeeds = function (value) {
                return angular.isDefined(value) ? (_ngWeb.AllowRssFeeds = value) : _ngWeb.AllowRssFeeds;
            };
            var AlternateCssUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.AlternateCssUrl = value) : _ngWeb.AlternateCssUrl;
            };
            var Configuration = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Configuration = value) : _ngWeb.Configuration;
            };
            var Created = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Created = value) : _ngWeb.Created;
            };
            var CustomMasterUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.CustomMasterUrl = value) : _ngWeb.CustomMasterUrl;
            };
            var Description = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Description = value) : _ngWeb.Description;
            };
            var Id = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Id = value) : _ngWeb.Id;
            };
            var IsMultilingual = function (value) {
                return angular.isDefined(value) ? (_ngWeb.IsMultilingual = value) : _ngWeb.IsMultilingual;
            };
            var Language = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Language = value) : _ngWeb.Language;
            };
            var LastItemModifiedDate = function (value) {
                return angular.isDefined(value) ? (_ngWeb.LastItemModifiedDate = value) : _ngWeb.LastItemModifiedDate;
            };
            var ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.ServerRelativeUrl = value) : _ngWeb.ServerRelativeUrl;
            };
            var SiteLogoUrl = function (value) {
                return angular.isDefined(value) ? (_ngWeb.SiteLogoUrl = value) : _ngWeb.SiteLogoUrl;
            };
            var SyndicationEnabled = function (value) {
                return angular.isDefined(value) ? (_ngWeb.SyndicationEnabled = value) : _ngWeb.SyndicationEnabled;
            };
            /**
             * @return {string}
             */
            var Title = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Title = value) : _ngWeb.Title;
            };
            //UIVersion : function (value) {
            //    return angular.isDefined(value) ? (_ngWeb.UIVersion = value) : _ngWeb.UIVersion;
            //},
            /**
            * @return {int}
            */
            var UIVersion = function (value) {
                return angular.isDefined(value) ? (_ngWeb.UIVersion = value) : _ngWeb.UIVersion;
            };
            //Url : function (value) {
            //    return angular.isDefined(value) ? (_ngWeb.Url = value) : _ngWeb.Url;
            //},
            /**
            * @return {string}
            */
            var Url = function (value) {
                return angular.isDefined(value) ? (_ngWeb.Url = value) : _ngWeb.Url;
            };
            var WebTemplate = function (value) {
                return angular.isDefined(value) ? (_ngWeb.WebTemplate = value) : _ngWeb.WebTemplate;
            };
            var AllProperties = function () {
                var operator = _ngWeb.AllProperties.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            var AvailableFields = function () {
                var operator = _ngWeb.AvailableFields.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            var CurrentUser = function () {
                var operator = _ngWeb.CurrentUser.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            //this.Lists = ngList;

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

            var ParentWeb = function(){
                var operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            var RegionalSettings = function(){
                var operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            var RootFolder = function(){
                var operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            var ThemeInfo = function(){
                var operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            var Webs = function(){
                var operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            var WebInfos = function(){
                var operator = _ngWeb.Lists.__deferred.uri.split('/').pop();
                return GetDeferred(operator);
            };
            //this.Properties = function () {
            //    return _ngWeb;
            //}
            //var Properties = _ngWeb;
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

            var self = this;

            //var webid = angular.isDefined(value) ? ("(guid'"+value+"')") : "";
            if(ngSecurity.CurrentUser !== null) {
                API.get({EndPoint: ngSecurity.Endpoint}).$promise.then(
                    function (data) {
                        _ngWeb = data;
                        ngSecurity.CurrentWeb = _ngWeb;
                        self.Properties = _ngWeb;
                        deferred.resolve(self);
                    });
            }

            return deferred.promise;

        };

        return ngWeb;

  }]);
})();
