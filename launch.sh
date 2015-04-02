#!/bin/bash

echo '\033[32m\033[1mPrecompiling the CSS...\033[0m\033[39m'

# Searches the CSS directory for LESS files
for file in views/less/*.less
do
    FROM=$file
    TO=${file/.*/.css}
    TO=${TO/less/css}
    TO=${TO/views/resources}
    echo "$FROM -> $TO"
    # Compiles each LESS file into a CSS file of the same name with minified output
    lessc --clean-css $FROM $TO
done

echo '\033[32m\033[1mStarting Node process!\033[0m\033[39m'
node server.js