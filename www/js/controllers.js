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
    .controller('UserCtrl', function ($scope, $state, $filter, $stateParams, SharePoint) {

        $scope.$on('$ionicView.enter', function() {
            SharePoint.UserProfile().then(function (profile) {
                $scope.Profile = profile.Properties;
                $scope.Profile.Birthday = $filter('filter')($scope.Profile.UserProfileProperties.results, {Key: 'SPS-Birthday'})[0].Value;
            });
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
            var Id = item.Id();
            if(item.Id() > 0) {
                Item.AttachmentFiles().then(function(files){
                    console.log(files);
                });
                //Item.Update().then(function (Item) {
                //    $scope.Web.List.Item = Item;
                //});
            }
            else {
                Item.Save().then(function (Item) {
                    $scope.Web.List.Item = Item;
                });
            }
            //var fields = $scope.Web.List.Item.Fields;
            //Item.Update().then(function (Item) {
            //    $scope.Web.List.Item = Item;
            //});
            //Item.Update().then( $state.go( $state.current, {}, {reload: true}));
            //SharePoint.CurrentList.
            //SharePoint.Web().then(function (Web) {
            //    Web.Lists('Cordova').then(function (List) {
            //    });
            //});
        };

        $scope.Bestanden = function( Item) {
            var bsixfour = "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";
            Item.AddFile("rutgerhemrika.jpg", bsixfour).then(function (file) {
                console.log(file);
                $scope.bsixfour = SharePoint.Url() + "/"+ file;

                var ServerRelativeUrl = SharePoint.ServerRelativeUrl();
                var Url = SharePoint.Url();

                SharePoint.GetFileByServerRelativeUrl(SharePoint.ServerRelativeUrl() + "/" + file).then(function(data){
                    //bsixfour = btoa(data);
                    //$scope.bsixfour = SharePoint.Url()+ data.ServerRelativeUrl;
                    //console.log(data);
                });
                //console.log(value);
            });
        };

        $scope.$on('$ionicView.enter', function() {
            SharePoint.Web().then(function (Web) {
                Web.Lists('Cordova').then(function (List) {

                    /*
                    List.Items(-1).then(function(Item){
                    //List.Items('New').then(function(Item){
                        $scope.Web = Web.Properties;
                        $scope.Web.List = List.Properties;
                        $scope.Web.List.Item = Item;
                    });
                    */
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