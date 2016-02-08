angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, SharePoint) {
    // Form data for the login modal
    $scope.loginData = {};

    $scope.loginData = { domain: 'duwboot.sharepoint.com', username: 'rutger.hemrika@blaud.com', password: '' }
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
                $state.go($state.current, {}, { reload: true });
            });
        });
    };
})
.controller('WelcomeCtrl', function ($scope, SharePoint) {


})
.controller('UserCtrl', function ($scope, $state, $stateParams, SharePoint) {
    if ( SharePoint.CurrentUser === null) {
        $scope.login();
    }
    else {
        $scope.CurrentUser = SharePoint.CurrentUser();
    }



    //if(SharePoint.CurrentUser())
    //if(SharePoint.CurrentWeb === null) {
    //    SharePoint.Web('duwboot.sharepoint.com').then(function (web) {
    //        $scope.web = web;
    //        web.CurrentUser().then(function (CurrentUser) {
    //            $scope.web.CurrentUser = CurrentUser;
    //        });
    //        SharePoint.CurrentWeb(web);// = web;
    //    });
    //}
    //else {
    //    if (angular.isFunction(SharePoint.CurrentWeb().CurrentUser())) {
    //        SharePoint.CurrentWeb.CurrentUser().then(function (CurrentUser) {
    //            $scope.web.CurrentUser = CurrentUser;
    //        });
    //    }
    //    else {
    //        $scope.web = SharePoint.CurrentWeb;
    //        $scope.web.CurrentUser = SharePoint.CurrentUser;
    //    }
    //}
})
.controller('ListsCtrl', function ($scope, $stateParams, SharePoint) {

    if(SharePoint.CurrentWeb() !== null) {
        SharePoint.Web().then(function (web) {
            web.Lists().then(function (Lists) {
                $scope.Web = SharePoint.CurrentWeb();
                $scope.Web.Lists = Lists;
            });
        });
    }
    /*
    if(SharePoint.CurrentWeb === null) {
        SharePoint.Web('duwboot.sharepoint.com').then(function (web) {
            $scope.web = web;
            web.Lists().then(function (Lists) {
                $scope.web.Lists = Lists;
            });
            SharePoint.CurrentWeb = web;
        });
    }
    else {
        SharePoint.CurrentWeb.Lists().then(function (Lists) {
            $scope.web = SharePoint.CurrentWeb;
            $scope.web.Lists = Lists;
        });
    }
    */
})
.controller('ListCtrl', function ($scope, $stateParams, SharePoint) {

    if(SharePoint.CurrentWeb() !== null) {
        SharePoint.Web().then(function (web) {
            web.Lists($stateParams.listId).then(function (List) {
                //List.Items().then(function(Items){
                    $scope.Web = SharePoint.CurrentWeb();
                    $scope.Web.List = SharePoint.CurrentList();
                    //$scope.Web.List.Items  = Items;
                //});
            });
        });
    }

    //if ( SharePoint.Security.CurrentUser === null) {
    //    $scope.login();
    //}
    //
    //SharePoint.Web('duwboot.sharepoint.com').then(function (web) {
    //    $scope.web = web;
    //    SharePoint.CurrentWeb = web;
    //    var id = $stateParams.listId;
    //    web.List(id, web).then(function (list) {
    //        $scope.web.list = list;
    //        SharePoint.CurrentList = list;
    //    });
    //});
})
.controller('ItemsCtrl', function ($scope, $stateParams, SharePoint) {

    if(SharePoint.CurrentWeb() !== null) {
        SharePoint.Web().then(function (web) {
            web.Lists($stateParams.listId).then(function (List) {
                List.Items().then(function(Items){
                    $scope.Web = SharePoint.CurrentWeb();
                    $scope.Web.List = SharePoint.CurrentList();
                    $scope.Web.List.Items  = Items;
                });
            });
        });
    }
})
.controller('ItemCtrl', function ($scope, $stateParams, SharePoint) {

    if(SharePoint.CurrentWeb() !== null) {
        SharePoint.Web().then(function (web) {
            web.Lists($stateParams.listId).then(function (List) {
                List.Items($stateParams.itemId).then(function(item){
                    $scope.Web = SharePoint.CurrentWeb();
                    $scope.Web.List = SharePoint.CurrentList();
                    $scope.Web.List.Item  = item.Properties;
                });
            });
        });
    }
})
.controller('WebCtrl', function ($scope, $stateParams, SharePoint) {

    if(SharePoint.CurrentWeb() === null) {
        SharePoint.Web().then(function (web) {
            $scope.Web = web.Properties;
            //$scope.Web = SharePoint.CurrentWeb();
        });
    }
    else
    {
        $scope.Web = SharePoint.CurrentWeb();
    }
});
