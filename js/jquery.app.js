$().ready(function() {

  $.get('https://api.doughnuts.ga/doughnuts')
    .done(function(doughnuts){
      doughnuts.forEach(function(elem){
        $('#doughnuts').append('<li><b>Flavor:</b>' + elem.flavor + '| <b>Style:</b>' + elem.style + '</li>' + '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#edit-modal">Edit</button>');
      })
    })

  $('#new-doughnut').on('submit', function (e){
    e.preventDefault();
    $.ajax('https://api.doughnuts.ga/doughnuts', {
      method: "POST",
      data: { flavor: $('#new-doughnut-flavor').val(),
              style: $('#new-doughnut-style').val()
            }
      })
    .done(function(data){
      $('#doughnuts').append('<li><b>Flavor:</b>' + data.flavor + '| <b>Style:</b>' + data.style + '</li>' + '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#edit-modal">Edit</button>');
    })
  });

  //Edit
  $('#edit-doughnut').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      url: 'https://api.doughnuts.ga/doughnuts/1',
      type: 'PUT',
      data: { flavor: $('#edit-doughnut-flavor').val(),
              style: $('#edit-doughnut-style').val()
            }
      }).done(function(data){
          console.log(data);
        });

  });


})
