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
      var SignInUrl = null;
      var contextinfoUrl = null;

      var _contextinfo = {
          "FormDigestTimeoutSeconds": "",
          "FormDigestValue": null,
          "LibraryVersion": "",
          "SiteFullUrl": "",
          "SupportedSchemaVersions": "",
          "WebFullUrl": ""
      };

      var Configure = function(username, password, endpoint) {

          var deferred = $q.defer();

          Username = username;
          Password = password;
          Endpoint = endpoint;
          SignInUrl = 'https://' + Endpoint + '/_forms/default.aspx?wa=wsignin1.0';
          contextinfoUrl = 'https://' + Endpoint + '/_api/contextinfo';

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
              getBearerToken(data, SignInUrl).then(function (data) {
                  deferred.resolve(data);
              }, function (data) {
                  deferred.reject(data)
              })
          });

          return deferred.promise;
      };

      var Digest = function () {

      }

        var Security = {};
        Security.SetConfiguration = Configure; //function (onSucces, onError, username, password, endpoint) { $q.all([Configure(username, password, endpoint)]).then(onSucces, onError); };
        Security.GetContextWebInformation =  Digest;//function (onSucces, onError) { $q.all([Digest()]).then(onSucces, onError); };
        Security.GetSecurityInformation = Authenticate; //function (onSucces, onError) { $q.all([Authenticate()]).then(onSucces, onError); };
        Security.Endpoint = Endpoint;

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
            //};
        }

        function getBearerToken(result, url) {

            var deferred = $q.defer();

            var securityToken = angular.element(angular.element.parseXML(result)).find("BinarySecurityToken").text();

            if (securityToken.length == 0) {
                deferred.reject();
            }
            else {
                $http({
                    method: 'POST',
                    url: url,
                    data: securityToken,
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
        //function Configuration(username, password, endpoint) {

        //    var deferred = $q.defer();

        //    //angular.element.support.cors = true;
        //    Username = username;
        //    Password = password;
        //    Endpoint = endpoint;
        //    //RequestSecurityToken(Username, Password, Endpoint);

        //    return deferred.promise;
        //}

        //function ContextWebInformation() {

        //  var deferred = $q.defer();

        //  var contextinfo = $resource('https://:Endpoint/_api/contextinfo', {Endpoint : Endpoint},
        //    {
        //      update: {
        //        method: 'POST',
        //        headers: {
        //          'accept': 'application/json;odata=verbose',
        //          'content-type': 'application/json;odata=verbose'//,
        //          //'Access-Control-Allow-Origin': '*'
        //        }
        //      }
        //    });

        //  contextinfo.update().$promise
        //    .then(function (ctx) {
        //      deferred.resolve(ctx);
        //      console.log('Success: ' + ctx);
        //    }, function (reason) {
        //      if (reason.status == 403) {
        //        deferred.reject();
        //      }
        //      console.log('Failed: ' + reason);
        //    }, function (update) {
        //      console.log('Got notification: ' + update);
        //    });

        //  return deferred.promise;
        //}

      //function requestToken(callback) {
      //    function success() { alert("success"); };
      //    function fail() { alert("failed"); };
      //    //function takeText(text) {
      //        var sts = 'https://login.microsoftonline.com/extSTS.srf';
      //        var saml = SecurityInformationToken().toString();
      //        angular.element.support.cors = true;
      //        angular.element.ajax({
      //            url: sts,
      //            dataType: 'xml',
      //            type:'POST',
      //            data: saml,
      //            contentType: 'application/soap+xml; charset=utf-8',
      //            success: function(result, textStatus, jqXHR) {
      //                console.log('result ' + result);
                      
      //                var token = angular.element(jqXHR.responseText).find("wsse\\:BinarySecurityToken").text(),
      //                    options = { token: token, url: Endpoint };
      //                submitToken(options, callback);
      //            },
      //            error:function (response, textStatus, errorThrown){
      //                console.log(errorThrown+'error login:' + response.responseText);
      //            },
      //            complete:function(response, textStatus) {
      //                console.log('login completed ' + textStatus);
      //            }
      //        });
      //    //}
      //    //angular.element.ajax({
      //    //    url: "./SAML.xml",
      //    //    dataType: "text",
      //    //    success: takeText,
      //    //    error: fail
      //    //});
      //}

      //var buildSamlRequest = function (saml, params) {
      //    var key

      //    for (key in params) {
      //        saml = saml.replace('[' + key + ']', params[key]);
      //    }

      //    return saml;
      //};

      //function submitToken(params, callback) {
      //    //todo more generic url parsing!
      //    console.log(params.token);
      //    var token = params.token,
      //        url = "https://" + Endpoint + "/_layouts/Authenticate.aspx"; // '/_forms/default.aspx?wa=wsignin1.0';
      //    console.log(url);
      //    var xhr = new XMLHttpRequest();
      //    function onStateChange() {
      //        console.log("onStateChange");
      //        if (xhr.readyState == 4) {
      //            console.log("readyState = 4");
      //            if (xhr.status == 200) {
      //                console.log("status 200");
      //                //getAllResponseHeaders = function getAllResponseHeaders() { [native code] }
      //                //getResponseHeader = function getResponseHeader() { [native code] }
      //                var c = xhr.getResponseHeader('set-cookie');
      //                console.log("response header. set-cookie: " + c);
      //                console.log("responseText: " + xhr.responseText);
      //                //submitForm(xhr.responseText, callback);
      //            }
      //        }
      //    }

      //    xhr.open("POST", url, true);
      //    xhr.onreadystatechange = onStateChange;
      //    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8")
      //    //xhr.setRequestHeader("Accept", "application/x-www-form-urlencoded");
      //    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)');
      //    xhr.send(token);

      //    console.log('end wsignin' );
      //}

      //function SecurityInformation() {
      //    //var deferred = $q.defer();

      //    requestToken(null);

      //    //return deferred.promise;
      //}
      ///*
      //function SecurityInformation() {
      //    var signInurl = 'https://' + Endpoint + '/_forms/default.aspx?wa=wsignin1.0';
      //    var deferred = $q.defer();
      //    var message = SecurityInformationToken();

      //    $http({
      //        method: 'POST',
      //        url: 'https://login.microsoftonline.com/extSTS.srf',
      //        data: message,
      //        headers: {
      //            'Content-Type': "text/xml; charset=\"utf-8\""
      //        }
      //    }).success(function (data) {
      //        getBearerToken(data, signInurl).then(function (data) {
      //            deferred.resolve(data);
      //        }, function (data) {
      //            deferred.reject(data);
      //        })
      //    });

      //    return deferred.promise;
      //}
      //*/
      //function SecurityInformationToken() {

      //        var rst = new Array("");
      //        rst.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">');
      //        //Header
      //        rst.push('<s:Header>');
      //        rst.push('<a:Action s:mustUnderstand="1">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action>');
      //        rst.push('<a:ReplyTo>');
      //        rst.push('<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>');
      //        rst.push('</a:ReplyTo>');
      //        rst.push('<a:To s:mustUnderstand="1">https://login.microsoftonline.com/extSTS.srf</a:To>');
      //        rst.push('<o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">');
      //        rst.push('<o:UsernameToken>');
      //        rst.push('<o:Username>' + Username + '</o:Username>');
      //        rst.push('<o:Password>' + Password + '</o:Password>');
      //        rst.push('</o:UsernameToken>');
      //        rst.push('</o:Security>');
      //        rst.push('</s:Header>');
      //        //Body
      //        rst.push('<s:Body>');
      //        rst.push('<t:RequestSecurityToken xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">');
      //        rst.push('<wsp:AppliesTo xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy">');
      //        rst.push('<a:EndpointReference>');
      //        rst.push('<a:Address>' + Endpoint + '</a:Address>');
      //        rst.push('</a:EndpointReference>');
      //        rst.push('</wsp:AppliesTo>');
      //        //rst.push('<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>');
      //        rst.push('<t:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</t:KeyType>');
      //        rst.push('<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>');
      //        rst.push('<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>');
      //        rst.push('</t:RequestSecurityToken>');
      //        rst.push('</s:Body>');
      //        rst.push('</s:Envelope>');
      //        return rst.join("");
      //    //};
      //}

      //function getBearerToken(result, url) {

      //    var deferred = $q.defer();

      //    var securityToken = $($.parseXML(result)).find("BinarySecurityToken").text();

      //    if (securityToken.length == 0) {
      //        deferred.reject();
      //    }
      //    else {
      //        $http({
      //            method: 'POST',
      //            url: url,
      //            data: securityToken,
      //            headers: {
      //                Accept: "application/json;odata=verbose"
      //            }
      //        }).success(function (data) {
      //            deferred.resolve(data);
      //        }).error(function () {
      //            deferred.reject();
      //        });
      //    }

      //    return deferred.promise;
      //}
        /*
        function SecurityInformation() {

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
                            //'Access-Control-Allow-Origin': '*'
                        },
                        data: RequestSecurityToken_Issue(Username, Password, Endpoint).toString()
                    }
                });

            var deferred = $q.defer();
            extSTS.update().$promise
                .then(function (ctx) {
                    console.log('Success: ' + ctx);
                }, function (reason) {
                    console.log('Failed: ' + reason);
                }, function (update) {
                    console.log('Got notification: ' + update);
                });
          return deferred.promise;
        }
        */
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
                rst.push('<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>');
                //rst.push('<t:KeyType>http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer</t:KeyType>');
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
                    data: RequestSecurityToken_Issue(Username, Password, Endpoint).toString()
                }
            });
        */
        /*
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
