import * as THREE from "three";
("use strict");

class Vector3D {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  } // Addition

  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone() {
    return new Vector3D(this.x, this.y, this.z);
  }

  addVector(vector) {
    return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  } // Subtraction

  addScalar(scalar) {
    return new Vector3D(
      (this.x += scalar),
      (this.y += scalar),
      (this.z += scalar)
    );
  }

  subVector(vector) {
    return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  } 

  multiplyScalar(scalar) {
    return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
  } // Division by scalar
  
  multiply(vector) {
    return new Vector3D(this.x * vector.x, this.y * vector.y, this.z * vector.z);
  } 

  divideScalar(scalar) {
    return new Vector3D(this.x / scalar, this.y / scalar, this.z / scalar);
  } 
  // Dot product
  dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }
//لحساب الزاوية بين شعاعين
  angle(front) {
    var AB = this.dot(front);
    var t = this.magnitude();
    var n = front.magnitude();

    var tn = t * n;
    if (tn < 0.001) {
      return 0;
    } else {
      var cost = AB / (t * n);
      return Math.acos(cost);
    }
  }
//شعاع ثالث عمودي على شعاعين
  cross(vector) {
    const x = this.y * vector.z - this.z * vector.y;
    const y = this.z * vector.x - this.x * vector.z;
    const z = this.x * vector.y - this.y * vector.x;
    return new Vector3D(x, y, z);
  } // length of the vector
//قيمة الشعاع
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  } // Normalize the vector
//قيمة الشعاع مربع
  magnitudeSqu() {
    return this.magnitude() * this.magnitude();
  }

  normalize() {
    const mag = this.magnitude();
    return mag > 0 ? this.divideScalar(mag) : new Vector3D(0,0,0);
  }

  toString() {
    console.log("The Vector is :"+this.x + "  , " + this.y + "  , " + this.z);
  }




}

export default Vector3D;
