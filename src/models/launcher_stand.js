import * as THREE from "three";

export default class LauncherStand{
    constructor(mesh){
        this.mesh = mesh;
        
        this.height = 1;
        this.minHeight = 1;
        this.maxHeight = 5;

        this.position = this.mesh.position;
    }

    updateHeight(height){
        const clamped = THREE.MathUtils.clamp(height,this.minHeight,this.maxHeight);
        const delta = (clamped - this.height) * 10;
        this.mesh.scale.y += delta ;
        this.mesh.geometry.computeBoundingBox();
        const boundingBox = this.mesh.geometry.boundingBox;
        const relHeight = (boundingBox.max.y - boundingBox.min.y) * this.mesh.scale.y;
        this.height = clamped;
        return relHeight;
    }
}