# Alex AI Setup Guide - Real AI Integration

Alex is now powered by **REAL AI** using either OpenAI (ChatGPT) or DeepSeek!

## 🚀 Quick Setup

### Option 1: OpenAI (ChatGPT) - Recommended

1. **Get Your API Key:**
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in
   - Click "Create new secret key"
   - Copy your key (starts with `sk-...`)

2. **Add to Your Project:**
   - Open `.env` file
   - Replace `your_openai_api_key_here` with your actual key:
   ```
   VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxx
   VITE_AI_PROVIDER=openai
   ```

3. **Restart Dev Server**
   ```bash
   npm run dev
   ```

---

### Option 2: DeepSeek (Alternative)

1. **Get Your API Key:**
   - Go to https://platform.deepseek.com/
   - Sign up or log in
   - Generate API key

2. **Add to Your Project:**
   - Open `.env` file
   - Replace `your_deepseek_api_key_here` with your actual key:
   ```
   VITE_DEEPSEEK_API_KEY=your-deepseek-key
   VITE_AI_PROVIDER=deepseek
   ```

3. **Restart Dev Server**
   ```bash
   npm run dev
   ```

---

## 💰 Pricing (Very Affordable!)

### OpenAI (ChatGPT 3.5 Turbo)
- **Cost:** $0.0005 per 1K tokens (input) / $0.0015 per 1K tokens (output)
- **Real Example:** 1,000 conversations ≈ $0.50 - $2.00
- **Perfect for:** Production apps, demos, testing

### DeepSeek
- **Cost:** Very competitive pricing
- **Perfect for:** Budget-conscious projects

---

## 🎯 What You Get With Real AI

### Before (Demo Mode):
- ❌ Basic pattern matching
- ❌ Pre-written responses
- ❌ Can't understand context
- ❌ Feels robotic

### After (Real AI):
- ✅ **Natural conversations** - Understands context
- ✅ **Adaptive responses** - Every answer is unique
- ✅ **Memory** - Remembers conversation history
- ✅ **Personalized advice** - Tailored to each student
- ✅ **Feels human** - Like talking to a real study buddy!

---

## 🧪 Testing Your Setup

1. **Open the Demo Page**
   - Navigate to Interactive Demo
   - Alex chat is right at the top!

2. **Try These Test Messages:**
   ```
   "I have a big exam tomorrow and I'm stressed"
   "Help me create a study schedule for biology"
   "I keep getting distracted by my phone"
   "Give me motivation to finish this essay"
   ```

3. **Check It's Working:**
   - ✅ Responses are unique and contextual
   - ✅ Alex remembers previous messages
   - ✅ Advice is specific to your question
   - ✅ No "demo mode" warning

---

## 🔧 How It Works

### The Tech Stack:

1. **Frontend** (`AIAssistant.tsx`):
   - Collects user messages
   - Displays chat interface
   - Handles typing indicators

2. **Service Layer** (`aiService.ts`):
   - Routes to correct AI provider
   - Manages conversation history
   - Handles errors gracefully
   - Falls back to demo mode if API key missing

3. **API Integration**:
   - OpenAI: `https://api.openai.com/v1/chat/completions`
   - DeepSeek: `https://api.deepseek.com/v1/chat/completions`

### System Prompt:
Alex is configured with this personality:
```
"You are Alex, an AI study assistant for college students.
You help with study planning, task organization, motivation,
stress management, and goal setting.

You are friendly, supportive, and understand college life.
Keep responses concise (2-3 sentences) but meaningful.
Use occasional emojis. Focus on actionable advice."
```

---

## 🛡️ Security Best Practices

### ⚠️ IMPORTANT - API Key Security:

1. **Never commit `.env` to Git**
   - Already in `.gitignore`
   - Double check before pushing

2. **Use Environment Variables**
   - Keys stay in `.env` file
   - Never hardcode in source code

3. **For Production:**
   - Use backend proxy (recommended)
   - Or use Supabase Edge Functions
   - Never expose keys in frontend

### Recommended Production Setup:

Instead of calling AI APIs directly from frontend:

```javascript
// Create a Supabase Edge Function
// Client calls: /functions/v1/chat
// Edge Function calls: OpenAI/DeepSeek API
// API key stays server-side only
```

---

## 🎨 Customizing Alex

### Change Personality:
Edit `src/services/aiService.ts`:
```javascript
const SYSTEM_PROMPT = `You are Alex, [your custom personality]`;
```

### Adjust Response Length:
```javascript
max_tokens: 150,  // Increase for longer responses
```

### Change Temperature:
```javascript
temperature: 0.7,  // 0 = focused, 1 = creative
```

---

## 📊 Monitoring Usage

### Track API Costs:

1. **OpenAI:**
   - Dashboard: https://platform.openai.com/usage
   - Set up billing alerts
   - Monitor token usage

2. **DeepSeek:**
   - Check their platform dashboard

### Typical Usage:
- **Per conversation:** ~500-1000 tokens
- **Cost per conversation:** $0.001 - $0.002
- **1000 conversations:** ~$1-2

---

## 🚨 Troubleshooting

### Issue: "Using demo mode" message

**Solution:**
1. Check `.env` file has correct API key
2. Restart dev server: `npm run dev`
3. Clear browser cache
4. Check API key is valid on provider dashboard

---

### Issue: CORS errors

**Solution:**
This is normal during development. In production:
- Use Edge Functions to proxy requests
- Or enable CORS on your API provider

---

### Issue: Slow responses

**Possible causes:**
- First request of session (cold start)
- Provider API latency
- Long conversation history

**Solutions:**
- Limit conversation history to last 10 messages
- Use faster models (gpt-3.5-turbo is already fast)
- Add loading indicators (already included!)

---

## 🎓 Demo Mode vs Real AI

### Demo Mode (No API Key):
- Still works!
- Uses smart fallback responses
- Good for testing UI
- Shows warning message

### Real AI Mode (With API Key):
- Full conversational AI
- Context-aware responses
- Personalized advice
- No limits on conversation depth

---

## 💡 Pro Tips

1. **Start with OpenAI:**
   - Best documentation
   - Most reliable
   - Easy to set up

2. **Monitor Costs:**
   - Set up billing alerts
   - Start with $5 credit limit
   - Scale up as needed

3. **Test Thoroughly:**
   - Try edge cases
   - Test error handling
   - Verify fallback mode works

4. **User Experience:**
   - Typing indicator keeps users engaged
   - Quick action buttons reduce typing
   - Error messages are friendly

---

## 📞 Need Help?

### Resources:
- **OpenAI Docs:** https://platform.openai.com/docs
- **DeepSeek Docs:** https://platform.deepseek.com/docs
- **API Key Issues:** Check provider's troubleshooting

### Common Questions:

**Q: Do I need to pay upfront?**
A: No, OpenAI has free trial credits. DeepSeek also has free tier.

**Q: Can I switch providers later?**
A: Yes! Just change `VITE_AI_PROVIDER` in `.env`

**Q: Is this secure for production?**
A: For production, use Edge Functions to keep API keys server-side.

**Q: What if API goes down?**
A: App automatically falls back to demo mode - no crashes!

---

## ✅ Setup Checklist

- [ ] Got API key from OpenAI or DeepSeek
- [ ] Added key to `.env` file
- [ ] Set correct `VITE_AI_PROVIDER`
- [ ] Restarted dev server
- [ ] Tested Alex chat in demo
- [ ] Verified real AI responses working
- [ ] Set up billing alerts (recommended)

---

## 🎉 You're All Set!

Alex is now a **real AI assistant** that can:
- Have natural conversations
- Remember context
- Give personalized advice
- Adapt to each student's needs

**Go try it out!** Open the Interactive Demo and chat with Alex! 🚀
