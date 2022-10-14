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
            echo "example: npm run clean -- --dir=\"something\" --index=\"something\""
        ;;
    esac
done
shift $(( OPTIND - 1 ))

source ${__DIR__}/index.sh
__TARGET__=$(eval echo \$_${__INDEX__})

docker rm $(docker ps -a --format {{.Names}} | grep ${__DIR__}_${__TARGET__})
echo "above containers are deleted in your system."

# END