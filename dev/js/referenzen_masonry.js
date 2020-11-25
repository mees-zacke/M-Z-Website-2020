$grid = $('#referenzen-liste .ctlg_view_teaser').masonry({
  itemSelector: '.ctlg_teaser',
  columnWidth: '.grid-sizer',
  gutter: '.gutter-sizer',
  percentPosition: true
});



//// Listen nach Leistung filtern ////
var hash = $(location).prop('hash').substr(1);
var refFilter = $('.referenzen-filter-container .referenzen-filter'),
    refListe = $('#referenzen-liste .ctlg_teaser');

$(window).ready(function (){
  if (hash === ""){
    $('.referenzen-filter.alles').addClass("active");
  }
  else {
    $('.referenzen-filter.' + hash).addClass("active");
    $('.referenzen-filter').not('.' + hash).removeClass("active");
    refListe.each(function (){
      if (~$(this).attr('leistungen').indexOf(hash)){
        $(this).css('display', 'block');
      }
      else {
        $(this).css('display', 'none');
      }
    });
  }
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout')
  });
});

refFilter.on('click touch keypress', function(){
  $(this).addClass('active');
  refFilter.not(this).removeClass('active')

  if ($(this).attr('filter') === 'alles'){
    refListe.css('display', 'block');
  }
  else {
    var filter = $(this).attr('filter');
    refListe.each(function (){
      if (~$(this).attr('leistungen').indexOf(filter)){
        $(this).css('display', 'block');
      }
      else {
        $(this).css('display', 'none');
      }
    });
  }
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout')
  });
});
