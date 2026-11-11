import 'package:flutter/material.dart';
import '../models/user_profile.dart';
import 'workout_plan_screen.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _ageController = TextEditingController();
  String _fitnessLevel = 'Beginner';
  String _goal = 'Strength';

  @override
  void dispose() {
    _nameController.dispose();
    _ageController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState?.validate() ?? false) {
      final profile = UserProfile(
        name: _nameController.text.trim(),
        age: int.parse(_ageController.text.trim()),
        fitnessLevel: _fitnessLevel,
        goal: _goal,
      );

      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => WorkoutPlanScreen(profile: profile),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Get Started')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Enter your name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _ageController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(labelText: 'Age'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Enter your age';
                  }
                  final parsed = int.tryParse(value);
                  if (parsed == null || parsed <= 0) {
                    return 'Enter a valid age';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              const Text('Fitness level'),
              DropdownButtonFormField<String>(
                value: _fitnessLevel,
                items: const [
                  DropdownMenuItem(value: 'Beginner', child: Text('Beginner')),
                  DropdownMenuItem(value: 'Intermediate', child: Text('Intermediate')),
                  DropdownMenuItem(value: 'Advanced', child: Text('Advanced')),
                ],
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _fitnessLevel = value;
                    });
                  }
                },
              ),
              const SizedBox(height: 16),
              const Text('Goal'),
              DropdownButtonFormField<String>(
                value: _goal,
                items: const [
                  DropdownMenuItem(value: 'Strength', child: Text('Strength')),
                  DropdownMenuItem(value: 'Endurance', child: Text('Endurance')),
                  DropdownMenuItem(value: 'Flexibility', child: Text('Flexibility')),
                ],
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _goal = value;
                    });
                  }
                },
              ),
              const SizedBox(height: 24),
              Center(
                child: ElevatedButton(
                  onPressed: _submit,
                  child: const Text('Create plan'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
