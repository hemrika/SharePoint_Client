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

        var API = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items(:Item)/:Deferred",
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

        var ngItem = function (Id) {

            var deferred = $q.defer();

            this.FileSystemObjectType = function (value) {
                return angular.isDefined(value) ? (_ngItem.FileSystemObjectType = value) : _ngItem.FileSystemObjectType;
            };
            this.Id = function (value) {
                return angular.isDefined(value) ? (_ngItem.Id = value) : _ngItem.Id;
            };
            this.ContentTypeId = function (value) {
                return angular.isDefined(value) ? (_ngItem.ContentTypeId = value) : _ngItem.ContentTypeId;
            };
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngItem.Title = value) : _ngItem.Title;
            };
            this.Modified = function (value) {
                return angular.isDefined(value) ? (_ngItem.Modified = value) : _ngItem.Modified;
            };
            this.Created = function (value) {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.Attachments = function() {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.GUID = function() {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.AttachmentFiles = function() {
                return  _ngList.AttachmentFiles.__deferred.uri.valueOf();
            };
            this.ContentType = function() {
                return  _ngList.ContentType.__deferred.uri.valueOf();
            };
            this.FieldValuesAsHtml = function() {
                return  _ngList.FieldValuesAsHtml.__deferred.uri.valueOf();
            };
            this.FieldValuesAsText = function() {
                return  _ngList.FieldValuesAsText.__deferred.uri.valueOf();
            };
            this.FieldValuesForEdit = function() {
                return  _ngList.FieldValuesForEdit.__deferred.uri.valueOf();
            };
            this.File = function() {
                return  _ngList.File.__deferred.uri.valueOf();
            };
            this.Folder = function() {
                return  _ngList.Folder.__deferred.uri.valueOf();
            };
            this.ParentList = function() {
                return  _ngList.ParentList.__deferred.uri.valueOf();
            };

            var self = this;

            if(ngSecurity.CurrentUser !== null) {
                API.get({ EndPoint: ngSecurity.Endpoint, List : ngSecurity.CurrentList.Id, Item : Id }).$promise.then(
                    function (data) {
                        _ngItem = data;
                        ngSecurity.CurrentItem = _ngItem;
                        self.Properties = _ngItem;
                        deferred.resolve(self);
                    });
            }

            return deferred.promise;
         };

        return ngItem;
  }]);
})();