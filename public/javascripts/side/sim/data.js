

function getData(){
    $.ajax({
    type: 'GET',     
    url: '/getClusteredCsvData',
    dataType:'json',
    success: function (result) {
        g_clusteredNodesArray = result; // get clustered csv data

        for(var idx = 1; idx < g_clusteredNodesArray.length; idx++){
            var lng = g_clusteredNodesArray[idx][0]
            var lat = g_clusteredNodesArray[idx][1]
            var label_number = markers.length 
            add(lat, lng,[],label_number,0);  // insert to map array as all same pin color

      
        }
        if(g_clusteredNodesArray.length != 0){
            map.setCenter({lat: parseFloat(g_clusteredNodesArray[1][1]), lng: parseFloat(g_clusteredNodesArray[1][0])}); 
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
        g_clusteredNodesArray=result; //  get clustered csv data
        confirmed_nodes = []
        g_clusteredNodesMap = new Map()
        g_clusteredNodesMap["keys"] = []

        for(var idx = 1; idx < g_clusteredNodesArray.length; idx++){
            var cluster_number = Number(g_clusteredNodesArray[idx][2])
            var lng = g_clusteredNodesArray[idx][0]
            var lat = g_clusteredNodesArray[idx][1]
            var label_number = markers.length
            
            if(cluster_number!=0){
                add(lat, lng,[],label_number,cluster_number);  
                g_clusteredNodesArray[idx].push(label_number)
                confirmed_nodes.push(g_clusteredNodesArray[idx])
            }

            if(!g_clusteredNodesMap[cluster_number]){
                g_clusteredNodesMap[cluster_number]=[]
                g_clusteredNodesMap["keys"].push(cluster_number)

            }
            g_clusteredNodesMap[cluster_number].push(g_clusteredNodesArray[idx])
      
        }
        if(g_clusteredNodesArray.length != 0){
            map.setCenter({lat: parseFloat(g_clusteredNodesArray[1][1]), lng: parseFloat(g_clusteredNodesArray[1][0])}); 
        }
        reload()

    },
    fail:function (result) {
        alert("ERROR : sim.js \n FUNCTION : getTest() ");
    }
});
}