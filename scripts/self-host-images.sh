#!/usr/bin/env bash
# Download every Wix-hosted image used by index.html into ./images
# and rewrite index.html to point at the local copies.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p images

grep -oE 'https://static\.wixstatic\.com/media/[^"]+' index.html | sort -u | while read -r url; do
  id=$(echo "$url" | sed -E 's#https://static\.wixstatic\.com/media/([^/]+)/.*#\1#')
  w=$(echo "$url" | sed -E 's#.*/w_([0-9]+),.*#\1#')
  ext="${id##*.}"; base="${id%%~*}"; base="${base%.*}"
  file="images/${base}_${w}.${ext}"
  [ -f "$file" ] || curl -fsSL "$url" -o "$file"
  # escape for sed
  esc=$(printf '%s' "$url" | sed 's/[&/\]/\\&/g')
  sed -i.bak "s/${esc}/${file//\//\\/}/g" index.html
  echo "✓ $file"
done
rm -f index.html.bak
echo "Done. Commit the images/ folder and index.html."
