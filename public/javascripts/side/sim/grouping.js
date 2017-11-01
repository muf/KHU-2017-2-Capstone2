


function groupNodes(threshold=10){
    var apCoverageSize = apCoverage / gridSize
    for(var exi = 0; exi < arrXSize - apCoverageSize; exi++){
        for(var exj = 0; exj < arrYSize - apCoverageSize; exj++){  

            // 하나의 드론 영역 안에서의 작업
            bufferQueue = [];
            for(var ini = exi; ini < exi+apCoverageSize; ini++){
                for(var inj = exj; inj < exj+apCoverageSize; inj++){
                    // 하나의 cell 안에서의 작업
                    // 안에 있는 노드들을 buffer에 하나씩 (큐에) 삽입
                    // 이전에 남아있던 노드 뒤에 하나씩 추가된다
                    coreProcess(ini, inj, threshold)

                }
            }
        }
    }
    
}



function coreProcess(ini, inj,threshold=10){
    for(idx in gridArray[ini][inj]){
        var node = gridArray[ini][inj][idx]
        node.i = ini
        node.j = inj
        node.idx = idx
        bufferQueue.push(node)
    }

    while(bufferQueue.length > threshold){
        g_drones.push([])
        g_drones[g_drones.length-1].position = {lat: 0, lng:0}
        var latSum = 0
        var lngSum = 0

        for(var cni = 0; cni < threshold; cni++){ 
            var node = bufferQueue[0] // 맨 앞 item pop
            bufferQueue.splice(0,1) // 맨 앞 제거
            node.handle_number = g_drones.length-1
            g_drones[g_drones.length-1].push(node)
            latSum += node.lat
            lngSum += node.lng
            // gridArray에서도 제거
            for(idx in gridArray[node.i][node.j]){
                if(gridArray[node.i][node.j][idx] == node){
                    gridArray[node.i][node.j].splice(idx, 1)
                }
            }
        }
        // 실제 드론 위치 배정
        g_drones[g_drones.length-1].position.lat = latSum / threshold
        g_drones[g_drones.length-1].position.lng = lngSum / threshold
        drawDrones(g_drones[g_drones.length-1])
        
    }
}
// 4사분면으로 나누어서 중심 방향으로 진행
function groupNodes2(threshold=10){ 
    
    var apCoverageSize = apCoverage / gridSize
    var centerPoint = getXY(g_centerOfGravity.lat, g_centerOfGravity.lng) // {x,y}
    // 2사분면
    for(var exi = 0; exi <  centerPoint.x - apCoverageSize; exi++){
        for(var exj = 0; exj < centerPoint.y - apCoverageSize; exj++){  

            // 하나의 드론 영역 안에서의 작업
            bufferQueue = [];
            for(var ini = exi; ini < exi+apCoverageSize; ini++){
                for(var inj = exj; inj < exj+apCoverageSize; inj++){
                    // 하나의 cell 안에서의 작업
                    // 안에 있는 노드들을 buffer에 하나씩 (큐에) 삽입
                    // 이전에 남아있던 노드 뒤에 하나씩 추가된다
                    coreProcess(ini, inj)

                }
            }
        }
    }
    // 1사분면
    for(var exi = 0; exi <  centerPoint.x - apCoverageSize; exi++){
        for(var exj = arrYSize-apCoverageSize-1; exj > centerPoint.y; exj--){   

            // 하나의 드론 영역 안에서의 작업
            bufferQueue = [];
            for(var ini = exi; ini < exi+apCoverageSize; ini++){
                for(var inj = exj+apCoverageSize; inj > exj; inj--){
                    // 하나의 cell 안에서의 작업
                    // 안에 있는 노드들을 buffer에 하나씩 (큐에) 삽입
                    // 이전에 남아있던 노드 뒤에 하나씩 추가된다
                    coreProcess(ini, inj)

                }
            }
        }
    }
    // 3사분면
    for(var exi = arrXSize - apCoverageSize-1; exi > centerPoint.x ; exi--){
        for(var exj = 0; exj < centerPoint.y - apCoverageSize; exj++){  

            // 하나의 드론 영역 안에서의 작업
            bufferQueue = [];
            for(var ini = exi+apCoverageSize; ini > exi; ini--){
                for(var inj = exj; inj < exj+apCoverageSize; inj++){
                    // 하나의 cell 안에서의 작업
                    // 안에 있는 노드들을 buffer에 하나씩 (큐에) 삽입
                    // 이전에 남아있던 노드 뒤에 하나씩 추가된다
                    coreProcess(ini, inj)

                }
            }
        }
    }
    // 4사분면
    for(var exi = arrXSize - apCoverageSize-1; exi > centerPoint.x ; exi--){
        for(var exj = arrYSize-apCoverageSize-1; exj > centerPoint.y; exj--){   

            // 하나의 드론 영역 안에서의 작업
            bufferQueue = [];
            for(var ini = exi+apCoverageSize; ini > exi; ini--){
                for(var inj = exj+apCoverageSize; inj > exj; inj--){
                    // 하나의 cell 안에서의 작업
                    // 안에 있는 노드들을 buffer에 하나씩 (큐에) 삽입
                    // 이전에 남아있던 노드 뒤에 하나씩 추가된다
                    coreProcess(ini, inj, threshold)

                }
            }
        }
    }
    groupNodes(5)
    gridArray[centerPoint.x][centerPoint.y] = "center"
    
}

function groupNodes3(){
    
}