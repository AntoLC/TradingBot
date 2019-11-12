#!/bin/sh

# NAME_APP -- ENV = Variable in docker or dockerfile
echo "Start Entry Point App: $NAME_APP"

if [ ! -e ${FULLPATH}/app.js ]; then
    # Create folder and go inside
    mkdir /build-dir && echo "mkdir /build-dir"
    cd /build-dir && echo "cd /build-dir"
    
    # Create OR Rebuild App 
    # if [ ! -e /build-dir/package.json ]; then
    #     echo "npx express-generator $NAME_APP"
    #     npx express-generator $NAME_APP;
    # else
    #     echo "npm rebuild"
    #     npm rebuild;
    # fi
    echo "npx express-generator $NAME_APP"
    npx express-generator $NAME_APP;
    
    # Copy app
    echo "cp -r /build-dir/$NAME_APP/* $PATH_APP$NAME_APP/"
    cp -r /build-dir/$NAME_APP/* $PATH_APP$NAME_APP/
fi

# Goto app and start it
cd ${FULLPATH}/ && echo "cd ${FULLPATH}/"
echo "npm install"
npm install
echo "DEBUG=$NAME_APP:* npm run devstart"
DEBUG=$NAME_APP:* npm run devstart