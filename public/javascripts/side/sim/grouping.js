
function groupNodes(){
    
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
                        bufferQueue.push({node:node, i:ini, j:inj, idx:idx, label:node[3]})
                    }

                    while(bufferQueue.length > 10){
                        aps.push([])
                        for(var cni = 0; cni < 10; cni++){ 
                            var item = bufferQueue[0] // 맨 앞 item pop
                            bufferQueue.splice(0,1) // 맨 앞 제거
                            aps[aps.length-1].push(item)
                            // gridArray에서도 제거
                            
                            for(idx in gridArray[item.i][item.j]){
                                if(gridArray[item.i][item.j][idx] == item.node){
                                    gridArray[item.i][item.j].splice(idx, 1)
                                }
                            }

                        }
                    }

                }
            }
        }
    }
    
}


function groupNodes2(){
    
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
                        bufferQueue.push({node:node, i:ini, j:inj, idx:idx, label:node[3]})
                    }

                    while(bufferQueue.length > 10){
                        aps.push([])
                        for(var cni = 0; cni < 10; cni++){ 
                            var item = bufferQueue[0] // 맨 앞 item pop
                            bufferQueue.splice(0,1) // 맨 앞 제거
                            aps[aps.length-1].push(item)
                            // gridArray에서도 제거
                            
                            for(idx in gridArray[item.i][item.j]){
                                if(gridArray[item.i][item.j][idx] == item.node){
                                    gridArray[item.i][item.j].splice(idx, 1)
                                }
                            }

                        }
                    }

                }
            }
        }
    }
    
}
