import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, Zap } from 'lucide-react';
import Card from '../ui/Card';

export default function NotificationCustomizer() {
  const [style, setStyle] = useState<'standard' | 'messaging' | 'snapchat'>('messaging');
  const [tone, setTone] = useState<'professional' | 'friendly' | 'motivational'>('friendly');

  const styles = [
    { id: 'standard' as const, name: 'Standard', icon: Bell, color: 'from-blue-500 to-cyan-500' },
    { id: 'messaging' as const, name: 'Messaging', icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
    { id: 'snapchat' as const, name: 'Snapchat', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  ];

  const tones = [
    { id: 'professional' as const, name: 'Professional' },
    { id: 'friendly' as const, name: 'Friendly' },
    { id: 'motivational' as const, name: 'Motivational' },
  ];

  const sampleNotifications = {
    standard: {
      professional: {
        title: 'Assignment Due',
        message: 'Your Data Structures assignment is due in 3 days. Please complete and submit.',
      },
      friendly: {
        title: 'Heads up!',
        message: 'Your Data Structures assignment is coming up in 3 days. Time to get started! 📚',
      },
      motivational: {
        title: "You've Got This!",
        message: "Your Data Structures assignment is due in 3 days. You're making great progress - keep it up! 🚀",
      },
    },
    messaging: {
      professional: {
        title: 'StudySync',
        message: 'Reminder: Data Structures assignment due October 5th. Review materials in Google Docs.',
      },
      friendly: {
        title: 'StudySync',
        message: "Hey! Just a reminder about your Data Structures assignment 😊 It's due in 3 days. Want to knock it out today?",
      },
      motivational: {
        title: 'StudySync',
        message: "You're doing amazing! 💪 Your Data Structures assignment is due soon. Let's crush it together!",
      },
    },
    snapchat: {
      professional: {
        title: '🔔 StudySync',
        message: 'Assignment alert: Data Structures due 10/5. Tap to view details.',
      },
      friendly: {
        title: '👋 StudySync',
        message: 'Yo! DS assignment due in 3 days 📝 Swipe up to see your notes!',
      },
      motivational: {
        title: '⚡ StudySync',
        message: "Let's goooo! 🔥 DS assignment coming up. You're gonna ace this! Tap to start 💯",
      },
    },
  };

  const currentNotification = sampleNotifications[style][tone];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Notification Customizer</h3>
        <p className="text-gray-600">Choose your preferred notification style and tone</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Notification Style</h4>
            <div className="grid grid-cols-3 gap-3">
              {styles.map((s) => (
                <motion.button
                  key={s.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStyle(s.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    style === s.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${s.color} mb-2`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{s.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Notification Tone</h4>
            <div className="space-y-2">
              {tones.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTone(t.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    tone === t.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{t.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Customization Options</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Delivery times (morning, afternoon, evening)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Frequency control (immediate, daily digest, weekly)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Category-specific notifications
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Custom notification sounds
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Live Preview</h4>
          <motion.div
            key={`${style}-${tone}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {style === 'standard' && (
              <Card className="p-6 max-w-md">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-semibold text-gray-900">{currentNotification.title}</h5>
                      <span className="text-xs text-gray-500">now</span>
                    </div>
                    <p className="text-gray-700">{currentNotification.message}</p>
                  </div>
                </div>
              </Card>
            )}

            {style === 'messaging' && (
              <Card className="p-4 max-w-md">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">SS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{currentNotification.title}</div>
                    <div className="text-xs text-gray-500">Active now</div>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-gray-900">{currentNotification.message}</p>
                </div>
                <div className="text-xs text-gray-500 mt-2">Just now</div>
              </Card>
            )}

            {style === 'snapchat' && (
              <Card className="p-4 max-w-md bg-gradient-to-br from-yellow-400 to-orange-400">
                <div className="bg-white rounded-2xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"></div>
                    <div className="font-bold text-gray-900">{currentNotification.title}</div>
                  </div>
                  <p className="text-gray-900 font-medium">{currentNotification.message}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>📍 Tap to respond</span>
                    <span>👁️ View</span>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
