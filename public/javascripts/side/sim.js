var dependencies =[
    "globalVar.js",
    "data.js",
    "grid.js",
    "grouping.js",
    "window.js",
    "my.js"
]
for(idx in dependencies){
    var dependency = dependencies[idx]
    console.log("dependency: " + dependency)
    $.getScript('/javascripts/side/sim/'+dependency,function(){console.log(dependency+' is loaded')})
}

function run(){
    getTest()
    addServiceArea(true)
}
