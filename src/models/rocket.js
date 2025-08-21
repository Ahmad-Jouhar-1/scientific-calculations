import * as THREE from "three";

export default class Rocket{
    constructor(mesh){
        this.mesh = mesh;

        this.radius = 5;
        this.minRadius = 1;
        this.maxRadius = 5;
    }

    updateRadius(radius){
        const clamped = THREE.MathUtils.clamp(radius,this.minRadius,this.maxRadius);
        const delta = (clamped - this.radius) * 0.1;
        this.mesh.scale.add(new THREE.Vector3(0, delta, delta));
        this.radius = clamped;
    }

    updatePosition(position){
        this.mesh.position.set(position.x, position.y, position.z);
    }
    
    updateDirection(direction){
        this.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0),direction);
    }
    
    transformToWorld(scene){
        scene.attach(this.mesh);
    }
    
    getWorldPosition() {
        this.mesh.updateMatrixWorld(true);
        const worldPosition = new THREE.Vector3();
        this.mesh.getWorldPosition(worldPosition);
        return worldPosition;
    }
}