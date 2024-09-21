<?php
/*
 * daloRADIUS configuration file
 */

// Database connection parameters
$configValues['FREERADIUS_VERSION'] = '3';
$configValues['CONFIG_DB_ENGINE'] = 'mysqli';
$configValues['CONFIG_DB_HOST'] = 'postgres';      // Database host (use same as in docker-compose.yml)
$configValues['CONFIG_DB_PORT'] = '5432';          // PostgreSQL default port
$configValues['CONFIG_DB_USER'] = 'raduser';       // Database user (same as docker-compose.yml)
$configValues['CONFIG_DB_PASS'] = 'radpass';       // Database password (same as docker-compose.yml)
$configValues['CONFIG_DB_NAME'] = 'radius';        // Database name (same as docker-compose.yml)

// Path to the RADIUS log files
$configValues['PATH_RADDB'] = '/etc/freeradius/3.0';

// Additional configuration parameters
$configValues['CONFIG_LOG_FILE'] = '/var/log/freeradius/radius.log';

// Other customizations can be added here
?>
