function MainController($scope) {

    var position = scene.getPosition();

    $scope.z = position[2];
    $scope.cz = scene.getCameraDistance();

}

function AxisZController($scope) {

    $scope.axis = $scope.z;

    $scope.updateRotation = function () {

        this.z = this.axis;

        scene.rotatePlane(this.z);
    }
}

function ZoomController($scope) {

    $scope.zoom = $scope.cz;

    $scope.updateZoom = function () {
        console.log(this.zoom);
        this.cz = this.zoom;

        scene.setCameraPosition(this.zoom);
    }


}