/*
  Simple tooltip jquery plugin
  Copyright (c) 2012 Brian Voelker (webiswhatido.com)
  Licensed under GPLv3
  http://www.opensource.org/licenses/gpl-3.0.html
  Version: 1
*/

(function($){

    /* Options */
    var poptip_options = {
        /* Styling */
        zindex: 10, /* Set z-index */
        position: 'absolute', /* Set position */
        padding: '5px 10px', /* Set padding around text */
        border: 'solid 1px #8AADB9', /* Set border */
        bgcolor: '#7EBD77', /* Background color */
        color: '#ffffff', /* Text color */ 
        fontweight: 'normal',
        fontsize: '12px',
        borderradius: '3px', /* Set border radius */
        boxshadow: '1px 1px 4px #303030', /* Set Shadow */

        /* Preferences */
        x_offset: 30, /* x offset from mouse */
        y_offset: 10, /* y offset from mouse */
        animate: false, /* Animation options (showhide, fade or slide) - can be false to just show hide */
        speed: 150 /* Speed of animation if set */
    };

    /* Datas */
    var poptip_data = {
        pop_id: null, /* Poptip id */
        pop_item: null, /* Poptip container */
        pop_text: null, /* Poptip text */
        pop_div: null /* Poptip div */
    };

    var poptip_funcs = {
        /************************/
        /*** Public functions ***/
        /************************/
        create: function(options, item) {
            var info = this;

            /* Replace default options with requested options */
            info.options = $.extend({}, poptip_options, options);
            info.data = $.extend({}, poptip_data, {});

            /* Clear out data */
            info.data.pop_id = null;
            info.data.pop_item = null;
            info.data.pop_text = null;
            
            /* Set Container */
            info.data.pop_id = 'poptip_'+new Date().getTime();
            info.data.pop_item = $(item);

            /* Grab tip text */
            info.data.pop_text = info.data.pop_item.attr('title');

            /* Remove title */
            info.data.pop_item.removeAttr('title');

            /* Create and add container */
            $('body').append('<div id="'+info.data.pop_id+'" style="display: none;">'+info.data.pop_text+'</div>');

            /* Set poptip div */
            info.data.pop_div = $('#'+info.data.pop_id);

            /* Style pop tip */
            info.data.pop_div.css({
                'z-index': 1,
                'position': info.options.position,
                'padding': info.options.padding,
                'border': info.options.border,
                'background-color': info.options.bgcolor,
                'color': info.options.color,
                'font-weight': info.options.fontweight,
                'font-size': info.options.fontsize,
                'border-radius': info.options.borderradius,
                '-moz-border-radius': info.options.borderradius,
                '-webkit-border-radius': info.options.borderradius,
                'box-shadow': info.options.boxshadow,
                '-moz-box-shadow': info.options.boxshadow, 
                '-webkit-box-shadow': info.options.boxshadow
            });

            /* Add hover */
            info.data.pop_item.hover(function(e){
                /* Set z-index */
                info.data.pop_div.css({'z-index': info.options.zindex});

                /* Animate */
                if(!info.options.animate || info.options.animate == 'showhide'){
                    info.data.pop_div.show();
                } else if(info.options.animate == 'fade') {
                    info.data.pop_div.stop().fadeIn(info.options.speed);
                } else if(info.options.animate == 'slide') {
                    info.data.pop_div.stop().slideDown(info.options.speed);
                }
            }, function(){
                /* Set z-index */
                info.data.pop_div.css({'z-index': 1});

                /* Animate */
                if(!info.options.animate || info.options.animate == 'showhide'){
                    info.data.pop_div.hide();
                } else if(info.options.animate == 'fade') {
                    info.data.pop_div.stop().fadeOut(info.options.speed);
                } else if(info.options.animate == 'slide') {
                    info.data.pop_div.stop().slideUp(info.options.speed);
                }
            });

            /* Add mouse move */
            info.data.pop_item.mousemove(function(e){
                info.data.pop_div.css('top', (e.pageY - info.options.x_offset) + 'px').css('left', (e.pageX + info.options.y_offset) + 'px');
            });
        },
        destroy: function() {
            var info = ($.hasData(this) ? $(this).data('poptip'): this);

            /* Destroy Data */
            $(this).removeData('poptip');
        }
    };

    $.fn.poptip = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            /* Method calling logic */
            if (poptip_funcs[options]) {
                if($(this).data('poptip')) {
                    poptip_funcs[options].apply(this, args);
                }
            } else if (typeof options === 'object' || !options) {
                if(!$(this).data('poptip')) {
                    var poptip_obj = Object.create(poptip_funcs);
                    poptip_obj.create(options, this);
                    $.data(this, 'poptip', poptip_obj);
                }   
            } else {
                $.error('Method ' +  options + ' does not exist in Pop Tip');
            }
        });
    };

})(jQuery);

/* IE 8, 7 Compatibility */
if(typeof Object.create !== 'function'){
    Object.create = function(obj) {
        function F(){};
        F.prototype = obj;
        return new F();
    };
}