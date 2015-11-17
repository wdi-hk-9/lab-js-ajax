$().ready(function(){
  $.ajax('https://api.doughnuts.ga/doughnuts')
    .done(function(doughnuts){
      doughnuts.forEach(function(doughnut){
        $("#doughnuts").append(
          "<li>Flavor: " + doughnut.flavor +
          " | Style: " + doughnut.style +
          "<a href='#' class='btn btn-sm btn-warning' data-toggle='modal' data-target='#edit-modal'>edit</a></li>")
      })
    });

  $('#new-doughnut').on('submit', function(e){
    e.preventDefault();

  $.ajax('https://api.doughnuts.ga/doughnuts',
  {
    method: "POST",
    data: {
      flavor: $('#doughnut-flavor').val(),
      style: $('#doughnut-style').val()
    }
  })
  .done(function(data){
    $('#doughnuts').append('<li>Flavor: ' + data.flavor + ' | Style: ' + data.style + '</li>');
  })
  .error(function(err){
    console.log(err);
  });
  })

  $('#edit-doughnut').on('submit', function(e){
      e.preventDefault();

    $.ajax('https://api.doughnuts.ga/doughnuts',
      {
        method: 'PUT',
        data: {
          flavor: $('#edit-doughnut-flavor').val(),
          style: $('#edit-doughnut-style').val()
        }
      })
      .done(function(data){
        console.log(data)
      })
      .error(function(err){
        console.log(err)
      });
  })

})