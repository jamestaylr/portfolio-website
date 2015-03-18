#!/bin/bash

echo '\033[32m\033[1mPrecompiling the CSS...\033[0m\033[39m'

# Searches the CSS directory for LESS files
for file in views/css/*.less
do
    FROM=$file
    A=${file/.*/.css}
    TO=${A/views/resources}
    echo "$FROM -> $TO"
    # Compiles each LESS file into a CSS file of the same name with minified output
    lessc --clean-css $FROM $TO
done

echo '\033[32m\033[1mStarting the server!\033[0m\033[39m'
node server.js