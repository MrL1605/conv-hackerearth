#!/usr/bin/env bash

# Get Basedir
CWD=`pwd`
BASEDIR=$( cd ${CWD} && cd `dirname $0` && pwd )

cd ${BASEDIR}/angular/ && \
npm i && \
npm run build && \
cd ../build && \
docker build -t redit/conv-ui .


