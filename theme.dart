import 'package:flutter/material.dart';

class AppTheme {
  static const Color bg = Color(0xFF0D0D0F);
  static const Color card = Color(0xFF16171A);
  static const Color accent = Color(0xFF00E5C1);
  static const Color accentSecondary = Color(0xFF9A4DFF);
  static const Color textLight = Colors.white;
  static const Color textDim = Color(0xFF8A8A8D);
  static const Color border = Color(0x1FFFFFFF);

  static ThemeData dark() {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bg,
      fontFamily: 'Inter',
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.w600,
          color: textLight,
        ),
        headlineMedium: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: textLight,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          color: textLight,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          color: textDim,
        ),
      ),
      colorScheme: const ColorScheme.dark(
        primary: accent,
        secondary: accentSecondary,
        surface: card,
        background: bg,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: bg,
        foregroundColor: textLight,
        elevation: 0,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: accent,
          foregroundColor: bg,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: textLight,
          side: const BorderSide(color: border),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
        ),
      ),
      cardTheme: const CardThemeData(
        color: card,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(20)),
        ),
        elevation: 2,
      ),
    );
  }
}
