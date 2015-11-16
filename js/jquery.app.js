// Your solution here

$(document).ready(function(){
  // get list of doughnuts on start
  getDoughnuts();
});

function getDoughnuts(){
  var doughnuts = $.get('https://api.doughnuts.ga/doughnuts').done(function(data){
    $.each(data, function(index, doughnut){
      addDoughnut(doughnut);
    });
  });
}

function addDoughnut(doughnut) {
  // new li elem
  var newElem = "<li data-id='" + doughnut.id + "' data-flavor='" + doughnut.flavor + "' data-style='"+ doughnut.style+"'>" + doughnut.flavor + " - <em>" + doughnut.style + "</em> - " + "<button class='edit btn btn-warning'>edit</button>" + "<button class='delete btn btn-danger'>delete</button>" + "</li>";

  // prepend the new li elem
  $("ul#doughnuts").prepend(newElem);

  // rebind buttons inside each doughnut element
  bindDelete();
}

function bindDelete() {
  $('button.delete').off().on('click', function(e){
    e.preventDefault();

    var elem = $(this).parent();
    var id = elem.data("id");
    var url = "https://api.doughnuts.ga/doughnuts/" + id;

    $.ajax({
      url: url,
      method: "delete",
      success: function(data, status){
        console.log("Deleted Dougnut");
        elem.remove();
      },
      error: function(data, status){
        console.log("Something went wrong", data, status);
      }
    });
  });
}