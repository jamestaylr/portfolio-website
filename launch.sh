#!/bin/bash

print_message() {
	echo '\033[32m\033[1m'$1'\033[0m\033[39m'
}

print_message 'Precompiling the CSS...'

lessc --clean-css views/less/style.less resources/style.css

print_message 'Starting Node process!'
node server.js