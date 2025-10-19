const CHATBASE_API_KEY = import.meta.env.VITE_CHATBASE_API_KEY || 'bb0a0023-f702-43ad-82dd-026929b8fc31';
const CHATBASE_CHATBOT_ID = import.meta.env.VITE_CHATBASE_CHATBOT_ID || 'UiLrlTtAeNu39cq7GfOLB';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

async function callChatbase(messages: Message[]): Promise<string> {
  console.log('Chatbase API Key:', CHATBASE_API_KEY ? `${CHATBASE_API_KEY.substring(0, 10)}...` : 'MISSING');
  console.log('Chatbase Chatbot ID:', CHATBASE_CHATBOT_ID);

  if (!CHATBASE_API_KEY || CHATBASE_API_KEY === 'your_chatbase_api_key_here') {
    console.log('Using fallback - API key not configured');
    return getFallbackResponse(messages[messages.length - 1].content);
  }

  try {
    const requestBody = {
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      chatbotId: CHATBASE_CHATBOT_ID,
      stream: false,
    };

    console.log('Chatbase request:', requestBody);

    const response = await fetch('https://www.chatbase.co/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATBASE_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Chatbase response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Chatbase API error: ${response.status}`, errorText);
      throw new Error(`Chatbase API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chatbase response data:', data);
    return data.text || data.message || getFallbackResponse(messages[messages.length - 1].content);
  } catch (error) {
    console.error('Chatbase API error:', error);
    return getFallbackResponse(messages[messages.length - 1].content);
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  const responses: Record<string, string[]> = {
    greeting: [
      "Hey! I'm Alex, your AI study buddy. How can I help you today? 📚",
      "Hi there! Ready to tackle your goals together? What's on your mind? 💪",
    ],
    study: [
      "Let's create a focused study plan! What subject are you working on? 🎯",
      "Great! A 25-minute Pomodoro session can work wonders. Want to try? ⏱️",
    ],
    task: [
      "Let's break that down into smaller steps. What's the first thing you need to do? 📝",
      "I can help you prioritize that. Is this urgent, important, or both? 🎯",
    ],
    motivation: [
      "You're doing amazing! Remember, progress over perfection. Keep going! 💪",
      "Every small step counts. You've got this! 🚀",
    ],
    stress: [
      "It's okay to feel overwhelmed. Let's focus on one thing at a time. What's most important right now? 🌟",
      "Take a deep breath. You're doing better than you think. Want to prioritize your tasks? 💙",
    ],
  };

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
    return responses.study[Math.floor(Math.random() * responses.study.length)];
  }
  if (lowerMessage.includes('task') || lowerMessage.includes('todo')) {
    return responses.task[Math.floor(Math.random() * responses.task.length)];
  }
  if (lowerMessage.includes('motivat') || lowerMessage.includes('tired')) {
    return responses.motivation[Math.floor(Math.random() * responses.motivation.length)];
  }
  if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm')) {
    return responses.stress[Math.floor(Math.random() * responses.stress.length)];
  }

  return "I'm here to help with studying, tasks, and staying motivated! What would you like to work on? 😊";
}

export async function sendMessageToAI(messages: Message[]): Promise<string> {
  return await callChatbase(messages);
}
