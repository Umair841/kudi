#!/bin/bash

set -o nounset
set -o errexit
set -o xtrace

source ./../setEnv.sh

setEnv

######################################################################################################################
#                                                   Create Release and deploy to Docker hub                          #
######################################################################################################################

git checkout master
git branch --set-upstream-to=origin/master master

git pull

echo "Current version: ${CURRENT_VERSION}"
NEW_VERSION=`semver ${CURRENT_VERSION} -i patch`
RELEASE_VERSION="v${NEW_VERSION}"
if [[ ${NEW_VERSION} != ${CURRENT_VERSION} ]]; then
  echo "Force version"
  npm version patch -m "MEP - Bump krowd-api from ${CURRENT_VERSION} to ${NEW_VERSION}"
  git push origin master
  git tag ${RELEASE_VERSION} -am "Version ${RELEASE_VERSION}"
  git push origin "v${NEW_VERSION}"

  docker login -u ${DOCKER_HUB_ID} - ${DOCKER_HUB_PWD}
  docker tag ${PROJECT_NAME} ${DOCKER_REPOSITORY}:${NEW_VERSION}
  docker push ${DOCKER_REPOSITORY}:${NEW_VERSION}
fi
