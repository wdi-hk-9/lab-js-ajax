// Your solution here
$(function(){
  $.ajax('http://api.doughnuts.ga/doughnuts')
    .done(function(data){
      data.forEach(function(elem){
        $("#doughnuts").append("<li id='row-" + elem.id + "'>" + elem.style + " - <i>" + elem.flavor + "</i> - <button class='btn btn-success btn-edit' id='btn-edit-" + elem.id + "'>edit</button> <button class='btn btn-danger btn-delete' id='btn-delete-" + elem.id + "'>DELETE</button></li>")
      });
      registerButton();
    });

  $("#new-doughnut").on('submit',function(e){
    e.preventDefault();
    $.ajax('http://api.doughnuts.ga/doughnuts',{
      method: 'POST',
      data: {
        style: $("#new-doughnut-style").val(),
        flavor: $("#new-doughnut-flavor").val()
      }
    }).done(function(doughnut){
        $("#doughnuts").append("<li id='row-" + doughnut.id + "'>" + doughnut.style + " - <i>" + doughnut.flavor + "</i> - <button class='btn btn-success btn-edit' id='btn-edit-" + doughnut.id + "'>edit</button> <button class='btn btn-danger btn-delete' id='btn-delete-" + doughnut.id + "'>DELETE</button></li>")
        registerButton();
    })
  })

  $("#edit-doughnut").on('submit',function(e){
    e.preventDefault();
    var _id = $("#edit-doughnut-id").html()
    var updateData = $.ajax('http://api.doughnuts.ga/doughnuts/' + _id,{
      method: 'PUT',
      data: {
        flavor:$("#edit-doughnut-flavor").val(),
        style:$("#edit-doughnut-style").val()
      }
    }).done(function(data){
      var appendHTML = data.style + " - <i>" + data.flavor + "</i> - <button class='btn btn-success btn-edit' id='btn-edit-" + data.id + "'>edit</button> <button class='btn btn-danger btn-delete' id='btn-delete-" + data.id + "'>DELETE</button>";
      $("#row-" + data.id).html(appendHTML)
      registerButton();
      $('#edit-modal').modal('hide');

    });
  })

  function registerButton(){
    $(".btn-delete").on('click',function(e){
      e.preventDefault();
      var id_getter = this.id.split("-");
      var _id = id_getter[id_getter.length-1];
      var dataSet = $.ajax('http://api.doughnuts.ga/doughnuts/' + _id ,{ method: 'DELETE' }).done(function(data){
        $("#row-" + _id).remove();
      });

    });
    $(".btn-edit").on('click',function(e){
      e.preventDefault();
      var id_getter = this.id.split("-");
      var _id = id_getter[id_getter.length-1];
      var dataSet = $.ajax('http://api.doughnuts.ga/doughnuts/' + _id ,{ method: 'GET' }).done(function(data){
        $("#edit-doughnut-flavor").val(data.flavor);
        $("#edit-doughnut-style").val(data.style);
        $("#edit-doughnut-id").html(data.id);
        $("#edit-modal").modal()
      });
    })
  }
})