import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Brain, AlertCircle, Trophy, Target, Music, Volume2, VolumeX, Zap, Smartphone, MessageSquare, Youtube, Instagram, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

type SessionMode = 'idle' | 'focus' | 'break' | 'complete';
type DistractionType = 'phone' | 'social-media' | 'lost-interest' | 'tired' | 'other';

interface DistractionLog {
  type: DistractionType;
  timestamp: Date;
}

interface PersonalizedTip {
  tip: string;
  priority: number;
}

export default function StudySessionSimulator() {
  const [mode, setMode] = useState<SessionMode>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [distractions, setDistractions] = useState<DistractionLog[]>([]);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showDistractionButtons, setShowDistractionButtons] = useState(false);

  const motivationalQuotes = [
    "You're crushing it! Keep going! 💪",
    "Focus is your superpower! 🚀",
    "Every minute counts! You got this! 🔥",
    "Building those study muscles! 💯",
    "Laser focused! Nothing can stop you! ⚡",
  ];

  const breakActivities = [
    "🧘 Try a quick stretch",
    "💧 Grab some water",
    "🚶 Take a short walk",
    "🌬️ Do some deep breathing",
    "👀 Look away from screen",
    "🎵 Listen to your favorite song",
  ];

  const distractionTypes = [
    { id: 'phone' as const, label: 'Checked Phone', icon: Smartphone, color: 'from-blue-500 to-cyan-500' },
    { id: 'social-media' as const, label: 'Social Media', icon: Instagram, color: 'from-pink-500 to-rose-500' },
    { id: 'lost-interest' as const, label: 'Lost Interest', icon: TrendingUp, color: 'from-orange-500 to-amber-500' },
    { id: 'tired' as const, label: 'Feeling Tired', icon: Coffee, color: 'from-purple-500 to-indigo-500' },
    { id: 'other' as const, label: 'Other', icon: MessageSquare, color: 'from-gray-500 to-slate-500' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleSessionComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (mode === 'focus' && isRunning) {
      const interval = setInterval(() => {
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setMotivation(randomQuote);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [mode, isRunning]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      setCompletedSessions(prev => prev + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      setMode('break');
      setTimeLeft(5 * 60);
    } else if (mode === 'break') {
      setMode('idle');
      setTimeLeft(25 * 60);
    }
  };

  const startSession = () => {
    if (mode === 'idle') {
      setMode('focus');
      setTimeLeft(25 * 60);
      setMotivation(motivationalQuotes[0]);
    }
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('idle');
    setTimeLeft(25 * 60);
    setMotivation('');
  };

  const recordDistraction = (type: DistractionType) => {
    setDistractions(prev => [...prev, { type, timestamp: new Date() }]);
    setShowDistractionButtons(false);

    const messages: Record<DistractionType, string[]> = {
      phone: [
        "Phone temptation defeated! Back to conquering! 📱➡️📚",
        "Nice catch! Let's put that phone away and focus! 💪",
      ],
      'social-media': [
        "Social media can wait - your future can't! 🚀",
        "Back to reality! Your goals are more important! 🎯",
      ],
      'lost-interest': [
        "Let's switch it up! Try a different approach! 🔄",
        "Take a 2-minute break, then attack from a new angle! 💡",
      ],
      tired: [
        "Feeling the energy dip? Maybe time for a quick break! ☕",
        "Push through! You're stronger than the fatigue! 💪",
      ],
      other: [
        "Noted! Let's refocus and finish strong! 🎯",
        "Back on track! You got this! 🔥",
      ],
    };

    const messageList = messages[type];
    setMotivation(messageList[Math.floor(Math.random() * messageList.length)]);
    setTimeout(() => setMotivation(''), 4000);
  };

  const getDistractionStats = () => {
    const stats: Record<DistractionType, number> = {
      phone: 0,
      'social-media': 0,
      'lost-interest': 0,
      tired: 0,
      other: 0,
    };

    distractions.forEach(d => {
      stats[d.type]++;
    });

    return stats;
  };

  const getPersonalizedTips = (): PersonalizedTip[] => {
    const stats = getDistractionStats();
    const tips: PersonalizedTip[] = [];

    if (stats.phone >= 2) {
      tips.push({
        tip: "🚨 Phone Alert: You've checked your phone multiple times. Try putting it in another room or use app blockers!",
        priority: 3,
      });
    }

    if (stats['social-media'] >= 2) {
      tips.push({
        tip: "📱 Social Media Trap: Use website blockers like Freedom or Cold Turkey to block distracting sites during study time.",
        priority: 3,
      });
    }

    if (stats['lost-interest'] >= 2) {
      tips.push({
        tip: "🔄 Interest Fading: Try the Pomodoro technique with shorter bursts (15 min) or switch subjects to keep it fresh!",
        priority: 2,
      });
    }

    if (stats.tired >= 2) {
      tips.push({
        tip: "😴 Energy Management: Study during your peak energy hours. For most people, that's morning or early afternoon!",
        priority: 2,
      });
    }

    if (distractions.length >= 5) {
      tips.push({
        tip: "💡 Pattern Detected: High distraction count! Consider studying in a library or quiet space away from usual triggers.",
        priority: 3,
      });
    }

    if (tips.length === 0) {
      return [
        { tip: "• Phone in another room = instant focus boost", priority: 1 },
        { tip: "• Close unnecessary tabs & apps", priority: 1 },
        { tip: "• Tell others 'Do Not Disturb'", priority: 1 },
        { tip: "• Take breaks seriously - they help!", priority: 1 },
        { tip: "• Track distractions to improve", priority: 1 },
      ];
    }

    return tips.sort((a, b) => b.priority - a.priority);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const getModeConfig = () => {
    switch (mode) {
      case 'focus':
        return {
          bg: 'from-blue-500 to-cyan-500',
          icon: Brain,
          title: 'Deep Focus Mode',
          subtitle: 'Lock in and crush it!'
        };
      case 'break':
        return {
          bg: 'from-green-500 to-emerald-500',
          icon: Coffee,
          title: 'Break Time!',
          subtitle: 'Recharge your brain'
        };
      default:
        return {
          bg: 'from-gray-500 to-slate-500',
          icon: Target,
          title: 'Ready to Study?',
          subtitle: 'Start your focus session'
        };
    }
  };

  const config = getModeConfig();
  const stats = getDistractionStats();
  const personalizedTips = getPersonalizedTips();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Study Session Hub</h3>
        <p className="text-gray-600">Your personalized focus environment with smart distraction tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className={`p-8 relative overflow-hidden bg-gradient-to-br ${config.bg}`}>
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="absolute inset-0 flex items-center justify-center bg-yellow-400/90 z-10"
                >
                  <div className="text-center">
                    <Trophy className="w-20 h-20 text-white mx-auto mb-4" />
                    <h3 className="text-4xl font-bold text-white mb-2">Session Complete!</h3>
                    <p className="text-white text-xl">You're on fire! 🔥</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-0">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center mb-6"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <config.icon className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <div className="text-center text-white mb-8">
                <h4 className="text-2xl font-bold mb-1">{config.title}</h4>
                <p className="text-white/80">{config.subtitle}</p>
              </div>

              <div className="relative inline-block w-full max-w-sm mx-auto mb-8">
                <svg className="transform -rotate-90 w-full" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-white/20"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="text-white"
                    initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - progress / 100) }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                    {isRunning && mode === 'focus' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/80 text-sm mt-2"
                      >
                        Stay focused!
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {motivation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center text-white text-lg font-medium mb-6"
                  >
                    {motivation}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-center space-x-4">
                {mode === 'idle' ? (
                  <Button
                    size="lg"
                    onClick={startSession}
                    className="bg-white text-blue-600 hover:bg-gray-50 min-w-[160px]"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={toggleTimer}
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-2 border-white"
                    >
                      {isRunning ? (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Resume
                        </>
                      )}
                    </Button>
                    <Button
                      size="lg"
                      onClick={resetTimer}
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-2 border-white"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Sessions', value: completedSessions, icon: Trophy, color: 'from-yellow-500 to-orange-500' },
              { label: 'Distractions', value: distractions.length, icon: AlertCircle, color: 'from-red-500 to-pink-500' },
              { label: 'Study Time', value: `${Math.round((completedSessions * 25) / 60)}h`, icon: Brain, color: 'from-blue-500 to-cyan-500' },
              { label: 'Streak', value: completedSessions > 0 ? '🔥' : '—', icon: Zap, color: 'from-purple-500 to-pink-500' },
            ].map((stat, index) => (
              <Card key={index} className={`p-4 text-center bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              {mode === 'focus' && isRunning ? 'Got Distracted?' : 'Distraction Tracking'}
            </h4>

            {mode === 'focus' && isRunning ? (
              <AnimatePresence>
                {!showDistractionButtons ? (
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => setShowDistractionButtons(true)}
                  >
                    I Got Distracted
                  </Button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-sm text-gray-600 mb-3">What pulled you away?</p>
                    {distractionTypes.map((dtype) => (
                      <button
                        key={dtype.id}
                        onClick={() => recordDistraction(dtype.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${dtype.color} text-white hover:opacity-90 transition-opacity`}
                      >
                        <dtype.icon className="w-5 h-5" />
                        <span className="font-medium">{dtype.label}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => setShowDistractionButtons(false)}
                      className="w-full text-sm text-gray-600 hover:text-gray-800 mt-2"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">
                  {mode === 'idle' ? 'Click types during study to track patterns:' : 'Track what distracts you most:'}
                </p>
                {distractionTypes.map((dtype) => (
                  <button
                    key={dtype.id}
                    disabled={mode !== 'focus' || !isRunning}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${dtype.color} text-white transition-opacity ${
                      mode !== 'focus' || !isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                  >
                    <dtype.icon className="w-5 h-5" />
                    <span className="font-medium">{dtype.label}</span>
                  </button>
                ))}
                <p className="text-xs text-gray-500 mt-3 text-center italic">
                  Start a session to track distractions →
                </p>
              </div>
            )}
          </Card>

          {mode === 'break' && (
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Coffee className="w-5 h-5 mr-2 text-green-500" />
                Break Activities
              </h4>
              <div className="space-y-2">
                {breakActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white rounded-lg text-sm text-gray-700"
                  >
                    {activity}
                  </motion.div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Environment</h4>
            <div className="space-y-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">Sound Effects</span>
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-blue-600" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">Focus Music</span>
                {musicEnabled ? (
                  <Music className="w-5 h-5 text-blue-600" />
                ) : (
                  <Music className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              {distractions.length > 0 ? 'Your Personalized Tips' : 'Pro Tips'}
            </h4>

            {distractions.length > 0 && (
              <div className="mb-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">
                  📊 Analysis: {distractions.length} distraction{distractions.length > 1 ? 's' : ''} logged
                </p>
                {Object.entries(stats).filter(([_, count]) => count > 0).map(([type, count]) => (
                  <p key={type} className="text-xs text-blue-800 mt-1">
                    • {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}: {count}x
                  </p>
                ))}
              </div>
            )}

            <ul className="text-sm text-gray-700 space-y-2">
              {personalizedTips.map((tipObj, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${tipObj.priority >= 3 ? 'font-semibold text-orange-700 bg-orange-50 p-2 rounded' : ''}`}
                >
                  {tipObj.tip}
                </motion.li>
              ))}
            </ul>

            {distractions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-700 italic">
                  💡 Tips update based on your distraction patterns!
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
