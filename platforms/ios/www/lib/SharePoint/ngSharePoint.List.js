(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngList', ['ngSecurity', 'ngItem', '$resource', '$q', '$http', function (ngSecurity, ngItem, $resource, $q, $http) {

        var _ngList = {
            "DefaultView": {
                "__deferred": {
                    "uri": "/DefaultView"
                }
            },
            "Fields": {
                "__deferred": {
                    "uri": "/Fields"
                }
            },
            "Forms": {
                "__deferred": {
                    "uri": "/Forms"
                }
            },
            "Items": {
                "__deferred": {
                    "uri": "/Items"
                }
            },
            "ParentWeb": {
                "__deferred": {
                    "uri": "/ParentWeb"
                }
            },
            "RootFolder": {
                "__deferred": {
                    "uri": "/RootFolder"
                }
            },
            "Views": {
                "__deferred": {
                    "uri": "/Views"
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

        //var FormDigestValue = ngSecurity.ContextInfo.FormDigestValue;
        //var SecurityToken = undefined;

        var _list = $resource("https://:EndPoint/_api/Web/Lists(':List')/:Deferred",
            {},//{   EndPoint: '', List: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                deferred: {
                    method: 'GET',
                    params: {EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                },
                save: {
                    method: 'POST',
                    params: {EndPoint: '', List: '', Deferred: ''},
                    headers: {
                        'Accept' : 'application/json;odata=verbose',
                        //'X-RequestDigest': FormDigestValue,
                        'Content-Type': 'application/json;odata=verbose'
                    }
                }
            }
        );
        //var _items = $resource("https://:EndPoint/_api/Web/Lists(':List')/items",
        //    {},
        //    {
        //        add: {
        //            method: 'POST',
        //            params: {EndPoint: ''},
        //            headers: {
        //                'Accept': 'application/json;odata=verbose',
        //                'content-type': 'application/json;odata=verbose'
        //            }
        //        }
        //    }
        //);

        var Methods = $resource("https://:EndPoint/_api/Web/Lists/:Deferred",
            {},//{   EndPoint: '', List: '', Deferred: ''},
            {
                get: {
                    method: 'GET',
                    params: {EndPoint: '', Deferred: ''},
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
        );

        var ngList = function (identifier) {

            var deferred = $q.defer();

            this.AllowContentTypes = function (property) {
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
            this.DefaultView = function () {
                return _ngList.DefaultView.__deferred.uri.valueOf();
            };
            this.Fields = function () {
                return _ngList.Fields.__deferred.uri.valueOf();
            };
            this.Forms = function () {
                return _ngList.Forms.__deferred.uri.valueOf();
            };

            this.Items = function (value) {

                return new ngItem(value);
                /*
                 if (angular.isDefined(value)) {
                 return new ngItem(value);
                 }
                 else {

                 var deferred = $q.defer();

                 var Operator = _ngList.Items.__deferred.uri.split('/').pop();
                 if (ngSecurity.CurrentUser !== null) {
                 API.deferred({
                 EndPoint: ngSecurity.Endpoint,
                 List: _ngList.Id,
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
                 */
            };
            this.NewItem = function () {
                return ngItem();
            };
            this.AddItem = function (value) {

                var deferred = $q.defer();
                
                var item = { __metadata: { type : 'SP.Data.CordovaListItem' }, Title: 'IDentity Client Runtime Library service' };
                /*
                var item = {
                    '__metadata': {
                        'type': 'SP.CordovaListItem'
                    },
                    'Title' : 'IDentity Client Runtime Library service'
                };
                */

                ngSecurity.UpdateContextInfo().then(function () {
                    //FormDigestValue = ngSecurity.ContextInfo.FormDigestValue;
                    //SecurityToken = ngSecurity.SecurityToken;
                    //var message = JSON.stringify(item);
                    /*
                    var url = "https://" + ngSecurity.Endpoint + "/_api/Web/Lists('" + _ngList.Id + "')/Items";
                    $http({
                        method: 'POST',
                        //withCredentials: false,
                        url: url,
                        data: item,
                        headers: {
                            'Accept' : 'application/json;odata=verbose',
                            'X-RequestDigest': FormDigestValue,
                            'Content-Type': 'application/json;odata=verbose'
                        }
                    }).success(function (data) {
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.reject();
                    });
                    */

                    _list.save({
                        EndPoint: ngSecurity.Endpoint,
                        List: _ngList.Id, Deferred: 'Items'
                    }, item).$promise.then(function (result) {
                        //console.log(result);
                        deferred.resolve(result);
                        //return result;
                        //console.log(result);
                    });

                });
                return deferred.promise;
            };
            /*
             this.Item = function (value) {

             var result = null;
             if (angular.isDefined(value)) {
             result = new ngItem(value);
             }
             else {
             result = ngItem();
             }

             return result;
             };
             */
            this.GetItemById = function (value) {

                return new ngItem(value);
                /*
                 var Operator = "GetItemById('" + value + "')";
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
            this.GetItems = function () {
                return new ngItem();
            };
            this.ParentWeb = function (value) {
                var deferred = $q.defer();

                var Operator = _ngList.ParentWeb.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
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

                var Operator = _ngList.RootFolder.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
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
            this.Views = function () {
                var deferred = $q.defer();

                var Operator = _ngList.Views.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
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
            this.GetView = function (value) {
                var deferred = $q.defer();

                var Operator = "GetView('" + value + "')";
                if (ngSecurity.CurrentUser !== null) {
                    _list.deferred({EndPoint: ngSecurity.Endpoint, List: _ngList.Id, Deferred: Operator}).$promise.then(
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

            var isGUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);

            if (ngSecurity.CurrentUser !== null) {
                if (isGUID) {
                    _list.get({EndPoint: ngSecurity.Endpoint, List: identifier}).$promise.then(
                        function (data) {
                            _ngList = data;
                            ngSecurity.CurrentList = self;
                            self.Properties = _ngList;
                            deferred.resolve(self);
                        });
                }
                else {
                    Methods.get({
                        EndPoint: ngSecurity.Endpoint,
                        Deferred: "getbytitle('" + identifier + "')"
                    }).$promise.then(
                        function (data) {
                            _ngList = data;
                            ngSecurity.CurrentList = self;
                            self.Properties = _ngList;
                            deferred.resolve(self);
                        });
                }
            }

            return deferred.promise;
        };

        return ngList;
    }]);
})();
