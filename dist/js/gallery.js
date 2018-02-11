$(document).ready(function () {
    (function ($) {
        $.fn.swipe = function (swipe) {
            return this.each(function () {
                var $this = $('.slider'),
                        isTouching = false,
                        debut; // means start in french
                $this.on('touchstart', debutGeste);
                function debutGeste() {               // means start of gesture
                    if (event.touches.length == 1) {
                        debut = event.touches[0].pageX;
                        isTouching = true;
                        $this.on('touchmove', geste);
                    }
                }
                function finGeste() {                 // means end of gesture
                    $this.off('touchmove');
                    isTouching = false;
                    debut = null;
                }
                function geste() {                   // geste means gesture
                    if (isTouching) {
                        var actuel = event.touches[0].pageX,
                                delta = debut - actuel;
                        if (Math.abs(delta) >= 30) {     // this '30' is the length of the swipe
                            if (delta > 0) {
                                swipe.left();
                            } else {
                                swipe.right();
                            }
                            finGeste();
                        }
                    }
                    event.preventDefault();
                }
            });
        };
    })(jQuery);


    $(".img-cnt").click(function () {
        $(this).toggleClass('active');

        var state = false;
        if ($(this).next('.slider-cnt').find('.slider').hasClass('show')) {
            var state = true;
        }
        if ($('.slider.show').length) {
            $('.slider.show').removeClass('show');
            $('.arrow').removeClass('arrow-show');
        }
        if (state) {
            $(this).next('.slider-cnt').find('.slider').removeClass('show');
            $(this).next('.slider-cnt').find('.slider').children('.arrow').removeClass('arrow-show');
        } else {
            $(this).next('.slider-cnt').find('.slider').addClass('show');
            $(this).next('.slider-cnt').find('.slider').children('.arrow').addClass('arrow-show');
        }

        if ($('#scroll_size').css('opacity') > 0.1) {
            $('.img-cnt.active+.slider-cnt').addClass('bg-gallery');
            $('.slider-close').click(function () {
                $(this).parent().parent().prev().removeClass('active');
                $(this).parent().parent().removeClass('bg-gallery');
                $(this).parent().removeClass('show');
                $(this).siblings('.arrow').removeClass('arrow-show');
            });
        }
    });

    var IDs = [];
    $("#right .img-cnt").find("div:first-child").each(function () {
        IDs.push(this.id);
    });
    var stand = $('#right').width();
    for (z = 0; z < IDs.length; z++) {
        var lg = ($('#' + IDs[z]).parent().next().find('.slider').children().length);
        $('#' + IDs[z]).parent().next().find('.slider').css('width', lg * stand + 'px');
    }

    function mvleft() {
        var mv_step = parseInt($('.slider.show').attr('mv'));
        var mv_lg = parseInt($('.slider.show>div').width());
        if (mv_step > 1) {
            $('.slider.show').attr('mv', mv_step - 1);
            mv_step = parseInt($('.slider.show').attr('mv'));
            $('.slider.show').css('margin-left', -(mv_step - 1) * mv_lg + 'px');
        }
    }

    function mvright() {
        var mv_step = parseInt($('.slider.show').attr('mv'));
        var mv_lg = parseInt($('.slider.show>div').width());
        var mv_limit = $('.slider.show').children().length - 3;
        if (mv_step < mv_limit) {
            $('.slider.show').attr('mv', mv_step + 1);
            $('.slider.show').css('margin-left', -mv_step * mv_lg + 'px');
        }
    }

    $('.arrow-right').click(function () {
        mvright();
    });
    $('.arrow-left').click(function () {
        mvleft();
    });

    $('body').swipe({
        right: function () {
            mvleft();
        },
        left: function () {
            mvright();
        }
    });

    var resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $('.slider').each(function () {
                var step = parseInt($(this).attr('mv')) - 1;
                var lg = parseInt($(this).parent().width());
                $(this).css('margin-left', -step * lg + 'px');
            });
            var stand = $('#right').width();
            for (z = 0; z < IDs.length; z++) {
                var lg = ($('#' + IDs[z]).parent().next().find('.slider').children().length);
                $('#' + IDs[z]).parent().next().find('.slider').css('width', lg * stand + 'px');
            }
        }, 250);
    });
});
