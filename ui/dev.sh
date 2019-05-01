#!/usr/bin/env bash

# Get Basedir
CWD=`pwd`
BASEDIR=$( cd ${CWD} && cd `dirname $0` && pwd )

_container=`docker ps --no-trunc --format="{{.Names}}" | grep conv-ui`

cd ${BASEDIR}/angular && \
npm run build && \
mkdir -p /tmp/html && \
cp -v ${BASEDIR}/build/app/* /tmp/html && \
docker cp /tmp/html "${_container}:/usr/share/nginx"
