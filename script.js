const screens = Array.from(document.querySelectorAll('.screen'));
const getStartedBtn = document.getElementById('getStartedBtn');
const goalNextBtn = document.getElementById('goalNextBtn');
const planNextBtn = document.getElementById('planNextBtn');
const goalCards = Array.from(document.querySelectorAll('.goal-card'));

const greetingLabel = document.getElementById('greetingLabel');
const coachHeading = document.getElementById('coachHeading');
const coachVibe = document.getElementById('coachVibe');
const workoutTitle = document.getElementById('workoutTitle');
const workoutPercent = document.getElementById('workoutPercent');
const workoutStatus = document.getElementById('workoutStatus');
const recoveryScore = document.getElementById('recoveryScore');
const recoveryText = document.getElementById('recoveryText');
const hydrationValue = document.getElementById('hydrationValue');
const hydrationText = document.getElementById('hydrationText');
const nextSessionTitle = document.getElementById('nextSessionTitle');
const nextSessionText = document.getElementById('nextSessionText');
const recoveryTitle = document.getElementById('recoveryTitle');
const recoverySummary = document.getElementById('recoverySummary');
const hydrationTitle = document.getElementById('hydrationTitle');
const hydrationSummary = document.getElementById('hydrationSummary');
const coachMessage = document.getElementById('coachMessage');
const coachSupport = document.getElementById('coachSupport');
const workoutList = document.getElementById('workoutList');
const weekProgressGrid = document.getElementById('weekProgressGrid');
const mealTarget = document.getElementById('mealTarget');
const proteinTarget = document.getElementById('proteinTarget');
const mealList = document.getElementById('mealList');
const questTitle = document.getElementById('questTitle');
const questList = document.getElementById('questList');
const questRefreshBtn = document.getElementById('questRefreshBtn');
const summaryHeadline = document.getElementById('summaryHeadline');
const summaryBlurb = document.getElementById('summaryBlurb');
const habitChecklist = document.getElementById('habitChecklist');
const historyList = document.getElementById('historyList');
const historyRefreshBtn = document.getElementById('historyRefreshBtn');
const checkWorkout = document.getElementById('checkWorkout');
const checkHydration = document.getElementById('checkHydration');
const checkProtein = document.getElementById('checkProtein');
const checkRecovery = document.getElementById('checkRecovery');
const checkinResult = document.getElementById('checkinResult');
const streakCount = document.getElementById('streakCount');
const streakSummary = document.getElementById('streakSummary');
const streakResetBtn = document.getElementById('streakResetBtn');
const resetDailyCheckinBtn = document.getElementById('resetDailyCheckinBtn');
const profileEditBtn = document.getElementById('profileEditBtn');
const profileName = document.getElementById('profileName');
const profileHeadline = document.getElementById('profileHeadline');
const profileLevel = document.getElementById('profileLevel');
const profileSchedule = document.getElementById('profileSchedule');
const progressChart = document.getElementById('progressChart');
const progressDetails = document.getElementById('progressDetails');
const weeklyPlanList = document.getElementById('weeklyPlanList');
const weeklyPlanTitle = document.getElementById('weeklyPlanTitle');
const weeklyTimeline = document.getElementById('weeklyTimeline');
const weeklyPlanBtn = document.getElementById('weeklyPlanBtn');
const weeklyPlanDetails = document.getElementById('weeklyPlanDetails');
const workoutPlanDetails = document.getElementById('workoutPlanDetails');
const progressViewBtn = document.getElementById('progressViewBtn');
const focusTag = document.getElementById('focusTag');
const focusHeadline = document.getElementById('focusHeadline');
const focusDescription = document.getElementById('focusDescription');
const breakTitle = document.getElementById('breakTitle');
const breakDescription = document.getElementById('breakDescription');
const breakStartBtn = document.getElementById('breakStartBtn');
const breakTimer = document.getElementById('breakTimer');
const adjustGoalsBtn = document.getElementById('adjustGoalsBtn');
const weekResetBtn = document.getElementById('weekResetBtn');
const mealLogBtn = document.getElementById('mealLogBtn');
const coachNotesBtn = document.getElementById('coachNotesBtn');
const viewPlanBtn = document.getElementById('viewPlanBtn');
const recoveryLogBtn = document.getElementById('recoveryLogBtn');
const hydrationAddBtn = document.getElementById('hydrationAddBtn');
const coachRoomBtn = document.getElementById('coachRoomBtn');
const modalOverlay = document.getElementById('inputModal');
const modalTitle = document.getElementById('modalTitle');
const modalLabel = document.getElementById('modalLabel');
const modalInput = document.getElementById('modalInput');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');

let currentIndex = 0;
let selectedGoal = localStorage.getItem('fitnessGoal') || 'Build Muscle';
if (selectedGoal === 'Lose Fat') {
  selectedGoal = 'Build Endurance';
  localStorage.setItem('fitnessGoal', selectedGoal);
}
const DAILY_CHECKIN_KEY = 'fitnessDailyCheckin';
const PROFILE_KEY = 'fitnessProfile';
const APP_STATE_KEY = 'fitnessCoachAppState';
const STREAK_KEY = 'fitnessCoachStreak';
const defaultCheckinState = {
  workout: false,
  hydration: false,
  protein: false,
  recovery: false
};

const defaultAppState = {
  hydration: '2.1L',
  recovery: '84%',
  mealsByGoal: {}
};

const questBoards = {
  'Build Muscle': [
    'Complete your primary lift block',
    'Log hydration before the next session',
    'Keep a solid meal in your rotation'
  ],
  'Build Endurance': [
    'Finish your cardio or conditioning block',
    'Stay on pace with steady breathing',
    'Add a recovery walk or mobility reset'
  ],
  'Get Stronger': [
    'Hit your main strength movement',
    'Keep your form clean and control the tempo',
    'Finish the day with a recovery reset'
  ],
  'Improve Mobility': [
    'Complete your mobility flow',
    'Warm up your joints before movement',
    'Finish with a calm cooldown or stretch'
  ]
};

const defaultStreakState = {
  completedDates: []
};

const defaultProfile = {
  name: '',
  level: 'Beginner',
  schedule: '3 days / week'
};

const betweenMatchSteps = [
  'Look away from the screen and focus on something across the room.',
  'Stand tall, gently roll your shoulders, and relax your hands.',
  'Walk a few steps and take an easy breath.'
];

let breakTimerInterval = null;

const weeklyProgress = {
  'Build Muscle': ['done', 'done', 'active', 'upcoming', 'upcoming', 'upcoming', 'upcoming'],
  'Build Endurance': ['done', 'done', 'active', 'done', 'upcoming', 'upcoming', 'upcoming'],
  'Get Stronger': ['done', 'active', 'done', 'upcoming', 'upcoming', 'upcoming', 'upcoming'],
  'Improve Mobility': ['done', 'done', 'done', 'active', 'upcoming', 'upcoming', 'upcoming']
};

const progressTrend = {
  'Build Muscle': [58, 66, 72, 74, 80, 88],
  'Build Endurance': [54, 60, 68, 73, 81, 86],
  'Get Stronger': [50, 63, 70, 76, 82, 90],
  'Improve Mobility': [60, 68, 74, 79, 85, 92]
};

const goalPlans = {
  'Build Muscle': {
    greeting: 'Ready to level up?',
    heading: 'Your strength plan is ready.',
    workout: 'Upper body + core',
    progress: '72%',
    status: 'On track',
    recovery: '84%',
    recoveryText: 'Sleep and recovery are trending well.',
    hydration: '2.1L',
    hydrationText: 'Keep it steady through the evening.',
    nextSession: 'Next session: lower body strength',
    nextSessionText: 'Tempo work, controlled sets, and a light finish to stay sharp.',
    recoveryTitle: 'Sleep + mobility',
    recoverySummary: 'Your recovery trend is strong today.',
    hydrationTitle: '2.1L logged',
    hydrationSummary: 'One more glass before bed will close the gap.',
    coachMessage: 'Your strength week is ready. Start with a clean first set.',
    coachSupport: 'Consistency beats intensity. Keep the reps clean and the effort high.',
    exercises: [
      'Barbell squat — 4 sets x 6 reps',
      'Bench press — 4 sets x 8 reps',
      'Lat pulldown — 3 sets x 10 reps',
      'Plank hold — 3 rounds x 40 sec'
    ],
    mealTarget: 'Eat regularly',
    proteinTarget: 'Variety matters',
    meals: [
      'Eggs, toast, and fruit',
      'Chicken and rice bowl',
      'Yogurt with banana',
      'Salmon, potatoes, and greens'
    ],
    weeklyPlanTitle: 'This week’s priorities',
    weeklyPlan: [
      'Mon: Lower body strength + controlled tempo work',
      'Tue: Regular meals and an easy recovery walk',
      'Thu: Upper body push with focused form',
      'Sat: Full body circuit and higher effort finish'
    ],
    summaryHeadline: 'Strong momentum today',
    summaryBlurb: 'Your strength work is trending well and your recovery is holding steady.',
    habits: [
      'Sleep goal: 8 hours',
      'Lift intensity: moderate to high',
      'Keep a water bottle nearby'
    ]
  },
  'Build Endurance': {
    greeting: 'Ready to level up?',
    heading: 'Your endurance plan is ready.',
    workout: 'Cardio + conditioning',
    progress: '81%',
    status: 'Strong pace',
    recovery: '78%',
    recoveryText: 'Recovery is stable. Keep sessions sustainable.',
    hydration: '2.4L',
    hydrationText: 'Hydration is helping your energy stay steady.',
    nextSession: 'Next session: cardio + core',
    nextSessionText: 'Short intervals, controlled effort, and strong post-workout recovery.',
    recoveryTitle: 'Recovery rhythm',
    recoverySummary: 'You are improving balance between effort and rest.',
    hydrationTitle: '2.4L logged',
    hydrationSummary: 'Your energy is holding steady with solid hydration.',
    coachMessage: 'Your stamina plan is ready to roll.',
    coachSupport: 'Keep the effort steady, leave room for recovery, and build up at your own pace.',
    exercises: [
      'Bike intervals — 15 min at a comfortable pace',
      'Bodyweight circuit — 2 rounds, take breaks as needed',
      'Brisk walk — 20 min',
      'Dead bug hold — 2 rounds x 20 sec'
    ],
    mealTarget: 'Eat regularly',
    proteinTarget: 'Variety matters',
    meals: [
      'Greek yogurt with berries',
      'Turkey and salad wrap',
      'Fruit smoothie with yogurt',
      'Chicken, grains, and vegetables'
    ],
    weeklyPlanTitle: 'This week’s priorities',
    weeklyPlan: [
      'Mon: Cardio intervals at a comfortable pace',
      'Tue: Easy movement and a good night of sleep',
      'Thu: Conditioning circuit with breaks as needed',
      'Sat: Fun activity outdoors or with friends'
    ],
    summaryHeadline: 'Your stamina is building',
    summaryBlurb: 'Steady practice and enough recovery help your energy grow over time.',
    habits: [
      'Choose a pace that feels manageable',
      'Eat regular meals and snacks',
      'Make time for rest and easy movement'
    ]
  },
  'Get Stronger': {
    greeting: 'Ready to level up?',
    heading: 'Your strength progression is locked in.',
    workout: 'Full body power',
    progress: '76%',
    status: 'Progressing',
    recovery: '86%',
    recoveryText: 'Your recovery is excellent for heavy lifting.',
    hydration: '2.2L',
    hydrationText: 'Hydration is helping your output stay sharp.',
    nextSession: 'Next session: full body power',
    nextSessionText: 'Heavy compound work with focused tempo and clean form.',
    recoveryTitle: 'Performance recovery',
    recoverySummary: 'You are recovering well between sessions.',
    hydrationTitle: '2.2L logged',
    hydrationSummary: 'Good work staying hydrated through training.',
    coachMessage: 'Your strength plan is ready. Keep the reps controlled and clean.',
    coachSupport: 'Stay patient with the process and keep the quality high.',
    exercises: [
      'Deadlift — 5 sets x 5 reps',
      'Overhead press — 4 sets x 6 reps',
      'Goblet squat — 3 sets x 10 reps',
      'Hanging knee raise — 3 sets x 12 reps'
    ],
    mealTarget: 'Eat regularly',
    proteinTarget: 'Variety matters',
    meals: [
      'Cottage cheese with berries',
      'Chicken burrito bowl',
      'Hummus, pita, and fruit',
      'Steak, potatoes, and asparagus'
    ],
    weeklyPlanTitle: 'This week’s priorities',
    weeklyPlan: [
      'Mon: Heavy lift day with clean form focus',
      'Tue: Recovery and regular meals',
      'Thu: Compound lift progress and volume work',
      'Sat: Full body power + short cooldown'
    ],
    summaryHeadline: 'Power output is climbing',
    summaryBlurb: 'Your progressive overload is landing well, and recovery is still strong enough for heavy work.',
    habits: [
      'Keep form clean on every compound lift',
      'Eat regular, varied meals',
      'Prioritize sleep for recovery and output'
    ]
  },
  'Improve Mobility': {
    greeting: 'Ready to level up?',
    heading: 'Your mobility reset is ready.',
    workout: 'Mobility + recovery',
    progress: '88%',
    status: 'Smooth flow',
    recovery: '91%',
    recoveryText: 'Mobility and recovery are both trending well.',
    hydration: '2.0L',
    hydrationText: 'Hydration is helping your movement feel better.',
    nextSession: 'Next session: mobility flow',
    nextSessionText: 'Low-impact movement and stability work to improve range and control.',
    recoveryTitle: 'Mobility reset',
    recoverySummary: 'Your movement quality is improving with each session.',
    hydrationTitle: '2.0L logged',
    hydrationSummary: 'You are staying fluid and well recovered.',
    coachMessage: 'Your mobility reset is ready. Move smoothly and take your time.',
    coachSupport: 'Small, consistent improvements are building better movement habits.',
    exercises: [
      'World’s greatest stretch — 2 rounds',
      'Hip openers — 2 rounds x 30 sec',
      'Thoracic rotations — 2 rounds x 10 reps',
      'Breathwork + cooldown stretch — 10 min'
    ],
    mealTarget: 'Eat regularly',
    proteinTarget: 'Variety matters',
    meals: [
      'Avocado toast with eggs',
      'Salmon and grain bowl',
      'Fruit smoothie with greens',
      'Chicken and rice stir-fry'
    ],
    weeklyPlanTitle: 'This week’s priorities',
    weeklyPlan: [
      'Mon: Mobility flow + thoracic rotations',
      'Tue: Recovery work and lower-body reset',
      'Thu: Controlled mobility circuit and breathing',
      'Sat: Full movement assessment and stretching'
    ],
    summaryHeadline: 'Movement quality is improving',
    summaryBlurb: 'Your mobility is trending up, and your recovery is giving you more freedom in each session.',
    habits: [
      'Complete your mobility flow without rushing',
      'Keep water nearby through the day',
      'Keep stress low and sleep consistent'
    ]
  }
};

function loadAppState() {
  try {
    const saved = JSON.parse(localStorage.getItem(APP_STATE_KEY) || '{}');
    return { ...defaultAppState, ...saved, mealsByGoal: { ...(saved.mealsByGoal || {}) } };
  } catch {
    return { ...defaultAppState, mealsByGoal: {} };
  }
}

function saveAppState(state) {
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

function getMealsForGoal(goal) {
  const plan = goalPlans[goal] || goalPlans['Build Muscle'];
  const appState = loadAppState();
  return appState.mealsByGoal?.[goal] || plan.meals.slice();
}

function renderWeekProgress(goal) {
  if (!weekProgressGrid) return;

  const progress = weeklyProgress[goal] || weeklyProgress['Build Muscle'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  weekProgressGrid.innerHTML = days.map((day, index) => {
    const state = progress[index] || 'upcoming';
    return `
      <div class="day-pill ${state}">
        <span>${day}</span>
      </div>
    `;
  }).join('');
}

function addMealEntry(mealText) {
  const goal = selectedGoal || 'Build Muscle';
  const existingMeals = getMealsForGoal(goal);
  const updatedMeals = [...existingMeals, mealText];
  const appState = loadAppState();
  appState.mealsByGoal[goal] = updatedMeals;
  saveAppState(appState);

  if (mealList) {
    mealList.innerHTML = updatedMeals
      .map((meal) => `<li>${meal}</li>`)
      .join('');
  }
}

function renderMealPlan(goal) {
  const plan = goalPlans[goal] || goalPlans['Build Muscle'];
  const meals = getMealsForGoal(goal);

  if (mealTarget) mealTarget.textContent = plan.mealTarget;
  if (proteinTarget) proteinTarget.textContent = plan.proteinTarget;

  if (mealList) {
    mealList.innerHTML = meals
      .map((meal) => `<li>${meal}</li>`)
      .join('');
  }
}

function renderWeeklyPlan(goal) {
  const plan = goalPlans[goal] || goalPlans['Build Muscle'];

  if (weeklyPlanTitle) {
    weeklyPlanTitle.textContent = plan.weeklyPlanTitle || 'This week’s priorities';
  }

  if (weeklyPlanList) {
    weeklyPlanList.innerHTML = (plan.weeklyPlan || [])
      .map((item) => `<li>${item}</li>`)
      .join('');
  }

  if (weeklyTimeline) {
    const timelineDays = [
      { day: 'Mon', note: 'Focus on your main session and clean form.' },
      { day: 'Wed', note: 'Build volume without losing quality.' },
      { day: 'Fri', note: 'Priority block with higher execution.' },
      { day: 'Sun', note: 'Recovery reset and reflection.' }
    ];

    weeklyTimeline.innerHTML = timelineDays.map(({ day, note }) => `
      <div class="timeline-day">
        <strong>${day}</strong>
        <span>${note}</span>
      </div>
    `).join('');
  }
}

function renderProgressChart(goal) {
  if (!progressChart) return;

  const values = progressTrend[goal] || progressTrend['Build Muscle'];
  const labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];

  progressChart.innerHTML = values.map((value, index) => `
    <div class="chart-column">
      <span class="chart-bar" style="height: ${value}%"></span>
      <small>${labels[index]}</small>
    </div>
  `).join('');
}

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    return { ...defaultProfile, ...saved };
  } catch {
    return { ...defaultProfile };
  }
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function renderProfile() {
  const profile = loadProfile();
  const name = profile.name.trim();

  if (profileName) profileName.textContent = name || 'Enter name';
  if (profileHeadline) profileHeadline.textContent = `${profile.level} player`;
  if (profileLevel) profileLevel.textContent = profile.level;
  if (profileSchedule) profileSchedule.textContent = profile.schedule;

  if (greetingLabel) {
    greetingLabel.textContent = name ? `Good afternoon, ${name}` : 'Ready to level up?';
  }
}

function showInputModal({ title, label, defaultValue, onSave }) {
  if (!modalOverlay || !modalTitle || !modalLabel || !modalInput || !modalConfirm || !modalCancel) {
    return;
  }

  modalTitle.textContent = title;
  modalLabel.textContent = label;
  modalInput.value = defaultValue || '';
  modalInput.focus();
  modalInput.select();

  const closeModal = () => {
    modalOverlay.classList.add('hidden');
    modalOverlay.setAttribute('aria-hidden', 'true');
  };

  modalConfirm.onclick = () => {
    const value = modalInput.value.trim();
    closeModal();
    onSave(value);
  };

  modalCancel.onclick = () => {
    closeModal();
  };

  modalOverlay.classList.remove('hidden');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

function renderChecklist(goal) {
  const plan = goalPlans[goal] || goalPlans['Build Muscle'];

  if (summaryHeadline) summaryHeadline.textContent = plan.summaryHeadline;
  if (summaryBlurb) summaryBlurb.textContent = plan.summaryBlurb;

  if (habitChecklist) {
    habitChecklist.innerHTML = plan.habits
      .map((habit) => `
        <div class="check-item">
          <span class="check-mark">✓</span>
          <span>${habit}</span>
        </div>
      `)
      .join('');
  }
}

function renderQuestBoard(goal) {
  const quests = questBoards[goal] || questBoards['Build Muscle'];
  const state = loadCheckinState();
  const completed = Object.values(state).filter(Boolean).length;

  if (questTitle) questTitle.textContent = `${goal} quest board`;

  if (questList) {
    questList.innerHTML = quests.map((quest, index) => `
      <li class="quest-item ${index < completed ? 'done' : ''}">
        <span class="quest-bullet">${index < completed ? '✓' : index + 1}</span>
        <span>${quest}</span>
      </li>
    `).join('');
  }
}

function renderHistory() {
  if (!historyList) return;

  const entries = [
    { label: 'Recovery check', detail: 'Sleep quality remained stable and your evening routine stayed consistent.' },
    { label: 'Fuel check', detail: 'Regular meals and water can help keep your energy steady.' },
    { label: 'Workout outlook', detail: 'Your next session should feel stronger as your streak builds.' },
    { label: 'Coach note', detail: 'Stay patient. Consistency compounds faster than perfection.' }
  ];

  historyList.innerHTML = entries.map((entry) => `
    <div class="history-item">
      <strong>${entry.label}</strong>
      <span>${entry.detail}</span>
    </div>
  `).join('');
}

function loadCheckinState() {
  const todayKey = getLocalDateKey(new Date());

  try {
    const saved = JSON.parse(localStorage.getItem(DAILY_CHECKIN_KEY) || '{}');
    if (saved.date !== todayKey) {
      const emptyState = { ...defaultCheckinState };
      saveCheckinState(emptyState);
      return emptyState;
    }

    return { ...defaultCheckinState, ...(saved.habits || {}) };
  } catch {
    return { ...defaultCheckinState };
  }
}

function saveCheckinState(state) {
  localStorage.setItem(DAILY_CHECKIN_KEY, JSON.stringify({
    date: getLocalDateKey(new Date()),
    habits: state
  }));
}

function loadStreak() {
  try {
    const saved = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
    return {
      completedDates: Array.isArray(saved.completedDates) ? saved.completedDates : []
    };
  } catch {
    return { ...defaultStreakState };
  }
}

function saveStreak(streak) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function renderStreak() {
  const state = loadCheckinState();
  const completed = Object.values(state).filter(Boolean).length;
  const streakState = loadStreak();
  const todayKey = getLocalDateKey(new Date());

  if (completed > 0 && !streakState.completedDates.includes(todayKey)) {
    streakState.completedDates.push(todayKey);
  } else if (completed === 0) {
    streakState.completedDates = streakState.completedDates.filter((date) => date !== todayKey);
  }
  saveStreak(streakState);

  const anchorDate = new Date();
  if (completed === 0) anchorDate.setDate(anchorDate.getDate() - 1);

  let streakLength = 0;
  while (streakState.completedDates.includes(getLocalDateKey(anchorDate))) {
    streakLength += 1;
    anchorDate.setDate(anchorDate.getDate() - 1);
  }

  if (streakCount) streakCount.textContent = `${streakLength} day streak`;
  if (streakSummary) {
    streakSummary.textContent = streakLength === 0
      ? 'Start a streak with one small win today.'
      : completed === 0
        ? 'Check in today to keep your streak going.'
        : streakLength >= 8
          ? 'Eight days of showing up. Keep your routine balanced.'
          : 'Nice work showing up today. Keep your routine balanced.';
  }
}

function updateCheckinSummary() {
  const state = loadCheckinState();
  const completed = Object.values(state).filter(Boolean).length;

  if (checkinResult) {
    checkinResult.textContent = `${completed} of 4 habits complete`;
  }

  renderStreak();

  if (summaryHeadline && summaryBlurb) {
    if (completed === 4) {
      summaryHeadline.textContent = 'Excellent day';
      summaryBlurb.textContent = 'You hit every major habit target. Keep the momentum going.';
    } else if (completed >= 2) {
      summaryHeadline.textContent = 'Strong rhythm today';
      summaryBlurb.textContent = 'You are building consistency. Keep the effort focused and steady.';
    } else if (completed === 1) {
      summaryHeadline.textContent = 'Momentum is building';
      summaryBlurb.textContent = 'One good habit today is enough to keep the streak alive.';
    } else {
      const plan = goalPlans[selectedGoal] || goalPlans['Build Muscle'];
      summaryHeadline.textContent = plan.summaryHeadline;
      summaryBlurb.textContent = plan.summaryBlurb;
    }
  }
}

function renderDailyCheckin() {
  const state = loadCheckinState();

  if (checkWorkout) checkWorkout.checked = Boolean(state.workout);
  if (checkHydration) checkHydration.checked = Boolean(state.hydration);
  if (checkProtein) checkProtein.checked = Boolean(state.protein);
  if (checkRecovery) checkRecovery.checked = Boolean(state.recovery);

  updateCheckinSummary();
}

function handleCheckinToggle(key, checked) {
  const state = loadCheckinState();
  state[key] = checked;
  saveCheckinState(state);
  updateCheckinSummary();
  renderTodayFocus();
}

function renderCoachVibe() {
  if (!coachVibe) return;

  const state = loadCheckinState();
  const completed = Object.values(state).filter(Boolean).length;
  const energyValue = 72 + completed * 6;
  const mood = completed >= 3 ? 'High focus' : completed >= 1 ? 'Steady pace' : 'Reset mode';

  coachVibe.textContent = `Coach energy: ${Math.min(99, energyValue)}% • ${mood}`;
}

function renderTodayFocus() {
  if (!focusHeadline || !focusDescription) return;

  const state = loadCheckinState();
  const plan = goalPlans[selectedGoal] || goalPlans['Build Muscle'];
  let headline;
  let description;
  let tag = 'Priority';

  if (!state.workout) {
    headline = `Start with ${plan.workout.toLowerCase()}`;
    description = `Your planned training is the main step toward your ${selectedGoal.toLowerCase()} goal today.`;
  } else if (!state.hydration) {
    headline = 'Top up your hydration';
    description = `Your workout is checked off. Keep water nearby and work toward your ${plan.hydration} daily target.`;
    tag = 'Next step';
  } else if (!state.protein) {
    headline = 'Grab a nourishing snack';
    description = 'A snack with a mix of foods can help keep your energy up for the rest of the day.';
    tag = 'Next step';
  } else if (!state.recovery) {
    headline = 'Give recovery some attention';
    description = 'A cooldown, light mobility, or a relaxed evening can help you recover from today.';
    tag = 'Next step';
  } else {
    headline = 'You covered today’s essentials';
    description = 'Your workout, hydration, nutrition, and recovery check-ins are complete. Keep the routine sustainable.';
    tag = 'Complete';
  }

  focusHeadline.textContent = headline;
  focusDescription.textContent = description;
  if (focusTag) focusTag.textContent = tag;
}

function applyPlan(goal) {
  const plan = goalPlans[goal] || goalPlans['Build Muscle'];
  const appState = loadAppState();
  const savedHydration = appState.hydration || plan.hydration;
  const savedRecovery = appState.recovery || plan.recovery;

  if (greetingLabel) greetingLabel.textContent = plan.greeting;
  if (coachHeading) coachHeading.textContent = plan.heading;
  if (workoutTitle) workoutTitle.textContent = plan.workout;
  if (workoutPercent) workoutPercent.textContent = plan.progress;
  if (workoutStatus) workoutStatus.textContent = plan.status;
  if (recoveryScore) recoveryScore.textContent = savedRecovery;
  if (recoveryText) recoveryText.textContent = plan.recoveryText;
  if (hydrationValue) hydrationValue.textContent = savedHydration;
  if (hydrationText) hydrationText.textContent = plan.hydrationText;
  if (nextSessionTitle) nextSessionTitle.textContent = plan.nextSession;
  if (nextSessionText) nextSessionText.textContent = plan.nextSessionText;
  if (recoveryTitle) recoveryTitle.textContent = plan.recoveryTitle;
  if (recoverySummary) recoverySummary.textContent = plan.recoverySummary;
  if (hydrationTitle) hydrationTitle.textContent = `${savedHydration} logged`;
  if (hydrationSummary) hydrationSummary.textContent = plan.hydrationSummary;
  if (coachMessage) coachMessage.textContent = plan.coachMessage;
  if (coachSupport) coachSupport.textContent = plan.coachSupport;

  if (workoutList) {
    workoutList.innerHTML = plan.exercises
      .map((exercise) => `<li>${exercise}</li>`)
      .join('');
  }

  renderMealPlan(goal);
  renderChecklist(goal);
  renderDailyCheckin();
  renderQuestBoard(goal);
  renderProfile();
  renderWeekProgress(goal);
  renderProgressChart(goal);
  renderWeeklyPlan(goal);
  renderCoachVibe();
  renderHistory();
  renderTodayFocus();
  localStorage.setItem('fitnessGoal', goal);
}

function showScreen(index) {
  screens.forEach((screen, screenIndex) => {
    screen.classList.toggle('active', screenIndex === index);
  });
}

function advanceFlow() {
  currentIndex = Math.min(currentIndex + 1, screens.length - 1);
  showScreen(currentIndex);
}

if (getStartedBtn) {
  getStartedBtn.addEventListener('click', advanceFlow);
}

if (goalNextBtn) {
  goalNextBtn.addEventListener('click', () => {
    const activeCard = document.querySelector('.goal-card.selected');
    const chosenGoal = activeCard ? activeCard.dataset.goal : 'Build Muscle';
    selectedGoal = chosenGoal;
    localStorage.setItem('fitnessGoal', chosenGoal);
    advanceFlow();
  });
}

if (planNextBtn) {
  planNextBtn.addEventListener('click', () => {
    applyPlan(selectedGoal);
    advanceFlow();
  });
}

if (checkWorkout) {
  checkWorkout.addEventListener('change', (event) => handleCheckinToggle('workout', event.target.checked));
}
if (checkHydration) {
  checkHydration.addEventListener('change', (event) => handleCheckinToggle('hydration', event.target.checked));
}
if (checkProtein) {
  checkProtein.addEventListener('change', (event) => handleCheckinToggle('protein', event.target.checked));
}
if (checkRecovery) {
  checkRecovery.addEventListener('change', (event) => handleCheckinToggle('recovery', event.target.checked));
}
if (breakStartBtn) {
  breakStartBtn.addEventListener('click', () => {
    if (breakTimerInterval) {
      window.clearInterval(breakTimerInterval);
      breakTimerInterval = null;
      if (breakTitle) breakTitle.textContent = 'Refresh for the next round';
      if (breakDescription) breakDescription.textContent = 'Look away from the screen, loosen your shoulders, or stand for a moment.';
      if (breakTimer) breakTimer.textContent = 'Reset stopped';
      breakStartBtn.textContent = 'Start 45-sec reset';
      return;
    }

    let remainingSeconds = 45;
    if (breakTitle) breakTitle.textContent = 'Quick reset in progress';
    if (breakDescription) breakDescription.textContent = betweenMatchSteps[0];
    if (breakTimer) breakTimer.textContent = '0:45';
    breakStartBtn.textContent = 'Stop reset';

    breakTimerInterval = window.setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds <= 0) {
        window.clearInterval(breakTimerInterval);
        breakTimerInterval = null;
        if (breakTitle) breakTitle.textContent = 'Reset complete';
        if (breakDescription) breakDescription.textContent = 'Nice pause. Jump back in when you feel ready.';
        if (breakTimer) breakTimer.textContent = 'Done';
        breakStartBtn.textContent = 'Start again';
        return;
      }

      const stepIndex = Math.min(2, Math.floor((45 - remainingSeconds) / 15));
      if (breakDescription) breakDescription.textContent = betweenMatchSteps[stepIndex];
      if (breakTimer) {
        const seconds = String(remainingSeconds % 60).padStart(2, '0');
        breakTimer.textContent = `0:${seconds}`;
      }
    }, 1000);
  });
}
if (streakResetBtn) {
  streakResetBtn.addEventListener('click', () => {
    saveStreak({ completedDates: [] });
    saveCheckinState({ ...defaultCheckinState });
    renderDailyCheckin();
  });
}

if (resetDailyCheckinBtn) {
  resetDailyCheckinBtn.addEventListener('click', () => {
    saveCheckinState({ ...defaultCheckinState });
    renderDailyCheckin();
  });
}

if (profileEditBtn) {
  profileEditBtn.addEventListener('click', () => {
    const current = loadProfile();

    showInputModal({
      title: 'Edit profile',
      label: 'Name',
      defaultValue: current.name,
      onSave: (name) => {
        showInputModal({
          title: 'Edit profile',
          label: 'Experience level',
          defaultValue: current.level,
          onSave: (level) => {
            showInputModal({
              title: 'Edit profile',
              label: 'Training days per week',
              defaultValue: current.schedule,
              onSave: (schedule) => {
                const nextProfile = {
                  name: name.trim(),
                  level: level && level.trim() ? level.trim() : current.level,
                  schedule: schedule && schedule.trim() ? schedule.trim() : current.schedule
                };

                saveProfile(nextProfile);
                renderProfile();
              }
            });
          }
        });
      }
    });
  });
}

function toggleDetails(button, details, openLabel, closeLabel) {
  if (!button || !details) return;

  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  details.hidden = isExpanded;
  button.setAttribute('aria-expanded', String(!isExpanded));
  button.textContent = isExpanded ? openLabel : closeLabel;
}

if (progressViewBtn && progressDetails) {
  progressViewBtn.addEventListener('click', () => {
    toggleDetails(progressViewBtn, progressDetails, 'View', 'Hide');
  });
}

if (weeklyPlanBtn && weeklyPlanDetails) {
  weeklyPlanBtn.addEventListener('click', () => {
    toggleDetails(weeklyPlanBtn, weeklyPlanDetails, 'View', 'Hide');
  });
}

if (viewPlanBtn && workoutPlanDetails) {
  viewPlanBtn.addEventListener('click', () => {
    toggleDetails(viewPlanBtn, workoutPlanDetails, 'View Plan', 'Hide Plan');
  });
}

if (adjustGoalsBtn) {
  adjustGoalsBtn.addEventListener('click', () => {
    currentIndex = 1;
    showScreen(currentIndex);
  });
}

if (weekResetBtn) {
  weekResetBtn.addEventListener('click', () => {
    const plan = goalPlans[selectedGoal] || goalPlans['Build Muscle'];
    const resetProgress = Array(7).fill('upcoming');
    resetProgress[2] = 'active';
    weeklyProgress[selectedGoal] = resetProgress;
    renderWeekProgress(selectedGoal);

    if (summaryHeadline && summaryBlurb) {
      summaryHeadline.textContent = 'Week reset';
      summaryBlurb.textContent = `${plan.heading} A fresh week is ready for you.`;
    }
  });
}

if (mealLogBtn) {
  mealLogBtn.addEventListener('click', () => {
    showInputModal({
      title: 'Add meal entry',
      label: 'Meal',
      defaultValue: 'Chicken and rice bowl',
      onSave: (newMeal) => {
        if (newMeal && newMeal.trim()) {
          addMealEntry(newMeal.trim());
        }
      }
    });
  });
}

if (historyRefreshBtn) {
  historyRefreshBtn.addEventListener('click', () => {
    renderHistory();
  });
}

if (questRefreshBtn) {
  questRefreshBtn.addEventListener('click', () => {
    renderQuestBoard(selectedGoal);
  });
}

if (coachNotesBtn) {
  coachNotesBtn.addEventListener('click', () => {
    const plan = goalPlans[selectedGoal] || goalPlans['Build Muscle'];
    if (summaryHeadline && summaryBlurb) {
      summaryHeadline.textContent = 'Coach notes';
      summaryBlurb.textContent = `${plan.coachSupport} Keep the quality high and stay consistent.`;
    }
  });
}

if (recoveryLogBtn) {
  recoveryLogBtn.addEventListener('click', () => {
    showInputModal({
      title: 'Log recovery',
      label: 'Recovery score (1-100)',
      defaultValue: '84',
      onSave: (value) => {
        const score = Number(value);
        if (!Number.isNaN(score)) {
          const clamped = Math.min(100, Math.max(1, score));
          const result = `${clamped}%`;
          const appState = loadAppState();
          appState.recovery = result;
          saveAppState(appState);
          if (recoveryScore) recoveryScore.textContent = result;
          if (recoveryText) recoveryText.textContent = 'Recovery log updated. Keep the routine steady.';
        }
      }
    });
  });
}

if (hydrationAddBtn) {
  hydrationAddBtn.addEventListener('click', () => {
    showInputModal({
      title: 'Log hydration',
      label: 'Liters consumed',
      defaultValue: '2.1',
      onSave: (value) => {
        const hydration = Number(value);
        if (!Number.isNaN(hydration)) {
          const result = `${hydration.toFixed(1)}L`;
          const appState = loadAppState();
          appState.hydration = result;
          saveAppState(appState);
          if (hydrationValue) hydrationValue.textContent = result;
          if (hydrationTitle) hydrationTitle.textContent = `${result} logged`;
          if (hydrationText) hydrationText.textContent = 'Hydration updated. Nice work staying on top of it.';
        }
      }
    });
  });
}

if (coachRoomBtn) {
  coachRoomBtn.addEventListener('click', () => {
    const plan = goalPlans[selectedGoal] || goalPlans['Build Muscle'];
    const name = loadProfile().name.trim();
    if (coachMessage) {
      coachMessage.textContent = name
        ? `Hey ${name} — today’s focus is ${plan.workout.toLowerCase()}.`
        : `Today’s focus is ${plan.workout.toLowerCase()}.`;
    }
    if (coachSupport) coachSupport.textContent = 'Start with the essentials, then build momentum from there.';
  });
}

goalCards.forEach((card) => {
  card.addEventListener('click', () => {
    goalCards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');

    const goal = card.dataset.goal;
    selectedGoal = goal;
    localStorage.setItem('fitnessGoal', goal);
  });
});

const savedGoal = localStorage.getItem('fitnessGoal');
if (savedGoal) {
  const matchingCard = document.querySelector(`[data-goal="${savedGoal}"]`);
  if (matchingCard) {
    goalCards.forEach((item) => item.classList.remove('selected'));
    matchingCard.classList.add('selected');
    selectedGoal = savedGoal;
  }
}

applyPlan(selectedGoal);
showScreen(0);
