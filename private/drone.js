s   console.log("drone takeoff")
        bebop_drone.takeOff();
    }

    this.land = function () {
        console.log("drone land")
        bebop_drone.land();
    }

    this.get_gps = function () {
        console.log("get current gps")
        bebop_drone.GPSSettings.resetHome();
        bebop_drone.WifiSettings.outdoorSetting(1);

        bebop_drone.on("PositionChanged", function (data) {
            console.log(data);
        });
        bebop_drone.on("FlyingStateChangedg", function (data) {
            console.log(data);
        });
    }

    this.fighting_plan_test = function () {
        var alreadyFlying = false;
        bebop_drone.on("GPSFixStateChanged", function (data) {
            console.log("GPSFixStateChanged", data);
        });

        bebop_drone.on("MavlinkPlayErrorStateChanged", function (data) {
            console.log("MavlinkPlayErrorStateChanged", data);
        });

        bebop_drone.on("MavlinkFilePlayingStateChanged", function (data) {
            console.log("MavlinkFilePlayingStateChanged", data);
        });

        bebop_drone.on("AvailabilityStateChanged", function (data) {
            console.log("AvailabilityStateChanged", data);
            if (data.AvailabilityState === 1 && !alreadyFlying) {
                alreadyFlying = true;
                bebop_drone.Mavlink.start("/data/ftp/internal_000/flightplans/flightPlan.mavlink", 0);
            }
        });

        bebop_drone.on("ComponentStateListChanged", function (data) {
            console.log("ComponentStateListChanged", data);
        });

        bebop_drone.on("ready", function () {
            console.log("ready");
        });

        bebop_drone.on("battery", function (data) {
            console.log(data);
        });

        bebop_drone.on("landed", function () {
            console.log("landed");
        });

        bebop_drone.on("takingOff", function () {
            console.log("takingOff");
        });

        bebop_drone.on("hovering", function () {
            console.log("hovering");
        });

        bebop_drone.on("FlyingStateChanged", function () {
            console.log("FlyingStateChanged");
        });

        bebop_drone.on("BatteryStateChanged", function () {
            console.log("BatteryStateChanged");
        });

        bebop_drone.on("flying", function () {
            console.log("flying");
        });

        bebop_drone.on("landing", function () {
            console.log("landing");
        });

        bebop_drone.on("unknown", function (data) {
            console.log("unknown", data);
        });
    }



}

module.exports = drone