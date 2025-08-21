import GUI from "lil-gui";
import Projectile from "./physics/physics";
import Vector3D from "./physics/library";

export default class App{
    constructor(scene,camera,renderer,controls,rocket,launcherArm,launcherBase,launcherStand){
        this.scene = scene,
        this.camera = camera,
        this.renderer = renderer,
        this.controls = controls,

        this.rocket =rocket;
        this.launcherArm = launcherArm;
        this.launcherBase = launcherBase;
        this.launcherStand = launcherStand;

        this.projectile = new Projectile();
        this.isProjectileStarted = false;

        this.gui = new GUI();
        this.settings = {
            launcherArm:this.launcherArm.elevation,
            launcherBase:this.launcherBase.azimuth,
            launcherStand:this.launcherStand.height,
            rocket:this.rocket.radius,
            start:()=> this.startProjectile(),
        };
        this.addSettingsToGUI();

        this.renderLoop();
    }

    addSettingsToGUI(){
        this.gui.add(this.settings,'launcherArm',this.launcherArm.minElevation,this.launcherArm.maxElevation).onChange((elevation) => this.onElevationChange(elevation));
        this.gui.add(this.settings,'launcherBase',this.launcherBase.minAzimuth,this.launcherBase.maxAzimuth).onChange((azimuth) => this.onAizmuthChange(azimuth));
        this.gui.add(this.settings,'launcherStand',this.launcherStand.minHeight,this.launcherStand.maxHeight).onChange((height) => this.onHeightChange(height));
        this.gui.add(this.settings,'rocket',this.rocket.minRadius,this.rocket.maxRadius).onChange((radius) => this.onRadiusChange(radius));
        this.gui.add(this.settings,'start');
    }

    onElevationChange(elevation){
        this.launcherArm.updateElevation(elevation);
        if(!this.isProjectileStarted) this.projectile.updateElevation(elevation);
    }

    onAizmuthChange(azimuth){
        this.launcherBase.updateAzimuth(azimuth);
        if(!this.isProjectileStarted) this.projectile.updateAzimuth(azimuth);
    }

    onHeightChange(height){
        this.launcherBase.updatePosition(this.launcherStand.position);
        this.launcherBase.updateHeight(this.launcherStand.updateHeight(height));
    }

    startProjectile(){
        this.rocket.transformToWorld(this.scene);
        this.isProjectileStarted=true;
    }

    onRadiusChange(radius){
        this.rocket.updateRadius(radius);
        if(!this.isProjectileStarted) this.projectile.updateRadius(radius);
    }

    renderLoop(){

        if(this.isProjectileStarted){
            this.projectile.update(0.01);
            this.rocket.updatePosition(this.projectile.position);
            this.rocket.updateDirection(this.projectile.velocity_rel.clone().normalize());
        }

        const worldPosition = this.rocket.getWorldPosition();
        const position = new Vector3D(worldPosition.x,worldPosition.y,worldPosition.z);
        this.projectile.updatePosition(position);

        this.controls.update();
        this.renderer.render(this.scene,this.camera);
        window.requestAnimationFrame(() => this.renderLoop());
    }
}