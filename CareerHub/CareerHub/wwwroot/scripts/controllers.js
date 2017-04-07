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
                        localStorageService.set('user-data', response.data);
                        $state.go('app.image');
                    },
                    function (response) {
                        $scope.serverError = response.data.error_description;
                });
            }
        };

        $scope.isLoggedIn = function () {
            var userData = localStorageService.get('user-data');
            if (userData && userData.access_token) {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.logout = function () {
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
    .controller('ImageController', ['$scope', 'hasAccess', '$state', 'imageService', function ($scope, hasAccess, $state, imageService) {
        $scope.hasAccess = hasAccess;
        $scope.imageUrl = "";
        $scope.showImage = false;

        if (!$scope.hasAccess) {
            $state.go('app');
        }
        else {
                
            $scope.imageUrl = "https://images.unsplash.com/photo-1457264635001-828d0cbd483e";
            $scope.showImage = true;
        }

        $scope.getRandomImage = function () {
            imageService.getRandomImage()
                .then(
                function (response) {
                    $scope.imageUrl = response.data;
                },
                function (response) {
                    $scope.serverError = response.data.error_description;
                });
        }

        $scope.saveImageRating = function(isLiked) {

        }
    }])
    .controller('ReviewController', ['$scope', 'hasAccess', '$state', function ($scope, hasAccess, $state) {
        $scope.hasAccess = hasAccess;
        if (!$scope.hasAccess) {
            $state.go('app');
        }
        
    }])
    .controller('AboutController', ['$scope', function ($scope) {
        
    }]);
