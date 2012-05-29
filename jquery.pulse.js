/*global jQuery*/
/*jshint curly:false*/

;(function ( $, window, document, undefined ) {
  "use strict";

  var pluginName = 'pulse',
    defaults = {
      pulses   : 1,
      interval : 0,
      duration : 500
    };

  $.fn.pulse = function(properties, options, callback) {
    options = $.extend({}, defaults, options);

    if (!(options.interval >= 0)) options.interval = 0;
    if (!(options.duration >= 0)) options.duration = 500;
    if (!(options.pulses >= -1))   options.pulses = 1;

    return this.each(function () {
      var el = $(this),
          property,
          original = {}
        ;

      for (property in properties) {
        if (properties.hasOwnProperty(property)) original[property] = el.css(property);
      }

      var timesPulsed = 0;

      function animate() {
        if (options.pulses > -1 && ++timesPulsed > options.pulses) return;
        el.animate(
          properties,
          {
            duration : options.duration / 2,
            complete : function(){
              el.animate(original, {
                duration : options.duration / 2,
                complete : function() {
                  window.setTimeout(animate, options.interval);
                }
              });
            }
          }
        );
      }

      animate();
    });
  };

})( jQuery, window, document );
