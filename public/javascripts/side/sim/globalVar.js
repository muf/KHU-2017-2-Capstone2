
var g_clusteredNodesMap = new Map()  // data from clustered csv data
var g_clusteredNodesArray       // data from unclustered csv data

var bufferQueue = [];           // buffer queue for saving temporary node data
var confirmed_nodes = []        // node data # removed noise data    

var drones = []   // name should be changed. this is rectangular shape for service area
var cells = []   // grid cells array for service area. # only uesd for drawing grid lines. not including node data.
var aps = []     // grouped cells array 

var gridArray;          // grid cell array for node data
var arrXSize, arrYSize  // gridArray length size # gridArray[arrXSize][arrYSize]


g_clusteredNodesMap["keys"] = []     
    
var meter = 0.00001  // 1 meter value in LAT/LNG stytem
var xTimes = 1000000 // xTimes for calculating relative values

var X0, XM, Y0, YM       // rectangle area for service # relative values
var rX0, rXM, rY0, rYM   // rectangle area for service # absolute values


var apCoverage = 100 * meter * xTimes    // drone ap coverage value # relative value
var gridSize                             // cell grid Size # relative value

