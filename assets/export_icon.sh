#!/usr/bin/env bash
INPUT="AI_Fitness_Coach_Icon.svg"
SIZES=(1024 512 384 192 180 167 152 144 120 96 72 48)
OUTDIR="assets/png"
mkdir -p "$OUTDIR"

for s in "${SIZES[@]}"; do
  out="$OUTDIR/icon_${s}x${s}.png"
  if command -v inkscape >/dev/null 2>&1; then
    inkscape "$INPUT" --export-filename="$out" --export-width=$s --export-height=$s
  elif command -v magick >/dev/null 2>&1; then
    magick convert -background none -resize ${s}x${s} "$INPUT" "$out"
  else
    echo "Install Inkscape or ImageMagick to export PNGs." >&2
    exit 1
  fi
  echo "Saved $out"
done
