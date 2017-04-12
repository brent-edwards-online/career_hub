'use strict';

angular.module('careerHub')
    .controller('IndexController', ['$scope', 'loginService', 'localStorageService', '$state', 'toaster', function ($scope, loginService, localStorageService, $state, toaster) {
        
        $scope.serverError = undefined;
        $scope.currentUser = "";
        $scope.registerEnabled = false;

        $scope.loginEmail = undefined;
        $scope.loginPassword = undefined;
        $scope.registerFirstname = undefined;
        $scope.registerLastname = undefined;
        
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

            if (!$scope.validate(false))
            {
                return;
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

        $scope.continueAsGuest = function () {
            $scope.loginEmail = "guest@guest.com";
            $scope.loginPassword = "GU3$Tl@g1n";
            $scope.login();
        }

        $scope.register = function () {
            if ($scope.registerEnabled == false) {
                $scope.registerEnabled = true;
                toaster.pop({ type: 'info', body: "Email, password, firstname and last name are required to register" });
            }
            else {
                if ($scope.validate(true) == true) {
                    loginService.register($scope.loginEmail, $scope.loginPassword, $scope.registerFirstname, $scope.registerLastname)
                        .then(function (response) {
                            toaster.pop({ type: 'info', body: "Register succeeded. You can now login with your new credentials" });
                            $scope.registerEnabled = false;
                            $scope.registerFirstname = undefined;
                            $scope.registerLastname = undefined;
                        },
                        function (response) {
                            switch (response.status) {
                                case 400:
                                    $scope.serverError = response.data.errorList[0];
                                    break;
                                default:
                                    $scope.serverError = response.data.error_description;
                            }
                            toaster.pop({ type: 'error', body: $scope.serverError });
                        });
                }
            }
            $scope.registerEnabled = true;
        }

        $scope.validate = function(register) {
            var emailRegEx = new RegExp("^[a-z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
            if (!$scope.loginEmail || $scope.loginEmail == '' || !emailRegEx.test($scope.loginEmail)) {
                toaster.pop({ type: 'error', body: "Email is invalid" });
                return false;
            }

            if (!$scope.loginPassword || $scope.loginPassword == '') {
                toaster.pop({ type: 'error', body: "Password is required" });
                return false;
            }

            if (register == true)
            {
                if (!$scope.registerFirstname || $scope.registerFirstname == '') {
                    toaster.pop({ type: 'error', body: "First name is required" });
                    return false;
                }

                if (!$scope.registerLastname || $scope.registerLastname == '') {
                    toaster.pop({ type: 'error', body: "Last name is required" });
                    return false;
                }
            }
            return true;
        }
    }])
    .controller('ImageController', ['$scope', 'hasAccess', '$state', 'imageService', 'initialImage', 'toaster', function ($scope, hasAccess, $state, imageService, initialImage, toaster) {
        $scope.hasAccess = hasAccess;
        $scope.imageUrl = "";
        $scope.showImage = false;

        if (!$scope.hasAccess) {
            toaster.pop({ type: 'info', body: "You must login first to view images. You can register or just click 'Continue as Guest' from the Home screen" });
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
                    switch (response.status) {
                        case 400:
                            $scope.serverError = response.statusText + " 404:" + response.data.errorMessage;
                            break;
                        case 404:
                            $scope.serverError = "Server Error 404:" + response.statusText;
                            break;
                        default:
                            $scope.serverError = response.data.error_description;
                    }
                    toaster.pop({ type: 'error', body: $scope.serverError });
                });
        }
    }])
    .controller('ReviewController', ['$scope', 'hasAccess', '$state', 'imageService', 'filterFilter', 'toaster', function ($scope, hasAccess, $state, imageService, filterFilter, toaster) {
        $scope.hasAccess = hasAccess;
        $scope.imageList = [];
        $scope.view = 0;

        if (!$scope.hasAccess) {
            toaster.pop({ type: 'info', body: "You must login first to view images. You can register or just click 'Continue as Guest' from the Home screen" });
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
