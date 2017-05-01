'use strict';

angular.module('careerHub')
    .constant('baseurl', 'https://ratemyimage.brentedwardsonline.com/')
    .constant('baseimageurl', 'https://api.unsplash.com/')
    .service('loginService', ['$http', '$resource', 'baseurl', 'localStorageService', function ($http, $resource, baseurl, localStorageService) {
        this.login = function (email, password) {
            var tokenURL = baseurl + 'connect/token';
            var payload = 'client_id=careerHubApi';
                payload += '&client_secret=secret',
                payload += '&scope=api openid';
                payload += '&grant_type=password';
                payload += '&username=' + encodeURIComponent(email);
                payload += '&password=' + encodeURIComponent(password);

            return $http({
                method: 'POST',
                url: tokenURL,
                data: payload,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        };

        this.getUserData = function () {
            var userInfoURL = baseurl + 'connect/userinfo';
            var tokenData = localStorageService.get('token-data');

            return $http({
                method: 'GET',
                url: userInfoURL,
                headers: {
                    'Authorization': 'Bearer ' + tokenData.access_token
                }
            })
        };

        this.register = function (email, password, firstname, lastname) {
            var registerURL = baseurl + 'account/register';
            var payload = 'FirstName=' + encodeURIComponent(firstname);
            payload += '&LastName=' + encodeURIComponent(lastname);
            payload += '&Email=' + encodeURIComponent(email);
            payload += '&Password=' + encodeURIComponent(password);
            payload += '&ConfirmPassword=' + encodeURIComponent(password);

            return $http({
                method: 'POST',
                url: registerURL,
                data: payload,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        };

        this.isLoggedIn = function() {
            var tokenData = localStorageService.get('token-data');
            if (tokenData && tokenData.access_token) {
                return true;
            }
            else {
                return false;
            }
        }
    }])
    .service('imageService', ['$http', '$resource', 'baseimageurl', 'baseurl', 'localStorageService', function ($http, $resource, baseimageurl, baseurl, localStorageService) {

        this.getRandomImage = function () {
            var endPoint = baseimageurl + 'photos/random';
            return $http({
                method: 'GET',
                url: endPoint,
                headers: {
                    'Authorization': 'Client-ID dcea3f23302f66a1228e09e49735e483cbec7bcc86039cc1988b481c0fef36bb'
                }
            })
        };

        this.saveImage = function (like, imageData) {
            var tokenData = localStorageService.get('token-data');
            var userData = localStorageService.get('user-data');

            var tokenURL = baseurl + 'api/image';
            var payload = 'isLiked=' + like;
            payload += '&userId=' + encodeURIComponent(userData.sub);
            payload += '&imageUrls=' + encodeURIComponent(JSON.stringify(imageData.urls));
            payload += '&imageUser=' + encodeURIComponent(JSON.stringify(imageData.user));
            
            return $http({
                method: 'POST',
                url: tokenURL,
                data: payload,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + tokenData.access_token
                }
            })
        };

        this.getAllImages = function () {
            var tokenData = localStorageService.get('token-data');
            var userData = localStorageService.get('user-data');

            var imageURL = baseurl + 'api/image?userid=' + encodeURIComponent(userData.sub);

            return $http({
                method: 'GET',
                url: imageURL,
                headers: {
                    'Authorization': 'Bearer ' + tokenData.access_token
                }
            })
        };

        this.removeImage = function(userImageId) {
            var tokenData = localStorageService.get('token-data');
            var userData = localStorageService.get('user-data');

            var imageURL = baseurl + 'api/image?userImageId=' + encodeURIComponent(userImageId);
            
            return $http({
                method: 'DELETE',
                url: imageURL,
                headers: {
                    'Authorization': 'Bearer ' + tokenData.access_token
                }
            })
        }
    }]);
