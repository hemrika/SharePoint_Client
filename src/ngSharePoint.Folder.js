(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngFolder', ['ngSecurity', 'ngFile', '$resource', '$q', '$http', function (ngSecurity, ngFile, $resource, $q, $http) {

        var _ngFolder = {Folder: []};

        //region REST resource

        var API = $resource("https://:EndPoint/_api/Web/Lists(guid':List')/Items(:Item)/Folder/:Deferred",
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

        //endregion

        //region Folder

        var ngFolder = function () {
            var deferred = $q.defer();

            //region Get Folder
            var self = this;

            if (ngSecurity.CurrentUser !== null) {
                API.get({
                    EndPoint: ngSecurity.Endpoint,
                    List: ngSecurity.CurrentList.Id,
                    Item: ngSecurity.CurrentItem.Id
                }).$promise.then(
                    function (data) {
                        _ngFolder = data;
                        ngSecurity.CurrentFile = self;
                        self.Properties = _ngFolder;
                        deferred.resolve(self);
                    });
            }

            //endregion

            return deferred.promise;
        };

        //endregion

        return ngFolder;
    }]);
})();
