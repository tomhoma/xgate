FROM lirantal/daloradius:latest

# Copy custom configuration file
COPY config/daloradius.conf.php /var/www/html/library/

# You can add more customizations here if needed

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]