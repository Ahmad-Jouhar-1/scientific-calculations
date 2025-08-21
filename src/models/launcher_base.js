import * as THREE from "three";

export default class LauncherBase{
    constructor(mesh){
        this.mesh = mesh;

        this.azimuth = 0;
        this.minAzimuth = -90;
        this.maxAzimuth = 90;
    }

    updateAzimuth(azimuth){
        const clamped = THREE.MathUtils.clamp(azimuth,this.minAzimuth,this.maxAzimuth);
        const delta = THREE.MathUtils.degToRad(clamped - this.azimuth);
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0),delta);
        this.azimuth = clamped;
    }

    updatePosition(position){
        this.mesh.position.copy(position);
    }

    updateHeight(height){
        this.mesh.translateOnAxis(new THREE.Vector3(0, 1, 0), 0);
        this.mesh.translateOnAxis(new THREE.Vector3(0, 1, 0), height);
    }
}