'use strict';

angular.module('careerHub')
    .controller('IndexController', ['$scope', 'loginService', 'localStorageService', '$state', function ($scope, loginService, localStorageService, $state) {
        $scope.loginFunction = -1;
        $scope.serverError = undefined;

        $scope.actionLogin = function () {
            $scope.serverError = undefined;

            if ($scope.loginFunction == 2) {
                loginService.register($scope.loginEmail, $scope.loginPassword);
            }
            else {
                if ($scope.loginFunction == 1) {
                    $scope.loginEmail = "guest@guest.com";
                    $scope.loginPassword = "GU3$Tl@g1n";
                }
                loginService.login($scope.loginEmail, $scope.loginPassword)
                    .then(function (response) {
                        localStorageService.set('token-data', response.data);

                        loginService.getUserData()
                            .then(function (response) {
                                localStorageService.set('user-data', response.data);
                                $state.go('app.image');
                            },
                            function (response) {
                                switch (response.status) {
                                    case 404:
                                        $scope.serverError = "Server Error 404:" + response.statusText;
                                        break;
                                    default:
                                        $scope.serverError = response.data.error_description;
                                }
                            }
                        );                        
                    },
                    function (response) {
                        $scope.serverError = response.data.error_description;
                });
            }
        };

        $scope.isLoggedIn = function () {
            var userData = localStorageService.get('token-data');
            if (userData && userData.access_token) {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.logout = function () {
            localStorageService.remove('token-data');
            localStorageService.remove('user-data');
        }

        $scope.login = function () {
            $scope.loginFunction = 0;
        }
        $scope.continueAsGuest = function () {
            $scope.loginFunction = 1;
        }
        $scope.register = function () {
            $scope.loginFunction = 2;
        }
    }])
    .controller('ImageController', ['$scope', 'hasAccess', '$state', 'imageService', 'ngToast', function ($scope, hasAccess, $state, imageService, ngToast) {
        $scope.hasAccess = hasAccess;
        $scope.imageUrl = "";
        $scope.showImage = false;

        if (!$scope.hasAccess) {
            $state.go('app');
        }
        else {
            $scope.imageUrl = "https://images.unsplash.com/photo-1439433547555-1f4f96513499?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=0b9a77e49c916f457b8ff9509237ffa1";
            $scope.showImage = true;
        }

        $scope.getRandomImage = function () {
            imageService.getRandomImage()
                .then(
                function (response) {
                    $scope.currentImageData = response.data;
                    $scope.imageUrl = response.data.urls.small;
                },
                function (response) {
                    $scope.serverError = response.data.error_description;
                });
        }

        $scope.saveImageRating = function(isLiked) {
            imageService.saveImage(isLiked, $scope.currentImageData)
                .then(
                function (response) {
                    ngToast.create({
                        content: '<div class="ngtoast-turn">Image was saved</div>'
                    });
                },
                function (response) {
                    $scope.serverError = response.data.error_description;
                    ngToast.create({
                        content: '<div class="ngtoast-turn">Image was not saved - {{ $scope.serverError }}</div>'
                    });
                });
        }
    }])
    .controller('ReviewController', ['$scope', 'hasAccess', '$state', 'imageService', function ($scope, hasAccess, $state, imageService) {
        $scope.hasAccess = hasAccess;
        $scope.imageList = [];

        if (!$scope.hasAccess) {
            $state.go('app');
        }

        imageService.getAllImages()
            .then(
            function (response) {
                for( var idx in response.data.result)
                {
                    var urls = JSON.parse(response.data.result[idx].imageUrls);
                    var user = JSON.parse(response.data.result[idx].imageUser);
                    response.data.result[idx].imageUrls = urls;
                    response.data.result[idx].imageUser = user;
                }

                $scope.imageList = response.data.result;
            },
            function (response) {
                $scope.serverError = response.data.error_description;
                ngToast.create({
                    content: '<div class="ngtoast-turn">UNable to retrieve images - {{ $scope.serverError }}</div>'
                });
            });
        
    }])
    .controller('AboutController', ['$scope', function ($scope) {
        
    }]);
