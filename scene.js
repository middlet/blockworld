// originally from http://blog.frankel.ch/wp-content/resources/you-should-check-angularjs/scene.js

var scene = (function () {

// set the scene size
    var WIDTH = $('#container').width();
    var HEIGHT = $('#container').height();

    var ASPECT = WIDTH / HEIGHT;

// create a WebGL renderer
// and a scene
    var renderer = new THREE.CanvasRenderer();
    var scene = new THREE.Scene();

    var plane;

    function createGeometry() {


        plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100,10,10), 
            new THREE.MeshNormalMaterial());

        plane.material.side = THREE.DoubleSide;

        plane.rotation.x -= 1.0;

// add the plane to the scene
        scene.add(plane);
    }

    function createCamera() {

// set some camera attributes
        var VIEW_ANGLE = 45;
        var NEAR = 0.1;
        var FAR = 10000;

// create a WebGL camera
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);

// the camera starts at 0,0,0 so pull it back
        camera.position.z = 250;

// and the camera
        scene.add(camera);
    }

    function createLight() {

// create a point light
        var pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

// add to the scene
        scene.add(pointLight);
    }

    function paint() {

// draw!
        renderer.render(scene, camera);
    }

    function setup() {

// start the renderer
        renderer.setSize(WIDTH, HEIGHT);

// get the DOM element to attach to
// - assume we've got jQuery to hand
        var $container = $('#container');

// attach the render-supplied DOM element
        $container.append(renderer.domElement);
    }

    function getPlaneRotation() {

        return [plane.rotation.x, plane.rotation.y, plane.rotation.z];
    }

    function setPlaneRotation(axis, val) {

        switch (axis) {

            case 'x':
                plane.rotation.x = val;
                break;
            case 'y':
                plane.rotation.y = val;
                break;
            case 'z':
                plane.rotation.z = val;
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

            createCamera();
            createLight();
            createGeometry();
            setup();
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