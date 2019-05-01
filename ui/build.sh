#!/usr/bin/env bash


cd ui/angular/ && \
npm i && \
npm run build && \
cd ../build && \
docker build -t redit/conv-ui .


