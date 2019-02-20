#!/bin/bash

export PORT=3333
echo 'Starting Node server and opening browser to localhost:3333'
npm start &
xdg-open 'http://localhost:3333'



