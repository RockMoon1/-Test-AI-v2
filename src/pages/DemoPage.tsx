import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutDashboard, Bell, Flame, Timer, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import TaskBoard from '../components/demo/TaskBoard';
import NotificationCustomizer from '../components/demo/NotificationCustomizer';
import StreakTracker from '../components/demo/StreakTracker';
import StudySessionSimulator from '../components/demo/StudySessionSimulator';
import AIAssistant from '../components/demo/AIAssistant';
import { ROUTES } from '../utils/constants';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'notifications' | 'streaks' | 'study'>('tasks');

  const tabs = [
    { id: 'tasks' as const, name: 'Task Board', icon: LayoutDashboard },
    { id: 'notifications' as const, name: 'Notifications', icon: Bell },
    { id: 'streaks' as const, name: 'Streak Tracker', icon: Flame },
    { id: 'study' as const, name: 'Study Sessions', icon: Timer },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to={ROUTES.HOME}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Interactive Demo
                </h1>
                <p className="text-lg text-gray-600">
                  Experience all the features of StudySync AI in action
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">👨‍🎓</div>
                  <div className="text-sm text-gray-600">Alex Johnson</div>
                </div>
              </div>
            </div>

            <AIAssistant embedded />
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'tasks' && <TaskBoard />}
                {activeTab === 'notifications' && <NotificationCustomizer />}
                {activeTab === 'streaks' && <StreakTracker />}
                {activeTab === 'study' && <StudySessionSimulator />}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6">
              Sign up now and start your 14-day free trial. No credit card required.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Start Free Trial
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
