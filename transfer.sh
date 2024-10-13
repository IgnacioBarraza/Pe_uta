#!/bin/sh

# Variables (modify as needed)
REMOTE_USER=nacho
REMOTE_HOST=${REMOTE_HOST}
REMOTE_TEMP_PATH=/home/nacho/prouta 
REMOTE_FINAL_PATH=/var/www/prouta
LOCAL_TAR_PATH=/transfer/dist.tar 
PASSWORD=${PASSWORD}

# Ensure the remote temp path exists
sshpass -p "${PASSWORD}" ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_TEMP_PATH}"

# Copy the tar file to the remote temp directory
sshpass -p "${PASSWORD}" scp -o StrictHostKeyChecking=no ${LOCAL_TAR_PATH} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_TEMP_PATH}

# Move and extract the files in the final destination with sudo
sshpass -p "${PASSWORD}" ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "
echo ${PASSWORD} | sudo -S rm -rf ${REMOTE_FINAL_PATH} &&
echo ${PASSWORD} | sudo -S mkdir -p ${REMOTE_FINAL_PATH} &&
echo ${PASSWORD} | sudo -S tar -xvf ${REMOTE_TEMP_PATH}/dist.tar -C ${REMOTE_FINAL_PATH} &&
echo ${PASSWORD} | sudo -S rm -rf ${REMOTE_TEMP_PATH}/dist.tar"
