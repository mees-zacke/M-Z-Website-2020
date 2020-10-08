jQuery(function ($) {

  $(document).ready(function () {
    isIE();
  });

  /* https://jsfiddle.net/alvaroAV/svvz7tkn/ */
  function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

    return is_ie;
  }
  /* Create an alert to show if the browser is IE or not */
  if (isIE()){
    alert('Ihr Browser wird nicht mehr Unterstützt. Bitte verwenden Sie einen neuen. Zum Beispiel: Microsoft Edge, Google Chrome oder Mozilla Firefox');
  }
//// JS-Module /////////////////////////////////////////////
//// Funktionalität beim Scrollen ////

  $(window).scroll(onScroll);

  function onScroll (){
    if ($(window).scrollTop() >= 1) {
      $('body').addClass('onScroll');
    } else {
      $('body').removeClass('onScroll');
    }
  }
//// Eigenes JS ////////////////////////////////////////////
//// Listen nach Leistung filtern ////
  var leistungen = ['all','print','web','360grad',];
  var hash = $(location).prop('hash').substr(1);

  leistungen.forEach(function (leistung){
    $('.leistungen .' + leistung).on('click' , function filter_leistung (){
      $('.mod_catalogUniversalView.' + leistung).removeClass('inactive').addClass('active');
      $('.mod_catalogUniversalView').not('.' + leistung).removeClass( 'active').addClass('inactive');
    });

    $(document).ready(function(){
      if (hash == leistung){
        $('.mod_catalogUniversalView.' + leistung).removeClass('inactive').addClass('active');
        $('.mod_catalogUniversalView').not('.' + leistung).removeClass( 'active').addClass('inactive');
      }
    })
  });


////////////////////////////////////////////////////////////
});