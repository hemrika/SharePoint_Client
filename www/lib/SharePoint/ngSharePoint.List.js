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

        var ngList = function (GUID) {

            var deferred = $q.defer();

            var AllowContentTypes = function (value) {
                return angular.isDefined(value) ? (_ngList.AllowContentTypes = value) : _ngList.AllowContentTypes;
            };
            var BaseTemplate = function (value) {
                return angular.isDefined(value) ? (_ngList.BaseTemplate = value) : _ngList.BaseTemplate;
            };
            var BaseType = function (value) {
                return angular.isDefined(value) ? (_ngList.BaseType = value) : _ngList.BaseType;
            };
            var Created = function (value) {
                return angular.isDefined(value) ? (_ngList.Created = value) : _ngList.Created;
            };
            var Description = function (value) {
                return angular.isDefined(value) ? (_ngList.Description = value) : _ngList.Description;
            };
            var EnableAttachments = function (value) {
                return angular.isDefined(value) ? (_ngList.EnableAttachments = value) : _ngList.EnableAttachments;
            };
            var EnableFolderCreation = function (value) {
                return angular.isDefined(value) ? (_ngList.EnableFolderCreation = value) : _ngList.EnableFolderCreation;
            };
            var Id = function (value) {
                return angular.isDefined(value) ? (_ngList.Id = value) : _ngList.Id;
            };
            var ImageUrl = function (value) {
                return angular.isDefined(value) ? (_ngList.ImageUrl = value) : _ngList.ImageUrl;
            };
            var ItemCount = function (value) {
                return angular.isDefined(value) ? (_ngList.ItemCount = value) : _ngList.ItemCount;
            };
            var Title = function (value) {
                return angular.isDefined(value) ? (_ngList.Title = value) : _ngList.Title;
            };
            var DefaultView = function(){
                return  _ngList.DefaultView.__deferred.uri.valueOf();
            };
            var Fields = function(){
                return  _ngList.Fields.__deferred.uri.valueOf();
            };
            var Forms = function(){
                return  _ngList.Forms.__deferred.uri.valueOf();
            };
            this.Items = function(value){

                if (angular.isDefined(value)) {
                    return new ngItem(value);
                }
                else {

                    var deferred = $q.defer();

                    var Operator = _ngList.Items.__deferred.uri.split('/').pop();
                    if (ngSecurity.CurrentUser !== null) {
                        API.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
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
            var ParentWeb = function(value){
                return angular.isDefined(value) ? (_ngList.ParentWeb = value) : _ngList.ParentWeb;
                //_ngList.ParentWeb = value;
                //return  _ngList.ParentWeb.__deferred.uri.valueOf();
            };
            var RootFolder = function(){
                return  _ngList.RootFolder.__deferred.uri.valueOf();
            };
            var Views = function(){
                return  _ngList.Views.__deferred.uri.valueOf();
            };

            var self = this;

            if(ngSecurity.CurrentUser !== null) {
                API.get({ EndPoint: ngSecurity.Endpoint, List : GUID }).$promise.then(
                    function (data) {
                        _ngList = data;
                        ngSecurity.CurrentList = _ngList;
                        self.Properties = _ngList;
                        deferred.resolve(self);
                    });
            }

            return deferred.promise;
        };


        return ngList;
  }]);
})();
