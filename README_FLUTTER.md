# Flutter Project Scaffold

This workspace now includes a basic Flutter app scaffold for the AI Fitness Coach project.

## Files created
- `pubspec.yaml` — Flutter project metadata and asset configuration
- `lib/main.dart` — minimal Flutter app using `assets/AI_Fit.png`
- `.gitignore` — Flutter-friendly ignore rules

## Next steps
1. Install Flutter on your machine.
2. Open this folder in VS Code.
3. Run `flutter pub get`.
4. Run `flutter run -d chrome` for web or `flutter run -d <device>` for available devices.

## App icons
The `pubspec.yaml` is configured to use `assets/AI_Fit.png` for both Android and iOS launcher icons via `flutter_launcher_icons`.

To generate launcher icons after installing Flutter:

```bash
flutter pub get
flutter pub run flutter_launcher_icons:main
```

If you want, I can also help add iOS and Android platform manifest files once Flutter is installed.