#!/bin/sh

# NAME_APP -- ENV = Variable in docker or dockerfile
echo "Start Entry Point App: $NAME_APP"

# If app overload and delete by docker-compose, we create it again then overload it
if [ ! -e $PATH_APP$NAME_APP/src/index.js ]; then
    # Create folder and go inside
    mkdir /build-dir && echo "mkdir /build-dir"
    cd /build-dir && echo "cd /build-dir"
    
    # Create OR Rebuild App 
    # if [ ! -e /build-dir/package.json ]; then
    #     echo "npx create-react-app $NAME_APP"
    #     npx create-react-app $NAME_APP;
    # else
    #     echo "npm rebuild"
    #     npm rebuild;
    # fi

    echo "npx create-react-app $NAME_APP"
    npx create-react-app $NAME_APP;
    
    # Copy app
    echo "cp -r /build-dir/$NAME_APP/* $PATH_APP$NAME_APP/"
    cp -r /build-dir/$NAME_APP/* $PATH_APP$NAME_APP/
fi

# Goto app and start it
cd $PATH_APP$NAME_APP/ && echo "cd $PATH_APP$NAME_APP/"
#echo "yarn --check-files"
#yarn --check-files
echo "yarn start"
yarn start