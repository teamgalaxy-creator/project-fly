import * as THREE from 'threenew';
import { Water } from './Water.js';


let canvas = document.createElement('canvas');
canvas.setAttribute('id', 'watercanvas');
const width = 512;
const height = 512;
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
const context = canvas.getContext('2d');


export default () => {



    let camera, scene, renderer;
    let water, sun;

    init();
    animate();

    function init() {



        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.5;


        //

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000);

        camera.position.set(0, 1000, 0); // Set the camera position to (0, 100, 0) or any other desired position
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        sun = new THREE.Vector3();

        // Water

        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

        water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('/water.jpg', function (texture) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;



                }),
                geometrytextureWidth: waterGeometry.parameters.width / 512,
                geometrytextureHeight: waterGeometry.parameters.height / 512,
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x3ba5da,
                distortionScale: 1,
                fog: scene.fog !== undefined
            }
        );

        water.rotation.x = - Math.PI / 2.5;

        scene.add(water);

        // Skybox






        const parameters = {
            elevation: 0,
            azimuth: 0
        };

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const sceneEnv = new THREE.Scene();

        let renderTarget;

        function updateSun(parameters) {

            const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
            const theta = THREE.MathUtils.degToRad(parameters.azimuth);

            sun.setFromSphericalCoords(1, phi, theta);


            water.material.uniforms['sunDirection'].value.copy(sun).normalize();


            if (renderTarget !== undefined) renderTarget.dispose();


            renderTarget = pmremGenerator.fromScene(sceneEnv);


            scene.environment = renderTarget.texture;

        }

        updateSun(parameters);




        //



        //



        //




        // GUI


        window.addEventListener('resize', onWindowResize);

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }



    function animate() {
        context.drawImage(renderer.domElement, 0, 0, width, height);
        requestAnimationFrame(animate);
        render();


    }

    function render() {

        const time = performance.now() * 0.001;


        water.material.uniforms['time'].value += 1.0 / 60.0;

        renderer.render(scene, camera);

    }


    return canvas
}