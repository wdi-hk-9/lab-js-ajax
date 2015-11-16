// Your solution here
$().ready(function(){

  $.get('https://api.doughnuts.ga/doughnuts').done(function(data){
    data.forEach(function (elem){
      $('#doughnuts').append('<li>Flavor:' + elem.flavor + ' | Style:' + elem.style + '</li>')
    })

  });


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
            data.flavor +
            ' | ' + data.style +
          '</li>'
        );
    })

  })
})