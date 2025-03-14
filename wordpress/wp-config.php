<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'blog_mgmt_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '[;0b,%1c0*44Z8kg:Yw0,kX;jfUAFn_!tv9?5Pu2<<y&1~%T}~lWjEy}SP%NET%e' );
define( 'SECURE_AUTH_KEY',  '3&I}6oW~Jdmq+E.,g{^)qGt8yB+B8RU =2;NcMK-H ~sVRy`._L7Bvaz/urkwcf<' );
define( 'LOGGED_IN_KEY',    'gdC44j/zDT96I<zmC@|L,5ThEB0**Pr[g] #QdM4HM|~bj|d}Vt`|03nC`K6R he' );
define( 'NONCE_KEY',        'pJ3yY[ZFO=!p<M;HHV[34iVRx!<1$IhA/X`Ow21$BFIRgpw+R5`qgfA^zj&-j3c)' );
define( 'AUTH_SALT',        '-iNN]A$u_SB]*@-M9A]M-`!RjQl=JuIHDhj/:tHFb-F=s`*RL#!TASSt2 /Dqx$,' );
define( 'SECURE_AUTH_SALT', 'gt:eYA3lscK(RV~`pFy:vk3 ]LIHxGK_U}qdRK07&fJo:+A(T<*7!r!,/rB<?T6S' );
define( 'LOGGED_IN_SALT',   '$*z,s/GycKJZ`6(6h.r7; 8~s[fvoDh`%!$#2_1{s;^9b8ZZkTf^)LhuoRVrQSx3' );
define( 'NONCE_SALT',       '~t(+9ilVtg5p0A2IqN!C@!<-|)R* 5H*}>4Nh-Etc1a1K[(!j>ux2NGCyvUl`4SV' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'bms_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
