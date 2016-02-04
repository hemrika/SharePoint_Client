(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngItem', ['ngSecurity', '$resource', '$q', function (ngSecurity, $resource, $q) {

        var _ngItem = {
            "AttachmentFiles": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/AttachmentFiles"
            }
            },
            "ContentType": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/ContentType"
            }
            },
            "FieldValuesAsHtml": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/FieldValuesAsHtml"
            }
            },
            "FieldValuesAsText": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/FieldValuesAsText"
            }
            },
            "FieldValuesForEdit": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/FieldValuesForEdit"
            }
            },
            "File": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/File"
            }
            },
            "Folder": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/Folder"
            }
            },
            "ParentList": {
            "__deferred": {
                "uri": "https://duwboot.sharepoint.com/_api/Web/Lists(guid'556d5d20-d16f-42c0-9b8c-58559d490981')/Items(1)/ParentList"
            }
            },
            "FileSystemObjectType": 0,
            "Id": 1,
            "ID": 1,
            "ContentTypeId": "",
            "Title": "",
            "Modified": "",
            "Created": "",
            "Attachments": false,
            "GUID": ""
        };

        var API = $resource("https://:EndPoint/_api/Web/Lists(:List)/Items(:Item)/:Deferred",
            {},//{ EndPoint: '', List: '', Item: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {   EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {   EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
            );

        var ngItem = function (value) {

            this.prototype.FileSystemObjectType = function (value) {
                return angular.isDefined(value) ? (_ngItem.FileSystemObjectType = value) : _ngItem.FileSystemObjectType;
            };
            this.prototype.Id = function (value) {
                return angular.isDefined(value) ? (_ngItem.Id = value) : _ngItem.Id;
            };
            this.prototype.ContentTypeId = function (value) {
                return angular.isDefined(value) ? (_ngItem.ContentTypeId = value) : _ngItem.ContentTypeId;
            };
            this.prototype.Title = function (value) {
                return angular.isDefined(value) ? (_ngItem.Title = value) : _ngItem.Title;
            };
            this.prototype.Modified = function (value) {
                return angular.isDefined(value) ? (_ngItem.Modified = value) : _ngItem.Modified;
            };
            this.prototype.Created = function (value) {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.prototype.Attachments = function() {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.prototype.GUID = function() {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.prototype.AttachmentFiles = function() {
                return  _ngList.AttachmentFiles.__deferred.uri.valueOf();
            };
            this.prototype.ContentType = function() {
                return  _ngList.ContentType.__deferred.uri.valueOf();
            };
            this.prototype.FieldValuesAsHtml = function() {
                return  _ngList.FieldValuesAsHtml.__deferred.uri.valueOf();
            };
            this.prototype.FieldValuesAsText = function() {
                return  _ngList.FieldValuesAsText.__deferred.uri.valueOf();
            };
            this.prototype.FieldValuesForEdit = function() {
                return  _ngList.FieldValuesForEdit.__deferred.uri.valueOf();
            };
            this.prototype.File = function() {
                return  _ngList.File.__deferred.uri.valueOf();
            };
            this.prototype.Folder = function() {
                return  _ngList.Folder.__deferred.uri.valueOf();
            };
            this.prototype.ParentList = function() {
                return  _ngList.ParentList.__deferred.uri.valueOf();
            };
         };

        //ngItem.prototype = Object.create(ngItem);
        
        //var OpenItem = function(value){
        //    //return angular.isDefined(value) ? (_ngItem.Modified = value) : _ngItem.Modified;
        //    var item = API.deferred({EndPoint: '', List: '', Item: '', Deferred: ''});
        //    //var item = API.defered( ).then(function(result){ return result;});
        //    return item;
        //};
        
        //ngItem.prototype.constructor = OpenItem

        return ngItem;
  }]);
})();