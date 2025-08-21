import { GLTFLoader } from "three/examples/jsm/Addons.js";
import Rocket from "../models/rocket";
import LauncherArm from "../models/launcher_arm";
import LauncherBase from "../models/launcher_base";
import LauncherStand from "../models/launcher_stand";

import App from "../app";

export default class ModelLoader{
    constructor(scene,camera,renderer,controls){
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.controls = controls;
        this.gltfLoader = new GLTFLoader();
    }

    load(path){
        this.gltfLoader.load(path, (gltf) => {
          const model = gltf.scene;
          this.scene.add(model);
        
          const rocket = new Rocket(model.getObjectByName("rocket"));
          const launcherArm = new LauncherArm(model.getObjectByName("launcher_arm"));
          const launcherBase = new LauncherBase(model.getObjectByName("launcher_base"));
          const launcherStand = new LauncherStand(model.getObjectByName("launcher_stand"));

          const app = new App(this.scene,this.camera,this.renderer,this.controls,rocket,launcherArm,launcherBase,launcherStand);
        });
    }
}