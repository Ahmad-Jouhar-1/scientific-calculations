import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import "./style.css";

const canvas = document.querySelector("canvas.threejs");

//---------------------Scene-----------------------------------------------------------------------------------------

const scene = new THREE.Scene();

//--------------------Camera-----------------------------------------------------------------------------------------

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
camera.position.set(20, 2, 20);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//-------------------controls-----------------------------------------------------------------------------------------

const controls = new OrbitControls(camera, canvas);
controls.target.set(15, 2, 15);
controls.enableDamping = true;


//------------------Environment----------------------------------------------------------------------------------------

const rgbeLoader = new RGBELoader();

rgbeLoader.load("static/HDRIs/sky.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
});

//--------------------3D Model------------------------------------------------------------------------------------------

const rocketAxesHelper = new THREE.AxesHelper(5);

let rocket = null;
let launcherArm = null;
let launcherBase = null;

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "static/models/environment.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    rocket = model.getObjectByName("rocket");
    launcherArm = model.getObjectByName("launcher_arm");
    launcherBase = model.getObjectByName("launcher_base");

    if (rocket) {
      rocket.add(rocketAxesHelper);
      console.log("Found rocket", rocket);
    } else {
      console.warn("Rocket not found!");
    }
  },
  (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
  (error) => console.error("An error happened:", error)
);

//----------------Keyboard Listeners------------------------------------------------------------------------------------------

const keysPressed = {
  w: false,
  a: false,
  s: false,
  d: false,
};

document.addEventListener("keydown", (event) => {
  keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
  keysPressed[event.key.toLowerCase()] = false;
});

//-------------------Renderer----------------------------------------------------------------------------------------

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const pixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio);

const moveSpeed = 0.02; 

let launcherArmCurrentRotation = 0;
const launcherArmMaxRotation = THREE.MathUtils.degToRad(50);
const launcherArmMinRotation = -THREE.MathUtils.degToRad(40);

let LauncherBaseCurrentRotation = 0;

const launcherBaseMaxRotation = THREE.MathUtils.degToRad(90);
const launcherBaseMinRotation = -THREE.MathUtils.degToRad(90);

const renderLoop = () => {
  controls.update();
  if (launcherArm) {
    if (keysPressed["w"]) {
      if(launcherArmCurrentRotation + moveSpeed <=launcherArmMaxRotation) {
        launcherArm.rotateOnAxis(new THREE.Vector3(1, 0, 0), moveSpeed);
        launcherArmCurrentRotation +=moveSpeed;
      }
    }
    if (keysPressed["s"]) {
      if(launcherArmCurrentRotation - moveSpeed >= launcherArmMinRotation){
        launcherArm.rotateOnAxis(new THREE.Vector3(1, 0, 0), -moveSpeed);
        launcherArmCurrentRotation -= moveSpeed;
      }
    }
  }

  if (launcherBase) {
    if (keysPressed["a"]) {
      if(LauncherBaseCurrentRotation + moveSpeed<=launcherBaseMaxRotation){
        launcherBase.rotateOnAxis(new THREE.Vector3(0, 1, 0), moveSpeed);
        LauncherBaseCurrentRotation +=moveSpeed;
      }
    }
    if (keysPressed["d"]) {
      if(LauncherBaseCurrentRotation - moveSpeed>=launcherBaseMinRotation){
        launcherBase.rotateOnAxis(new THREE.Vector3(0, 1, 0), -moveSpeed);
        LauncherBaseCurrentRotation -=moveSpeed;
      }
    }
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();
