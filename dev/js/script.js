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
    if (isIE()) {
        alert('Ihr Browser wird nicht mehr Unterstützt. Bitte verwenden Sie einen neuen. Zum Beispiel: Microsoft Edge, Google Chrome oder Mozilla Firefox');
    }
//// JS-Module /////////////////////////////////////////////
//// Funktionalität beim Scrollen ////

    $(window).scroll(onScroll);

    function onScroll() {
        if ($(window).scrollTop() >= 1) {
            $('body').addClass('onScroll');
        } else {
            $('body').removeClass('onScroll');
        }
    }

//// Eigenes JS ////////////////////////////////////////////
//// Listen nach Leistung filtern ////
    var leistungen = ['all', 'print', 'web', '360grad',];
    var hash = $(location).prop('hash').substr(1);

    leistungen.forEach(function (leistung) {
        $('.leistungen .' + leistung).on('click', function filter_leistung() {
            $('.mod_catalogUniversalView.' + leistung).removeClass('inactive').addClass('active');
            $('.mod_catalogUniversalView').not('.' + leistung).removeClass('active').addClass('inactive');
        });

        $(document).ready(function () {
            if (hash == leistung) {
                $('.mod_catalogUniversalView.' + leistung).removeClass('inactive').addClass('active');
                $('.mod_catalogUniversalView').not('.' + leistung).removeClass('active').addClass('inactive');
            }
        })
    });

//// Leistungsvorschau ////
    var trigger = $(".leistung-trigger"),
        content = $(".leistung-content");

    $(window).ready(function () {
        trigger.parent().first().children(trigger).attr("direction", "active");
        content.parent().first().addClass("active").removeClass("right");
        $('.ctlg_view_teaser_leist_content').css("height", 0).addClass("inactive");
        $('.leistung-content a').attr('tabindex', '-1');

    });
    trigger.on('click keypress', function () {
        if ($(this).attr("direction") == "right") {
            trigger.filter("[direction = 'active']").attr("direction", "left");
            $(this).attr("direction", "active");
            content.parent(".active").addClass("left");
            content.filter("." + $(this).attr("trigger")).parent().removeClass("right");
        } else if ($(this).attr("direction") == "left") {
            trigger.filter("[direction = 'active']").attr("direction", "right");
            $(this).attr("direction", "active");
            content.parent(".active").addClass("right");
            content.filter("." + $(this).attr("trigger")).parent().removeClass("left");
        }
        if (!$(this).hasClass('active')) {
            $(this).addClass("active");
            trigger.not($(this)).removeClass("active");
            content.filter("." + $(this).attr("trigger")).parent().addClass("active");
            content.not("." + $(this).attr("trigger")).parent().removeClass("active");
            var contentHeight = content.filter("." + $(this).attr("trigger")).parent().height(),
                contentHeightFinal = contentHeight + 32;
            $('.ctlg_view_teaser_leist_content').css("height", contentHeightFinal).removeClass("inactive");
        } else {
            $(this).removeClass("active");
            content.filter("." + $(this).attr("trigger")).parent().addClass("active");
            content.not("." + $(this).attr("trigger")).parent().removeClass("active");
            $('.ctlg_view_teaser_leist_content').css("height", 0).addClass("inactive");
        }
    });
//// Startseiten-Projekte ////

    var projekt_mitglied = $('.start-vorschau figure');

    $(window).ready(function () {
        projekt_mitglied.attr("tabindex", "0")
    });

    projekt_mitglied.on('click keypress', function () {
        $(this).siblings('.text').toggleClass('active').fadeToggle();
        $(this).toggleClass('active')
    });

//// Startseiten-Zahlen ////

    var zahl_container = $('.ctlg_view_teaser_zahlen .zahlen-container'),
        zahl = zahl_container.children('.zahl');

    $(window).ready(function(){
        zahl_container.each(function () {
            var delay = Math.floor((Math.random() * 1000) + 1);

            var $this = $(this).children('.zahl');
            $({ Counter: 0 }).delay(delay).animate({ Counter: $this.attr('zahl') }, {
                duration: 2000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.ceil(this.Counter));
                }
            });
            var $background = $(this).children('.background');
            $background.delay(delay).animate({width:"150px", height:"150px"}, 2000)
        })
    });

//// Mobile Opener ////
    var opener_head = $('.linker-header .mobile-opener'),
        opener_mobile = $('.mobile-menu .mobile-opener');

    opener_head.on('click touch keypress', function(){
        $('.mobile-menu').addClass('active');
    });
    opener_mobile.on('click touch keypress', function(){
        $('.mobile-menu').removeClass('active');
    });

////////////////////////////////////////////////////////////
});