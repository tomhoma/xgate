FROM freeradius/freeradius-server:latest

# Copy custom configuration files
COPY config/ /etc/freeradius/3.0/

# Install PostgreSQL client (for connecting to the database)
RUN apt-get update && apt-get install -y postgresql-client

# You can add more customizations here if needed

CMD ["freeradius", "-X"]