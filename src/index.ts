import * as THREE from "three";
// import * as url from "./imgs/earthmap1k.jpg"
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



window.addEventListener("DOMContentLoaded", init);

function init() {
    const width = 960;
    const height = 540;

    // create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // add canvas to body
    document.body.appendChild(renderer.domElement);

    // create a scene
    const scene = new THREE.Scene();

    // create a camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, 5);

    const controls = new OrbitControls(camera, renderer.domElement);

    // create a sphere
    // const geometry = new THREE.SphereGeometry(300, 30, 30);
    // const loader = new THREE.TextureLoader();
    // let url = require('./imgs/earthmap1k.jpg')
    // const texture = loader.load(url);
    // const material = new THREE.MeshStandardMaterial({
    //     map: texture
    // });
    // // add the mesh to 3D space
    // scene.add(mesh);

    const loader = new TDSLoader();
    // specify the path of textures
    loader.setPath('models/3ds/portalgun/textures/');
    // specify the path of 3ds file
    loader.load('../portalgun.3ds',  (object) => {
        // add model to 3d space after loading
        scene.add(object);
    });


    // directional light
    const light = new THREE.DirectionalLight(0xffffff);
    light.intensity = 2;
    light.position.set(1, 1, 1);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    let rot = 0; // 角度
    let mouseX = 0; // マウス座標
    document.addEventListener("mousemove", (event) => {
        mouseX = event.pageX;
    });

    tick();

    function tick() {
        // rendering
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}