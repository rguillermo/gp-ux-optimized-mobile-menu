<?php

/*
Plugin Name: GP UX Optimized Mobile Menu
Plugin URI: https://toolbox.marketingdelta.net/
Description: Convert the standart GP menu in UX optimized menu for mobile users.
Version: 1.0
Author: MarketingDelta
Author URI: https://marketingdelta.net/
License: GPL2
*/

add_action('wp_enqueue_scripts','gp_ux_optimized_mobile_menu_init');

function gp_ux_optimized_mobile_menu_init() {
    wp_enqueue_script( 'float_menu_css', plugins_url( '/assets/gp-menu.js', __FILE__ ));
    wp_enqueue_style('float_menu_css', plugins_url('/assets/gp-menu.css', __FILE__));
}