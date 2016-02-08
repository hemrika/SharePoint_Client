(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngItem', ['ngSecurity', 'ngFile', /*'ngFolder',*/ '$resource', '$q', function (ngSecurity, ngFile, /*ngFolder,*/ $resource, $q) {

        var _ngItem = {
            "AttachmentFiles": {
                "__deferred": {
                    "uri": "/AttachmentFiles"
                }
            },
            "ContentType": {
                "__deferred": {
                    "uri": "/ContentType"
                }
            },
            "FieldValuesAsHtml": {
                "__deferred": {
                    "uri": "/FieldValuesAsHtml"
                }
            },
            "FieldValuesAsText": {
                "__deferred": {
                    "uri": "/FieldValuesAsText"
                }
            },
            "FieldValuesForEdit": {
                "__deferred": {
                    "uri": "/FieldValuesForEdit"
                }
            },
            "File": {
                "__deferred": {
                    "uri": "/File"
                }
            },
            "Folder": {
                "__deferred": {
                    "uri": "/Folder"
                }
            },
            "ParentList": {
                "__deferred": {
                    "uri": "/ParentList"
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

        var _item = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items(:Item)/:Deferred",
            {},//{ EndPoint: '', List: '', Item: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        var _items = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items",
            {},//{ EndPoint: '', List: '', Item: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                create: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                delete: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Item: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        var ngItem = function (value) {

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
            this.Attachments = function () {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.GUID = function () {
                return angular.isDefined(value) ? (_ngItem.Created = value) : _ngItem.Created;
            };
            this.AttachmentFiles = function (value) {

                if (angular.isDefined(value)) {
                    return new ngFile(value);
                }
                else {

                    var deferred = $q.defer();

                    var Operator = _ngItem.AttachmentFiles.__deferred.uri.split('/').pop();
                    if (ngSecurity.CurrentUser !== null) {
                        _item.deferred({
                            EndPoint: ngSecurity.Endpoint,
                            List: ngSecurity.CurrentList.Id(),
                            Item: _ngItem.Id,
                            Deferred: Operator
                        }).$promise.then(
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
            this.ContentType = function () {
                var Operator = _ngItem.ContentType.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({EndPoint: ngSecurity.Endpoint, List: ngSecurity.CurrentList.Id(), Item: _ngItem.Id, Deferred: Operator}).$promise.then(
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
            this.FieldValuesAsHtml = function () {
                var Operator = _ngItem.FieldValuesAsHtml.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Item: _ngItem.Id, Deferred: Operator}).$promise.then(
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
            this.FieldValuesAsText = function () {
                var Operator = _ngItem.FieldValuesAsText.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({EndPoint: ngSecurity.Endpoint, List: ngSecurity.CurrentList.Id(), Item: _ngItem.Id, Deferred: Operator}).$promise.then(
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
            this.FieldValuesForEdit = function () {
                var Operator = _ngItem.FieldValuesForEdit.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({EndPoint: ngSecurity.Endpoint, List: ngSecurity.CurrentList.Id(), Item: _ngItem.Id, Deferred: Operator}).$promise.then(
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
            this.File = function () {

                return new ngFile();
                /*
                 var Operator = _ngList.File.__deferred.uri.split('/').pop();
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
                 */
            };
            this.Folder = function () {

                var Operator = _ngItem.Folder.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({EndPoint: ngSecurity.Endpoint, List: ngSecurity.CurrentList.Id(), Item: _ngItem.Id, Deferred: Operator}).$promise.then(
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
            this.ParentList = function () {
                var Operator = _ngItem.ParentList.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _item.deferred({EndPoint: ngSecurity.Endpoint, List: ngSecurity.CurrentList.Id(), Item: _ngItem.Id, Deferred: Operator}).$promise.then(
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
                if(angular.isDefined(value)){
                    _item.deferred({EndPoint: ngSecurity.Endpoint, List: ngSecurity.CurrentList.Id(), Item: value}).$promise.then(
                        function (data) {
                            _ngItem = data;
                            ngSecurity.CurrentItem = self;
                            self.Properties = _ngItem;
                            deferred.resolve(self);
                        });
                }
                else {
                    _items.get({EndPoint: ngSecurity.Endpoint, List: ngSecurity.CurrentList.Id()}).$promise.then(
                        function (data) {
                            if (angular.isDefined(data.results)) {
                                deferred.resolve(data.results);
                            }
                            else {
                                deferred.resolve(data);
                            }
                        });
                }
            }

            return deferred.promise;
        };

        return ngItem;
    }]);
})();