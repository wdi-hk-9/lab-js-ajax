// Your solution here
$().ready(function(){
  // console.log('dom loaded')
  var addDonut = function(donut){
    $('#doughnuts').append('<li data-id="'+donut.id+'" class="h5">'+ donut.flavor +'-' + donut.style +'<button type="button" class="btn btn-success btn-group-xs" data-toggle="modal" data-target="#edit-modal">Edit</button>'+'<button type="button" class="btn btn-danger btn-group-xs" data-toggle="modal" data-target="#edit-modal">Delete</button></li>');
  };

  $.get('https://api.doughnuts.ga/doughnuts')
    .done(function(doughnuts){
      //Iterate
      doughnuts.forEach(function(donut){
      addDonut(donut);
    })
  })

  $('#new-doughnut').on('submit', function(e){
    e.preventDefault();
    $.ajax('https://api.doughnuts.ga/doughnuts',{
        method: 'POST',
        data: {
          flavor: $('#new-doughnut-flavor').val(),
          style: $('#new-doughnut-style').val()
        }
      })
    .done(function(donut){
      console.log(donut);
      addDonut(donut);
    })
  })

  var id = $(this).parent().data('id');
  $('#edit-doughnut').data('id', id);
// .ajax('https://api.doughnuts.ga/doughnuts/2',{ method: 'PUT', data: {flavor: 'Banana'}}).done(function(data){console.log(data);});
  $('#edit-doughnut').on('submit', function(e){
    e.preventDefault();;
    var id = $('#edit-doughnut').data('id');
    var donutUrl = "https://api.doughnuts.ga/doughnuts/" + id;
    $.ajax({
      url: donutUrl,
      type: 'PUT',
      data: {
        flavor: $('#edit-doughnut-flavor').val(),
        style: $('#edit-doughnut-style').val()
      }})
    .done(function(donut){
      console.log(donut);
    })
  })

//+$.param({id: e.responseJson.id})

// $.ajax('https://api.doughnuts.ga/doughnuts/10',{ method: 'DELETE'}).done(function(data){console.log(data);});


})