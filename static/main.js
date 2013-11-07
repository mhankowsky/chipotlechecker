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
      url: "/chipotle",
      dataType: "JSON",
      success: function(response){
        console.log(response.data);
        $(".data").html(response.data);
      }
  });
}

