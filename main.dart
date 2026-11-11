import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'theme.dart';
import 'onboarding_flow.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  final onboardingComplete = prefs.getBool('onboardingComplete') ?? false;
  final selectedGoal = prefs.getString('selectedGoal');

  runApp(FitnessApp(
    onboardingComplete: onboardingComplete,
    selectedGoal: selectedGoal,
  ));
}

class FitnessApp extends StatelessWidget {
  final bool onboardingComplete;
  final String? selectedGoal;

  const FitnessApp({
    super.key,
    required this.onboardingComplete,
    this.selectedGoal,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme.dark(),
      debugShowCheckedModeBanner: false,
      home: onboardingComplete
          ? DashboardScreen(selectedGoal: selectedGoal)
          : OnboardingFlow(initialGoal: selectedGoal),
    );
  }
}
