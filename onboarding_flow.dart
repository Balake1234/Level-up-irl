import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'theme.dart';
import 'premium_card.dart';

class OnboardingFlow extends StatefulWidget {
  final String? initialGoal;

  const OnboardingFlow({super.key, this.initialGoal});

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow> {
  final PageController controller = PageController();
  int currentPage = 0;
  String? selectedGoal;

  @override
  void initState() {
    super.initState();
    selectedGoal = widget.initialGoal;
  }

  void setGoal(String goal) {
    setState(() {
      selectedGoal = goal;
    });
  }

  void nextPage() {
    controller.nextPage(
      duration: const Duration(milliseconds: 450),
      curve: Curves.easeInOutCubic,
    );
  }

  Future<void> completeOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('onboardingComplete', true);
    if (selectedGoal != null) {
      await prefs.setString('selectedGoal', selectedGoal!);
    }

    if (!mounted) return;
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => DashboardScreen(selectedGoal: selectedGoal)),
    );
  }

  Widget buildPageIndicator() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 24),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(4, (index) {
          final active = index == currentPage;
          return AnimatedContainer(
            duration: const Duration(milliseconds: 250),
            margin: const EdgeInsets.symmetric(horizontal: 6),
            width: active ? 24 : 10,
            height: 10,
            decoration: BoxDecoration(
              color: active ? AppTheme.accent : AppTheme.textDim.withOpacity(0.35),
              borderRadius: BorderRadius.circular(999),
            ),
          );
        }),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF0D0D0F), Color(0xFF1A1A1D)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          children: [
            buildPageIndicator(),
            Expanded(
              child: PageView(
                controller: controller,
                onPageChanged: (index) => setState(() => currentPage = index),
                children: [
                  WelcomeScreen(onNext: nextPage),
                  GoalSelectionScreen(
                    selectedGoal: selectedGoal,
                    onGoalSelected: setGoal,
                    onNext: nextPage,
                  ),
                  PlanPreviewScreen(
                    selectedGoal: selectedGoal,
                    onNext: nextPage,
                  ),
                  CoachRoomIntroScreen(
                    selectedGoal: selectedGoal,
                    onFinish: completeOnboarding,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class NeonButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final bool enabled;

  const NeonButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.enabled = true,
  });

  @override
  State<NeonButton> createState() => _NeonButtonState();
}

class _NeonButtonState extends State<NeonButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _glow;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    _glow = Tween<double>(begin: 0.3, end: 0.8).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _glow,
      builder: (_, __) {
        return Opacity(
          opacity: widget.enabled ? 1.0 : 0.45,
          child: Container(
            decoration: BoxDecoration(
              boxShadow: widget.enabled
                  ? [
                      BoxShadow(
                        color: AppTheme.accent.withOpacity(_glow.value),
                        blurRadius: 20,
                        spreadRadius: 2,
                      ),
                    ]
                  : [],
            ),
            child: ElevatedButton(
              onPressed: widget.enabled ? widget.onPressed : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.accent,
                foregroundColor: AppTheme.bg,
                padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 16),
              ),
              child: Text(widget.text),
            ),
          ),
        );
      },
    );
  }
}

class WelcomeScreen extends StatefulWidget {
  final VoidCallback onNext;

  const WelcomeScreen({super.key, required this.onNext});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fade;
  late Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );

    _fade = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _slide = Tween<Offset>(begin: const Offset(0, 0.08), end: Offset.zero).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF0D0D0F), Color(0xFF1A1A1D)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: FadeTransition(
        opacity: _fade,
        child: SlideTransition(
          position: _slide,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 220,
                    height: 220,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(999),
                      gradient: LinearGradient(
                        colors: [
                          AppTheme.accent.withOpacity(0.18),
                          AppTheme.accentSecondary.withOpacity(0.18),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    width: 180,
                    height: 180,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: AppTheme.accent.withOpacity(0.35), width: 1.2),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 28),
              Text(
                'Welcome to your new fitness coach',
                style: Theme.of(context).textTheme.headlineLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              Text(
                'Let’s build your strongest routine yet',
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              NeonButton(text: 'Get Started', onPressed: onNext),
            ],
          ),
        ),
      ),
    );
  }
}

class GoalSelectionScreen extends StatefulWidget {
  final String? selectedGoal;
  final ValueChanged<String> onGoalSelected;
  final VoidCallback onNext;

  const GoalSelectionScreen({
    super.key,
    required this.onNext,
    required this.onGoalSelected,
    this.selectedGoal,
  });

  @override
  State<GoalSelectionScreen> createState() => _GoalSelectionScreenState();
}

class _GoalSelectionScreenState extends State<GoalSelectionScreen> {
  String? selected;

  final goals = [
    'Build Muscle',
    'Lose Fat',
    'Get Stronger',
    'Improve Mobility',
    'Hybrid Athlete',
  ];

  @override
  void initState() {
    super.initState();
    selected = widget.selectedGoal;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF0D0D0F), Color(0xFF1A1A1D)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Choose your goal', style: Theme.of(context).textTheme.headlineMedium),
          const SizedBox(height: 20),
          Expanded(
            child: ListView(
              children: goals.map((goal) {
                final isSelected = selected == goal;
                return PremiumCard(
                  onTap: () {
                    setState(() => selected = goal);
                    widget.onGoalSelected(goal);
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(goal, style: Theme.of(context).textTheme.bodyLarge),
                      if (isSelected)
                        const Icon(Icons.check_circle, color: AppTheme.accent),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
          NeonButton(
            text: 'Continue',
            enabled: selected != null,
            onPressed: selected != null ? widget.onNext : () {},
          ),
        ],
      ),
    );
  }
}

class PlanPreviewScreen extends StatelessWidget {
  final String? selectedGoal;
  final VoidCallback onNext;

  const PlanPreviewScreen({
    super.key,
    this.selectedGoal,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF0D0D0F), Color(0xFF1A1A1D)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Your Weekly Plan', style: Theme.of(context).textTheme.headlineMedium),
          const SizedBox(height: 20),
          PremiumCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('4‑Day Split', style: Theme.of(context).textTheme.bodyLarge),
                const SizedBox(height: 10),
                Text(
                  selectedGoal != null
                      ? 'A premium weekly split built for $selectedGoal.'
                      : 'A premium weekly split powered by your AI coach.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 20),
                Text(
                  '• Push Day\n• Pull Day\n• Legs\n• Full Body',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
          const Spacer(),
          NeonButton(text: 'Start My Plan', onPressed: onNext),
        ],
      ),
    );
  }
}

class CoachRoomIntroScreen extends StatelessWidget {
  final String? selectedGoal;
  final VoidCallback onFinish;

  const CoachRoomIntroScreen({
    super.key,
    this.selectedGoal,
    required this.onFinish,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF0D0D0F), Color(0xFF1A1A1D)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Your coach is ready', style: Theme.of(context).textTheme.headlineMedium),
          const SizedBox(height: 20),
          PremiumCard(
            child: Text(
              selectedGoal != null
                  ? 'Hey Bryce — I’ve built your first week for $selectedGoal. Let’s crush it.'
                  : 'Hey Bryce — I’ve built your first week. Let’s crush it.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
          const SizedBox(height: 40),
          NeonButton(text: 'Enter Dashboard', onPressed: onFinish),
        ],
      ),
    );
  }
}

class Exercise {
  final String name;
  final int sets;
  final int reps;
  final int restSeconds;
  final int calories;

  Exercise({
    required this.name,
    required this.sets,
    required this.reps,
    required this.restSeconds,
    required this.calories,
  });
}

class WorkoutPlayer extends StatefulWidget {
  final List<Exercise> exercises;

  const WorkoutPlayer({super.key, required this.exercises});

  @override
  State<WorkoutPlayer> createState() => _WorkoutPlayerState();
}

class _WorkoutPlayerState extends State<WorkoutPlayer>
    with TickerProviderStateMixin {
  int currentIndex = 0;
  int currentSet = 1;
  bool resting = false;
  bool workoutComplete = false;
  int restSecondsLeft = 30;

  late AnimationController ringController;
  late AnimationController restPulse;
  Timer? restTimer;

  static const int restDuration = 30;

  @override
  void initState() {
    super.initState();

    ringController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );

    restPulse = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat(reverse: true);

    ringController.forward();
  }

  void startRestTimer(int restSeconds) {
    restTimer?.cancel();
    restSecondsLeft = restSeconds;
    restTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (restSecondsLeft <= 1) {
        timer.cancel();
        finishRest();
      } else {
        setState(() => restSecondsLeft--);
      }
    });
  }

  void completeSet() {
    if (currentSet < widget.exercises[currentIndex].sets) {
      setState(() => resting = true);
      startRestTimer(widget.exercises[currentIndex].restSeconds);
    } else {
      nextExercise();
    }
  }

  void nextExercise() {
    if (currentIndex < widget.exercises.length - 1) {
      setState(() {
        currentIndex++;
        currentSet = 1;
        resting = false;
      });
      ringController.forward(from: 0);
    } else {
      setState(() {
        workoutComplete = true;
      });
    }
  }

  void finishRest() {
    restTimer?.cancel();
    setState(() {
      resting = false;
      currentSet++;
    });
    ringController.forward(from: 0);
  }

  int get totalSets => widget.exercises.fold(0, (sum, exercise) => sum + exercise.sets);
  int get totalCalories => widget.exercises.fold(0, (sum, exercise) => sum + exercise.calories);
  int get estimatedDurationMinutes {
    final totalSeconds = widget.exercises.fold<int>(0, (sum, exercise) {
      return sum + exercise.sets * (exercise.reps * 2 + exercise.restSeconds);
    });
    return (totalSeconds / 60).ceil();
  }

  @override
  void dispose() {
    ringController.dispose();
    restPulse.dispose();
    restTimer?.cancel();
    super.dispose();
  }

  Widget buildExerciseScreen(Exercise exercise) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          exercise.name,
          style: Theme.of(context).textTheme.headlineLarge,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 12),
        Text(
          '${exercise.reps} reps · ${exercise.restSeconds}s rest',
          style: Theme.of(context).textTheme.bodyMedium,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 30),
        ProgressRing(progress: currentSet / exercise.sets, size: 180),
        const SizedBox(height: 20),
        Text(
          'Set $currentSet of ${exercise.sets}',
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        const SizedBox(height: 30),
        PremiumCard(
          onTap: completeSet,
          child: Column(
            children: [
              Text(
                'Finish Set',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              const SizedBox(height: 10),
              Text(
                'Tap when you complete the current set and take the rest break between rounds.',
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
        const Spacer(),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('End Workout'),
            ),
            NeonButton(text: 'Complete Set', onPressed: completeSet),
          ],
        ),
      ],
    );
  }

  Widget buildRestScreen(Exercise exercise) {
    final nextSet = currentSet + 1;
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Rest', style: Theme.of(context).textTheme.headlineLarge),
        const SizedBox(height: 8),
        Text(
          'Next: ${exercise.name} • Set $nextSet of ${exercise.sets}',
          style: Theme.of(context).textTheme.bodyMedium,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 24),
        AnimatedBuilder(
          animation: restPulse,
          builder: (_, __) {
            return Container(
              padding: const EdgeInsets.all(40),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppTheme.accent.withOpacity(0.2 + restPulse.value * 0.3),
              ),
              child: Text(
                '00:${restSecondsLeft.toString().padLeft(2, '0')}',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            );
          },
        ),
        const SizedBox(height: 24),
        Text(
          'Recover and breathe. Your next set starts in ${exercise.restSeconds} seconds.',
          style: Theme.of(context).textTheme.bodyLarge,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 30),
        NeonButton(text: 'Skip Rest', onPressed: finishRest),
      ],
    );
  }

  Widget buildCompleteScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Workout Complete', style: Theme.of(context).textTheme.headlineLarge),
        const SizedBox(height: 20),
        PremiumCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Session Summary', style: Theme.of(context).textTheme.bodyLarge),
              const SizedBox(height: 12),
              Text('Total sets: $totalSets', style: Theme.of(context).textTheme.bodyMedium),
              Text('Calories burned: $totalCalories', style: Theme.of(context).textTheme.bodyMedium),
              Text('Estimated duration: $estimatedDurationMinutes min', style: Theme.of(context).textTheme.bodyMedium),
            ],
          ),
        ),
        const SizedBox(height: 24),
        PremiumCard(
          child: Text(
            'Nice work — you finished the session. Take a moment to recover and check back tomorrow.',
            style: Theme.of(context).textTheme.bodyLarge,
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 40),
        NeonButton(
          text: 'Return Home',
          onPressed: () => Navigator.pop(context),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    if (workoutComplete) {
      return Scaffold(
        backgroundColor: AppTheme.bg,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: buildCompleteScreen(),
          ),
        ),
      );
    }

    final exercise = widget.exercises[currentIndex];

    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: resting ? buildRestScreen(exercise) : buildExerciseScreen(exercise),
        ),
      ),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  final String? selectedGoal;

  const DashboardScreen({super.key, this.selectedGoal});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fade;
  late Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 700),
    );

    _fade = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _slide = Tween<Offset>(begin: const Offset(0, 0.1), end: Offset.zero).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: FadeTransition(
            opacity: _fade,
            child: SlideTransition(
              position: _slide,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Good afternoon, Bryce', style: Theme.of(context).textTheme.headlineMedium),
                  const SizedBox(height: 20),
                  PremiumCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Today’s Workout', style: Theme.of(context).textTheme.bodyLarge),
                        const SizedBox(height: 10),
                        Text(
                          'Push Day — Chest, Shoulders, Triceps',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                  if (widget.selectedGoal != null)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: Text(
                        'Goal: ${widget.selectedGoal}',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ),
                  PremiumCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Hydration', style: Theme.of(context).textTheme.bodyLarge),
                        const SizedBox(height: 10),
                        Text('2.1L / 3L', style: Theme.of(context).textTheme.bodyMedium),
                      ],
                    ),
                  ),
                  PremiumCard(
                    child: Row(
                      children: [
                        ProgressRing(progress: 0.72),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Recovery', style: Theme.of(context).textTheme.bodyLarge),
                              const SizedBox(height: 8),
                              Text('Sleep: 8h 12m', style: Theme.of(context).textTheme.bodyMedium),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  PremiumCard(
                    child: Text(
                      'Coach Update: Great consistency this week. Ready for Day 3?',
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                  ),
                  const SizedBox(height: 12),
                  NeonButton(
                    text: 'Start Workout',
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => WorkoutPlayer(
                            exercises: [
                              Exercise(name: 'Bench Press', sets: 4, reps: 8, restSeconds: 45, calories: 120),
                              Exercise(name: 'Shoulder Press', sets: 3, reps: 10, restSeconds: 40, calories: 95),
                              Exercise(name: 'Tricep Dips', sets: 3, reps: 12, restSeconds: 35, calories: 80),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class ProgressRing extends StatelessWidget {
  final double progress;
  final double size;

  const ProgressRing({super.key, required this.progress, this.size = 120});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.0, end: progress),
      duration: const Duration(milliseconds: 900),
      curve: Curves.easeOutCubic,
      builder: (_, value, __) {
        return SizedBox(
          width: size,
          height: size,
          child: CustomPaint(painter: _RingPainter(value)),
        );
      },
    );
  }
}

class _RingPainter extends CustomPainter {
  final double progress;

  _RingPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = 12.0;
    final radius = (size.width - stroke) / 2;

    final bgPaint = Paint()
      ..color = Colors.grey.withOpacity(0.2)
      ..strokeWidth = stroke
      ..style = PaintingStyle.stroke;

    final fgPaint = Paint()
      ..color = AppTheme.accent
      ..strokeWidth = stroke
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(size.center(Offset.zero), radius, bgPaint);

    final sweep = 2 * math.pi * progress;
    canvas.drawArc(
      Rect.fromCircle(center: size.center(Offset.zero), radius: radius),
      -math.pi / 2,
      sweep,
      false,
      fgPaint,
    );
  }

  @override
  bool shouldRepaint(_) => true;
}
