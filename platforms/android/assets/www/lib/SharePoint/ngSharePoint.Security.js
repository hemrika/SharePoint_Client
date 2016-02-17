(function () {
    'use strict';

    var SharePoint = angular.module('ngSharePoint');

    SharePoint.factory('ngSecurity', ['$timeout', '$http', '$resource', '$q', function ($timeout, $http, $resource, $q) {

        //region Properties

        /**
         *
         * @type {null}
         * @private
         */
        var _Username = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _Password = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _Endpoint = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _Hostname = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _SignInUrl = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _ContextInfoUrl = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentUserUrl = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _IdCrlUrl = null;
        //var realm = 'fbb85d4b-b9cc-445f-8b90-a2ea555b2841';
        //var SharePointPrincipal = '00000003-0000-0ff1-ce00-000000000000';

        /**
         *
         * @type {null}
         * @private
         */
        var _SecurityToken = null;

        /**
         *
         * @type {{FormDigestTimeoutSeconds: string, FormDigestValue: null, LibraryVersion: string, SiteFullUrl: string, SupportedSchemaVersions: string, WebFullUrl: string}}
         * @private
         */
        var _ContextInfo = {
            "FormDigestTimeoutSeconds": "",
            "FormDigestValue": null,
            "LibraryVersion": "",
            "SiteFullUrl": "",
            "SupportedSchemaVersions": "",
            "WebFullUrl": ""
        };

        var _Realm = {
            "State": 0,
            "UserState": 0,
            "Login": "",
            "NameSpaceType": "",
            "FederationBrandName": "",
            "TenantBrandingURL": ""
        };

        var _Branding = {
            "Locale": "",
            "BannerLogo": "",
            "Illustration": "",
            "TileLogo": ""
        };
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentUser = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentWeb = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentList = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentItem = null;
        /**
         *
         * @type {null}
         * @private
         */
        var _CurrentFile = null;

        /**
         *
         * @type {null}
         * @private
         */
        var _PostQueryUrl = null;

        //endregion

        /**
         *
         * @param username
         * @param password
         * @param endpoint
         * @returns {*}
         * @constructor
         */
        var Configure = function (username, password, endpoint) {

            var deferred = $q.defer();

            _Username = username;
            _Password = password;
            _Endpoint = endpoint;

            Security.Endpoint = endpoint;

            var location = document.createElement("a");
            location.href = "https://" + endpoint;
            _Hostname = location.hostname;

            _SignInUrl = 'https://' + _Hostname + '/_forms/default.aspx?wa=wsignin1.0';
            _ContextInfoUrl = 'https://' + _Hostname + '/_api/contextinfo';
            _CurrentUserUrl = 'https://' + _Hostname + '/_api/web/CurrentUser';
            _IdCrlUrl = 'https://' + _Hostname + '/_vti_bin/idcrl.svc/';
            _PostQueryUrl = 'https://' + _Hostname + '/_api/search/postquery';

            deferred.resolve();

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        var Authenticate = function () {

            var deferred = $q.defer();

            GetUserRealm().then(function (realm) {
                //console.log(realm);
                _Realm = realm;
                Security.Realm = _Realm;
                GetBranding().then( function (branding) {
                    //console.log(branding);
                    _Branding = branding;
                    Security.Branding = _Branding;

                    // region SharePoint Forms Login
                    /*
                    GetSecurityTokenService().then(function (token) {
                        //console.log(token);
                        _SecurityToken = angular.element(angular.element.parseXML(token)).find("BinarySecurityToken").text();
                        Security.SecurityToken = _SecurityToken;
                        console.log(_SecurityToken);

                        GetHttpCookies().then(function (page) {
                            console.log(page);

                            GetCurrentUser().then(function (user) {
                                console.log(user);
                                _CurrentUser = user;
                                Security.CurrentUser = _CurrentUser;
                                GetContextInfo().then(function(data){
                                    console.log(data);
                                    deferred.resolve(data);
                                }); //GetContextInfo
                            }); //GetCurrentUser
                        }); //GetHttpCookies
                    }); //GetSecurityTokenService
                    */
                    //endregion

                    //region IDentity Client Runtime Library service
                    
                    GetRemoteSecurityToken().then(function (token) {
                        //console.log(token);
                        _SecurityToken = angular.element(angular.element.parseXML(token)).find("BinarySecurityToken").text();
                        Security.SecurityToken = _SecurityToken;
                        //console.log(_SecurityToken);
                        GetSecurityCookie().then(function (cookie) {
                            //console.log(cookie);
                            GetCurrentUser().then(function (user) {
                                //console.log(user);
                                _CurrentUser = user;
                                Security.CurrentUser = _CurrentUser;
                                GetContextInfo().then(function(contextinfo){
                                    //console.log(contextinfo);
                                    _ContextInfo = contextinfo;
                                    Security.ContextInfo = _ContextInfo;
                                    //UpdateContextInfo().then(function () {
                                        deferred.resolve();
                                    //}); //UpdateContextInfo
                                }); //GetContextInfo
                            }); //GetCurrentUser
                        }); //GetSecurityCookie
                    }); //GetRemoteSecurityToken
                    
                    //endregion
                });
            });

            return deferred.promise;
        };

        /**
         *
         * @type {{}}
         */
        var Security = {};

        Security.SetConfiguration = Configure;
        Security.UpdateContextInfo = UpdateContextInfo;
        Security.Authenticate = Authenticate;
        Security.SetRealm = GetBearerRealm;
        Security.Endpoint = _Endpoint;
        Security.ContextInfo = _ContextInfo;
        Security.CurrentUser = _CurrentUser;
        Security.CurrentWeb = _CurrentWeb;
        Security.CurrentList = _CurrentList;
        Security.CurrentItem = _CurrentItem;
        Security.CurrentFile = _CurrentFile;
        Security.SecurityToken = _SecurityToken;
        Security.Realm = _Realm;
        Security.Branding = _Branding;

        return Security;

        //region SOAP Tokens

        /**
         * @return {string}
         */
        function SecurityTokenService() {

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
            rst.push('<o:Username>' + _Username + '</o:Username>');
            rst.push('<o:Password>' + _Password + '</o:Password>');
            rst.push('</o:UsernameToken>');
            rst.push('</o:Security>');
            rst.push('</s:Header>');
            //Body
            rst.push('<s:Body>');
            rst.push('<t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">');
            rst.push('<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">');
            rst.push('<a:EndpointReference>');
            rst.push('<a:Address>' + _Hostname + '</a:Address>');
            //rst.push('<a:Address>urn:federation:MicrosoftOnline</a:Address>');
            rst.push('</a:EndpointReference>');
            rst.push('</wsp:AppliesTo>');
            rst.push('<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>');
            //rst.push('<t:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</t:KeyType>');
            rst.push('<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>');
            rst.push('<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>');
            rst.push('</t:RequestSecurityToken>');
            rst.push('</s:Body>');
            rst.push('</s:Envelope>');
            return rst.join("").toString();
            //};
        }

        /**
         * @return {string}
         */
        function RemoteSecurityToken () {
            var rst = new Array("");
            rst.push('<?xml version="1.0" encoding="UTF-8"?>');
            rst.push('<S:Envelope xmlns:S="http://www.w3.org/2003/05/soap-envelope" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wsa="http://www.w3.org/2005/08/addressing" xmlns:wst="http://schemas.xmlsoap.org/ws/2005/02/trust">');
            //Header
            rst.push('<S:Header>');
            rst.push('<wsa:Action S:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</wsa:Action>');
            rst.push('<wsa:To S:mustUnderstand="1">https://login.microsoftonline.com/rst2.srf</wsa:To>');
            rst.push('<ps:AuthInfo xmlns:ps="http://schemas.microsoft.com/LiveID/SoapServices/v1" Id="PPAuthInfo">');
            rst.push('<ps:BinaryVersion>5</ps:BinaryVersion>');
            rst.push('<ps:HostingApp>Managed IDCRL</ps:HostingApp>');
            rst.push('</ps:AuthInfo>');
            rst.push('<wsse:Security>');
            rst.push('<wsse:UsernameToken wsu:Id="user">');
            rst.push('<wsse:Username>' + _Username + '</wsse:Username>');
            rst.push('<wsse:Password>' + _Password + '</wsse:Password>');
            rst.push('</wsse:UsernameToken>');
            /*
             rst.push('<wsu:Timestamp Id="Timestamp">');
             rst.push('<wsu:Created>$(([DateTime]::UtcNow.ToString("o")))</wsu:Created>');
             rst.push('<wsu:Expires>$(([DateTime]::UtcNow.AddDays(1).ToString("o")))</wsu:Expires>');
             rst.push('</wsu:Timestamp>');
             */
            rst.push('</wsse:Security>');
            rst.push('</S:Header>');
            //Body
            rst.push('<S:Body>');
            rst.push('<wst:RequestSecurityToken xmlns:wst="http://schemas.xmlsoap.org/ws/2005/02/trust" Id="RST0">');
            rst.push('<wst:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</wst:RequestType>');
            rst.push('<wsp:AppliesTo>');
            rst.push('<wsa:EndpointReference>');
            rst.push('<wsa:Address>sharepoint.com</wsa:Address>');
            //rst.push('<wsa:Address>' + _Hostname + '</wsa:Address>');
            rst.push('</wsa:EndpointReference>');
            rst.push('</wsp:AppliesTo>');
            rst.push('<wsp:PolicyReference URI="MBI"></wsp:PolicyReference>');
            rst.push('</wst:RequestSecurityToken>');
            rst.push('</S:Body>');
            rst.push('</S:Envelope>');
            return rst.join("").toString();
        }

        /**
         * @return {string}
         */
        function FormDigestInformationToken() {
            var fdit = new Array("");
            fdit.push('<?xml version="1.0" encoding="utf-8"?>');
            fdit.push('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:xsd="http://www.w3.org/2001/XMLSchema&quot; xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">');
            fdit.push('<soap:Body>');
            fdit.push('<GetUpdatedFormDigestInformation xmlns="http://schemas.microsoft.com/sharepoint/soap/&quot; />');
            fdit.push('</soap:Body>');
            fdit.push('</soap:Envelope>');
            return fdit.join("").toString();
        }

        //endregion

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetBearerRealm() {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                //async: true,
                url: "https://"+_Hostname+"/_vti_bin/client.svc/",
                //withCredentials: false,
                headers: {
                    "Authorization": "Bearer",
                    "Accept": "application/json;odata=verbose"
                }
            }).then(function (response) {
                var bearer = response.headers()['WWW-Authenticate'];
                deferred.resolve(bearer);
            }, function(response) {
                var bearer = response.headers()['WWW-Authenticate'];
                deferred.resolve(bearer);
                $scope.data = response.data || "Request failed";
                $scope.status = response.status;
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetUserRealm() {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                //withCredentials: false,
                url: "https://login.microsoftonline.com/GetUserRealm.srf?xml=0&login=" + _Username,
                headers: {
                    "Accept": "application/json;odata=verbose"
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        function GetBranding() {
            var deferred = $q.defer();

            if (_Realm === null || _Realm.TenantBrandingURL === null) {
                deferred.reject();
            }

            $http({
                method: 'GET',
                url: _Realm.TenantBrandingURL.valueOf(),
                headers: {
                    "Accept": "application/json;odata=verbose"
                    //"Content-Type": "application/json;odata=verbose"
                }
            }).success(function (data) {
                var branding = data;
                //var branding = JSON.parse(data)[0];
                deferred.resolve(branding);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetSecurityTokenService() {
            var deferred = $q.defer();
            var message = SecurityTokenService();

            $http({
                method: 'POST',
                url: 'https://login.microsoftonline.com/extSTS.srf',
                data: message,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    'Content-Type': 'application/soap+xml; charset=utf-8'
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetRemoteSecurityToken() {
            var deferred = $q.defer();
            var message = RemoteSecurityToken();

            $http({
                method: 'POST',
                url: 'https://login.microsoftonline.com/rst2.srf',
                data: message,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    'Content-Type': 'application/soap+xml; charset=utf-8'
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        //IDentity Client Runtime Library service
        /**
         *
         * @returns {*}
         * @constructor
         */
        function  GetSecurityCookie() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: _IdCrlUrl,
                //withCredentials: true,
                cache: false,
                headers: {
                    //Accept : 'text/plain',
                    'Content-Type' : 'text/plain',//'application/x-www-form-urlencoded',
                    'Authorization' : 'BPOSIDCRL '+ _SecurityToken
                }
            }).success(function (data) {
                //$http.defaults.headers.common.Authorization = undefined;
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            //$http.defaults.headers.common.Authorization = 'BPOSIDCRL '+ _SecurityToken;
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetHttpCookies() {
            var deferred = $q.defer();

            if (_SecurityToken.length === 0) {
                deferred.reject();
            }
            else {
                $http({
                    method: 'POST',
                    //withCredentials: true,
                    url: _SignInUrl,
                    data: _SecurityToken,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'//,
                        //Accept: "application/json;odata=verbose"
                    }
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetCurrentUser() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                //withCredentials: false,
                url: _CurrentUserUrl,
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

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetContextInfo() {

            var deferred = $q.defer();

            if (_SecurityToken.length == 0) {
                deferred.reject();
            }
            var message = FormDigestInformationToken();

            $http({
                url: _ContextInfoUrl,
                method: "POST",
                //withCredentials: false,
                data: message,
                headers: {
                    'Content-Type': 'text/xml; charset="utf-8"'
                }
            }).success(function (response) {
                //Security.ContextInfo = response.data;
                deferred.resolve(response);
                //validated(Security.ContextInfo.FormDigestValue);
            }, function (response) {
                //console.log("Cannot get digestValue.");
                deferred.reject();
            });
            return deferred.promise;
        }

        function UpdateContextInfo() {

            var deferred = $q.defer();

            if (_SecurityToken.length == 0) {
                deferred.reject();
            }
            var message = FormDigestInformationToken();

            $http({
                url: _ContextInfoUrl,
                method: "POST",
                data: message,
                headers: {
                    'Content-Type': 'text/xml; charset="utf-8"'
                }
            }).success(function (ContextInfo) {
                _ContextInfo = ContextInfo;
                Security.ContextInfo = _ContextInfo;

                //setTimeout(function () {
                //   UpdateContextInfo();
                //}
                //, _ContextInfo.FormDigestTimeoutSeconds);

                deferred.resolve();
            }, function (response) {
                deferred.reject();
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         * @constructor
         */
        function GetPostQuery() {

            var deferred = $q.defer();

            $http({

                url: _PostQueryUrl,
                method: "POST",
                //withCredentials: false,
                data: null,
                headers: {
                    //'X-FORMS_BASED_AUTH_ACCEPTED' : 'f',
                    //'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose'
                }
            }).success(function (response) {
                //Security.ContextInfo = response.data;
                deferred.resolve(response);
                //validated(Security.ContextInfo.FormDigestValue);
            }, function (response) {
                //console.log("Cannot get digestValue.");
                deferred.reject();
            });
            return deferred.promise;


        }
    }]);

})();

//region Old Code / Tests

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
//endregion