#!/usr/bin/env bash

# Preload base bash configuration and functions
source bgord-scripts/base.sh

OUT_DIR="build"

info "Environment: staging"
export NODE_ENV="staging"

check_if_directory_exists node_modules

# ==========================================================

info "Building project!"

# ==========================================================

rm -rf $OUT_DIR
mkdir $OUT_DIR
info "Cleaned previous build cache"

# ==========================================================

cp node_modules/@bgord/design/dist/main.min.css static/
cp node_modules/@bgord/design/dist/normalize.min.css static/
info "Copied CSS"

# ==========================================================

./bgord-scripts/css-purge.sh

# ==========================================================

./bgord-scripts/frontend-build.sh
info "Frontend built"

# ==========================================================

cp index.html $OUT_DIR
info "Copied index.html"

# ==========================================================

if test -d static
then
  cp -r static $OUT_DIR
  info "Copied static files"
else
  info "static/ directory doesn't exist, step skipped"
fi

# ==========================================================

npx gzip build/static/*.js --extension=gz --extension=br
npx gzip build/static/*.css --extension=gz --extension=br
npx gzip build/static/*.png --extension=gz --extension=br
npx gzip build/*.html --extension=gz --extension=br
info "Compressing static files"

# ==========================================================

success "Project built correctly!"
