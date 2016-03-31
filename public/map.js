var Map = function(center, zoom){
//need the script on html pade to get access to this. src="https://maps.googleapis.com/maps/api/js"
  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: zoom || 4

  });
  this.addMarker = function(latlng, label, title){    // with every instance of a new map allows us to add markers
    var marker = new google.maps.Marker({
      position: latlng, 
      map: this.googleMap,  
      label: label,
      title: title
      
    });
  
    return marker;
  }

  this.addInfoWindow = function(latlng, label, title){
    var marker = this.addMarker(latlng, label, title);
    marker.addListener('click', function(){
      var infoWindow = new google.maps.InfoWindow({
        content: this.title
      });
      infoWindow.open(this.map, marker)
    })

  }  
}