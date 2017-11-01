

function getData(){
    $.ajax({
    type: 'GET',     
    url: '/getClusteredCsvData',
    dataType:'json',
    success: function (result) {
        g_clusteredNodes = result; // get clustered csv data

        for(var idx = 1; idx < g_clusteredNodes.length; idx++){
            var lng = g_clusteredNodes[idx][0]
            var lat = g_clusteredNodes[idx][1]
            var label_number = markers.length 
            add(lat, lng,[],label_number,0);  // insert to map array as all same pin color

      
        }
        if(g_clusteredNodes.length != 0){
            map.setCenter({lat: parseFloat(g_clusteredNodes[1][1]), lng: parseFloat(g_clusteredNodes[1][0])}); 
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
        g_clusteredNodes=result; //  get clustered csv data
        g_filteredNodes = []
        g_clusteredNodesMap = new Map()
        g_clusteredNodesMap["keys"] = []
        g_centerOfGravity.lat = 0
        g_centerOfGravity.lng = 0

        for(var idx = 1; idx < g_clusteredNodes.length; idx++){
            var cluster_number = Number(g_clusteredNodes[idx][2])
            var lng = Number(g_clusteredNodes[idx][0])
            var lat = Number(g_clusteredNodes[idx][1])
            var label_number = markers.length

            var node = {lat : lat, lng : lng, label_number : label_number, cluster_number : cluster_number, handle_number : -1}
            
            if(cluster_number!=0){
                add(lat, lng,node,label_number,cluster_number);  
                g_clusteredNodes[idx].push(label_number)
                g_filteredNodes.push(node)
                
                g_centerOfGravity.lat += lat
                g_centerOfGravity.lng += lng
            }

            if(!g_clusteredNodesMap[cluster_number]){
                g_clusteredNodesMap[cluster_number]=[]
                g_clusteredNodesMap["keys"].push(cluster_number)

            }
            g_clusteredNodesMap[cluster_number].push(node)
      
        }
        if(g_clusteredNodes.length != 0){
            map.setCenter({lat: parseFloat(g_clusteredNodes[1][1]), lng: parseFloat(g_clusteredNodes[1][0])}); 
        }
        
        g_centerOfGravity.lat /= g_filteredNodes.length
        g_centerOfGravity.lng /= g_filteredNodes.length

        reload()

    },
    fail:function (result) {
        alert("ERROR : sim.js \n FUNCTION : getTest() ");
    }
});
}