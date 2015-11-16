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
}