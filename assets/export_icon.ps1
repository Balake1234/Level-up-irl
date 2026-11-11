Param(
  [string]$Input = "AI_Fitness_Coach_Icon.svg"
)

$sizes = @(1024, 512, 384, 192, 180, 167, 152, 144, 120, 96, 72, 48)
$outputDir = "assets/png"

if (-not (Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir | Out-Null }

foreach ($s in $sizes) {
  $out = Join-Path $outputDir ("icon_${s}x${s}.png")
  if (Get-Command inkscape -ErrorAction SilentlyContinue) {
    inkscape $Input --export-filename="$out" --export-width=$s --export-height=$s
  } elseif (Get-Command magick -ErrorAction SilentlyContinue) {
    magick convert -background none -resize ${s}x${s} "$Input" "$out"
  } else {
    Write-Host "Install Inkscape or ImageMagick and re-run this script."
    exit 1
  }
  Write-Host "Saved $out"
}
