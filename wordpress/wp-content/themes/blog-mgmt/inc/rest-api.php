<?php

// Register custom REST API routes
function register_blog_post_api_routes()
{
    // Endpoint to get all blog posts
    register_rest_route('custom/v1', '/blog-posts', [
        'methods' => 'GET',
        'callback' => 'blog_post_api_get_posts',
    ]);

    // Endpoint to create a new blog post
    register_rest_route('custom/v1', '/blog-posts', [
        'methods' => 'POST',
        'callback' => 'blog_post_api_create_post',
        'permission_callback' => function () {
            return validate_jwt_token() && current_user_can_publish_posts();
        },
    ]);

    // Endpoint to update a specific blog post
    register_rest_route('custom/v1', '/blog-posts/(?P<id>\d+)', [
        'methods' => 'PUT',
        'callback' => 'blog_post_api_update_post',
        'permission_callback' => function () {
            return validate_jwt_token() && current_user_can_edit_posts();
        },
    ]);

    // Endpoint to delete a specific blog post
    register_rest_route('custom/v1', '/blog-posts/(?P<id>\d+)', [
        'methods' => 'DELETE',
        'callback' => 'blog_post_api_delete_post',
        'permission_callback' => function () {
            return validate_jwt_token() && current_user_can('administrator');
        },
    ]);
}

add_action('rest_api_init', 'register_blog_post_api_routes');

// JWT token validation helper
function validate_jwt_token()
{
    $auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if (!$auth_header || strpos($auth_header, 'Bearer') === false) {
        return false;
    }
    return true;
}

// Callback function to get all blog posts
function blog_post_api_get_posts(WP_REST_Request $request)
{
    $per_page = $request->get_param('per_page') ?: 5; // Default to 5 posts per page
    $page = $request->get_param('page') ?: 1;
    $args = [
        'post_type' => 'blog-post',
        'posts_per_page' => $per_page,
        'paged' => $page,
        'post_status' => 'publish',
    ];

    $posts = get_posts($args);

    if (empty($posts)) {
        return new WP_REST_Response(['message' => 'No blog posts found'], 404);
    }

    $query = new WP_Query($args);
    $posts = [];

    foreach ($query->posts as $post) {
        // Get post categories
        $categories = get_the_terms($post->ID, 'blog-category');
        $formatted_categories = [];

        if ($categories && !is_wp_error($categories)) {
            foreach ($categories as $category) {
                $formatted_categories[] = [
                    'id' => $category->term_id,
                    'name' => $category->name,
                    'slug' => $category->slug
                ];
            }
        }

        $posts[] = [
            'id' => $post->ID,
            'title' => get_the_title($post->ID),
            'content' => apply_filters('the_content', $post->post_content),
            'excerpt' => get_the_excerpt($post->ID),
            'author' => get_the_author_meta('display_name', $post->post_author),
            'date' => get_the_date('Y-m-d H:i:s', $post->ID),
            'permalink' => get_permalink($post->ID),
            'thumbnail' => get_the_post_thumbnail_url($post->ID, 'full'),
            'categories' => $formatted_categories,
            'acf_fields' => get_fields($post->ID)
        ];
    }
    return new WP_REST_Response([
        'posts' => $posts,
        'currentPage' => (int) $page,
        'totalPages' => (int) $query->max_num_pages,
    ], 200);
}

// Callback function to create a new blog post
function blog_post_api_create_post(WP_REST_Request $request)
{
    $params = $request->get_json_params();

    if (empty($params['title']) || empty($params['content'])) {
        return new WP_REST_Response(['message' => 'Title and content are required'], 400);
    }

    $post_id = wp_insert_post([
        'post_title' => sanitize_text_field($params['title']),
        'post_content' => wp_kses_post($params['content']),
        'post_status' => 'publish',
        'post_author' => get_current_user_id(),
        'post_type' => 'blog-post',
    ]);

    if (is_wp_error($post_id)) {
        return new WP_REST_Response(['message' => 'Failed to create blog post'], 500);
    }
    // Handle featured image if media ID is provided
    if (!empty($params['featured_media'])) {
        $media_id = (int) $params['featured_media'];

        // Verify media exists and is an image
        if (wp_attachment_is_image($media_id)) {
            set_post_thumbnail($post_id, $media_id);
        } else {
            return new WP_REST_Response(['message' => 'Invalid media ID or not an image'], 400);
        }
    }

    // Update ACF fields if provided
    if (!empty($params['acf_fields']) && is_array($params['acf_fields'])) {
        foreach ($params['acf_fields'] as $field_key => $field_value) {
            update_field($field_key, $field_value, $post_id);
        }
    }
    // Get the created post data
    $created_post = [
        'id' => $post_id,
        'title' => get_the_title($post_id),
        'content' => get_post_field('post_content', $post_id),
        'featured_media' => get_post_thumbnail_id($post_id),
        'thumbnail' => get_the_post_thumbnail_url($post_id, 'full'),
        'acf_fields' => get_fields($post_id)
    ];

    return new WP_REST_Response([
        'message' => 'Blog post created successfully',
        'post' => $created_post
    ], 200);
}

// Callback function to update a blog post
function blog_post_api_update_post(WP_REST_Request $request)
{
    $post_id = (int) $request->get_param('id');
    $params = $request->get_json_params();

    if (get_post_type($post_id) !== 'blog-post') {
        return new WP_REST_Response(['message' => 'Blog post not found'], 404);
    }

    // Update post data
    $updated = wp_update_post([
        'ID' => $post_id,
        'post_title' => sanitize_text_field($params['title']),
        'post_content' => wp_kses_post($params['content']),
    ], true);

    if (is_wp_error($updated)) {
        return new WP_REST_Response(['message' => 'Failed to update blog post'], 500);
    }

    // Handle featured image if media ID is provided
    if (!empty($params['featured_media'])) {
        $media_id = (int) $params['featured_media'];

        // Verify media exists and is an image
        if (wp_attachment_is_image($media_id)) {
            // Remove existing featured image if any
            $existing_thumbnail_id = get_post_thumbnail_id($post_id);
            if ($existing_thumbnail_id) {
                delete_post_thumbnail($post_id);
            }

            // Set new featured image
            set_post_thumbnail($post_id, $media_id);
        } else {
            return new WP_REST_Response(['message' => 'Invalid media ID or not an image'], 400);
        }
    }

    // Update ACF fields if provided
    if (!empty($params['acf_fields']) && is_array($params['acf_fields'])) {
        foreach ($params['acf_fields'] as $field_key => $field_value) {
            update_field($field_key, $field_value, $post_id);
        }
    }
    // Get the updated post data
    $updated_post = [
        'id' => $post_id,
        'title' => get_the_title($post_id),
        'content' => get_post_field('post_content', $post_id),
        'featured_media' => get_post_thumbnail_id($post_id),
        'thumbnail' => get_the_post_thumbnail_url($post_id, 'full'),
        'acf_fields' => get_fields($post_id)
    ];

    return new WP_REST_Response([
        'message' => 'Blog post updated successfully',
        'post' => $updated_post
    ], 200);
}

// Callback function to delete a blog post
function blog_post_api_delete_post(WP_REST_Request $request)
{
    $post_id = (int) $request->get_param('id');

    if (get_post_type($post_id) !== 'blog-post') {
        return new WP_REST_Response(['message' => 'Blog post not found'], 404);
    }

    $deleted = wp_delete_post($post_id, true);

    if (!$deleted) {
        return new WP_REST_Response(['message' => 'Failed to delete blog post'], 500);
    }

    return new WP_REST_Response(['message' => 'Blog post deleted', 'id' => $post_id], 200);
}

// Helper function to check if the current user can publish posts
function current_user_can_publish_posts()
{
    return current_user_can('publish_posts');
}

// Helper function to check if the current user can edit posts
function current_user_can_edit_posts()
{
    return current_user_can('edit_posts');
}

// Helper function to check if the current user can delete posts
function current_user_can_delete_posts()
{
    return current_user_can('delete_posts');
}

