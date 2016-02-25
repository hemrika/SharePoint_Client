// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngSharePoint'])

    .run(function($ionicPlatform, SharePoint) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins.Keyboard) {
            //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //}
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    //.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', statesConfiguration])
    .config(['$httpProvider', function httpLoadingInterceptor($httpProvider) {

        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$rootScope', function ($rootScope) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                },
                responseError: function (responseError) {
                    $rootScope.$broadcast('loading:hide')
                    return responseError
                }
            }
        }])
    }
    ])
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        // force native scroll
        //var configProvider = $ionicConfigProvider;
        //configProvider.scrolling.jsScrolling(false);

        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.welcome', {
                url: "/welcome",
                views: {
                    'menuContent': {
                        templateUrl: "templates/welcome.html",
                        controller: 'WelcomeCtrl'
                    }
                }
            })
            .state('app.user', {
                url: "/user",
                views: {
                    'menuContent': {
                        templateUrl: "templates/user.html",
                        controller: 'UserCtrl'
                    }
                }
            })
            .state('app.web', {
                url: "/web",
                views: {
                    'menuContent': {
                        templateUrl: "templates/web.html",
                        controller: 'WebCtrl'
                    }
                }
            })
            .state('app.lists', {
                url: "/lists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/lists.html",
                        controller: 'ListsCtrl'
                    }
                }
            })
            .state('app.list', {
                url: "/lists/:listId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/list.html",
                        controller: 'ListCtrl'
                    }
                }
            })
            .state('app.items', {
                url: "/lists/:listId/items",
                views: {
                    'menuContent': {
                        templateUrl: "templates/items.html",
                        controller: 'ItemsCtrl'
                    }
                }
            })
            .state('app.item', {
                url: "/lists/:listId/items/:itemId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/item.html",
                        controller: 'ItemCtrl'
                    }
                }
            })
            .state('app.corodova', {
                url: "/Cordova",
                views: {
                    'menuContent': {
                        templateUrl: "templates/cordova.html",
                        controller: 'CordovaCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/welcome');
    });


//function httpLoadingInterceptor($httpProvider) {

//    $httpProvider.defaults.withCredentials = true;

//    $httpProvider.interceptors.push(['$rootScope', function ($rootScope) {
//        return {
//            request: function (config) {
//                $rootScope.$broadcast('loading:show')
//                return config
//            },
//            response: function (response) {
//                $rootScope.$broadcast('loading:hide')
//                return response
//            },
//            responseError: function (responseError) {
//                $rootScope.$broadcast('loading:hide')
//                return responseError
//            }
//        }
//    }])
//}

function httpLoadingInterceptorActions($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({ noBackdrop: true, template: '<div class="bubbles aligntop" style="top:20%;">laden...</div>', hideOnStateChange: true, duration: 3000 })
    })

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide()
    })
}
