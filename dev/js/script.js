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

//// Leistungsvorschau ////
  var trigger = $(".leistung-trigger"),
      content = $(".leistung-content");

  $(window).ready(function (){
    trigger.parent().first().children(trigger).attr("direction", "active");
    content.parent().first().addClass("active").removeClass("right");
    $('.ctlg_view_teaser_leist_content').css("height", 0)
  });

  trigger.on('click keypress' , function (){
    if ($(this).attr("direction") == "right"){
      trigger.filter("[direction = 'active']").attr("direction", "left");
      $(this).attr("direction", "active");
      content.parent(".active").addClass("left");
      content.filter("." + $(this).attr("trigger")).parent().removeClass("right");
    }
    else if ($(this).attr("direction") == "left"){
      trigger.filter("[direction = 'active']").attr("direction", "right");
      $(this).attr("direction", "active");
      content.parent(".active").addClass("right");
      content.filter("." + $(this).attr("trigger")).parent().removeClass("left");
    }
    if (!$(this).hasClass('active')){
      $(this).addClass("active");
      trigger.not($(this)).removeClass("active");
      content.filter("." + $(this).attr("trigger")).parent().addClass("active");
      content.not("." + $(this).attr("trigger")).parent().removeClass("active");
      var contentHeight = content.filter("." + $(this).attr("trigger")).parent().height(),
          contentHeightFinal = contentHeight + 32 ;
      $('.ctlg_view_teaser_leist_content').css("height", contentHeightFinal)
    }
    else{
      $(this).removeClass("active");
      content.filter("." + $(this).attr("trigger")).parent().addClass("active");
      content.not("." + $(this).attr("trigger")).parent().removeClass("active");
      $('.ctlg_view_teaser_leist_content').css("height", 0)
    }
  });

////////////////////////////////////////////////////////////
});