jQuery(function ($) {
    $(document).ready(function () {
        closeAll();
    });

    var start = $('.akkordeon-start'),
        end = $('.akkordeon-end');
    function closeAll (){
        if (start){
            start.nextUntil(end).add(end).css('display','none');
            $(start).append('<span class="inactive"></span>');
        }
    }
    start.on('click', function (){
        $(this).nextUntil(end).slideToggle();
        $(this).nextAll('.akkordeon-end').first().fadeToggle();
        $(this).children('span').toggleClass('active').toggleClass('inactive');
    });
    end.on('click', function (){
        $(this).prevUntil(start).slideToggle();
        $(this).fadeToggle();
    });
});