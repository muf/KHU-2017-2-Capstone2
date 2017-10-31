


function groupNodes(){
    deleteDrones()
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
                    for(idx in gridArray[ini][inj]){
                        var node = gridArray[ini][inj][idx]
                        node.i = ini
                        node.j = inj
                        node.idx = idx
                        bufferQueue.push(node)
                    }

                    while(bufferQueue.length > 10){
                        g_drones.push([])
                        g_drones[g_drones.length-1].position = {lat: 0, lng:0}
                        var latSum = 0
                        var lngSum = 0

                        for(var cni = 0; cni < 10; cni++){ 
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
                        g_drones[g_drones.length-1].position.lat = latSum / 10
                        g_drones[g_drones.length-1].position.lng = lngSum / 10
                        drawDrones(g_drones[g_drones.length-1])
                        
                    }

                }
            }
        }
    }
    
}


function groupNodes2(){

}