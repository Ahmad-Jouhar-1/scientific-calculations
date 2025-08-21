class PhysicHelper {
    degToRed(deg){
        return deg*Math.PI/180;
    }
    calculateArea(radius){
        return Math.PI*radius*radius;
    }
}
export default PhysicHelper;