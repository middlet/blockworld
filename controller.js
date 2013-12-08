// originally from http://blog.frankel.ch/wp-content/resources/you-should-check-angularjs/controller.js

function ThreeJsCtrl($scope) {

    var position = scene.getPlaneRotation();

    $scope.x = position[0];
    $scope.y = position[1];
    $scope.z = position[2];
}

function AxisXCtrl($scope) {

    $scope.label = 'X';
    $scope.axis = $scope.x;

    $scope.updateRotation = function () {

        this.x = this.axis;

        scene.setPlaneXRotationAndPaint(this.x);
    }
}

function AxisYCtrl($scope) {

    $scope.label = 'Y';
    $scope.axis = $scope.y;

    $scope.updateRotation = function () {

        this.y = this.axis;

        scene.setPlaneYRotationAndPaint(this.y);
    }
}

function AxisZCtrl($scope) {

    $scope.label = 'Z';
    $scope.axis = $scope.z;

    $scope.updateRotation = function () {

        this.z = this.axis;

        scene.setPlaneZRotationAndPaint(this.z);
    }
}