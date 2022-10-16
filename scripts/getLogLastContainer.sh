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
            echo "example: npm run log-last -- --dir=\"something\" --index=\"something\""
        ;;
    esac
done
shift $(( OPTIND - 1 ))

source ${__DIR__}/index.sh
__TARGET__=$(eval echo \$_${__INDEX__})
__TARGET_DOCKERNAMES__=$(docker ps -a --format {{.Names}} | grep ${__DIR__}_${__TARGET__})

IFS=' '
read -ra iter <<< ${__TARGET_DOCKERNAMES__}

echo "======================================================================="
echo "target-container: ${iter[0]}"
echo "======================================================================="
docker logs ${iter[0]}
echo "======================================================================="

# END