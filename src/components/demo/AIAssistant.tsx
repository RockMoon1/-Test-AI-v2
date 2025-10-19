import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { sendMessageToAI } from '../../services/aiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'alex';
  timestamp: Date;
}

interface AIAssistantProps {
  embedded?: boolean;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

const quickActions = [
  { text: "Help me study", category: "study" },
  { text: "I need motivation", category: "motivation" },
  { text: "Plan my tasks", category: "task" },
  { text: "I'm stressed", category: "stress" },
];

export default function AIAssistant({ embedded = false }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! I'm Alex, your AI study buddy powered by real AI. Ask me anything about studying, motivation, or managing your college life! 🎓",
      sender: 'alex',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<AIMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    const newHistory: AIMessage[] = [
      ...conversationHistory,
      { role: 'user', content: messageText }
    ];

    try {
      const response = await sendMessageToAI(newHistory);

      const alexMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'alex',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, alexMessage]);
      setConversationHistory([
        ...newHistory,
        { role: 'assistant', content: response }
      ]);
    } catch (err) {
      console.error('AI Error:', err);
      setError('Using demo mode - add API key for full AI features');

      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help! (Running in demo mode. Add your OpenAI or DeepSeek API key to enable full AI features.)",
        sender: 'alex',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    sendMessage(action.text);
  };

  return (
    <div className={embedded ? 'w-full' : 'fixed bottom-6 right-6 z-50 w-full max-w-md'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className={`flex flex-col shadow-2xl ${embedded ? 'h-[600px]' : 'h-[600px]'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-xl">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">Alex</div>
                <div className="text-sm text-blue-100">Your AI Study Assistant</div>
              </div>
            </div>
            {embedded && (
              <div className="mt-4">
                <p className="text-blue-100">
                  Chat with me about studying, motivation, task management, and more!
                </p>
                <p className="text-xs text-blue-200 mt-2">
                  💡 Powered by real AI - conversations adapt to your unique needs
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-200 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <p className="text-xs text-yellow-700">{error}</p>
            </div>
          )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-4 py-3 border-t bg-white">
            <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t bg-white rounded-b-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Alex anything..."
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
      </motion.div>
    </div>
  );
}
