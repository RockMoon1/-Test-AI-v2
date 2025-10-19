import { motion } from 'framer-motion';
import {
  LayoutDashboard, Bell, Cloud, Heart, Timer, Trophy,
  Calendar, Zap, Shield
} from 'lucide-react';
import Card from '../ui/Card';

export default function FeaturesSection() {
  const features = [
    {
      icon: LayoutDashboard,
      title: 'Smart Task Organization',
      description: 'Organize tasks by category: academic, personal, spiritual growth, and hobbies. Drag-and-drop interface makes managing your workload effortless.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Bell,
      title: 'Customizable Notifications',
      description: 'Choose from standard, messaging, or Snapchat-style notifications. Adjust tone from professional to friendly to match your personality.',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Seamlessly connect with Google Docs, Dropbox, and other cloud storage services. Access your study materials anywhere.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Heart,
      title: 'Spiritual Encouragement',
      description: 'Daily Bible verses, prayer reminders, and spiritual growth tracking. Maintain your faith while excelling academically.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Timer,
      title: 'Study Session Tracking',
      description: 'Built-in Pomodoro timer, distraction management, and break suggestions. Optimize your focus and productivity.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Trophy,
      title: 'Gamified Streaks',
      description: 'Build positive habits with streak tracking, achievements, and progress visualization. Stay motivated every day.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered task prioritization and deadline management. Never miss an assignment or exam again.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Add tasks instantly from anywhere. Voice input, browser extension, and mobile widgets for seamless capture.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. We never share your information with third parties.',
      gradient: 'from-gray-500 to-slate-500',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {' '}Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed specifically for college students who want to excel
            academically while maintaining a balanced, fulfilling life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="p-6 h-full">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
