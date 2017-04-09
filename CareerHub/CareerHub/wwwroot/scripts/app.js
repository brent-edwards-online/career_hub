'use strict';

var app = angular.module('careerHub', ['ui.router', 'ngResource', 'LocalStorageModule', 'toaster']);

app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html',
                    },
                    'content': {
                        templateUrl: 'views/home.html',
                        controller: 'IndexController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html',
                    }
                }

            })
            .state('app.image', {
                url: 'image/',
                resolve: {
                    hasAccess: function (loginService) {
                        return loginService.isLoggedIn();
                    },
                    initialImage: function (imageService) {
                        return imageService.getRandomImage();
                    }
                },
                views: {
                    'content@': {
                        templateUrl: 'views/image.html',
                        controller: 'ImageController'
                    }
                }
            })
            .state('app.review', {
                url: 'review/',
                resolve: {
                    hasAccess: function (loginService) {
                        return loginService.isLoggedIn();   
                    },
                    imageList: function () {

                    }
                },
                views: {
                    'content@': {
                        templateUrl: 'views/review.html',
                        controller: 'ReviewController'
                    }
                }
            })
            .state('app.about', {
                url: 'about/',
                views: {
                    'content@': {
                        templateUrl: 'views/about.html',
                        controller: 'AboutController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
});


