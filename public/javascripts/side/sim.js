var dependencies =[
    "globalVar.js",
    "data.js",
    "grid.js",
    "grouping.js",
    "window.js"
]
for(idx in dependencies){
    var dependency = dependencies[idx]
    console.log("dependency: " + dependency)
    $.getScript('/javascripts/side/sim/'+dependency,function(){console.log(dependency+' is loaded')})
}

function run(){
    
    deleteDrones()
    deleteAreas()
    deleteCells()
    deleteMarkers()
    g_clusteredNodes = []
    g_clusteredNodesMap = new Map()
    g_filteredNodes = [] 
    g_drones = []
    reload()

    getTest()
    addServiceArea(true)
}
