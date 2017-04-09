'use strict';

angular.module('careerHub')
    .controller('IndexController', ['$scope', 'loginService', 'localStorageService', '$state', 'toaster', function ($scope, loginService, localStorageService, $state, toaster) {
        $scope.loginFunction = -1;
        $scope.serverError = undefined;
        $scope.currentUser = "";
        $scope.registerEnabled = false;

        $scope.actionLogin = function () {
            $scope.serverError = undefined;

            if ($scope.loginFunction == 2) {
                if ($scope.registerEnabled) {
                    loginService.register($scope.loginEmail, $scope.loginPassword);
                }
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
                                toaster.pop({ type: 'error', body: $scope.serverError });
                            }
                            );
                    },
                    function (response) {                        
                        $scope.serverError = response.data.error_description;
                        toaster.pop({ type: 'error', body: $scope.serverError });
                    });
            }
        };

        $scope.isLoggedIn = function () {
            var tokenData = localStorageService.get('token-data');
            if (tokenData && tokenData.access_token) {
                var userData = localStorageService.get('user-data');
                $scope.currentUser = userData.firstname; 
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
            $scope.registerEnabled = true;
            $scope.loginFunction = 2;
        }
    }])
    .controller('ImageController', ['$scope', 'hasAccess', '$state', 'imageService', 'initialImage', 'toaster', function ($scope, hasAccess, $state, imageService, initialImage, toaster) {
        $scope.hasAccess = hasAccess;
        $scope.imageUrl = "";
        $scope.showImage = false;

        if (!$scope.hasAccess) {
            $state.go('app');
        }
        else {
            $scope.currentImageData = initialImage.data;
            $scope.imageUrl = initialImage.data.urls.small;
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
                    toaster.pop({ type: 'error', body: $scope.serverError });
                });
        }

        $scope.saveImageRating = function (isLiked) {
            imageService.saveImage(isLiked, $scope.currentImageData)
                .then(
                function (response) {
                    toaster.pop({ type: 'info', body: "Image was saved" });
                },
                function (response) {
                    $scope.serverError = response.data.error_description;
                    toaster.pop({ type: 'error', body: $scope.serverError });
                });
        }
    }])
    .controller('ReviewController', ['$scope', 'hasAccess', '$state', 'imageService', 'filterFilter', 'toaster', function ($scope, hasAccess, $state, imageService, filterFilter, toaster) {
        $scope.hasAccess = hasAccess;
        $scope.imageList = [];
        $scope.view = 0;

        if (!$scope.hasAccess) {
            $state.go('app');
        }

        $scope.removeImage = function (idx, imageId) {
            imageService.removeImage(imageId)
                .then(
                function (response) {
                    console.log("Image removed");
                    var i = $scope.imageList.indexOf($scope.imageList.filter(function (item) {
                        return item.userImageId == imageId
                    })[0])
                    $scope.imageList.splice(i, 1);
                    $scope.filterImages($scope.view);  
                    toaster.pop({ type: 'info', body: "Image was removed" });
                },
                function (response) {
                    $scope.serverError = response.data.error_description;
                    toaster.pop({ type: 'error', body: $scope.serverError });
                });
        }

        imageService.getAllImages()
            .then(
            function (response) {
                for (var idx in response.data.result) {
                    var urls = JSON.parse(response.data.result[idx].imageUrls);
                    var user = JSON.parse(response.data.result[idx].imageUser);
                    response.data.result[idx].imageUrls = urls;
                    response.data.result[idx].imageUser = user;
                }

                $scope.imageList = response.data.result;
                $scope.filteredImageList = response.data.result;
            },
            function (response) {
                $scope.serverError = response.data.error_description;
                toaster.pop({ type: 'error', body: "Unable to retrieve images - " + $scope.serverError });
            });

        $scope.filterImages = function (view) {
            $scope.view = view;
            switch (view)
            {
                case 2:
                    $scope.filteredImageList = filterFilter($scope.imageList, { isLiked: false });
                    break;
                case 1:
                    $scope.filteredImageList = filterFilter($scope.imageList, { isLiked: true });
                    break;
                default:
                    $scope.filteredImageList = $scope.imageList;
            }
            
        }
    }])
    .controller('AboutController', ['$scope', function ($scope) {

    }]);
