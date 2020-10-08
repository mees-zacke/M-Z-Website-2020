//// Funktionalität beim Scrollen ////

$(window).scroll(onScroll);

function onScroll (){
    if ($(window).scrollTop() >= 1) {
        $('body').addClass('onScroll');
    } else {
        $('body').removeClass('onScroll');
    }
}