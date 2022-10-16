#!/bin/bash

# Author: presentj94@gmail.com (PresentJay@Github)

while getopts h-: OPT; do
    if [ $OPT = "-" ]; then
        OPT=${OPTARG%%=*}
        OPTARG=${OPTARG#$OPT}
        OPTARG=${OPTARG#=}
    fi
    case $OPT in
        runner)
            __RUNNER__=$OPTARG
        ;;
        dir)
            __DIR__=$OPTARG
        ;;
        index)
            __INDEX__=$OPTARG
        ;;
        h | help | ? | *)
            echo "example: npm run clean -- --runner=\"something\" --dir=\"something\" --index=\"something\""
        ;;
    esac
done
shift $(( OPTIND - 1 ))

source ${__DIR__}/index.sh
__TARGET__=$(eval echo \$_${__INDEX__})
__TARGET_DOCKERNAMES__=$(docker ps -a --format {{.Names}} | grep ${__DIR__}_${__TARGET__}-${__RUNNER__})

if [[ -z ${__TARGET_DOCKERNAMES__} ]]; then
    echo "there are no containers like ${__TARGET__} in ${__DIR__} with ${__RUNNER__}"
else
    read -ra iter <<< ${__TARGET_DOCKERNAMES__}
    for _ in ${iter[@]}; do
        docker rm $_
        rm -rf results/$_
    done
    echo "above containers are deleted in your system."
fi


# END