(function($) {

    skel.breakpoints({
        xlarge:	'(max-width: 1680px)',
        large:	'(max-width: 1280px)',
        medium:	'(max-width: 980px)',
        small:	'(max-width: 736px)',
        xsmall:	'(max-width: 480px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $menu = $('#menu'),
            $sidebar = $('#sidebar'),
            $main = $('#main');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function() {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Menu.
        $menu
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnEscape: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'right',
                target: $body,
                visibleClass: 'is-menu-visible'
            });


        $('form.search').on('submit', function(event) {
            event.preventDefault();
        });

        // Overwrite the default behaviour for abbreviations so we can style them.
        $('[title]').each( function() {
            var abbr_title = $(this);
            abbr_title.data('title',abbr_title.attr('title'));
            abbr_title.attr('name', abbr_title.attr('title'));
            abbr_title.removeAttr('title');
        });

        // Intro.
        var $intro = $('#intro');

        // Move to main on <=large, back to sidebar on >large.
        skel
            .on('+large', function() {
                $intro.prependTo($main);
            })
            .on('-large', function() {
                $intro.prependTo($sidebar);
            });

    });

})(jQuery);
