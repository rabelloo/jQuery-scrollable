/*
    A tidy scrollable design pattern with shadows
    Works well with slimScroll.js
    
    Author:  André Luiz Rabêllo
    Version: 1.0.0
*/

;
// Make sure jQuery has been loaded before scrollable.js
if (typeof jQuery === "undefined") {
    throw new Error("scrollable.js requires jQuery");
}

; (function ($) {
    'use strict';

    var className = 'scrollable';
    var wrapperName = 'scrollable-wrapper';

    // Function
    $.fn.scrollable = function (height) {

        // Scroll function
        function scrollWatch($scrollable) {
            // Retrieve scrollable settings
            var settings = $scrollable.data(className);

            // Calculate opacity
            var range = settings.visibleHeight / 10 || 100;
            var scrollTop = $scrollable.scrollTop();
            var scrollMax = settings.realHeight - settings.visibleHeight;
            var topOpacity = Math.min(scrollTop, range) / range;
            var bottomOpacity = Math.min(scrollMax - scrollTop, range) / range;

            // Set opacity
            settings.topShadow.css('opacity', topOpacity);
            settings.bottomShadow.css('opacity', bottomOpacity);
        };

        // Init array of objects
        this.each(function () {
            var $this = $(this);
            var settings = {};
            var oldSettings = $this.data(className);

            // Set scrollable-element visible, max and real heights
            settings.maxHeight = height || $this.css('max-height') || 'inherit';
            settings.visibleHeight = $this.height();
            settings.realHeight = $this
                                    .css({
                                        'max-height': 'none',
                                        'height': 'auto'
                                    })
                                    .height();
            // Reset max-height pre calculation
            $this.css('max-height', settings.maxHeight);

            // If already applied, replace settings with recalculated values and return
            if (oldSettings) {
                $this.data(className, $.extend(oldSettings, settings));
                return;
            }

            // Set settings' elements
            settings.wrapper = $this.wrap('<div class="' + wrapperName + '"></div>').parent('.' + wrapperName);
            settings.bottomShadow = $('<div class="bottom shadow"></div>').insertAfter($this);
            settings.topShadow = $('<div class="top shadow"></div>').insertAfter($this);

            // Store settings on data-
            $this
                .data(className, settings)

            // Attach listener
                .on('scroll', function () {
                    scrollWatch($(this));
                })
            // Calculate first time
                .trigger('scroll');

            // Start slimScroll if present
            if ($().slimScroll)
                $this.slimScroll({
                    height: ''
                });
        });

        // Append styles
        var $body = $('body');
        if (!$body.find('#scrollable-styles').length)
            $body
                .append('<style id="scrollable-styles">'
                            + '.scrollable-wrapper {'
                                + 'position: relative;'
                            + '}'
                            + '.scrollable-wrapper .scrollable {'
                                + 'overflow-x: hidden;'
                                + 'overflow-y: auto;'
                                + 'border: none;'
                                + 'margin: 0;'
                            + '}'
                            + '.scrollable-wrapper .shadow {'
                                + 'content: "";'
                                + 'height: 5px;'
                                + 'left: 0;'
                                + 'right: 0;'
                                + 'opacity: 0;'
                                + 'position: absolute;'
                                + 'transition: opacity 0.3s;'
                            + '}'
                            + '.scrollable-wrapper .shadow.top {'
                                + 'background: radial-gradient(at top, rgba(0, 0, 0, 0.2), transparent);'
                                + 'top: 0;'
                            + '}'
                            + '.scrollable-wrapper .shadow.bottom {'
                                + 'background: radial-gradient(at bottom, rgba(0, 0, 0, 0.2), transparent);'
                                + 'bottom: 0;'
                        + '}'
                    + '</style>');

        // Return jQuery object
        return this;
    };

    // Init on document ready
    $(function () {
        $('.' + className).scrollable();
    });
}(jQuery));
