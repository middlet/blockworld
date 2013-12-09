var scene = (function () {

    // set the scene size from the div
    var WIDTH = document.getElementById('view3d').offsetWidth;
    var HEIGHT = document.getElementById('view3d').offsetHeight;

    var ASPECT = WIDTH / HEIGHT;

    // create a renderer
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();

    var plane, camera;

    var BOUNDS = [31.7900417, 35.2054417, 31.7810028, 35.2206583];

    function createGeometry() {
        // create the objects to display
        // plane
        var w = Math.abs(BOUNDS[2]-BOUNDS[0]), h = Math.abs(BOUNDS[1]-BOUNDS[3]);
        var cx = (BOUNDS[0]+BOUNDS[2])/2.0, cy = (BOUNDS[1]+BOUNDS[3])/2.0;
        var scale = (w>h) ? 150/w : 150/h;


        var pgeo = new THREE.Geometry();
        pgeo.vertices.push(new THREE.Vector3(scale*(BOUNDS[0]-cx), scale*(BOUNDS[1]-cy), 0));
        pgeo.vertices.push(new THREE.Vector3(scale*(BOUNDS[2]-cx), scale*(BOUNDS[1]-cy), 0));
        pgeo.vertices.push(new THREE.Vector3(scale*(BOUNDS[2]-cx), scale*(BOUNDS[3]-cy), 0));
        pgeo.vertices.push(new THREE.Vector3(scale*(BOUNDS[0]-cx), scale*(BOUNDS[3]-cy), 0));
        pgeo.faces.push(new THREE.Face4(0, 1, 2, 3));
        console.log(pgeo);
        var pmat = new THREE.MeshBasicMaterial({
            color: 0xaa0000,
            wireframe: true
        });
        plane = new THREE.Mesh(pgeo, pmat);
        plane.rotation.x = -1.0;
        scene.add(plane);
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
        return [plane.position.x, plane.position.y, plane.position.z];
    }

    function getCameraDistance() {
        return camera.position.z;
    }

    function rotatePlane(val) {
        plane.rotation.z = val;
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