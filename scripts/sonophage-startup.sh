#!/bin/bash

export PATH="/usr/local/bin/:$PATH"

# Navigate out of .app directory
# TODO: find a way which allow the script to run as shell script and as .app
cd ../../../

ENV="production"
APP="$PWD/sonophage"
LOGS="$PWD/sonophage-logs"

mkdir -p $LOGS

sleep 60
node $APP --log=$LOGS/$(date +%Y-%m-%d_%H-%M).log
