
var mapHandlerObject = function(){
  // @ attribute
  this.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.497908, lng: 127.027619},
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    disableDoubleClickZoom: true
  });
  this.markers = []
  this.markers.clusters = new Map()
  this.markers.clusters.size = function(){
    var len = 0
    this.markers.clusters.forEach(function(cluster){
      len += cluster.length
    })
    return len
  }
  this.nextLabel = 0
  this.map.clicked = false

  // @ method
  this.addMarker = function(lat, lng, node, cluster){
    marker_icon_list = []
    marker_icon_list.push('../icon/01.png')
    marker_icon_list.push('../icon/02.png')
    marker_icon_list.push('../icon/03.png')
    marker_icon_list.push('../icon/04.png')
    marker_icon_list.push('../icon/05.png')

    var image = {
      url : marker_icon_list[cluster],
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize : new google.maps.Size(30, 32),
      // The origin for this image is (0, 0).
      origin : new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor : new google.maps.Point(0, 32)
    } // var image
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat,lng),
      title : JSON.stringify(node),
      label : ""+this.nextLabel,
      icon : image,
      node : node,
      cluster : cluster
     
    }) // var marker
    this.nextLabel += 1

    google.maps.event.addListener(marker, "click", function(event) {
      alert(JSON.stringify(marker.node))
    })
    // this.markers.push(marker)

    if(!this.markers.clusters.has(cluster)){
      this.markers.clusters.set(cluster,[])
      this.markers.clusters.get(cluster).key = cluster
      this.markers.clusters.get(cluster).bounds={lng:{min:1000, max:-1000}, lat: {min:1000, max:-1000}}
    }
    this.markers.clusters.get(cluster).push(marker)
    if(lat < this.markers.clusters.get(cluster).bounds.lat.min){
      this.markers.clusters.get(cluster).bounds.lat.min = lat
    }
    if(lat > this.markers.clusters.get(cluster).bounds.lat.max){
      this.markers.clusters.get(cluster).bounds.lat.max = lat
    }
    if(lng < this.markers.clusters.get(cluster).bounds.lng.min){
      this.markers.clusters.get(cluster).bounds.lng.min = lng
    }
    if(lng > this.markers.clusters.get(cluster).bounds.lng.max){
      this.markers.clusters.get(cluster).bounds.lng.max = lng
    }
    var bounds = {
        north: this.markers.clusters.get(cluster).bounds.lat.max,
        south: this.markers.clusters.get(cluster).bounds.lat.min,
        east: this.markers.clusters.get(cluster).bounds.lng.max,
        west: this.markers.clusters.get(cluster).bounds.lng.min
    };
    var item = new google.maps.Rectangle({
      bounds: bounds,
      editable: false
    });

    this.markers.clusters.get(cluster).area = item
    google.maps.event.addListener(item, "rightclick", function(event) {
        deleteRectangle(container, item)
    });

  } // addMarker
  this.showMapElement = function(element){
    element.setMap(null)
  }
  this.hideMapElement = function(element){
    element.setMap(this.map)
  }
  this.reload = function(map){
    this.markers.clusters.forEach(function(cluster){
      cluster.forEach(marker => marker.setMap(map))
    }) 
  }// reload
  this.emptyMarkers = function(map){
    this.markers.clusters.forEach(function(cluster){
      cluster.forEach(marker => marker.setMap(null))
    }) 
    this.markers = []
  }//emptyMarkers

  // 특정 아이템을 컨테이너에서 제거.(map에서도 제거)
  function removeItem(container, item){
    var idx = findItem(container, item)
    container[idx].setMap(null)
    container.splice(idx,1)
  }
  // 특정 컨테이너에서 item의 인덱스를 찾아서 반환
  function findItem(container, item) { 
    for(idx in container){
        if(container[idx] == item){
            return idx
        }
    }
    return -1
  }
  // @ listener
  google.maps.event.addListener(this.map, "rightclick", function(event) {

    if(this.selected == true){
      this.lat2 = event.latLng.lat();
      this.lng2 = event.latLng.lng();
      var distance = distanceTo(this.lat1, this.lng1, this.lat2, this.lng2) * 1000;
      alert("거리 : " + distance + "m")
      this.selected = false;
    }
    else{
      alert("거리 측정!")
      this.lat1 = event.latLng.lat();
      this.lng1 = event.latLng.lng();
      this.selected = true;
    }
  }) 

}
