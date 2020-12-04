jQuery(function ($) {
    /* Farbwechsler */

    $(document).ready(function () {

        var $bodyColor,
            body = $('body');

        // Wenn der localStorage nicht leer ist -> Farbe Abfragen und dementsprechen einfärben
        if (localStorage.getItem('Farbe') == null) {
            body.addClass('normal');
            localStorage.setItem('Farbe', 'normal');
        } else if (localStorage.getItem('Farbe') !== null) {
            $bodyColor = localStorage.getItem('Farbe');

            // Funktion für den Farbwechsel
            function switchClass(color1, color2) {
                body.removeClass(color1);
                body.removeClass(color2);
                body.addClass($bodyColor);
                return $bodyColor;
            }

            if ($bodyColor === 'normal') {
                switchClass(
                    'white',
                    'black'
                );
            } else if ($bodyColor === 'white') {
                switchClass(
                    'normal',
                    'black'
                );
            } else if ($bodyColor === 'black') {
                switchClass(
                    'white',
                    'normal'
                );
            }
        }

        $('.colorSwitch').on('click touch', function () {
            if (body.hasClass('normal')) {
                localStorage.setItem('Farbe', 'white');
                $bodyColor = localStorage.getItem('Farbe');
                body.removeClass('normal');
                body.addClass($bodyColor);
            } else if (body.hasClass('white')) {
                localStorage.setItem('Farbe', 'black');
                $bodyColor = localStorage.getItem('Farbe');
                body.removeClass('white');
                body.addClass($bodyColor);
            } else if (body.hasClass('black')) {
                localStorage.setItem('Farbe', 'normal');
                $bodyColor = localStorage.getItem('Farbe');
                body.removeClass('black');
                body.addClass($bodyColor);
            }
        });

    });
});
