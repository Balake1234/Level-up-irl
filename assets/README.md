AI Fitness Coach — Icon Export Instructions

This folder contains scripts to export `AI_Fitness_Coach_Icon.svg` to PNG sizes commonly used for app stores and launcher icons.

Recommended tools (choose one):
- Inkscape (command-line) — best fidelity for SVG conversion.
- ImageMagick (`magick`/`convert`) — convenient and widely available.

Scripts:
- `export_icon.ps1` — PowerShell script for Windows.
- `export_icon.sh` — Bash script for macOS / Linux.

Common icon sizes included by the scripts:
- 1024x1024 (App Store / Play Store asset)
- 512x512, 384x384, 192x192 (Play Store, Android)
- 180x180, 167x167, 152x152, 144x144, 120x120, 96x96, 72x72, 48x48 (iOS and Android launcher sizes)

How to run (Windows PowerShell):

```powershell
# from project root
powershell -ExecutionPolicy Bypass -File .\assets\export_icon.ps1
```

How to run (macOS / Linux):

```bash
# make script executable first
chmod +x assets/export_icon.sh
./assets/export_icon.sh
```

If you need store-specific asset catalogs (iOS `.appiconset` or Android adaptive icons), I can generate a template and a JSON manifest next.
