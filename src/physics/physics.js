import Vector3D from "./library";
import PhysicHelper from "./physics_helper";

class Projectile {
  constructor() {
    this.helper = new PhysicHelper();
    this.vector3 = new Vector3D();

    //الخصائص الأولية لإطلاق القذيفة(ظروف الإطلاق)
    this.v0 = 15;
    this.azimuth = 0;
    this.elevation = 0;
    this.azimuthRad = this.helper.degToRed(this.azimuth);
    this.elevationRad = this.helper.degToRed(this.elevation);

    //خصائص المقذوف
    this.mass = 50;

    this.radius = 5;

    this.A = this.helper.calculateArea(this.radius);

    this.dragCoefficient = 0.47;

    //خصائص المحيط الفيزيائي
    this.airDensity = 1.225;

    this.gravity = 9.81;

    this.wind_speed = new Vector3D(0, 0, 0);

    this.wind_angle = 0;

    this.velocity = new Vector3D(
      this.v0 * Math.cos(this.elevationRad) * Math.cos(this.azimuthRad),
      this.v0 * Math.sin(this.elevationRad),
      this.v0 * Math.sin(this.azimuthRad) * Math.cos(this.elevationRad)
    );
    this.groundHight = 0;

    this.position = new Vector3D(0, this.groundHight, 0);

    this.acceleration = new Vector3D();
    //السرعة النسبية
    this.velocity_rel = this.velocity.clone().subVector(this.wind_speed);
    //اعلى ارتفاع
    this.maxHeight = this.position.y;
  }

  update(deltaTime) {
    // تحديث القوى والتسارع
    this.velocity_rel = this.velocity.clone().subVector(this.wind_speed);
    const totalF = this.totalForce();
    this.acceleration = totalF.divideScalar(this.mass);

    // تحديث السرعة والموقع
    this.velocity = this.velocity.addVector(
      this.acceleration.clone().multiplyScalar(deltaTime)
    );
    this.position = this.position.addVector(
      this.velocity.clone().multiplyScalar(deltaTime)
    );

    if (this.elevation > 0) {
      if (this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.set(0, 0, 0);
        this.acceleration.set(0, 0, 0);
        return;
      }
    }

    if (this.elevation === 0) {
      if (this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.y = 0;
        this.acceleration.y = 0;
        if (
          Math.abs(this.velocity.x) < 0.1 &&
          Math.abs(this.velocity.z) < 0.1
        ) {
          this.velocity.set(0, 0, 0);
          this.acceleration.set(0, 0, 0);
        }
      }
    }

    if (this.position.y > this.maxHeight) {
      this.maxHeight = this.position.y;
    }
  }
  weight_force() {
    return new Vector3D(0, -1 * this.gravity * this.mass, 0);
  }
  drag_force() {
    const speed = this.velocity_rel.magnitude();
    if (speed === 0) {
      return new Vector3D(0, 0, 0);
    }
    let magnitude =
      0.5 * this.airDensity * this.dragCoefficient * this.A * speed * speed;
    let direction = this.velocity_rel.normalize().multiplyScalar(-1);
    return direction.multiplyScalar(magnitude);
  }

  totalForce() {
    var totalF = new Vector3D();
    totalF = totalF.addVector(this.weight_force());
    totalF = totalF.addVector(this.drag_force());
    return totalF;
  }

  updateAzimuth(azimuth) {
    this.azimuth = -azimuth;
    this.azimuthRad = this.helper.degToRed(-azimuth);
    this.updateVelocity();
  }

  updateElevation(elevation) {
    this.elevation = elevation;
    this.elevationRad = this.helper.degToRed(elevation);
    this.updateVelocity();
  }

  updateVelocity() {
    this.velocity = new Vector3D(
      this.v0 * Math.cos(this.elevationRad) * Math.cos(this.azimuthRad),
      this.v0 * Math.sin(this.elevationRad),
      this.v0 * Math.sin(this.azimuthRad) * Math.cos(this.elevationRad)
    );
    this.velocity_rel = this.velocity.clone().subVector(this.wind_speed);
  }

  updatePosition(position) {
    this.position = position.clone();
    this.maxHeight = position.y;
  }

  updateRadius(radius){
    this.radius = radius;
    this.A = this.helper.calculateArea(radius);
  }

  updateV0(v0){
    this.v0 = v0;
    this.updateVelocity();
  }

  updateMass(mass){
    this.mass = mass;
  }
}

export default Projectile;
