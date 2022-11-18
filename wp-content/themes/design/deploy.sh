#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run build

# move build to root folder
cp -a ./dist ../../../dist

## commit and push
git add .
git commit -m "deploy"
git push origin main
