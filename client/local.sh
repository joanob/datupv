#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run build

cd ../../../..
rm -rf datupv
cp -a dat/wp-content/themes/design/dist ./datupv