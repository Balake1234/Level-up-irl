import 'package:flutter/material.dart';
import '../models/user_profile.dart';
import '../models/workout_plan.dart';
import '../services/plan_service.dart';

class WorkoutPlanScreen extends StatelessWidget {
  final UserProfile profile;

  const WorkoutPlanScreen({super.key, required this.profile});

  @override
  Widget build(BuildContext context) {
    final WorkoutPlan plan = PlanService.generatePlan(profile);

    return Scaffold(
      appBar: AppBar(title: const Text('Your Workout Plan')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Hello, ${profile.name}',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text('Goal: ${profile.goal} • Level: ${profile.fitnessLevel}'),
            const SizedBox(height: 24),
            Text(
              plan.title,
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: plan.exercises.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    leading: CircleAvatar(child: Text('${index + 1}')),
                    title: Text(plan.exercises[index]),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
