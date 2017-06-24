$(document).ready(function() {

  $(function() {
    $('[type="date"]').prop('max', function() {
      return new Date().toJSON().split('T')[0];
    });
  });

  $.get('https://cors-anywhere.herokuapp.com/http://marsweather.ingenology.com/v1/latest/')
    .then(function(data) {

      var sunrise = (data.report["sunrise"]).slice(11, 19)
      var sunset = (data.report["sunset"]).slice(11, 19)

      if (parseInt(data.report['ls']) >= 270) {
        $('#season').text('Winter')
      } else if (parseInt(data.report['ls']) >= 180) {
        $('#season').text('Autumn')
      } else if (parseInt(data.report['ls']) >= 90) {
        $('#season').text('Summer')
      } else if (parseInt(data.report['ls']) < 90) {
        $('#season').text('Spring')
      }

      $('#dataDate').text(data.report["terrestrial_date"])
      $('#maxTempF').text(data.report["max_temp_fahrenheit"])
      $('#minTempF').text(data.report["min_temp_fahrenheit"])
      $('#pressure').text(data.report["pressure"] + ' hPa')
      $('#sunrise').text(sunrise + ' UTC')
      $('#sunset').text(sunset + ' UTC')

      myFunction()
    })

  $('#date').change(function() {
    $.get('https://cors-anywhere.herokuapp.com/http://marsweather.ingenology.com/v1/archive/?terrestrial_date_start=' + $(this).val() + '&terrestrial_date_end=' + $(this).val())
      .then(function(data) {

        if (data.results.length === 0) {
          $('#dataDate').text('There\'s no data for that date!')
          $('#maxTempF').text('')
          $('#minTempF').text('')
          $('#pressure').text('')
          $('#sunrise').text('')
          $('#sunset').text('')
        } else {

          if (parseInt(data.results[0]['ls']) >= 270) {
            $('#season').text('Winter')
          } else if (parseInt(data.results[0]['ls']) >= 180) {
            $('#season').text('Autumn')
          } else if (parseInt(data.results[0]['ls']) >= 90) {
            $('#season').text('Summer')
          } else if (parseInt(data.results[0]['ls']) < 90) {
            $('#season').text('Spring')
          }

          var sunrise = (data.results[0]["sunrise"]).slice(11, 19)
          var sunset = (data.results[0]["sunset"]).slice(11, 19)

          $('#dataDate').text(data.results[0]["terrestrial_date"])
          $('#maxTempF').text(data.results[0]["max_temp_fahrenheit"])
          $('#minTempF').text(data.results[0]["min_temp_fahrenheit"])
          $('#pressure').text(data.results[0]["pressure"] + ' hPa')
          $('#sunrise').text(sunrise + ' UTC')
          $('#sunset').text(sunset + ' UTC')
        }
      })
  })
})

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("mainBody").style.display = "block";
}