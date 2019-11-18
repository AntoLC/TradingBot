#!/bin/sh

# NAME_APP -- ENV = Variable in docker or dockerfile
echo "Start Entry Point App: ${NAME_APP}"

# If app overload and delete by docker-compose, we create it again then overload it
echo "if [ ! -e ${ENTRY_POINT_SERVER} ]; then"
if [ ! -e ${ENTRY_POINT_SERVER} ]; then
    # Create folder and go inside
    mkdir /build-dir && echo "mkdir /build-dir"
    cd /build-dir && echo "cd /build-dir"
    
    #Create OR Rebuild App 
    # if [ ! -e /build-dir/package.json ]; then
    #     echo "npx create-react-app $NAME_APP"
    #     npx create-react-app $NAME_APP;
    # else
    #     echo "yarn --check-files"
    #     yarn --check-files
    # fi

    echo "npx create-react-app ${NAME_APP}"
    npx create-react-app ${NAME_APP};
    
    # Copy app
    echo "cp -r /build-dir/${NAME_APP}/* ${FULL_PATH}"
    cp -r /build-dir/${NAME_APP}/* ${FULL_PATH}
fi

# Goto app and start it
cd ${FULL_PATH} && echo "cd ${FULL_PATH}"
# echo "yarn --check-files"
# yarn --check-files
echo "yarn start"
yarn start