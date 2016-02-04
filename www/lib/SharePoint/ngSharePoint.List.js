(function () {
  'use strict';

  var SharePoint = angular.module('ngSharePoint');

  SharePoint.factory('ngList', ['ngSecurity', 'ngItem', '$resource', '$q', function (ngSecurity, ngItem, $resource, $q) {

        var _ngList = {
            "DefaultView": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/DefaultView"
            }
            },
            "Fields": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Fields"
            }
            },
            "Forms": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Forms"
            }
            },
            "Items": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items"
            }
            },
            "ParentWeb": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/ParentWeb"
            }
            },
            "RootFolder": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/RootFolder"
            }
            },
            "Views": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Views"
            }
            },
            "AllowContentTypes": true,
            "BaseTemplate": 104,
            "BaseType": 0,
            "Created": "",
            "Description": "",
            "EnableAttachments": true,
            "EnableFolderCreation": false,
            "Id": "",
            "ImageUrl": "",
            "ItemCount": 0,
            "Title": ""
        };

        var API = $resource("https://:EndPoint/_api/Web/Lists(':List')/:Deferred",
            {},//{   EndPoint: '', List: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {   EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {   EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }                    
                },
                save: {
                    method: 'POST',
                    params: {   EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }                    
                }
            }
        );

        var CurrentList = null;

        var ngList = function (value, web) {

            this.Item = ngItem;

            var deferred = $q.defer();

            if( angular.isDefined(web)) { SharePoint.CurrentWeb = web; };

            this.AllowContentTypes = function (value) {
                return angular.isDefined(value) ? (_ngList.AllowContentTypes = value) : _ngList.AllowContentTypes;
            };
            this.BaseTemplate = function (value) {
                return angular.isDefined(value) ? (_ngList.BaseTemplate = value) : _ngList.BaseTemplate;
            };
            this.BaseType = function (value) {
                return angular.isDefined(value) ? (_ngList.BaseType = value) : _ngList.BaseType;
            };
            this.Created = function (value) {
                return angular.isDefined(value) ? (_ngList.Created = value) : _ngList.Created;
            };
            this.Description = function (value) {
                return angular.isDefined(value) ? (_ngList.Description = value) : _ngList.Description;
            };
            this.EnableAttachments = function (value) {
                return angular.isDefined(value) ? (_ngList.EnableAttachments = value) : _ngList.EnableAttachments;
            };
            this.EnableFolderCreation = function (value) {
                return angular.isDefined(value) ? (_ngList.EnableFolderCreation = value) : _ngList.EnableFolderCreation;
            };
            this.Id = function (value) {
                return angular.isDefined(value) ? (_ngList.Id = value) : _ngList.Id;
            };
            this.ImageUrl = function (value) {
                return angular.isDefined(value) ? (_ngList.ImageUrl = value) : _ngList.ImageUrl;
            };
            this.ItemCount = function (value) {
                return angular.isDefined(value) ? (_ngList.ItemCount = value) : _ngList.ItemCount;
            };
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngList.Title = value) : _ngList.Title;
            };
            this.DefaultView = function(){
                return  _ngList.DefaultView.__deferred.uri.valueOf();
            };
            this.Fields = function(){
                return  _ngList.Fields.__deferred.uri.valueOf();
            };
            this.Forms = function(){
                return  _ngList.Forms.__deferred.uri.valueOf();
            };
            this.Items = function(){
              return  _ngList.Items.__deferred.uri.valueOf();
            };
            this.ParentWeb = function(value){
                return angular.isDefined(value) ? (_ngList.ParentWeb = value) : _ngList.ParentWeb;
                //_ngList.ParentWeb = value;
                //return  _ngList.ParentWeb.__deferred.uri.valueOf();
            };
            this.RootFolder = function(){
                return  _ngList.RootFolder.__deferred.uri.valueOf();
            };
            this.Views = function(){
                API.deferred();
                return  _ngList.Views.__deferred.uri.valueOf();
            };

            var url = SharePoint.CurrentWeb.Url();
            ngSecurity.GetSecurityInformation().then(function () {
                API.get({ EndPoint: url, List : "guid'"+value+"'" }).$promise.then(
                    function (data) {
                        _ngList = data.d;
                    });
            });

            SharePoint.CurrentList = this;
            deferred.resolve(this);
            return deferred.promise;
        };


        return ngList;
  }]);
})();
