<?php

function react_theme_support() {
    add_theme_support("title-tag");
}
add_action("after_setup_theme", "react_theme_support");

/**
 * Remove WP site url an trailing slash from url
 * 
 */
function react_strip_site_url($url) {
    $base_url = site_url();
    $url = trailingslashit($url);
    $url = substr($url, strlen($base_url) + 1);
    if (substr($url, -1) == '/') {
        $url = substr($url, 0, -1);
    }
    return $url;
}


/**
 * Register main menu
 */
function react_register_menus() {
    register_nav_menus(array("main-menu" => "Main Menu"));
}
add_action("init", "react_register_menus");

/**
 * Get wordpress menu by location
 */
function react_get_menu($location) {
    $output = [];
    $locations = get_nav_menu_locations();
    $menu = wp_get_nav_menu_object($locations[$location]);
    $menu_items = wp_get_nav_menu_items($menu);

    foreach ($menu_items as $item) {

        $data = [
            'ID' => $item->ID,
            'title' => $item->title,
            'url' => '/' . react_strip_site_url($item->url),
            'parent' => intval($item->menu_item_parent),
        ];
        $output[] = $data;
    }

    return $output;
}

/**
 * Generate list of post type archive routes.
 * 
 * Post types are: post, page, attachment, revision, navigation menu, block template and template part
 */
function react_generate_post_type_archive_routes() {
    $routes = [];

    $post_types = get_post_types(array("public" => true));

    foreach ($post_types as $post_type) {
        $link = get_post_type_archive_link($post_type);
        if (!$link) {
            continue;
        }

        $link = "/" . react_strip_site_url($link);
        $routes[$link] = ["component" => "Archive", "post_type" => $post_type];
    }

    return $routes;
}

/**
 * Generate list of post type routes
 */
function react_generate_post_type_routes()
{
    $routes = [];

    $post_types = get_post_types(array(
        'public' => true
    ));

    foreach ($post_types as $post_type) {

        $query = new WP_Query(array(
            'post_type' => $post_type,
            'posts_per_page' => -1,
            'fields' => 'ids'
        ));

        if (!empty($query->posts)) {
            foreach ($query->posts as $id) {
                $url = get_permalink($id);
                $url = '/' . react_strip_site_url($url);
                $routes[$url] = ['component' => 'Single', 'post_type' => $post_type, 'id' => $id];
            }
        }
    }

    return $routes;
}

/**
 * Generate list of all wordpress routes
 *
 */
function react_generate_routes()
{
    $routes = [];
    $routes = array_merge($routes, react_generate_post_type_routes());
    $routes = array_merge($routes, react_generate_post_type_archive_routes());
    return $routes;
}

/**
 * Enqueue react scripts and setup window.wp_config js variable
 */
function react_enqueue_scripts() {

    wp_enqueue_script("theme", get_stylesheet_directory_uri() . "/dist/assets/index.js", array(), "1.0", true);
    wp_enqueue_style("theme", get_stylesheet_directory_uri() . "/dist/assets/index.css", array(), "1.0");

    $config = array(
        "routes" => react_generate_routes(),
        "menu" => react_get_menu("main-menu") 
    );
    wp_localize_script('theme', 'wp_config', $config); 
    
}

add_action("wp_enqueue_scripts", "react_enqueue_scripts");

/**
 * Custom enpoint for getting window.wp_config data
 */
function react_api_routes_endpoint() {
    return array(
        "routes" => react_generate_routes(), "menus" => array(
            "main" => react_get_menu("main-menu")
        )
    );
}

add_action( 'rest_api_init', function () {
  // /wp-json/api/v1/routes
  register_rest_route( 'api/v1', '/routes', array(
    'methods' => 'GET',
    'callback' => 'react_api_routes_endpoint',
  ) );
} );