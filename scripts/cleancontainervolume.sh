#!/bin/bash

# Author: presentj94@gmail.com (PresentJay@Github)

echo "docker volume rm \$(docker volume ls | grep $1 | awk "{print \$2}")"
docker volume rm $(docker volume ls | grep $1 | awk "{print \$2}")
echo "above volumes are deleted in your system."

# END