$().ready(function(){
  // console.log('DOM ready')
  $.get('https://api.doughnuts.ga/doughnuts')
    .done(function(doughnuts){
      // console.log(doughnuts)
      doughnuts.forEach(function(elem){
        $('#doughnuts').append(
          '<li data-id="' + elem.id + '">' +
            elem.style +
            ' - <i>' + elem.flavor + '</i> - ' +
            '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#edit-modal">Edit</button>' +
            '</li>'
        );
        // console.log(elem.id)
      })
    })

  var id = $(this).parent().data('id');

  $('#new-doughnut').on('submit', function(e){
    e.preventDefault();
    console.log('form clicked')
    $.ajax('https://api.doughnuts.ga/doughnuts',
      {
        method:'POST',
        data: {
          flavor:$('#new-doughnut-flavor').val(),
          style: $('#new-doughnut-style').val()
        }
      })
      .done(function(data){
        $('#doughnuts').append(
          '<li> ' +
            data.style +
            ' - <i>' + data.flavor + '</i> - ' +
            '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#edit-modal">Edit</button>' +
          '</li>'
        );
      })
  })

  $('#edit-doughnut').on('submit',function(e){
    // e.preventDefault();
    // console.log('form clicked')
    // var id = $(e.target).attr('id');
    var x=e.getElementById("button#1");
    con
    $.ajax('https://api.doughnuts.ga/doughnuts',
      {
        method:'PUT',
        data: {
          id:id
          // flavor:$('#new-doughnut-flavor').val(),
          // style: $('#new-doughnut-style').val()
        }
      })
      .done(function(data){
      })
  })


})
// end document

    // var id = $(e.target).attr('id');
    // // var ajax = $.get('https://api.doughnuts.ga/doughnuts')
    // console.log("The id of the button that was clicked: "+ $('#doughnuts.responseJSON.id'));
//     $.ajax('https://api.doughnuts.ga/doughnuts')
//       .done(function(doughnuts){

//       })
//   })
// })