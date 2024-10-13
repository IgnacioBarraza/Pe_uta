# Use the official Debian image
FROM debian:latest

# Install OpenSSH client and sshpass
RUN apt-get update && apt-get install -y openssh-client sshpass tar && rm -rf /var/lib/apt/lists/*

# Create a directory to store files
RUN mkdir -p /transfer/dist

# Set the working directory
WORKDIR /transfer

# Copy your dist folder into the container (make sure to create the tar file beforehand)
COPY dist /transfer/dist/

# Create a tar file of the dist folder
RUN tar -cvf dist.tar /transfer/dist

# Copy the transfer script into the container
COPY transfer.sh /transfer/transfer.sh
RUN chmod +x /transfer/transfer.sh

# Set the default command to execute the transfer script
CMD ["/transfer/transfer.sh"]
