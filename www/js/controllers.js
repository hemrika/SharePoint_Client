angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, $state, SharePoint) {
        // Form data for the login modal
        $scope.loginData = {};

        $scope.loginData = {
            domain: 'duwboot.sharepoint.com/sites/BLAUD',
            username: 'rutger.hemrika@blaud.com',
            password: '',
            FormDigest: SharePoint.Security.ContextInfo.FormDigestValue
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
            SharePoint.Security.SetConfiguration($scope.loginData.username, $scope.loginData.password, $scope.loginData.domain).then(function () {

                SharePoint.Security.Authenticate().then(function () {
                    if(SharePoint.CurrentUser !== null) {
                        $scope.loginData.FormDigest = SharePoint.Security.ContextInfo.FormDigestValue;
                        $scope.closeLogin();

                        /*
                        var alertPopup = $ionicPopup.alert({
                            title: 'FormDigest',
                            template: SharePoint.Security.ContextInfo.FormDigestValue
                        });

                        alertPopup.then(function ( result) {
                            $state.go($state.current, {}, {reload: true});
                        });
                        */
                        $state.go('app.user', {}, {reload: true} );
                        //$state.go($state.current, {}, {reload: true});
                    }
                });
            });
        };
    })
    .controller('WelcomeCtrl', function ($scope, SharePoint) {


    })
    .controller('UserCtrl', function ($scope, $state, $stateParams, SharePoint) {

        SharePoint.UserProfile().then(function (profile) {
            $scope.Profile = profile.Properties;
        });
    })
    .controller('ListsCtrl', function ($scope, $stateParams, SharePoint) {

        SharePoint.Web().then(function (web) {
            web.Lists().then(function (Lists) {
                $scope.Web = web.Properties;
                $scope.Web.Lists = Lists;
            });
        });
    })
    .controller('ListCtrl', function ($scope, $stateParams, SharePoint) {

        SharePoint.Web().then(function (web) {
            web.Lists($stateParams.listId).then(function (List) {
                $scope.Web = web.Properties;
                $scope.Web.List = List.Properties;
            });
        });
    })
    .controller('ItemsCtrl', function ($scope, $stateParams, SharePoint) {


        SharePoint.Web().then(function (web) {
            web.Lists($stateParams.listId).then(function (List) {
                List.Items().then(function (Items) {
                    $scope.Web = web.Properties;
                    $scope.Web.List = List.Properties;
                    $scope.Web.List.Items = Items;
                });
            });
        });

    })
    .controller('ItemCtrl', function ($scope, $stateParams, SharePoint) {

        SharePoint.Web().then(function (web) {
            web.Lists($stateParams.listId).then(function (List) {
                List.Items($stateParams.itemId).then(function (item) {
                    $scope.Web = web.Properties;
                    $scope.Web.List = List.Properties;
                    $scope.Web.List.Item = item.Properties;
                });
            });
        });
    })
    .controller('WebCtrl', function ($scope, $stateParams, $state, SharePoint) {

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
    .controller('CordovaCtrl', function ($scope, $stateParams, $state, SharePoint) {

        $scope.Opslaan = function (Item) {
            var item = Item;
            //var fields = $scope.Web.List.Item.Fields;
            Item.Update().then(function (Item) {
                $scope.Web.List.Item = Item;
            });
            //Item.Update().then( $state.go( $state.current, {}, {reload: true}));
            //SharePoint.CurrentList.
            //SharePoint.Web().then(function (Web) {
            //    Web.Lists('Cordova').then(function (List) {
            //    });
            //});
        };

        $scope.$on('$ionicView.enter', function() {
            SharePoint.Web().then(function (Web) {
                Web.Lists('Cordova').then(function (List) {
                    List.Items(1).then(function (Item) {
                        console.log(Item);

                        //var results = Item.Fields[1].Choices.results;
                        $scope.Web = Web.Properties;
                        $scope.Web.List = List.Properties;
                        $scope.Web.List.Item = Item;
                    });

                });
            });
        });
        //$scope.Ophalen();
    });