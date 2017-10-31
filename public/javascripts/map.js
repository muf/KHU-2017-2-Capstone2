

var map; 
var markers=[];
var tempMarker=0;
var infowindow;


var clicked=false;
var dist_coords = [];

function initMap(){

    map = new google.maps.Map(document.getElementById('map'), {
      // center: {lat: 37.243109, lng: 127.082902},

    center: {lat: 37.497908, lng: 127.027619},
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true
  });
  


  google.maps.event.addListener(map, "rightclick", function(event) {
    //console.log(event)
  var lat = event.latLng.lat();
  var lng = event.latLng.lng();
  // populate yor box/field with lat, lng
  //console.log("This is map " + "lat: " + lat + ", lng: " + lng);
  if(selected==true){
    lat2 = lat;
    long2 = lng;
    var _distance = distanceTo(lat1,long1,lat2,long2);
    alert("거리 : "+_distance+"km")
    selected = false;
  }
  else{
    alert("거리 측정!")
    lat1 = lat;
    long1 = lng;
    selected = true;
  }
  }); 
  google.maps.event.clearListeners(map, 'dblclick')
  google.maps.event.addListener(map, "dblclick", function(event) {
    //console.log(event)
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    //alert("("+lat+","+lng+")")
    console.log(lat+","+lng)
    make_rand_sample(lat, lng, markers.length, 0)
    map.setZoom(map.getZoom()-1)
  }); 
  
  
}
var lat1;
var long1;
var lat2;
var long2;
var selected = false;

function add(lat,long,_list,label,i){
  marker_icon_list = []
  marker_icon_list.push('../icon/01.png')
  marker_icon_list.push('../icon/02.png')
  marker_icon_list.push('../icon/03.png')
  marker_icon_list.push('../icon/04.png')
  marker_icon_list.push('../icon/05.png')

   var image = {
    url:marker_icon_list[i],
    // This marker is 20 pixels wide by 32 pixels high.
    scaledSize: new google.maps.Size(30, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  var _title
  if(_list[1]==undefined){
    _title = JSON.stringify(_list)
  }
  else{
    _title = JSON.stringify(_list[1])

  }
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat,long),
    title:_title,
    label:""+label,
    icon : image,
    node : _list
    
  });
  google.maps.event.addListener(marker, "click", function(event) {
    alert(JSON.stringify(marker.node))
    //console.log(marker.title).
  });
  google.maps.event.addListener(marker, "rightclick", function(event) {
  var lat = event.latLng.lat();
  var lng = event.latLng.lng();
  //console.log("This is marker " + "Lat=" + lat + "; Lng=" + lng).
  if(selected==true){
    lat2 = lat;
    long2 = lng;
    var _distance = distanceTo(lat1,long1,lat2,long2);
    alert("거리 : "+_distance*100+"m")
    selected = false;
  }
  else{
    alert("거리 측정!")
    lat1 = lat;
    long1 = lng;
    selected = true;
  }
  }); 

  markers.push(marker);
}

function deleteMarkers(){
  for(var i = 0; i <markers.length; i++){
    markers[i].setMap(null);
  }
  markers = []
}

function reload(){
  for(var i = 0; i <markers.length; i++){
    markers[i].setMap(map);
  }
}


// https://developers.google.com/maps/documentation/javascript/reference.




function distanceTo(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in kms
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function printMarkers(){
  var answer = "x, y\n"
  for ( idx in markers){
    //console.log(markers[idx].position.lat()+", "+markers[idx].position.lng());
    answer += markers[idx].position.lng()+", "+markers[idx].position.lat()+"\n"
  }
  console.log(answer)
}