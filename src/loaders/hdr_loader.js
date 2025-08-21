import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";

export class HDRLoader{
    constructor(scene){
        this.scene = scene;
        this.rgbeLoader = new RGBELoader();
    }

    load(path){
        this.rgbeLoader.load(path, (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          this.scene.environment = texture;
          this.scene.background = texture;
        });
    }
}