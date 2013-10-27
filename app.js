var express = require('express');
var request = require('request');
var app = express();

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname));


  
app.get('/', function(req,res){
  res.redirect("static/index.html");
});

app.get('/chipotle', function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  var accessToken = 'HD2PQQBPMTSA2RR0TNG52T4XRHQKON0BRK0QUZW4BOM42YGV';
  var User = "https://api.foursquare.com/v2/users/self/checkins?oauth_token=" + accessToken + "&v=20131023&limit=200";
  request.get(User, function(err, response, body) {
    if(err){
      console.log(err);
      res.send(500);
    }
    var checkins = JSON.parse(body).response.checkins.items;
    var currentTime = new Date();
    var minutesSinceCheckin;
    checkins.some(function(e,i,a){
      if(e.venue.name.indexOf("Chipotle")!=-1){
        var time = e.createdAt;
        minutesSinceCheckin = (currentTime.getTime() / 1000 - time) / 60;
        return 1;
      }
    });

    var text;
    if(minutesSinceCheckin != undefined){
      var days = Math.floor(minutesSinceCheckin / 1440);
      var hours = Math.floor(minutesSinceCheckin / 60);
      if(hours==0){
        text = "It has been "+minutesSinceCheckin+" minutes since Jackson has been to Chipotle";
      }
      else if(days==0){
        text = "It has been "+hours+" hours since Jackson has been to Chipotle";
      }
      else{
        text = "It has been "+days+" days since Jackson has been to Chipotle";
      }
      
    }
    else{
      text = "You have not checked into Chipotle in a lonnngggg time";
    }
    console.log(text);
    res.send({data:text});
  });
});

var port = process.env.PORT || 8000;
app.listen(port);

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
