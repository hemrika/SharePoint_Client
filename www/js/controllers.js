﻿angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, SharePoint) {
        // Form data for the login modal
        $scope.loginData = {};

        $scope.loginData = {
            domain: 'duwboot.sharepoint.com/sites/BLAUD',
            username: 'rutger.hemrika@blaud.com',
            password: 'rjm557308453!'
        }
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            //console.log('Doing login', $scope.loginData);
            SharePoint.Security.SetConfiguration($scope.loginData.username, $scope.loginData.password, $scope.loginData.domain).then(function () {
                SharePoint.Security.GetSecurityInformation().then(function () {
                    $scope.closeLogin();
                    $state.go($state.current, {}, {reload: true});
                });
            });
        };
    })
    .controller('WelcomeCtrl', function ($scope, SharePoint) {


    })
    .controller('UserCtrl', function ($scope, $state, $stateParams, SharePoint) {
        if (SharePoint.CurrentUser === null) {
            $scope.login();
        }
        else {
            $scope.CurrentUser = SharePoint.CurrentUser();
        }
    })
    .controller('ListsCtrl', function ($scope, $stateParams, SharePoint) {

        if (SharePoint.CurrentWeb() !== null) {
            SharePoint.Web().then(function (web) {
                web.Lists().then(function (Lists) {
                    $scope.Web = web.Properties;
                    $scope.Web.Lists = Lists;
                });
            });
        }
    })
    .controller('ListCtrl', function ($scope, $stateParams, SharePoint) {

        if (SharePoint.CurrentWeb() !== null) {
            SharePoint.Web().then(function (web) {
                web.Lists($stateParams.listId).then(function (List) {
                    $scope.Web = web.Properties;
                    $scope.Web.List = List.Properties;
                });
            });
        }
    })
    .controller('ItemsCtrl', function ($scope, $stateParams, SharePoint) {

        if (SharePoint.CurrentWeb() !== null) {
            SharePoint.Web().then(function (web) {
                web.Lists($stateParams.listId).then(function (List) {
                    List.Items().then(function (Items) {
                        $scope.Web = web.Properties;
                        $scope.Web.List = List.Properties;
                        $scope.Web.List.Items = Items;
                    });
                });
            });
        }
    })
    .controller('ItemCtrl', function ($scope, $stateParams, SharePoint) {

        if (SharePoint.CurrentWeb() !== null) {
            SharePoint.Web().then(function (web) {
                web.Lists($stateParams.listId).then(function (List) {
                    List.Items($stateParams.itemId).then(function (item) {
                        $scope.Web = web.Properties;
                        $scope.Web.List = List.Properties;
                        $scope.Web.List.Item = item.Properties;
                    });
                });
            });
        }
    })
    .controller('WebCtrl', function ($scope, $stateParams, SharePoint) {

        if (SharePoint.CurrentWeb() === null) {
            SharePoint.Web().then(function (web) {
                $scope.Web = web.Properties;
                //$scope.Web = SharePoint.CurrentWeb();
            });
        }
        else {
            $scope.Web = SharePoint.CurrentWeb();
        }
    })
    .controller('CordovaCtrl', function ($scope, $stateParams, SharePoint) {

        if (SharePoint.CurrentWeb() !== null) {
            SharePoint.Web().then(function (web) {
                web.Lists('Cordova').then(function (List) {
                    List.Items.Add(1).then(function (Item) {
                        console.log(Item.Id());
                    });
                    /*
                    List.Items().then(function (Items) {
                        console.log(Items.length);
                        $scope.Web = web.Properties;
                        $scope.Web.List = List.Properties;
                        $scope.Web.List.Items = Items;
                    });
                    */
                });
                //$scope.Web = web.Properties;
                //$scope.Web = SharePoint.CurrentWeb();
            });
        }
    });