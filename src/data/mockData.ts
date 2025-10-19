import { Task, Notification, Achievement, Streak, StudySession, UserProfile, PricingTier, Testimonial, Feature, Milestone } from '../types';

export const mockUser: UserProfile = {
  name: 'Alex Johnson',
  avatar: '👨‍🎓',
  studentYear: 'Junior',
  major: 'Computer Science',
  tasksCompleted: 127,
  currentStreak: 12,
  totalStudyTime: 2845,
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Data Structures Assignment',
    description: 'Implement binary search tree with unit tests',
    category: 'academic',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-05',
    createdAt: '2025-09-28',
  },
  {
    id: '2',
    title: 'Morning Bible Study',
    description: 'Read Proverbs chapter 3',
    category: 'spiritual',
    status: 'completed',
    priority: 'medium',
    createdAt: '2025-09-30',
  },
  {
    id: '3',
    title: 'Study for Calculus Midterm',
    description: 'Review chapters 5-7, practice problems',
    category: 'academic',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-10-08',
    createdAt: '2025-09-29',
  },
  {
    id: '4',
    title: 'Guitar Practice Session',
    description: 'Practice new chord progressions for 30 minutes',
    category: 'hobby',
    status: 'todo',
    priority: 'low',
    createdAt: '2025-09-30',
  },
  {
    id: '5',
    title: 'Workout at Gym',
    description: 'Upper body strength training',
    category: 'personal',
    status: 'completed',
    priority: 'medium',
    createdAt: '2025-09-30',
  },
  {
    id: '6',
    title: 'Chemistry Lab Report',
    description: 'Write conclusion and analysis sections',
    category: 'academic',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-03',
    createdAt: '2025-09-27',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Study Time!',
    message: 'Hey! Your Calculus midterm is in 3 days. Want to knock out some practice problems? 📚',
    type: 'reminder',
    style: 'messaging',
    tone: 'friendly',
    timestamp: '2025-09-30T14:30:00',
  },
  {
    id: '2',
    title: 'Great Work!',
    message: 'You completed your workout goal! Keep building that healthy routine. 💪',
    type: 'achievement',
    style: 'standard',
    tone: 'motivational',
    timestamp: '2025-09-30T10:15:00',
  },
  {
    id: '3',
    title: 'Daily Devotional',
    message: 'Time for your morning Bible study. Start your day with wisdom! 🙏',
    type: 'encouragement',
    style: 'snapchat',
    tone: 'friendly',
    timestamp: '2025-09-30T07:00:00',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Week Warrior',
    description: 'Complete tasks 7 days in a row',
    icon: '🔥',
    earnedAt: '2025-09-28',
    progress: 7,
    total: 7,
  },
  {
    id: '2',
    title: 'Academic Excellence',
    description: 'Complete 50 academic tasks',
    icon: '📚',
    earnedAt: '2025-09-25',
    progress: 50,
    total: 50,
  },
  {
    id: '3',
    title: 'Balanced Life',
    description: 'Complete tasks in all 4 categories in one week',
    icon: '⚖️',
    progress: 3,
    total: 4,
  },
  {
    id: '4',
    title: 'Early Bird',
    description: 'Complete 20 morning tasks',
    icon: '🌅',
    progress: 15,
    total: 20,
  },
];

export const mockStreaks: Streak[] = [
  {
    id: '1',
    category: 'Academic',
    currentStreak: 12,
    longestStreak: 18,
    lastUpdated: '2025-09-30',
  },
  {
    id: '2',
    category: 'Spiritual',
    currentStreak: 8,
    longestStreak: 15,
    lastUpdated: '2025-09-30',
  },
  {
    id: '3',
    category: 'Personal',
    currentStreak: 5,
    longestStreak: 9,
    lastUpdated: '2025-09-30',
  },
  {
    id: '4',
    category: 'Hobby',
    currentStreak: 3,
    longestStreak: 7,
    lastUpdated: '2025-09-29',
  },
];

export const mockStudySessions: StudySession[] = [
  {
    id: '1',
    subject: 'Data Structures',
    duration: 25,
    type: 'completed',
    startTime: '2025-09-30T14:00:00',
    endTime: '2025-09-30T14:25:00',
    distractions: 2,
  },
  {
    id: '2',
    subject: 'Calculus',
    duration: 25,
    type: 'completed',
    startTime: '2025-09-30T15:00:00',
    endTime: '2025-09-30T15:25:00',
    distractions: 1,
  },
  {
    id: '3',
    subject: 'Chemistry',
    duration: 25,
    type: 'focus',
    startTime: '2025-09-30T16:00:00',
    distractions: 0,
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out the basics',
    features: [
      'Basic task management',
      'Standard notifications',
      'Daily spiritual encouragement',
      'Up to 50 tasks',
      'Mobile app access',
    ],
  },
  {
    name: 'Student',
    price: '$4.99',
    period: 'per month',
    description: 'Everything you need to succeed',
    features: [
      'Unlimited tasks',
      'Custom notification styles',
      'Advanced workflow categories',
      'Study session tracking',
      'Cloud storage integration',
      'Priority support',
      'Detailed analytics',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: 'per month',
    description: 'For serious students',
    features: [
      'All Student features',
      'AI-powered task suggestions',
      'Custom achievement creation',
      'Team collaboration tools',
      'Advanced reporting',
      'API access',
      'Dedicated support',
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    role: 'Senior, Biology Major',
    avatar: '👩‍🔬',
    content: 'This app transformed how I manage my studies. The spiritual encouragement feature keeps me grounded during stressful exam weeks!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Sophomore, Engineering',
    avatar: '👨‍💻',
    content: 'Finally, an app that understands students need balance. Love the custom notification styles and the Pomodoro timer is a game-changer.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Roberts',
    role: 'Junior, Business',
    avatar: '👩‍💼',
    content: 'The workflow categorization helped me see where I was spending my time. Now I make sure to balance academics with personal growth.',
    rating: 5,
  },
];

export const features: Feature[] = [
  {
    id: '1',
    title: 'Smart Task Organization',
    description: 'Organize tasks by category: academic, personal, spiritual growth, and hobbies. Drag-and-drop interface makes managing your workload effortless.',
    icon: 'layout-dashboard',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: '2',
    title: 'Customizable Notifications',
    description: 'Choose from standard, messaging, or Snapchat-style notifications. Adjust tone from professional to friendly to match your personality.',
    icon: 'bell',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: '3',
    title: 'Cloud Integration',
    description: 'Seamlessly connect with Google Docs, Dropbox, and other cloud storage services. Access your study materials anywhere.',
    icon: 'cloud',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: '4',
    title: 'Spiritual Encouragement',
    description: 'Daily Bible verses, prayer reminders, and spiritual growth tracking. Maintain your faith while excelling academically.',
    icon: 'heart',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: '5',
    title: 'Study Session Tracking',
    description: 'Built-in Pomodoro timer, distraction management, and break suggestions. Optimize your focus and productivity.',
    icon: 'timer',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: '6',
    title: 'Gamified Streaks',
    description: 'Build positive habits with streak tracking, achievements, and progress visualization. Stay motivated every day.',
    icon: 'trophy',
    color: 'from-yellow-500 to-orange-500',
  },
];

export const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Project Launch',
    description: 'Initial beta release with core task management features',
    date: '2025-01',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Notification System',
    description: 'Implemented customizable notification styles and tones',
    date: '2025-03',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Cloud Integration',
    description: 'Added Google Docs and cloud storage connections',
    date: '2025-05',
    status: 'completed',
  },
  {
    id: '4',
    title: 'Mobile App Release',
    description: 'Native iOS and Android applications launched',
    date: '2025-08',
    status: 'in-progress',
  },
  {
    id: '5',
    title: 'AI-Powered Features',
    description: 'Smart task suggestions and predictive scheduling',
    date: '2025-11',
    status: 'planned',
  },
  {
    id: '6',
    title: 'Team Collaboration',
    description: 'Shared workspaces for study groups',
    date: '2026-02',
    status: 'planned',
  },
];
