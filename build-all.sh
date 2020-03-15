eval $(docker-machine env -u)

SERVICES=(
00_frontend
01_api
07_website-contact-store
08_telegram
)




for  service in "${SERVICES[@]}"
do
  pushd $service
  echo "building $service ..."
  error=0
  buffer=$(npm run build:full || error=1)
  if [[ $error -eq 0 ]]; then
    echo "$service built successfully"
  else
    echo "$service failed to build"
  fi

  popd
done
