import 'package:flutter/material.dart';
import 'theme.dart';

class PremiumCard extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;

  const PremiumCard({
    super.key,
    required this.child,
    this.onTap,
  });

  @override
  State<PremiumCard> createState() => _PremiumCardState();
}

class _PremiumCardState extends State<PremiumCard> {
  double _scale = 1.0;

  void _onPressDown(_) {
    setState(() => _scale = 0.97);
  }

  void _onPressUp(_) {
    setState(() => _scale = 1.0);
    widget.onTap?.call();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _onPressDown,
      onTapUp: _onPressUp,
      onTapCancel: () => setState(() => _scale = 1.0),
      child: AnimatedScale(
        scale: _scale,
        duration: const Duration(milliseconds: 120),
        child: Container(
          padding: const EdgeInsets.all(20),
          margin: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: AppTheme.card,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.4),
                blurRadius: 12,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: widget.child,
        ),
      ),
    );
  }
}
