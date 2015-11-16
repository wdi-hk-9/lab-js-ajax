// Your solution here

$(document).ready(function(){
  // get list of doughnuts on start
  getDoughnuts();

  // bind form to send data using ajax
  $('#edit-doughnut').on('submit', updateDoughnut);
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
  bindEditModal();
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

function bindEditModal() {
  // rebind all edit buttons
  $('button.edit').off().on('click', function(e){
    e.preventDefault();

    $('#edit-modal').modal("show");

    var elem = $(this).parent();
    var id = elem.data("id");
    var flavor = elem.data("flavor");
    var style = elem.data("style");

    $('#edit-doughnut').data("id", id);
    $('#edit-doughnut-flavor').val(flavor);
    $('#edit-doughnut-style').val(style);
  });
}

function updateDoughnut(e) {
  e.preventDefault();

  var id = $('#edit-doughnut').data("id");
  var url = 'https://api.doughnuts.ga/doughnuts/' + id;
  var doughnutElem = $('ul > li').filter('[data-id='+ id +']');
  var editDoughnutFlavor = $('#edit-doughnut-flavor');
  var editDoughnutStyle = $('#edit-doughnut-style');
  var doughnut = {
    flavor: editDoughnutFlavor.val(),
    style: editDoughnutStyle.val()
  };

  // create a put AJAX request
  $.ajax({
    url: url,
    data: doughnut,
    method: "put",
    success: function(data, status){
      console.log("Updated Doughnut");

      // remove old li and add new one
      doughnutElem.remove();
      addDoughnut(data);

      // clear our input box!
      editDoughnutFlavor.val(null);
      editDoughnutStyle.val(null);

      // hide the modal when done
      $('#edit-modal').modal("hide");
    },
    error: function(data, status){
      console.log("Something went wrong", data, status);
    }
  });
}