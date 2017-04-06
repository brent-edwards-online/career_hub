var personApp = angular.module('careerHub', []);

personApp.controller('personController', ['$scope', function ($scope) {
    $scope.name = 'Mary Jane';
}]);