#!/bin/bash

# Author: presentj94@gmail.com (PresentJay@Github)

while getopts h-: OPT; do
    if [ $OPT = "-" ]; then
        OPT=${OPTARG%%=*}
        OPTARG=${OPTARG#$OPT}
        OPTARG=${OPTARG#=}
    fi
    case $OPT in
        dir)
            __DIR__=$OPTARG
        ;;
        index)
            __INDEX__=$OPTARG
        ;;
        h | help | ? | *)
            echo "example: npm run job -- --dir=\"something\" --index=\"something\""
        ;;
    esac
done
shift $(( OPTIND - 1 ))

source ${__DIR__}/index.sh
__TARGET__=$(eval echo \$_${__INDEX__})
__WORKDIR__="/home/myuser"
__FULL_TARGET__=${__WORKDIR__}/${__DIR__}/${__TARGET__}
__DOCKERNAME__=${__DIR__}_${__TARGET__}-$(date +%s)

mkdir results/${__DOCKERNAME__}

docker run -d \
    --name ${__DOCKERNAME__} \
    -v ${PWD}/${__DIR__}/${__TARGET__}:${__FULL_TARGET__} \
    -v ${PWD}/results/${__DOCKERNAME__}:${__WORKDIR__}/storage \
    presentj94/crawlee \
    ${__DIR__}/${__TARGET__}/main.mjs

# END