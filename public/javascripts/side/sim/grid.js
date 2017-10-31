

// cell 배열을 만들고 노드들을 해당하는 cell에 삽입
function makeGridArray(){
    if(areas.length==0){
        return ;
    } 
    var meter = 0.00001
    var xTimes = 1000000

    rX0 =  areas[0].getBounds().b.b
    rXM =  areas[0].getBounds().b.f
    rY0 =  areas[0].getBounds().f.b
    rYM =  areas[0].getBounds().f.f

    
    X0 =  Math.floor(areas[0].getBounds().b.b * xTimes)
    XM =  Math.floor(areas[0].getBounds().b.f * xTimes)
    Y0 =  Math.floor(areas[0].getBounds().f.b * xTimes)
    YM =  Math.floor(areas[0].getBounds().f.f * xTimes)

    gridSize = 10 * meter * xTimes;

    arrXSize =  Math.floor( (YM-Y0) / gridSize ) + 1
    arrYSize =  Math.floor( (XM-X0) / gridSize ) + 1

    gridArray = []
    // init
    gridArray = new Array(arrXSize); // 매개변수는 배열의 크기
    for (var i = 0; i < arrXSize; i++) {
        gridArray[i] = new Array(arrYSize); // 매개변수는 배열의 크기
        for(var j = 0; j < arrYSize; j++){
            gridArray[i][j] = []
        }
    }
    // allocate
    for (var i = 0; i < confirmed_nodes.length; i++){
        var Yarr = Math.floor((Math.floor(confirmed_nodes[i][0] * xTimes) - X0) / gridSize) + 1
        var Xarr = arrXSize - Math.floor((Math.floor(confirmed_nodes[i][1] * xTimes) - Y0) / gridSize) -1
        // console.log("X:"+Xarr+" / Y: "+Yarr + " / label : "+confirmed_nodes[i][3])
        gridArray[Xarr][Yarr].push(confirmed_nodes[i])
    }

    printGrid()

}
// 서비스 제공 영역 제공. auto 입력시 여의도에 지정된 영역으로 설정
function addServiceArea( auto=true){
    var lat = map.center.lat()
    var lng = map.center.lng()
    var meter = 0.00001
    var bounds 
    if(auto == true){
        bounds = {
            north: 37.5294352615257,
            south: 37.52559357117715,
            east: 126.92895349805713,
            west: 126.92169392392998
          };
    }
    else{
        bounds = {
            north: lat + meter * 10,
            south: lat - meter * 10,
            east: lng + meter * 10,
            west: lng - meter * 10
          };
    }

    // Define a rectangle and set its editable property to true.
    var area = new google.maps.Rectangle({
        bounds: bounds,
        editable: true,
        draggable: true
    });
    area.setMap(map);

    areas.push(area)

    google.maps.event.addListener(area, "rightclick", function(event) {
        deleteServiceArea(area)
    });

}

// cell 배열 출력
function printGrid(){
    var stringStream = ""
    var total = 0
    for(var i = 0; i < arrXSize; i++){
        for(var j = 0; j < arrYSize; j++){
              if(gridArray[i][j].length==0) stringStream += "-"
            else{
                total += gridArray[i][j].length
                stringStream += ( gridArray[i][j].length )
            }
        }
    stringStream += "\n"
    }
    console.log(stringStream)
    console.log("total nodes : "+total)

}

function drawCell(i,j,){
    var lng = rX0+j*0.00001 * 10 
    var lat = rY0+i*0.00001 * 10
    var meter = 0.00001
    var width = meter * 10
    var bounds = {
        north: lat + width,
        south: lat,
        east: lng + width,
        west: lng
      };
    // Define a rectangle and set its editable property to true.
    var cell = new google.maps.Rectangle({
        bounds: bounds,
        editable: false
    });
    cell.setMap(map);

    cells.push(cell)
    google.maps.event.addListener(cell, "rightclick", function(event) {
        deleteCell(cell)
    });
}
function drawCells(){
    for(var i = 0; i < arrXSize; i++){
        for(var j = 0; j < arrYSize; j++){
            drawCell(i,j)
        }
    }
   
}



function deleteCell(cell){
    var idx = findCell(cell)
    cells[idx].setMap(null)
    cells.splice(idx,1)
}
function deleteCells(){
    for(idx in cells){
        deleteCell(idx)
    }
    cells = []
}
function deleteServiceArea(area){
    var idx = findServiceArea(area)
    areas[idx].setMap(null);
    areas.splice(idx,1)
}
function deleteServiceAreas(){
    
    for(idx in areas){
        deleteServiceArea(idx)
    }
    areas = []
}


function findServiceArea(area) { 
    for(idx in areas){
        if(areas[idx] == area){
            return idx
        }
    }
    return -1
}
function findCell(cell) { 
    for(idx in cells){
        if(cells[idx] == cell){
            return idx
        }
    }
    return -1
}