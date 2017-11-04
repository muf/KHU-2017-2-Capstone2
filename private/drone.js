function drone (){
    var bebop = require('node-bebop');
    var bebop_drone
   
    this.init = function(){
        console.log("drone_init & takeoff")
        bebop_drone = bebop.createClient();
    }

    this.takeoff = function(){
        console.log("drone takeoff")
        drone.connect(function() {
            drone.takeOff();
          });
    }

    this.land = function(){
        console.log("drone takeoff")
        drone.connect(function() {
            drone.land();
          });
    }
}

module.exports = drone