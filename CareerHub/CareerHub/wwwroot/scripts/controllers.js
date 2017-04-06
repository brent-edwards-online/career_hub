'use strict';

angular.module('careerHub')

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', function ($scope) {

        /*
        $scope.showDish = false;
        $scope.message = "Loading...";

        $scope.featuredDish = menuFactory.getFavouriteDish()
            .then(function (response) {
                $scope.featuredDish = response.data[0];
                $scope.showDish = true;
            });

        $scope.showPromotion = false;
        $scope.promoMessage = "Loading...";

        $scope.promotion = menuFactory.getPromo()
            .then(function (response) {
                $scope.promotion = response.data[0];
                $scope.showPromotion = true;
            });

        $scope.showSpecialist = false;
        $scope.specialistMessage = "Loading...";
        $scope.specialist = corporateFactory.getAllLeaders()
            .then(function (response) {
                $scope.specialist = response.data[0];
                $scope.showSpecialist = true;
            });
        */
    }])

    .controller('AboutController', ['$scope', function ($scope) {
        //var leaders = corporateFactory.getLeaders();
        //$scope.leaders = leaders;

        $scope.showLeaders = false;
        $scope.leadersMessage = "Loading...";

        /*
        $scope.leaders = corporateFactory.getLeaders().query
            (
            function (response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function (response) {
                $scope.leadersMessage = "Error: " + response.status + " " + response.statusText;
            }
            );
        */
    }])

    ;
