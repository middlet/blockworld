var app = angular.module('threedee', []);

app.controller('MainController', function($scope) {
    $scope.bounds = [20, 30, 60, 60];
    $scope.regions = [[[42,42], [45,42], [45,46], [42,46]],
        [[53,53], [55,53], [57,55], [55,57], [53,57]]];
});

app.directive('buildingview', function() {
    return {
        restrict: 'E',
        scope: {
            bounds: '='
        },
        template: '<ul><div ng-repeat="bi in bounds"><li>{{bi}}</li></div></ul>'
    }
});