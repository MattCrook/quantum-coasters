#!/bin/bash

touch .credentials

cat > .credentials <<EOF
CERT=${CERT}
CLIENT_KEY=${CLIENT_KEY}
CLIENT_CERT=${CLIENT_CERT}
PASSWORD=${PASSWORD}
EOF
