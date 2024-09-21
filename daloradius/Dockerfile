# Use the tiredofit/daloradius image as the base
FROM dormancygrace/daloradius:latest

# Copy custom configuration file
COPY config/daloradius.conf.php /var/www/html/library/

# Optionally, add more customizations here if needed

# Use the default CMD provided by the tiredofit/daloradius image
# You don't need to run apache manually since the base image already handles it.