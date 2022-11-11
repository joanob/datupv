function react_enqueue_scripts() {

    wp_enqueue_script("theme", get_stylesheet_directory_uri() . "/dist/assets/index.js", array(), "1.0", true);
    wp_enqueue_style("theme", get_stylesheet_directory_uri() . "/dist/assets/index.css", array(), "1.0");

    <!-- 
    $config = array(
        // Add any theme variables needed in react
    );
    wp_localize_script('theme', 'wp_config', $config); 
    -->
}

add_action("wp_enqueue_scripts", "react_enqueue_scripts");