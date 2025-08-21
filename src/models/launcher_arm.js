import * as THREE from "three";

export default class LauncherArm{
    constructor(mesh){
        this.mesh = mesh;
        
        this.elevation = 0;
        this.minElevation = 0;
        this.maxElevation = 90;
    }

    updateElevation(elevation){
        const clamped = THREE.MathUtils.clamp(elevation,this.minElevation,this.maxElevation);
        const delta = THREE.MathUtils.degToRad(clamped - this.elevation);
        this.mesh.rotateOnAxis(new THREE.Vector3(0,0,1),delta);
        this.elevation = clamped;
    }
}