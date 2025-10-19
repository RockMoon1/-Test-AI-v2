import { motion } from 'framer-motion';
import { Flame, Trophy, Target, Award } from 'lucide-react';
import Card from '../ui/Card';
import { mockStreaks, mockAchievements } from '../../data/mockData';

export default function StreakTracker() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Streak Tracker</h3>
        <p className="text-gray-600">Build positive habits and track your progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStreaks.map((streak, index) => (
          <motion.div
            key={streak.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 text-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative z-10">
                <Flame className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {streak.currentStreak}
                </div>
                <div className="text-sm text-gray-600 mb-2">{streak.category} Days</div>
                <div className="text-xs text-gray-500">
                  Best: {streak.longestStreak} days
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h4 className="text-xl font-bold text-gray-900">Achievements</h4>
          </div>
          <div className="space-y-4">
            {mockAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-semibold text-gray-900">{achievement.title}</h5>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earnedAt && (
                      <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {achievement.progress} / {achievement.total}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-6 h-6 text-blue-500" />
            <h4 className="text-xl font-bold text-gray-900">Weekly Goals</h4>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Complete 20 Academic Tasks', progress: 15, total: 20, color: 'from-blue-500 to-cyan-500' },
              { name: 'Daily Spiritual Practice', progress: 5, total: 7, color: 'from-pink-500 to-rose-500' },
              { name: '5 Hours of Focused Study', progress: 3.5, total: 5, color: 'from-green-500 to-emerald-500' },
              { name: 'Exercise 3 Times', progress: 2, total: 3, color: 'from-orange-500 to-amber-500' },
            ].map((goal, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{goal.name}</span>
                  <span className="text-sm text-gray-600">
                    {goal.progress} / {goal.total}
                  </span>
                </div>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(goal.progress / goal.total) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${goal.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <h5 className="font-semibold text-gray-900 mb-2">💡 Streak Tips</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Start small and build consistency</li>
              <li>• Set realistic daily goals</li>
              <li>• Celebrate small wins along the way</li>
              <li>• Don't break the chain!</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
