#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run build

cd ../../..
rm -rf docs
cp -a wp-content/themes/design/dist ./docs

## commit and push
git add .
git commit -m "deploy"
git push origin main
