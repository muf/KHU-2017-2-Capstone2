

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

function getNodeInfo(){
    console.log("getTest()")
    $.ajax({
    type: 'GET',     
    url: '/getNodeInfo',
    dataType:'json',
    success: function (result) {
        initMap()
        var node_info_list = result; //  get clustered csv data
        
        node_info_list.forEach(function(item){
            var node = {
                lat : item.lat, 
                lng : item.lng,  
                cluster : item.cluster,
                group : -1}

            mapHandler.addMarker(item.lat, item.lng, node, node.cluster)
        }) // node_info_list forEach
        
        mapHandler.reload(mapHandler.map)
        mapHandler.map.setCenter({lat: node_info_list[0].lat, lng: node_info_list[0].lng})
    },
    fail:function (result) {
        alert("ERROR : simulator.js \n FUNCTION : getNodeInfo() ");
    }
});
}