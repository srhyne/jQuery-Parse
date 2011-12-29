#!/usr/bin/env bash

# Run this to get your base64 encoded Basic Auth header. 

export APPLICATION_ID=""
export MASTER_KEY=""

curl --user $APPLICATION_ID:$MASTER_KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"score": 1337, "playerName": "Sean Plott", "cheatMode": false }' \
  -lv https://api.parse.com/1/classes/GameScore