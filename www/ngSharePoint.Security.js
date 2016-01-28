(function () {
  'use strict';

  var SharePoint = angular.module('ngSharePoint');

  SharePoint.factory('ngSecurity', ['$timeout', '$http', '$resource', '$q', function ($timeout, $http, $resource, $q) {

        var Security = {};
        Security.SetConfiguration =  function (onSucces, onError, username, password, endpoint) { $q.all([Configuration(username, password, endpoint)]).then(onSucces, onError); };
        Security.GetContextWebInformation =  function (onSucces, onError) { $q.all([ContextWebInformation()]).then(onSucces, onError); };
        Security.GetSecurityInformation =  function (onSucces, onError) { $q.all([SecurityInformation()]).then(onSucces, onError); };

        return Security;

        var Username = null;
        var Password = null;
        var Endpoint = null;

        var _contextinfo = {
                "FormDigestTimeoutSeconds": "",
                "FormDigestValue": null,
                "LibraryVersion": "",
                "SiteFullUrl": "",
                "SupportedSchemaVersions": "",
                "WebFullUrl": ""
            };

        function Configuration(username, password, endpoint) {

          var deferred = $q.defer();

          Username = username;
          Password = password;
          Endpoint = endpoint;

          //RequestSecurityToken(Username, Password, Endpoint);

          return deferred.promise;
        }

        function FormDigestInformation() {

          var digest = new Array("");
          digest.push()
          digest.push('<?xml version="1.0" encoding="utf-8"?>');
          digest.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
          digest.push('<soap:Body>');
          digest.push('<GetUpdatedFormDigestInformation xmlns="http://schemas.microsoft.com/sharepoint/soap/" />');
          digest.push('</soap:Body>');
          digest.push('</soap:Envelope>');
          return digest.join("");
        }

        function ContextWebInformation() {

          var deferred = $q.defer();

          var contextinfo = $resource('https://:siteUrl/_api/contextinfo', { siteUrl: 'duwboot.sharepoint.com'},
            {
              update: {
                method: 'POST',
                headers: {
                  'accept': 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                  'Access-Control-Allow-Origin': '*'
                }
              }
            });

          contextinfo.update({siteUrl: Endpoint}).$promise
            .then(function (ctx) {
              deferred.resolve(ctx);
              console.log('Success: ' + ctx);
            }, function (reason) {
              if (reason.status == 403) {
                deferred.reject();
              }
              console.log('Failed: ' + reason);
            }, function (update) {
              console.log('Got notification: ' + update);
            });

          return deferred.promise;
        }

        function SecurityInformation() {

          var deferred = $q.defer();

          return deferred.promise;
        }
        /*
        var RequestSecurityToken_Issue = function (Username, Password, Endpoint) {

                var rst = new Array("");
                rst.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">');
                //Header
                rst.push('<s:Header>');
                rst.push('<a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>');
                rst.push('<a:ReplyTo>');
                rst.push('<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>');
                rst.push('</a:ReplyTo>');
                rst.push('<a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To>');
                rst.push('<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
                rst.push('<o:UsernameToken>');
                rst.push('<o:Username>' + Username + '</o:Username>');
                rst.push('<o:Password>' + Password + '</o:Password>');
                rst.push('</o:UsernameToken>');
                rst.push('</o:Security>');
                rst.push('</s:Header>');
                //Body
                rst.push('<s:Body>');
                rst.push('<t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">');
                rst.push('<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">');
                rst.push('<a:EndpointReference>');
                rst.push('<a:Address>' + Endpoint + '</a:Address>');
                rst.push('</a:EndpointReference>');
                rst.push('</wsp:AppliesTo>');
                //rst.push('<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>');
                rst.push('<t:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</t:KeyType>');
                rst.push('<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>');
                rst.push('<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>');
                rst.push('</t:RequestSecurityToken>');
                rst.push('</s:Body>');
                rst.push('</s:Envelope>');
                return rst.join("");
            };

        var extSTS = $resource('https://login.microsoftonline.com/extSTS.srf', null,
            {
                update: {
                    method: 'POST',
                    headers: {
                        //'accept': 'application/json;odata=verbose',
                        'content-type': 'application/soap+xml; charset=utf-8',
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: RequestSecurityToken_Issue('rutger.hemrika@blaud.com', 'rjm557308453!', 'duwboot.sharepoint.com').toString()
                }
            });

        var ngSecurity = {

            GetContextWebInformation : function (value) {
                var d = null;
                if(_contextinfo.FormDigestValue == null) {

                  contextinfo.update({siteUrl: value}).$promise
                    .then(function (ctx) {
                      console.log('Success: ' + ctx);
                    }, function (reason) {
                      if (reason.status == 403) {
                        //this.GetSecurityInformation(value);
                        extSTS.update().$promise
                          .then(function (ctx) {
                            console.log('Success: ' + ctx);
                          }, function (reason) {
                            console.log('Failed: ' + reason);
                          }, function (update) {
                            console.log('Got notification: ' + update);
                          });
                      }
                      //console.log('Failed: ' + reason);
                    }, function (update) {
                      console.log('Got notification: ' + update);
                    });
                }
                //contextinfo.update({ siteUrl : value }).$promise.then(
                //    function (data) {
                //        d  = data;
                //    }
                //);
                //angular.isDefined(value) ? (contextinfo.update({ siteUrl : value }).$promise) : contextinfo.update().$promise;

                return d;
            },
            GetSecurityInformation : function (value) {
                extSTS.update().$promise
                  .then(function (ctx) {
                    console.log('Success: ' + ctx);
                  }, function (reason) {
                  console.log('Failed: ' + reason);
                }, function (update) {
                  console.log('Got notification: ' + update);
                });
            },
            FormDigestTimeoutSeconds : function (value) {
                return angular.isDefined(value) ? (_contextinfo.FormDigestTimeoutSeconds = value) : _contextinfo.FormDigestTimeoutSeconds;
            },
            FormDigestValue : function (value) {
                return angular.isDefined(value) ? (_contextinfo.FormDigestValue = value) : _contextinfo.FormDigestValue;
            },
            LibraryVersion : function (value) {
                return angular.isDefined(value) ? (_contextinfo.LibraryVersion = value) : _contextinfo.LibraryVersion;
            },
            SiteFullUrl : function (value) {
                return angular.isDefined(value) ? (_contextinfo.SiteFullUrl = value) : _contextinfo.SiteFullUrl;
            },
            SupportedSchemaVersions : function (value) {
                return angular.isDefined(value) ? (_contextinfo.SupportedSchemaVersions = value) : _contextinfo.SupportedSchemaVersions;
            },
            WebFullUrl : function (value) {
                return angular.isDefined(value) ? (_contextinfo.WebFullUrl = value) : _contextinfo.WebFullUrl;
            }
        };

        return ngSecurity;
        */
    }]);

})();
