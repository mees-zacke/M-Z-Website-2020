$grid = $('#referenzen-liste .ctlg_view_teaser').masonry({
  itemSelector: '.ctlg_teaser',
  columnWidth: '.grid-sizer',
  gutter: '.gutter-sizer',
  percentPosition: true
});

$grid.imagesLoaded().progress( function() {
  $grid.masonry('layout')
});