//if (typeof XMLHttpRequest == "undefined")
//    XMLHttpRequest = function () {
//        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
//        catch (e) {}
//        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
//        catch (e) {}
//        try { return new ActiveXObject("Microsoft.XMLHTTP"); }
//        catch (e) {}
//        //Microsoft.XMLHTTP points to Msxml2.XMLHTTP and is redundant
//        throw new Error("This browser does not support XMLHttpRequest.");
//    };

(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngSecurity', ['$timeout', '$http', '$resource', '$q', function ($timeout, $http, $resource, $q) {


        var Username = null;
        var Password = null;
        var Endpoint = null;
        var Hostname = null;
        var SignInUrl = null;
        var ContextInfoUrl = null;
        var CurrentUserUrl = null;

        var _SecurityToken = null;

        var _ContextInfo = {
            "FormDigestTimeoutSeconds": "",
            "FormDigestValue": null,
            "LibraryVersion": "",
            "SiteFullUrl": "",
            "SupportedSchemaVersions": "",
            "WebFullUrl": ""
        };

        var _CurrentUser = null;
        var _CurrentWeb = null;
        var _CurrentList = null;
        var _CurrentItem = null;
        var _CurrentFile = null;

        var Configure = function (username, password, endpoint) {

            var deferred = $q.defer();

            Username = username;
            Password = password;
            Endpoint = endpoint;
            var location = document.createElement("a");
            location.href = "https://" + endpoint;
            Hostname = location.hostname;

            SignInUrl = 'https://' + Hostname + '/_forms/default.aspx?wa=wsignin1.0';
            ContextInfoUrl = 'https://' + Hostname + '/_api/contextinfo';
            CurrentUserUrl = 'https://' + endpoint + '/_api/web/CurrentUser';

            deferred.resolve();

            return deferred.promise;
        }

        var Authenticate = function () {

            var deferred = $q.defer();
            var message = SecurityInformationToken();

            $http({
                method: 'POST',
                url: 'https://login.microsoftonline.com/extSTS.srf',
                data: message,
                headers: {
                    'content-type': 'application/soap+xml; charset=utf-8'
                    //'Content-Type': "text/xml; charset=\"utf-8\""
                }
            }).success(function (data) {

                Signin(data, SignInUrl).then(function (data) {
                    Security.Endpoint = Endpoint;
                    var doc = document.implementation.createHTMLDocument("homepage");
                    doc.documentElement.innerHTML = data;
                    Security.ContextInfo.FormDigestValue = doc.getElementById("__REQUESTDIGEST").value;
                    //$http.defaults.headers.common['X-RequestDigest'] = Security.ContextInfo.FormDigestValue;
                    GetCurrentUser(CurrentUserUrl).then(function (currentuser) {
                        Security.CurrentUser = currentuser;
                        //GetContextInfo(ContextInfoUrl).then(function(data){
                        //    var d = data;
                        //    deferred.resolve(this);
                        //});
                        deferred.resolve(currentuser);
                    });
                }, function (data) {
                    deferred.reject(data);
                });
            });

            return deferred.promise;
        };

        var Validate = function () {

            var deferred = $q.defer();

            GetContextInfo(ContextInfoUrl).then( function(contextinfo){
                Security.ContextInfo = contextinfo;
                deferred.resolve(this);
            });
            /*
              var contextinfo = $resource(ContextInfoUrl, {},
                {
                  update: {
                    method: 'POST',
                    headers: {
                      'accept': 'application/json;odata=verbose'//,
                      //'content-type': 'application/json;odata=verbose'
                    }
                  }
                });

              contextinfo.update().$promise
                .then(function (ctx) {
                    _ContextInfo = ctx;
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
               */
              return deferred.promise;
        };

        var Security = {};

        Security.SetConfiguration = Configure; //function (onSucces, onError, username, password, endpoint) { $q.all([Configure(username, password, endpoint)]).then(onSucces, onError); };
        Security.GetContextWebInformation = Validate;//function (onSucces, onError) { $q.all([Digest()]).then(onSucces, onError); };
        Security.GetSecurityInformation = Authenticate; //function (onSucces, onError) { $q.all([Authenticate()]).then(onSucces, onError); };
        Security.Endpoint = Endpoint;
        Security.ContextInfo = _ContextInfo;
        Security.CurrentUser = _CurrentUser;
        Security.CurrentWeb = _CurrentWeb;
        Security.CurrentList = _CurrentList;
        Security.CurrentItem = _CurrentItem;
        Security.CurrentFile = _CurrentFile;

        return Security;

        function SecurityInformationToken() {

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
            rst.push('<a:Address>' + Hostname + '</a:Address>');
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
            //};
        }

        function FormDigestInformationToken() {
            var fdit = new Array("");
            fdit.push('<?xml version="1.0" encoding="utf-8"?>');
            fdit.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd="http://www.w3.org/2001/XMLSchema&quot; xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
            fdit.push('<soap:Body>');
            fdit.push('<GetUpdatedFormDigestInformation xmlns="http://schemas.microsoft.com/sharepoint/soap/&quot; />');
            fdit.push('</soap:Body>');
            fdit.push('</soap:Envelope>');
            return fdit.join("");
        }

        function Signin(result, url) {
            var deferred = $q.defer();


            _SecurityToken = angular.element(angular.element.parseXML(result)).find("BinarySecurityToken").text();

            if (_SecurityToken.length == 0) {
                deferred.reject();
            }
            else {
                $http({
                    method: 'POST',
                    url: url,
                    data: _SecurityToken,
                    headers: {
                        Accept: "application/json;odata=verbose"
                    }
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
            }

            return deferred.promise;
        }

        function GetCurrentUser(url) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: url,
                headers: {
                    Accept: "application/json;odata=verbose"
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        function GetContextInfo(validated) {

            $http({
                url: ContextInfoUrl,//url + "/_api/contextinfo",
                async: true,
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "contentType": "text/xml"
                }
            }).then(function (response) {
                //Security.ContextInfo = response.data;
                validated(Security.ContextInfo.FormDigestValue);
            }, function (response) {
                alert("Cannot get digestValue.");
            });
            /*
            var deferred = $q.defer();

            $http.post(ContextInfoUrl, {
                data: FormDigestInformationToken(),
                headers: {
                    //"Accept": "application/json;odata=verbose",
                    "Content-Type": 'text/xml; charset="utf-8'
                },
            }).success(function (data) {
                //Resolve the FormDigestValue from the success callback.
                deferred.resolve(data);//.d.GetContextWebInformation.FormDigestValue);
            }).error(function () {
                deferred.reject("error finding form digest");
            });
            */
            /*
            angular.element.support.cors = true;
            angular.element.ajax({
                type: 'POST',
                data: FormDigestInformationToken(),
                crossDomain: true, // had no effect, see support.cors above
                contentType: 'text/xml; charset="utf-8"',
                url: url,//siteFullUrl + '/_api/contextinfo',
                dataType: 'xml',
                success: function (data, textStatus, result) {
                    var digest = angular.element(result.responseText).find("d\\:FormDigestValue").text();
                    //sendRESTReq();
                },
                error: function (result, textStatus, errorThrown) {
                    var response = JSON.parse(result.responseText);
                    if ((response.error !== undefined) && (response.error.message !== undefined)) {
                        alert(response.error.message.value);
                    }
                }
            });
            */
            /*
            $http({
                method: 'POST',
                //data: FormDigestInformationToken(),
                url: url,
                headers: {
                    'Content-Type' : 'text/xml; charset="utf-8"',
                    'Connection' : 'keep-alive'
                    //'Accept' : 'application/json;odata=verbose'//,
                    //'Content-Length' : 0
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            */
            //return deferred.promise;
        }
    }]);

})();
