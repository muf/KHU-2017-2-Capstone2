
window.addEventListener("keypress",function(e){
    if(e.key =='b'||e.key=='B'){
        getTest()
     }
     else if(e.key =='n'||e.key=='N'){
        addServiceArea()
     }
     else if (e.key=='v' || e.key=='V'){
         makeGridArray()
     }
     else if(e.key=='c' || e.key=='C'){
        addCells()
     }
     else if(e.key=='g' || e.key=='G'){
        groupNodes()
     }
     else if(e.key=='r' || e.key=='R'){
        run()
     }
})