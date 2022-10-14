#!/bin/bash

echo "docker run -it --privileged=true --rm -v ${PWD}:/usr/src/app presentj94/nodejs \"bash\""
docker run -it --privileged=true --rm -v /${PWD}:/usr/src/app presentj94/nodejs bash