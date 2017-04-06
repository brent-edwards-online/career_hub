'use strict';

angular.module('careerHub')
    .constant("baseurl", "http://localhost:5000/")

    .service('imageService', ['$http', '$resource', 'baseurl', function ($http, $resource, baseurl) {

        this.getFavouriteDish = function () {
            return $http.get('data/dishes.json');
        };

        this.getDishes = function () {
            //return $resource(baseurl+"dishes/:id",null,{'update':{method:'PUT'}});
            return $resource('data/dishes.json', null, { 'update': { method: 'PUT' } });
        };

        this.getPromo = function () {
            return $http.get('data/promotions.json');
        };

        this.getPromotion = function () {
            //return $resource(baseurl+"promotions/:id",null,{'update':{method:'PUT'}});
            return $resource('data/promotions.json', null, { 'update': { method: 'PUT' } });
        };

    }]);
