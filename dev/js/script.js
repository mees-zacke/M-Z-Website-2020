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
        alert('Ihr Browser wird nicht mehr entwickelt und stellt daher ein Hindernis für Funktionalität, sowie ein hohes Sicherheitsrisiko dar. Daher wird er nicht mehr unterstützt. Bitte benutzen Sie einen aktuellen Browser, wie Google Chrome, Mozilla Firefox oder Microsoft Edge! Vielen Dank, dass Sie das Internet sicherer und besser machen.');
    }
//// JS-Module /////////////////////////////////////////////

    $('body a').on('click touch keypress', function () {
        $('body a').not(this).removeClass('clicked');
        $(this).addClass('clicked');
    });

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

    var projekt_mitglied = $('.startseite .start-vorschau');

    $(window).ready(function () {
        projekt_mitglied.attr("tabindex", "0")
    });

    projekt_mitglied.on('mouseenter mouseleave click touch keypress', function () {
        $(this).children('.text').toggleClass('active').fadeToggle();
        $(this).children('.image_container').toggleClass('active')
    });

    function mediaQuery(x) {
        $('.start-vorschau-links').each(function (){

            if (x.matches) { // If media query matches
                $(this).insertAfter($(this).next(".ce_image"));
            } else {
                $(this).insertBefore($(this).prev(".ce_image"));
            }
        })
    }

    var x = window.matchMedia("(max-width: 480px)")
    mediaQuery(x) // Call listener function at run time
    x.addListener(mediaQuery) // Attach listener function on state changes

//// Startseiten-Zahlen ////

    var zahl_container = $('.ctlg_view_teaser_zahlen .zahlen-container'),
        text_container = $('.ctlg_view_teaser_zahlen .text-container');

    function checkVisible(elm, eval) {
        eval = eval || "object visible";
        var viewportHeight = $(window).height(), // Viewport Height
            scrolltop = $(window).scrollTop(), // Scroll Top
            y = $(elm).offset().top,
            elementHeight = $(elm).height();

        if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
        if (eval == "above") return ((y < (viewportHeight + scrolltop)));
    }

    if ($('body').hasClass('startseite') === true) {
        $(window).on('scroll', function growNumbers() {
            if (checkVisible(zahl_container)) {
                zahl_container.each(function () {
                    var delay = Math.floor((Math.random() * 1000) + 1);

                    var $this = $(this).children('.zahl');
                    $({Counter: 0}).delay(delay).animate({Counter: $this.attr('zahl')}, {
                        duration: 1000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                    var $background = $(this).children('.background');
                    $background.delay(delay).animate({
                        width: $(this).width() + "px",
                        height: $(this).height() + "px"
                    }, 1000)
                    $(this).siblings().addClass("fadeInUp animated")
                })
                $(window).off('scroll', growNumbers);
            } else {
                // do nothing
            }
        });
    }

// Header Funktionen
    $(window).ready(function setHeaderStates() {

        // Höhe des Headers bestimmen
        var headerHeight = $('#header').height();
        var resizeTimer;
        $(window).resize(function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(itsResized, 250)
        });

        function itsResized() {
            headerHeight = $('#header').height();
        }

        $('.header-placeholder').css("height", headerHeight);

// Menü bei Scroll verstecken und wieder anzeigen
        var body = $('body');
        $(window).ready(function () {
            hiddenClass()
        });

        function hiddenClass() {
            var prev = 0;
            var header = $('#header');
            $(window).on('scroll', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(classHidden, 0)
            });

            function classHidden() {
                var scrollTop = $(window).scrollTop();
                header.toggleClass('hidden', scrollTop > prev);
                header.toggleClass('visible', scrollTop < headerHeight);
                prev = scrollTop;
            }

        }
    });

// Team Boxen

    var team_mitglied = $('.team-mitglied .image_container');

    $(window).ready(function () {
        team_mitglied.attr("tabindex", "0")
    });

    team_mitglied.on('mouseenter mouseleave click keypress', function () {
        $(this).siblings('.text').toggleClass('active').fadeToggle();
        $(this).toggleClass('active');
        console.log($(this).hasClass('active'));
        if ($(this).hasClass('active') === false) {
            $(this).parent().css("margin-bottom", "1rem");
        } else {
            $(this).parent().css("margin-bottom", ($(this).siblings('.text').height() + 44));
        }

        team_mitglied.not($(this)).siblings('.text').removeClass('active').fadeOut();
        team_mitglied.not($(this)).parent().css("margin-bottom", "1rem");
        team_mitglied.not($(this)).removeClass('active');
    });

// Kontakt-Button

    var kontaktForm = $('.kontakt-button-container');
    var kontaktOpener = kontaktForm.find('.kontakt-opener');

    kontaktOpener.on('click keydown', function () {
        kontaktForm.toggleClass('active');
    });
    kontaktOpener.on('click keydown mouseover', function () {
        kontaktForm.addClass('clicked');
        localStorage.setItem("kontaktOpened", "true");
    });

    $(document).on('click keydown', function (event) {
        var $target = $(event.target);
        if (!$target.closest(kontaktForm).length &&
            kontaktForm.hasClass('active')) {
            kontaktForm.removeClass('active');
        }
    });

    $(window).on("load", function () {
        kontaktOpener.css("right", "calc(100% - (" + kontaktOpener.children(".text").width() + "px + 31px))")
    });
    $(window).resize(function () {
        kontaktOpener.css("right", "calc(100% - (" + kontaktOpener.children(".text").width() + "px + 31px))")
    });


    $(window).ready(function () {
        if (localStorage.kontaktOpened === 'true') {
            kontaktForm.addClass('clicked')
        }
    })


// Blog aktiver Punkt

    $(window).ready(function () {
        var activeNews = $('.layout_full').attr('newsId'),
            newsList = $(".layout_short[newsId='" + activeNews + "']");

        newsList.addClass("active");
        newsList.find("a >*").addClass('active').unwrap();

        $("body.blog #header .blog a >*").addClass("active").unwrap();
    })

// Startslider Plus Navigation

    $(window).ready(function () {
        var plus = $('#kopfbild .plus-container'),
            navPoints = $('.mod_rocksolid_slider .rsts-nav .rsts-nav-item a');
        plus.children('svg').unwrap().appendTo(navPoints);
    });

// Swiper Plus Navigation

    $(window).ready(function () {
        var swipePlus = $('.ce_swiperStart .plus-container'),
            swipeNavPoints = $('.ce_swiperStart .swiper-pagination-bullet');
        swipePlus.each(function (){
            console.log()
            $(this).children('svg').unwrap().appendTo(swipeNavPoints)
        });
    });

// Startseite Pfeil nach unten Scrolling

    $('.pfeil-unten').on("click touchend keyup", function () {
        var headline = $('h1');
        $('html, body').animate({
            scrollTop: (headline.offset().top - 16)
        }, 2000);
    });

// Kunden Detail Titel

    $(window).ready(function () {
        var kopfbild = $('.ctlg_master .head'),
            kundeTitel = $('.kunde-title');
        kopfbild.css('marginBottom', 'calc((' + kundeTitel.height() + 'px + 6rem) - ' + kundeTitel.children('h1').height() + 'px - 0.5rem)');
        kundeTitel.css('top', 'calc( 100% - ' + kundeTitel.children('h1').height() + 'px - 0.5rem - 1rem');


    });

// Mobile Menu //

    var opener_head = $('#header .mobile-opener'),
        opener_mobile = $('.mobile-menu .mobile-opener'),
        mobileMenu = $('.mobile-menu');

    function mobileMenuOpen() {
        mobileMenu.addClass('active');
        mobileMenu.focus();
    }

    function mobileMenuClose() {
        mobileMenu.removeClass('active');
        $('#kopfbild').focus();
    }

    mobileMenu.on('focusin', function () {
        mobileMenuOpen();
    });
    mobileMenu.on('focusout', function () {
        mobileMenuClose()
    });

    opener_head.on('click touch keypress', function () {
        mobileMenuOpen();
    });
    opener_mobile.on('click touch keypress', function () {
        mobileMenuClose();
    });

    $(window).ready(function () {
        mobileMenu.css("top", "-" + (mobileMenu.height() + 200) + "px")
    });
    $(window).resize(function () {
        mobileMenu.css("top", "-" + (mobileMenu.height() + 200) + "px")
    });

    // Mute Button für Head Video //

    var video = $(".head-video video")

    $('.video-mute-button').on("click touch keypress", function (){
        if (!$(this).hasClass("active")){
            video.prop('muted', false);
            $(this).addClass("active");
        }
        else {
            console.log("hey")
            video.prop('muted', true);
            $(this).removeClass("active");
        }
    });


////////////////////////////////////////////////////////////
});

new WOW({
    offset: 100,
}).init();