#!/bin/bash

DIR="./build"

if [[ -d $DIR ]]; then
    echo "Found Directory -- Deleting ${DIR}"
    rm -rf $DIR
fi

npm run build
