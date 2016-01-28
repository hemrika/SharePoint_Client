(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngWeb', ['ngSecurity', 'ngList', '$resource', '$q', function (ngSecurity, ngList, $resource, $q) {

        var _ngWeb = {
                "AllowRssFeeds": "",
                "Configuration": "",
                "Created": "",
                "CustomMasterUrl": "",
                "Description": "",
                "Id": "",
                "Language": "",
                "LastItemModifiedDate": "",
                "ServerRelativeUrl": "",
                "SyndicationEnabled": "",
                "SiteLogoUrl": "",
                "Title": "",
                "UIVersion": "",
                "Url": ""
            };

        var web = $resource('https://:EndPoint/_api/web',
            {   EndPoint: ''},
            {
                get: {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose'
                    }
                }
            }
            );

        var ngWeb = {
            //Security : ngSecurity,
            //List : ngList,

            AllowRssFeeds : function (value) {
                return angular.isDefined(value) ? (_ngWeb.AllowRssFeeds = value) : _ngWeb.AllowRssFeeds;
            },
            Configuration : function (value) {
                return angular.isDefined(value) ? (_ngWeb.Configuration = value) : _ngWeb.Configuration;
            },
            Created : function (value) {
                return angular.isDefined(value) ? (_ngWeb.Created = value) : _ngWeb.Created;
            },
            CustomMasterUrl : function (value) {
                return angular.isDefined(value) ? (_ngWeb.CustomMasterUrl = value) : _ngWeb.CustomMasterUrl;
            },
            Description : function (value) {
                return angular.isDefined(value) ? (_ngWeb.Description = value) : _ngWeb.Description;
            },
            Id : function (value) {
                return angular.isDefined(value) ? (_ngWeb.Id = value) : _ngWeb.Id;
            },
            Language : function (value) {
                return angular.isDefined(value) ? (_ngWeb.Language = value) : _ngWeb.Language;
            },
            LastItemModifiedDate : function (value) {
                return angular.isDefined(value) ? (_ngWeb.LastItemModifiedDate = value) : _ngWeb.LastItemModifiedDate;
            },
            ServerRelativeUrl : function (value) {
                return angular.isDefined(value) ? (_ngWeb.ServerRelativeUrl = value) : _ngWeb.ServerRelativeUrl;
            },
            SyndicationEnabled : function (value) {
                return angular.isDefined(value) ? (_ngWeb.SyndicationEnabled = value) : _ngWeb.SyndicationEnabled;
            },
            /**
             * @return {string}
             */
            Title : function (value) {
                return angular.isDefined(value) ? (_ngWeb.Title = value) : _ngWeb.Title;
            },
            /**
            * @return {boolean}
            */
            //TreeViewEnabled : function (value) {
            //    return angular.isDefined(value) ? (_ngWeb.TreeViewEnabled = value) : _ngWeb.TreeViewEnabled;
            //},
            /**
            * @return {int}
            */
            UIVersion : function (value) {
                return angular.isDefined(value) ? (_ngWeb.UIVersion = value) : _ngWeb.UIVersion;
            },
            //UIVersionConfigurationEnabled : function (value) {
            //    return angular.isDefined(value) ? (_ngWeb.UIVersionConfigurationEnabled = value) : _ngWeb.UIVersionConfigurationEnabled;
            //},
            /**
            * @return {string}
            */
            Url : function (value) {
                return angular.isDefined(value) ? (_ngWeb.Url = value) : _ngWeb.Url;
            },
            GetContextWebInformation : function (){
              return "";
            },
            GetDocumentLibraries : function (){
              return "";
            },
            GetFileByServerRelativeUrl : function (){
              return "";
            },
            GetFolderByServerRelativeUrl : function (){
              return "";
            },
            GetList : function (){
              //ngList
              return "";
            },
            AllProperties : function(){
              return "";
            },
            AvailableFields : function(){
              return "";
            },
            CurrentUser : function(){
              return "";
            },
            Lists : function(){
              return "";
            },
            ParentWeb : function(){
              return "";
            },
            RegionalSettings : function(){
              return "";
            },
            RootFolder : function(){
              return "";
            },
            ThemeInfo : function(){
              return "";
            },
            Webs : function(){
              return "";
            },
            OpenWeb : function(value) {
              var security = ngSecurity.GetContextWebInformation(value);
              console.log(security);
              /*
              .then(
                function (data) {
                  var context = data;
                web.get({ siteUrl:value}).$promise.then(
                  function (data) {
                    var d  = data;
                  }
                )})
              */
              //angular.isDefined(value) ? (_ngWeb.Title = value) : _ngWeb.Title;
              return this;
            }
        };

        return ngWeb;
  }]);
})();
