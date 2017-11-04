function drone (){
    var bebop = require('node-bebop');

    var bebop_drone = bebop.createClient();
    this.init = function(){
        console.log("drone_init")
        bebop_drone.connect(function() {
            bebop_drone.takeOff();
          
            setTimeout(function() {
                bebop_drone.land();
            }, 5000);
          })
    }
}

module.exports = drone