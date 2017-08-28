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

      pageFadeIn()
    })


  function pageFadeIn() {
    setTimeout(showPage, 500);
  }

  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("mainBody").style.display = "block";
  }

  function pageError() {
    setTimeout(showError, 500);
  }

  function showError() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("errorMessage").style.display = "block";
  }
})
