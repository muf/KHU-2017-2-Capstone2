function drone (){
    var bebop = require('node-bebop');
    var bebop_drone = bebop.createClient();
   
    this.init = function(){
        console.log("drone_init & takeoff")
        bebop_drone.connect(function() {
            bebop_drone.takeOff();
        })
    }

    this.takeoff = function(){
        console.log("drone takeoff")
        bebop_drone.takeOff();
    }

    this.land = function(){
        console.log("drone land")
        setTimeout(function() {
            bebop_drone.land();
        }, 5000);
    }
}

module.exports = drone