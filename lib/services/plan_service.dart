import '../models/user_profile.dart';
import '../models/workout_plan.dart';

class PlanService {
  static WorkoutPlan generatePlan(UserProfile profile) {
    final level = profile.fitnessLevel.toLowerCase();
    final goal = profile.goal.toLowerCase();

    final baseExercises = [
      'Bodyweight Squats',
      'Push-ups',
      'Plank',
      'Glute Bridges',
      'Standing Knee Raises',
    ];

    final intensityExercises = <String>[];

    if (goal.contains('strength')) {
      intensityExercises.addAll(['Push-ups', 'Plank', 'Glute Bridges']);
    } else if (goal.contains('endurance')) {
      intensityExercises.addAll(['High-Knee March', 'Jumping Jacks', 'Plank']);
    } else if (goal.contains('flexibility')) {
      intensityExercises.addAll(['Cat-Cow Stretch', 'Standing Side Stretch', 'Hamstring Reach']);
    } else {
      intensityExercises.addAll(['Bodyweight Squats', 'Push-ups', 'Plank']);
    }

    if (level.contains('beginner')) {
      intensityExercises = intensityExercises.map((e) => '$e (Beginner)').toList();
    } else if (level.contains('intermediate')) {
      intensityExercises = intensityExercises.map((e) => '$e (Intermediate)').toList();
    } else if (level.contains('advanced')) {
      intensityExercises = intensityExercises.map((e) => '$e (Advanced)').toList();
    }

    return WorkoutPlan(
      title: '${profile.goal} Plan',
      exercises: intensityExercises,
    );
  }
}
