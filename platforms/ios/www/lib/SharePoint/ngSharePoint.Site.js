(function () {
  'use strict';

  var SharePoint = angular.module('ngSharePoint');

  SharePoint.factory('ngSite', ['ngSecurity', 'ngWeb', '$resource', '$q', function (ngSecurity, ngWeb, $resource, $q) {
        var _ngSite = {
            "Features": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Site/Features"
            }
            },
            "RootWeb": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Site/RootWeb"
            }
            },
            "CompatibilityLevel": 15,
            "Id": "",
            "PrimaryUri": "",
            "ReadOnly": false,
            "ServerRelativeUrl": "",
            "Url": ""
        };

        var API = $resource('https://:EndPoint/_api/Site/:Deferred',
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
                }
            }
        );

        var ngSite = function (value) {

            this.prototype.CompatibilityLevel = function (value) {
                return angular.isDefined(value) ? (_ngSite.CompatibilityLevel = value) : _ngSite.CompatibilityLevel;
            };
            this.prototype.AlloIdwRssFeeds = function (value) {
                return angular.isDefined(value) ? (_ngSite.Id = value) : _ngSite.Id;
            };
            this.prototype.PrimaryUri = function (value) {
                return angular.isDefined(value) ? (_ngSite.PrimaryUri = value) : _ngSite.PrimaryUri;
            };
            this.prototype.ReadOnly = function (value) {
                return angular.isDefined(value) ? (_ngSite.ReadOnly = value) : _ngSite.ReadOnly;
            };
            this.prototype.ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngSite.ServerRelativeUrl = value) : _ngSite.ServerRelativeUrl;
            };
            this.prototype.Url = function (value) {
                return angular.isDefined(value) ? (_ngSite.Url = value) : _ngSite.Url;
            };
            this.prototype.Features = function(){
                API.Deferred = _ngWeb.Features.__deferred.uri.valueOf();
                API.EndPoint = _ngWeb.Features.__deferred.uri.valueOf();
                API.deferred().prototype.then(function (result) {
                    console.log(result);
                })
                return _ngWeb.Features.__deferred.uri.valueOf();
            };
            this.prototype.RootWeb = function(){
                return _ngWeb.RootWeb.__deferred.uri.valueOf();
            };
         };

        //ngSite.prototype = Object.create(ngSite);
        
        //var OpenSite = function(value){
        //    //return angular.isDefined(value) ? (_ngItem.Modified = value) : _ngItem.Modified;
        //    var site = API.deferred({EndPoint: '', List: '', Item: '', Deferred: ''});
        //    //var item = API.defered( ).then(function(result){ return result;});
        //    return site;
        //};
        
        //ngSite.prototype.constructor = OpenSite;

        return ngSite;
  }]);
})();
