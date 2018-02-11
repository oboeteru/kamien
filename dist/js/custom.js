$(document).ready(function () {

    function main() {
        var size_indicator = parseFloat($('#scroll_size').css('opacity'));
        console.log(size_indicator);
        if (size_indicator === 0) {
            $('#kontakt-btn').click(function () {
                $('#kontakt').toggleClass('expand');
                $('#kontakt>div:nth-child(2)').toggleClass('appear');
            });

            $('#omnie-btn').click(function () {
                $('#omnie>div').toggleClass('appear');
                if ($('#omnie>div').hasClass('appear')) {
                    $('#omnie').css({'padding-bottom': $('#omnie>div').height() + 30 + 'px'});
                } else {
                    $('#omnie').delay(500).queue(function (x) {
                        $(this).css({'padding-bottom': '0px'});
                        x();
                    });
                }
            });
        } else {
            var angleDeg = Math.ceil(Math.atan2($('svg').width(), $('svg').height()) * 180 / Math.PI);
            $('#omnie > div').css('transform', 'rotate(-' + angleDeg + 'deg)');
            $('#kontakt-btn').click(function () {
                $('#kontakt-btn').toggleClass('move');
                $('#kontakt').toggleClass('expand');
                $('#kontakt>div:nth-child(2)').toggleClass('appear');
            });
            $('#omnie-false').click(function () {
                $('#kontakt').addClass('hide');
                $('#omnie > div, #omnie > div p, #arrow-omnie').addClass('appear');
            });
            $('#arrow-omnie').click(function () {
                $('#omnie > div, #omnie > div p, #arrow-omnie, #kontakt>div:nth-child(2)').removeClass('appear');
                $('#kontakt-btn').removeClass('move');
                $('#kontakt').removeClass('expand hide');
            });
        }
    }
    main();
    var resizeTimer;
    $(window).resize(function () {
        var size_indicator = parseFloat($('#scroll_size').css('opacity'));
        
              
        $('#kontakt>div:nth-child(2)').removeClass('appear');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $('#kontakt-btn, #omnie-btn, #omnie-false').off('click');
            if (size_indicator === 0) {
                $('#omnie > div').css('transform', 'rotate(0deg)');                
                $('#kontakt-btn').removeClass('move');
                $('#kontakt').removeClass('hide'); 
                $('#omnie > div').removeClass('appear');
            }
            else{
                $('#kontakt').removeClass('expand');   
                $('#omnie').css({'padding-bottom': '0px'});
                $('#omnie > div').removeClass('appear');                   
            }
            main();
        }, 250);
    });

    function getScrollbarWidth() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }

    $('.arrow-right').css('right', 10 + getScrollbarWidth() + 'px');
});


