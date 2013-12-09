var scene = (function () {

    // set the scene size from the div
    var WIDTH = document.getElementById('view3d').offsetWidth;
    var HEIGHT = document.getElementById('view3d').offsetHeight;

    var ASPECT = WIDTH / HEIGHT;

    // create a renderer
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();

    var plane, axes;

    function createGeometry() {
        // create the plane
        plane = new THREE.Mesh(new THREE.PlaneGeometry(152, 94),
            new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 'red'
        }));
        plane.material.side = THREE.DoubleSide;
        plane.rotation.x = -0.5;
        scene.add(plane);
        // add axes
        axes = new THREE.AxisHelper(50);
        scene.add(axes);

    }

    function createCamera() {
        // set some camera attributes
        var VIEW_ANGLE = 45;
        var NEAR = 1;
        var FAR = 1000;
        // create a camera
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR,
            FAR);
        // the camera starts at 0,0,0 so pull it back
        camera.position.z = 200;
        // add the camera
        scene.add(camera);
    }

    function paint() {
        renderer.render(scene, camera);
    }

    function setup() {
        renderer.setSize(WIDTH, HEIGHT);
        var container = document.getElementById('view3d');
        container.appendChild(renderer.domElement);
    }

    function getPlaneRotation() {
        return [plane.rotation.x, plane.rotation.y, plane.rotation.z];
    }

    function setPlaneRotation(axis, val) {
        switch (axis) {
            case 'x':
                plane.rotation.x = val;
                axes.rotation.x = val;
                break;
            case 'y':
                plane.rotation.y = val;
                axes.rotation.y = val;
                break;
            case 'z':
                plane.rotation.z = val;
                axes.rotation.z = val;
                break;
        }
    }

    function setCameraPositionY(y) {
        camera.position.y = y;
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

        getPlaneRotation: function () {
            return getPlaneRotation();
        },

        setPlaneXRotationAndPaint: function (x) {
            setPlaneRotation('x', x);
            paint();
        },

        setPlaneYRotationAndPaint: function (y) {
            setPlaneRotation('y', y);
            paint();
        },

        setPlaneZRotationAndPaint: function (z) {
            setPlaneRotation('z', z);
            paint();
        }
    }
})();