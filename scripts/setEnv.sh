
set -o nounset
set -o errexit
set -o xtrace

######################################################################################################################
#                                                   SET ENV VARS                                                     #
######################################################################################################################

setEnv() {
  SKIP_CI="[skip ci]"
  PROJECT_NAME=$(node -p -e "require('../../package.json').name")
  CURRENT_VERSION=$(node -p -e "require('../../package.json').version")
  DOCKER_HUB_ID="tchiss"
  DOCKER_HUB_PWD="@Beaucoup1"
  DOCKER_REPOSITORY=${DOCKER_HUB_ID}/${PROJECT_NAME}
}
