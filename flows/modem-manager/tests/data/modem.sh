#!/bin/sh
set -e
SIMULATE=${SIMULATE:-0}

dir=$(CDPATH="" cd -- "$(dirname -- "$0")" && pwd)

SUDO=
if [ "$(id -u)" != 0 ]; then
    if command -V sudo >/dev/null 2>&1; then
        SUDO=sudo
    fi
fi

if [ "$SIMULATE" = 1 ]; then
    echo "Using simulated data" >&2
    SIM=$(cat "$dir/sim.json")
    LOCATION=$(cat "$dir/location.json")
    MODEM=$(cat "$dir/modem.json")
else
    MODEM=$($SUDO mmcli --modem any -J || echo '{}')
    SIM=$($SUDO mmcli --sim any -J || echo '{}')
    LOCATION=$($SUDO mmcli --modem any --location-get -J || echo '{}')
fi

echo "$SIM" "$LOCATION" "$MODEM" | jq -s '.[0] * .[1] * .[2]'
