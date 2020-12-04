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

    $('body a').on('click touch keypress', function (){
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

    var projekt_mitglied = $('.startseite .start-vorschau .image_container');

    $(window).ready(function () {
        projekt_mitglied.attr("tabindex", "0")
    });

    projekt_mitglied.on('click keypress', function () {
        $(this).siblings('.text').toggleClass('active').fadeToggle();
        $(this).toggleClass('active')
    });

//// Startseiten-Zahlen ////

    var zahl_container = $('.ctlg_view_teaser_zahlen .zahlen-container'),
        text_container = $('.ctlg_view_teaser_zahlen .text-container');

    function checkVisible( elm, eval ) {
        eval = eval || "object visible";
        var viewportHeight = $(window).height(), // Viewport Height
            scrolltop = $(window).scrollTop(), // Scroll Top
            y = $(elm).offset().top,
            elementHeight = $(elm).height();

        if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
        if (eval == "above") return ((y < (viewportHeight + scrolltop)));
    }

    if ($('body').hasClass('startseite') === true){
        $(window).on('scroll',function growNumbers() {
            if (checkVisible(zahl_container)) {
                zahl_container.each(function () {
                    var delay = Math.floor((Math.random() * 1000) + 1);

                    var $this = $(this).children('.zahl');
                    $({ Counter: 0 }).delay(delay).animate({ Counter: $this.attr('zahl') }, {
                        duration: 1000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                    var $background = $(this).children('.background');
                    $background.delay(delay).animate({width:"150px", height:"150px"}, 1000)
                    $(this).siblings().addClass("fadeInUp animated")
                })
                $(window).off('scroll', growNumbers);
            } else {
                // do nothing
            }
        });
    }

//// Mobile Opener ////
    var opener_head = $('.linker-header .mobile-opener'),
        opener_mobile = $('.mobile-menu .mobile-opener');

    opener_head.on('click touch keypress', function(){
        $('.mobile-menu').addClass('active');
    });
    opener_mobile.on('click touch keypress', function(){
        $('.mobile-menu').removeClass('active');
    });

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

    team_mitglied.on('click keypress', function () {
        $(this).siblings('.text').toggleClass('active').fadeToggle();
        $(this).toggleClass('active');
        console.log($(this).hasClass('active'));
        if ($(this).hasClass('active') === false){
            $(this).parent().css("margin-bottom", "1rem");
        }
        else {
            $(this).parent().css("margin-bottom", ($(this).siblings('.text').height() + 44));
        }

        team_mitglied.not($(this)).siblings('.text').removeClass('active').fadeOut();
        team_mitglied.not($(this)).parent().css("margin-bottom", "1rem");
        team_mitglied.not($(this)).removeClass('active');
    });

// Kontakt-Button

    var kontaktForm = $('.kontakt-button-container');
    var kontaktOpener = kontaktForm.children('.kontakt-opener');

    kontaktOpener.on('click keydown' , function (){
       kontaktForm.toggleClass('active');
    });
    kontaktOpener.on('click keydown mouseover', function (){
        kontaktForm.addClass('clicked');
        localStorage.setItem("kontaktOpened" , "true");
    });

    $(document).on('click keydown', function(event) {
        var $target = $(event.target);
        if(!$target.closest(kontaktForm).length &&
            kontaktForm.hasClass('active')) {
            kontaktForm.removeClass('active');
        }
    });

    $(window).ready(function (){
        if (localStorage.kontaktOpened === 'true'){
            kontaktForm.addClass('clicked')
        }
    })


// Blog aktiver Punkt

    $(window).ready(function(){
        var activeNews = $('.layout_full').attr('newsId'),
            newsList = $(".layout_short[newsId='" + activeNews + "']");

        newsList.addClass("active");
        newsList.find("a >*").addClass('active').unwrap();

        $("body.blog #header .blog a >*").addClass("active").unwrap();
    })

// Startslider Plus Navigation

    $(window).ready(function(){
        var plus = $('#kopfbild .plus-container'),
            navPoints = $('.mod_rocksolid_slider .rsts-nav .rsts-nav-item a');
        plus.appendTo(navPoints);
    });

// Startseite Pfeil nach unten Scrolling

    $('.pfeil-unten').on("click touchend keyup", function(){
        var headline = $('h1');
        $('html, body').animate({
            scrollTop: (headline.offset().top - 16)
        }, 2000);
    });
////////////////////////////////////////////////////////////
});

new WOW({
    offset: 100,
}).init();