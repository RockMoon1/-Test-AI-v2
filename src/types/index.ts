export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'personal' | 'spiritual' | 'hobby';
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'encouragement' | 'deadline' | 'achievement';
  style: 'standard' | 'messaging' | 'snapchat';
  tone: 'professional' | 'friendly' | 'motivational';
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
  progress: number;
  total: number;
}

export interface Streak {
  id: string;
  category: string;
  currentStreak: number;
  longestStreak: number;
  lastUpdated: string;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  type: 'focus' | 'break' | 'completed';
  startTime: string;
  endTime?: string;
  distractions: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  studentYear: string;
  major: string;
  tasksCompleted: number;
  currentStreak: number;
  totalStudyTime: number;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
}
