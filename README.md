Pop Tip
=======

Simple self contained jquery popup tooltip

$('.pop_tip').poptip({
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
});