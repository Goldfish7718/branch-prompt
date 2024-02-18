#!/bin/bash

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <library1> <library2> ..."
    exit 1
fi

# Loop through command-line arguments and install each library
for lib in "$@"; do
    echo "Installing $lib..."
    npm install "$lib"
done

echo "All libraries installed successfully."
