 
# Use the official image as a parent image
FROM postgres:16.1

# Set environment variables
ENV POSTGRES_USER=brain-agriculture-api
ENV POSTGRES_PASSWORD=q1w2e3r4t5
ENV POSTGRES_DB=brain-agriculture

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Set the default command to run when starting the container
CMD ["postgres"]
