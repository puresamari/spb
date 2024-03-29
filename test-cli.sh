#!/bin/bash
set -e

export NVM_DIR="$HOME/.nvm"

echo "Running tests for cli"
echo
echo

echo "Uninstalling spb globally..."
echo
npm uninstall -g @puresamari/spb

echo "Installing spb globally..."
echo
npm i -g

echo
echo
echo "Running manual file declaration test..."
echo

spb -o test-dist --files examples/hello-world/views/index.pug examples/hello-world/styles.css examples/hello-world/main.ts -c examples/hello-world.config.spb.json

echo
echo
echo "Running manual config file test..."
echo

spb -o test-dist -c examples/hello-world.config.spb.json