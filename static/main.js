$(document).ready(function() {
  update();
  $("#update").click(function() {
    update();
  });

});

function update() {
  var accessToken = window.location.hash.split("=")[1];
  var User = "https://api.foursquare.com/v2/users/self/checkins?oauth_token=" + accessToken + "&v=20131023&limit=200";
  $.get(User, function(data, status) {
    console.log(data);
    var checkins = data.response.checkins.items;
    var currentTime = new Date();
    var minutesSinceCheckin;

    checkins.some(function(e,i,a){
      if(e.venue.name.indexOf("Chipotle")!=-1){
        var time = e.createdAt;
        minutesSinceCheckin = (currentTime.getTime() / 1000 - time) / 60;
        return 1;
      }
    });

    if(minutesSinceCheckin != undefined){
      var days = minutesSinceCheckin / 1440;

      $("#Min").text("Its has been "+days+" days since you have been to Chipotle according to fourSquare")
    }
    else{
      $("#Min").text("You have not checked into Chipotle in a lonnngggg time")
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
