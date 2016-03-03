(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngItem', ['ngSecurity', 'ngFile', /*'ngFolder',*/ '$resource', '$q', function (ngSecurity, ngFile, /*ngFolder,*/ $resource, $q) {

        var ngItem = {};

        var _ngItem = {
            "__metadata": {
                "type": "type':SP.listnameListItem"
            },
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
            {},
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
                    params: {EndPoint: '', List: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
            );

        ngItem = function (identifier) {

            //if (angular.isDefined(this)) {

                var deferred = $q.defer();

                if (!ngSecurity.Authenticated) {
                    deferred.reject("Not Authenticated");
                }

                //region Properties

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

                //endregion

                //region Deferred

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
                                List: ngSecurity.CurrentList.Properties.Id,
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
                };

                this.FieldValuesAsHtml = function () {
                    var Operator = _ngItem.FieldValuesAsHtml.__deferred.uri.split('/').pop();
                    if (ngSecurity.CurrentUser !== null) {
                        _item.deferred({
                            EndPoint: ngSecurity.Endpoint,
                            List: _ngList.Id,
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
                };

                this.FieldValuesAsText = function () {
                    var Operator = _ngItem.FieldValuesAsText.__deferred.uri.split('/').pop();
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
                };

                this.FieldValuesForEdit = function () {
                    var Operator = _ngItem.FieldValuesForEdit.__deferred.uri.split('/').pop();
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
                };

                this.ParentList = function () {
                    var Operator = _ngItem.ParentList.__deferred.uri.split('/').pop();
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
                };

                //endregion

                //region Methods

                //this.NewItem = NewItem;
                //endregion

                //region Get ListItem by GUID or by Title ( case sensitive )

                this.File = ngFile;

                var self = this;

                var isId = /^\d+$/.test(identifier);

            ngSecurity.CurrentList.Fields().then(function(fields){

                var FormFields = [];

                //fields.forEach(function(field) {
                //    if(!field.Hidden && !field.ReadOnlyField) { FormFields.push(field);};
                //    //console.log(field);
                //});

                console.log(FormFields);
                //console.log(fields);
                if (isId) {
                    _item.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Properties.Id,
                        Item: identifier
                    }).$promise.then(
                        function (data) {

                            fields.forEach(function(field) {
                                if(!field.Hidden && !field.ReadOnlyField || field.Required) {
                                    field.Value = data[field.EntityPropertyName];
                                    FormFields.push(field);
                                }
                                //console.log(field);
                            });
                            self.Fields = FormFields;

                            _ngItem = data;
                            self.Properties = _ngItem;
                            ngSecurity.CurrentItem = self;
                            deferred.resolve(self);
                        });
                }
                else {
                    var listId = ngSecurity.CurrentList.Properties.Id;
                    self.Properties = _ngItem;
                    deferred.resolve(self);
                }
            });
                /*
                    _items.get({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Properties.Id
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
                */

                function NewItem(){
                    ngSecurity.CurrentList.Fields().then( function(Fields){
                        console.log(Fields);
                    });
                    //return "";
                }

                return deferred.promise;
            /*
            }
            else {
                var new_item = _ngItem;
                var type = new_item.__metadata.type.valueOf();
                type =  type.replace('listname', ngSecurity.CurrentList.Title());
                new_item.__metadata.type = type;
                return new_item;
            }
            */
        };

        return ngItem;
    }]);
})();