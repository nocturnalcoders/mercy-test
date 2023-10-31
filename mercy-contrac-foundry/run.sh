#!/bin/bash

# Load the variables in .env file 
source .env

forge create src/benz_nft.sol:BenzToken --private-key=$PRIVATE_KEY --constructor-args 1698478379 1698564778
