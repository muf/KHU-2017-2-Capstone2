

function getData(){
    $.ajax({
    type: 'GET',     
    url: '/getClusteredCsvData',
    dataType:'json',
    success: function (result) {
        globalTemp = result; // get clustered csv data

        for(var idx = 1; idx < globalTemp.length; idx++){
            var lng = globalTemp[idx][0]
            var lat = globalTemp[idx][1]
            var label_number = markers.length 
            add(lat, lng,[],label_number,0);  // insert to map array as all same pin color

      
        }
        if(globalTemp.length != 0){
            map.setCenter({lat: parseFloat(globalTemp[1][1]), lng: parseFloat(globalTemp[1][0])}); 
        }
        reload()

    },
    fail:function (result) {
        alert("ERROR : sim.js \n FUNCTION : getTest() ");
    }
});
}

function getTest(){
    console.log("getTest()")
    $.ajax({
    type: 'GET',     
    url: '/getClusteredCsvData',
    dataType:'json',
    success: function (result) {
        globalTemp=result; //  get clustered csv data
        confirmed_nodes = []
        cluster_result = new Map()
        cluster_result["keys"] = []

        for(var idx = 1; idx < globalTemp.length; idx++){
            var cluster_number = Number(globalTemp[idx][2])
            var lng = globalTemp[idx][0]
            var lat = globalTemp[idx][1]
            var label_number = markers.length
            
            if(cluster_number!=0){
                add(lat, lng,[],label_number,cluster_number);  
                globalTemp[idx].push(label_number)
                confirmed_nodes.push(globalTemp[idx])
            }

            if(!cluster_result[cluster_number]){
                cluster_result[cluster_number]=[]
                cluster_result["keys"].push(cluster_number)

            }
            cluster_result[cluster_number].push(globalTemp[idx])
      
        }
        if(globalTemp.length != 0){
            map.setCenter({lat: parseFloat(globalTemp[1][1]), lng: parseFloat(globalTemp[1][0])}); 
        }
        reload()

    },
    fail:function (result) {
        alert("ERROR : sim.js \n FUNCTION : getTest() ");
    }
});
}