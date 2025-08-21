import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import GUI from "lil-gui";
import Projectile from "./physics/physics";
import Vector3D from "./physics/library";
import Rocket from "./models/rocket";
import LauncherArm from "./models/launcher_arm";
import LauncherBase from "./models/launcher_base";
import LauncherStand from "./models/launcher_stand";
import "./style.css";
import { HDRLoader } from "./loaders/hdr_loader";
import ModelLoader from "./loaders/model_loader";

const canvas = document.querySelector("canvas.threejs");

const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
camera.position.set(-10, 10, 10);
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, canvas);
controls.target.set(15, 0, 0);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const pixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio);

const hdrLoader = new HDRLoader(scene);
hdrLoader.load("static/hdrs/sky.hdr");

const modelLoader = new ModelLoader(scene,camera,renderer,controls);
modelLoader.load("static/models/environment.glb");

