'use strict';

angular.module('careerHub')
    .constant("baseurl", "http://localhost:5000/")
    .service('loginService', ['$http', '$resource', 'baseurl', 'localStorageService', function ($http, $resource, baseurl, localStorageService) {
        this.login = function (email, password) {
            var tokenURL = baseurl + 'connect/token';
            var payload = 'client_id=careerHubApi';
                payload += '&client_secret=secret',
                payload += '&scope=api';
                payload += '&grant_type=password';
                payload += '&username=' + encodeURIComponent(email);
                payload += '&password=' + encodeURIComponent(password);

                //return $http.post(tokenURL, payload);

            return $http({
                method: 'POST',
                url: tokenURL,
                data: payload,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        };

        this.register = function (email, password) {
            alert('Register');
        };

        this.isLoggedIn = function() {
            var userData = localStorageService.get('user-data');
            if (userData && userData.access_token) {
                return true;
            }
            else {
                return false;
            }
        }
    }])
    .service('imageService', ['$http', '$resource', 'baseurl', function ($http, $resource, baseurl) {

        this.getRandomImage = function () {
            return $http.get('data/dishes.json');
        };

        this.saveImage = function () {
            //return $resource(baseurl+"dishes/:id",null,{'update':{method:'PUT'}});
            return $resource('data/dishes.json', null, { 'update': { method: 'PUT' } });
        };

        this.getAllImages = function () {
            return $http.get('data/promotions.json');
        };
    }]);
