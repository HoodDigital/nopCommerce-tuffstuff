if (!$.hood)
    $.hood = {};

$.hood.Site = {
    // This init function will be called back by app.js, when it has been successfully loaded. 
    // If preloaders are present, they will hide any delay while loading the app.js files.
    Init: function () {
        // Init the hood js app with default settings.
        $.hood.App.Init(
            {
                Colorbox:false
            }
        );
    },
    Ready: function () {
        // Call the resize function.
        $.hood.Site.Resize();
        // Add any ready time functionality here.
        $('.btn-arrow').each(function () {
            $(this).wrapInner("<span></span>");
            $(this).append("<span></span>");
            $(this).prepend("<span><span></span></span>");
        });

        $('.page-title').prependTo(".master-wrapper-content");
        $('.product-details-page .product-name').prependTo(".master-wrapper-content").addClass('page-title');

        $('.page-title').wrapInner('<div class="container"><div class="row"><div class="col-xs-12"></div></div></div>');
        $('.page-title').prepend('<div class="background"></div>');
        $('.page-title').addClass('padded features title-block text-center-mobile');

        // dress forms
        $('.inputs').addClass('form-group');
        $('input[type="text"],input[type = "email"],input[type = "tel"],input[type = "password"],select,textarea')
            .addClass('form-control');

        $.getScript('/themes/tuffstuff/content/lib/jquery-colorbox/jquery.colorbox-min.js', $.proxy(function () {
            $(".colorbox").colorbox({
                rel: 'gallery',
                maxWidth: "95%",
                maxHeight: "95%"
            });
            $(".colorbox-iframe").colorbox({
                iframe: true,
                maxWidth: "95%",
                maxHeight: "95%",
                innerWidth: 1024,
                innerHeight: 576
            });
            $.hood.App.Loader.ItemComplete('colorbox');
        }, this));

        if (!$().fitVids) {
            console.log('resizeVideos: FitVids not Defined.');
            return true;
        }
        $("body").fitVids({
            customSelector: "iframe[src^='http://www.dailymotion.com/embed'], iframe[src*='maps.google.com'], iframe[src*='google.com/maps']",
            ignore: '.no-fv'
        });

        $.hood.Site.Resize();
    },
    Load: function () {
        // Add any load time functionality here.
        $.hood.Site.Resize();

        var sliders = $('.products-carousel');

        sliders.owlCarousel({
            loop: true,
            margin: 25,
            responsiveClass: true,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            },
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true
        });
    },
    Resize: function () {
        // Add any resize functionality here.
        $('.btn-arrow').each(function () {
            var halfHeight = $(this).height() / 2;
            $(this).find("span:last-child").css({
                'border-top-width': halfHeight + 'px',
                'border-left-width': (halfHeight / 1.5) + 'px',
                'border-bottom-width': halfHeight + 'px',
                'right': -(halfHeight / 1.5) + 'px'
            });
        });
        $('body').each(function () {
            var headerHeight = $('div.header').height();
            $(this).css({
                'padding-top': headerHeight + 'px'
            });
        });
    }
};

// Initialise $.hood.App
$($.hood.Site.Ready);
$(window).on('load', $.hood.Site.Load);
$(window).on('resize', $.hood.Site.Resize);
