(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngFile', ['ngSecurity', '$resource', '$q', function (ngSecurity, $resource, $q) {

        var ngFile = {};

        var _ngFile = {
            "Author": {
                "__deferred": {
                    "uri": "/Author"
                }
            },
            "CheckedOutByUser": {
                "__deferred": {
                    "uri": "/CheckedOutByUser"
                }
            },
            "ListItemAllFields": {
                "__deferred": {
                    "uri": "/ListItemAllFields"
                }
            },
            "ModifiedBy": {
                "__deferred": {
                    "uri": "/ModifiedBy"
                }
            },
            "Properties": {
                "__deferred": {
                    "uri": "/Properties"
                }
            },
            "Versions": {
                "__deferred": {
                    "uri": "/Versions"
                }
            },
            "CheckInComment": "",
            "CheckOutType": 2,
            "Exists": true,
            "Length": "", //"20705",
            "Level": 1,
            "LinkingUrl": "", //https://duwboot.sharepoint.com/sites/BLAUD/Gedeelde  documenten/1. Algemeen/Inventarisatie klantgegevens.docx?d=w73c80a9758f14ed79f6df7099046940a",
            "MajorVersion": 7,
            "MinorVersion": 0,
            "Name": "",//"Inventarisatie klantgegevens.docx",
            "ServerRelativeUrl": "",// "/sites/BLAUD/Gedeelde  documenten/1. Algemeen/Inventarisatie klantgegevens.docx",
            "TimeCreated": "",
            "TimeLastModified": "",
            "Title": "",
            "UniqueId": ""
        };

        var API = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items(:Item)/File/:Deferred",
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

        ngFile = function () {

            var deferred = $q.defer();

            this.CheckInComment = function (value) {
                return angular.isDefined(value) ? (_ngFile.CheckInComment = value) : _ngFile.CheckInComment;
            };

            this.CheckOutType = function (value) {
                return angular.isDefined(value) ? (_ngFile.CheckOutType = value) : _ngFile.CheckOutType;
            };
            this.Exists = function (value) {
                return angular.isDefined(value) ? (_ngFile.Exists = value) : _ngFile.Exists;
            };
            this.Length = function (value) {
                return angular.isDefined(value) ? (_ngFile.Length = value) : _ngFile.Length;
            };
            this.CheckInComment = function (value) {
                return angular.isDefined(value) ? (_ngFile.CheckInComment = value) : _ngFile.CheckInComment;
            };
            this.Level = function (value) {
                return angular.isDefined(value) ? (_ngFile.Level = value) : _ngFile.Level;
            };
            this.LinkingUrl = function (value) {
                return angular.isDefined(value) ? (_ngFile.LinkingUrl = value) : _ngFile.LinkingUrl;
            };
            this.MajorVersion = function (value) {
                return angular.isDefined(value) ? (_ngFile.MajorVersion = value) : _ngFile.MajorVersion;
            };
            this.MinorVersion = function (value) {
                return angular.isDefined(value) ? (_ngFile.MinorVersion = value) : _ngFile.MinorVersion;
            };
            this.Name = function (value) {
                return angular.isDefined(value) ? (_ngFile.Name = value) : _ngFile.Name;
            };
            this.ServerRelativeUrl = function (value) {
                return angular.isDefined(value) ? (_ngFile.ServerRelativeUrl = value) : _ngFile.ServerRelativeUrl;
            };
            this.TimeCreated = function (value) {
                return angular.isDefined(value) ? (_ngFile.TimeCreated = value) : _ngFile.TimeCreated;
            };
            this.TimeLastModified = function (value) {
                return angular.isDefined(value) ? (_ngFile.TimeLastModified = value) : _ngFile.TimeLastModified;
            };
            this.Title = function (value) {
                return angular.isDefined(value) ? (_ngFile.Title = value) : _ngFile.Title;
            };
            this.UniqueId = function (value) {
                return angular.isDefined(value) ? (_ngFile.UniqueId = value) : _ngFile.UniqueId;
            };
            this.Author = function () {
                var Operator = _ngFile.Author.ContentType.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
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
            this.CheckedOutByUser = function () {
                var Operator = _ngFile.CheckedOutByUser.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
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
            this.ListItemAllFields = function () {
                var Operator = _ngList.ListItemAllFields.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
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
            this.ModifiedBy = function () {
                var Operator = _ngList.ModifiedBy.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
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
            this.Properties = function () {
                var Operator = _ngList.Properties.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
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
            this.Versions = function () {
                var Operator = _ngList.Versions.__deferred.uri.split('/').pop();
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
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
            };
            this.value = function () {
                var Operator = "$value";
                if (ngSecurity.CurrentUser !== null) {
                    API.deferred({
                        EndPoint: ngSecurity.Endpoint,
                        List: ngSecurity.CurrentList.Id,
                        Item: ngSecurity.CurrentItem.Id,
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
            };

            var self = this;

            if (ngSecurity.CurrentUser !== null) {
                API.get({
                    EndPoint: ngSecurity.Endpoint,
                    List: ngSecurity.CurrentList.Id,
                    Item: ngSecurity.CurrentItem.Id
                }).$promise.then(
                    function (data) {
                        _ngFile = data;
                        ngSecurity.CurrentFile = self;
                        self.Properties = _ngFile;
                        deferred.resolve(self);
                    });
            }

            return deferred.promise;

        };

        return ngFile;
    }]);

})();
