var scene = (function () {

    // set the scene size from the div
    var WIDTH = document.getElementById('view3d').offsetWidth;
    var HEIGHT = document.getElementById('view3d').offsetHeight;

    var ASPECT = WIDTH / HEIGHT;

    // create a renderer
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();

    var plane, axes, camera;

    function createGeometry() {
        // create the objects to display
        // plane
        plane = new THREE.Mesh(new THREE.PlaneGeometry(152, 94),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 'red'
        }));
        plane.material.side = THREE.DoubleSide;
        plane.rotation.x = -0.5;
        scene.add(plane);

        // axes
        axes = new THREE.AxisHelper(30);
        scene.add(axes);
    }

    function createCamera() {
        // create the camera
        var VIEW_ANGLE = 45;
        var NEAR = 1;
        var FAR = 1000;
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR,
            FAR);
        // the camera starts at 0,0,0 so pull it back
        camera.position.z = 200;
        // add the camera
        scene.add(camera);
    }

    function paint() {
        // draw the scene
        renderer.render(scene, camera);
    }

    function setup() {
        // create the renderer and place on page
        renderer.setSize(WIDTH, HEIGHT);
        var container = document.getElementById('view3d');
        container.appendChild(renderer.domElement);
    }

    function getPosition() {
        return [plane.rotation.x, plane.rotation.y, plane.rotation.z];
    }

    function getCameraDistance() {
        return camera.position.z;
    }

    function rotatePlane(val) {
        plane.rotation.z = val;
        axes.rotation.z = val;
    }

    function setCameraPositionZ(z) {
        camera.position.z = z;
    }

    return {
        init: function () {
            setup();
            createCamera();
            createGeometry();
            paint();
        },

        getPosition: function () {
            return getPosition();
        },

        getCameraDistance: function () {
            return getCameraDistance();
        },

        rotatePlane: function (z) {
            rotatePlane(z);
            paint();
        },

        setCameraPosition: function(z) {
            setCameraPositionZ(z);
            paint();
        }
    }
})();