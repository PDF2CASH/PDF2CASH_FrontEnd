#!/bin/bash

apt get install zip
apt get install curl
cd ..
zip -r  ./frontend.zip ./build
curl -F 'file=@./frontend.zip' https://pdf2cash-cloudupdater.herokuapp.com/api/system/frontend/
