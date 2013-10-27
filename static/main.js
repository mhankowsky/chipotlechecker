$(document).ready(function() {
  console.log("Update");
  update();
  $("#update").click(function() {
    update();
  });

});

function update() {
  $.ajax({
      type: "GET",
      url: "http://jackson-chiptole.herokuapp.com/chipotle",
      dataType: "JSON",
      success: function(response){
        console.log(response.data);
        $(".data").html(response.data);
      }
  });
}


//code from http://www.movable-type.co.uk/scripts/latlong.html
function calculateDistance(lon1, lat1) {
  // approximate coordinates of the UC
  var lon2 = -79.942092;
  var lat2 = 40.443078;
  var R = 6371; // km
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var lat1 = lat1 * Math.PI / 180;
  var lat2 = lat2 * Math.PI / 180;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}
