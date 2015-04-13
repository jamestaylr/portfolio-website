#!/bin/bash

print_message() {
	echo '\033[32m\033[1m'$1'\033[0m\033[39m'
}

print_message 'Precompiling the CSS...'

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

print_message 'Starting Node process!'
node server.js