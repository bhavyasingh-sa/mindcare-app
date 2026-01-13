import React, { useState } from 'react';
import { Heart, MessageCircle, BookOpen, Flower2, Users, Calendar, Award, Activity, Menu, Send, Moon, Wind, Brain, TrendingUp, AlertCircle, User, Loader2 } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('user'); // 'user' or 'therapist'
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi there! I\'m here to listen and support you. How are you feeling today? Feel free to share anything that\'s on your mind.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [journalEntries, setJournalEntries] = useState([
    { date: '2026-01-12', mood: 'calm', entry: 'Had a good day, felt peaceful after meditation.' },
    { date: '2026-01-11', mood: 'anxious', entry: 'Worried about upcoming exams.' }
  ]);
  const [moodScore, setMoodScore] = useState(65);
  const [userProgress, setUserProgress] = useState({
    level: 3,
    points: 450,
    streak: 5,
    treeStage: 3, // 0: seed, 1: sprout, 2: small tree, 3: medium tree, 4: full tree, 5: blooming tree
    achievements: ['first_chat', 'week_streak', 'journal_master']
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    const newMessages = [...chatMessages, { role: 'user', content: userMessage }];
    setChatMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call Claude API for real AI responses
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a compassionate AI mental health support companion for youth (ages 13-25). Your role is to:
- Listen empathetically and validate their feelings
- Provide emotional support and encouragement
- Ask thoughtful follow-up questions to understand their situation better
- Suggest healthy coping strategies when appropriate
- Remind them they're not alone and that seeking help is a sign of strength
- If someone expresses thoughts of self-harm or suicide, encourage them to reach out to a trusted adult, counselor, or crisis helpline immediately

Be warm, non-judgmental, and supportive. Keep responses concise (2-4 sentences) and conversational. You're not a replacement for professional therapy, but a supportive friend who cares.`,
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        const assistantMessage = data.content[0].text;
        setChatMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
      } else {
        // Fallback response if API fails
        setChatMessages([...newMessages, { 
          role: 'assistant', 
          content: "I'm here for you. Sometimes I have trouble connecting, but I want you to know that your feelings matter. Would you like to tell me more about what's going on?" 
        }]);
      }
    } catch (error) {
      console.error('Error calling Claude API:', error);
      // Fallback response
      setChatMessages([...newMessages, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now, but I want you to know that what you're feeling is valid. Can you tell me more about what's on your mind?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const patients = [
    { id: 1, name: 'Alex M.', age: 17, risk: 'high', lastActive: '2 hours ago', moodTrend: 'declining' },
    { id: 2, name: 'Sam K.', age: 16, risk: 'high', lastActive: '1 day ago', moodTrend: 'stable' },
    { id: 3, name: 'Jordan L.', age: 18, risk: 'medium', lastActive: '3 hours ago', moodTrend: 'improving' },
    { id: 4, name: 'Casey P.', age: 15, risk: 'medium', lastActive: '5 hours ago', moodTrend: 'stable' },
    { id: 5, name: 'Riley T.', age: 17, risk: 'low', lastActive: '1 hour ago', moodTrend: 'improving' }
  ];

  const communities = [
    { name: 'Anxiety Support', members: 1247, description: 'A safe space to discuss anxiety' },
    { name: 'Study Stress', members: 892, description: 'Academic pressure and coping strategies' },
    { name: 'Self-Love Journey', members: 2103, description: 'Building confidence and self-esteem' },
    { name: 'Sleep Better', members: 756, description: 'Tips for healthy sleep habits' }
  ];

  const renderGrowthTree = () => {
    const stages = [
      { name: 'Seed', emoji: '🌱', color: 'from-amber-600 to-yellow-600' },
      { name: 'Sprout', emoji: '🌱', color: 'from-green-400 to-emerald-500' },
      { name: 'Young Tree', emoji: '🌿', color: 'from-green-500 to-emerald-600' },
      { name: 'Growing Tree', emoji: '🌳', color: 'from-green-600 to-teal-600' },
      { name: 'Strong Tree', emoji: '🌲', color: 'from-green-700 to-teal-700' },
      { name: 'Blooming Tree', emoji: '🌸', color: 'from-pink-500 to-rose-500' }
    ];
    
    const currentStage = stages[userProgress.treeStage];
    const nextStage = stages[Math.min(userProgress.treeStage + 1, stages.length - 1)];
    const progressToNext = ((userProgress.points % 200) / 200) * 100;

    return (
      <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
        <h3 className="font-semibold mb-4 text-gray-800">Your Growth Journey</h3>
        <div className={`bg-gradient-to-br ${currentStage.color} rounded-xl p-8 mb-4 flex flex-col items-center justify-center`}>
          <div className="text-7xl mb-3">{currentStage.emoji}</div>
          <p className="text-white font-bold text-lg">{currentStage.name}</p>
          <p className="text-white text-sm opacity-90">Level {userProgress.level}</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress to {nextStage.name}</span>
              <span className="text-gray-600">{userProgress.points} pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{userProgress.streak}</p>
              <p className="text-xs text-gray-600">Day Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{userProgress.achievements.length}</p>
              <p className="text-xs text-gray-600">Achievements</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{userProgress.level}</p>
              <p className="text-xs text-gray-600">Level</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Jamie!</h2>
        <p className="opacity-90">How are you feeling today?</p>
        <div className="flex gap-3 mt-4">
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😊 Great</button>
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😌 Okay</button>
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😔 Low</button>
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😰 Anxious</button>
        </div>
      </div>

      {renderGrowthTree()}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <Activity className="text-blue-500 mb-2" size={24} />
          <p className="text-sm text-gray-600">Mood Score</p>
          <p className="text-2xl font-bold text-blue-600">{moodScore}%</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <TrendingUp className="text-green-500 mb-2" size={24} />
          <p className="text-sm text-gray-600">7-day Streak</p>
          <p className="text-2xl font-bold text-green-600">5 days</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setActiveTab('chat')} className="bg-white border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 transition flex flex-col items-center gap-2">
            <MessageCircle className="text-purple-500" size={28} />
            <span className="text-sm font-medium">Talk to AI</span>
          </button>
          <button onClick={() => setActiveTab('journal')} className="bg-white border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition flex flex-col items-center gap-2">
            <BookOpen className="text-blue-500" size={28} />
            <span className="text-sm font-medium">Journal</span>
          </button>
          <button onClick={() => setActiveTab('selfcare')} className="bg-white border-2 border-green-200 rounded-xl p-4 hover:border-green-400 transition flex flex-col items-center gap-2">
            <Flower2 className="text-green-500" size={28} />
            <span className="text-sm font-medium">Self-Care</span>
          </button>
          <button onClick={() => setActiveTab('communities')} className="bg-white border-2 border-pink-200 rounded-xl p-4 hover:border-pink-400 transition flex flex-col items-center gap-2">
            <Users className="text-pink-500" size={28} />
            <span className="text-sm font-medium">Communities</span>
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="font-medium text-yellow-900">Your therapist is available</p>
            <p className="text-sm text-yellow-700 mt-1">Dr. Sarah is ready for your weekly check-in</p>
            <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition">
              Schedule Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
        <h2 className="font-semibold flex items-center gap-2">
          <Brain size={20} />
          AI Support Chat
        </h2>
        <p className="text-sm opacity-90">Safe, confidential, powered by real AI</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-purple-500 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2">
              <Loader2 className="animate-spin text-purple-500" size={16} />
              <span className="text-gray-600">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t-2 border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="Share what's on your mind..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 disabled:bg-gray-50"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-600 transition disabled:bg-purple-300 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderJournal = () => (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Daily Journal</h2>
        <p className="opacity-90">Express yourself freely</p>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <p className="text-sm text-gray-600 mb-2">How are you feeling?</p>
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200">😊 Happy</button>
          <button className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">😌 Calm</button>
          <button className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200">😰 Anxious</button>
          <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">😔 Sad</button>
        </div>
        <textarea 
          placeholder="Write about your day, thoughts, or feelings..."
          className="w-full h-32 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
        />
        <button className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Save Entry
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Recent Entries</h3>
        {journalEntries.map((entry, idx) => (
          <div key={idx} className="bg-white rounded-xl border-2 border-gray-200 p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">{entry.date}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                entry.mood === 'calm' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {entry.mood}
              </span>
            </div>
            <p className="text-gray-700">{entry.entry}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelfCare = () => (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Self-Care</h2>
        <p className="opacity-90">Take time for yourself</p>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Breathing Exercises</h3>
        <div className="bg-white rounded-xl border-2 border-green-200 p-4 hover:border-green-400 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <Wind className="text-green-500" size={32} />
            <div>
              <p className="font-medium">4-7-8 Breathing</p>
              <p className="text-sm text-gray-600">Calm anxiety in 5 minutes</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Meditation</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-xl border-2 border-purple-200 p-4 hover:border-purple-400 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Brain className="text-purple-500" size={32} />
              <div>
                <p className="font-medium">Morning Mindfulness</p>
                <p className="text-sm text-gray-600">10 min guided meditation</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border-2 border-blue-200 p-4 hover:border-blue-400 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <Moon className="text-blue-500" size={32} />
              <div>
                <p className="font-medium">Sleep Story</p>
                <p className="text-sm text-gray-600">Peaceful night's rest</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Daily Affirmations</h3>
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4 border-2 border-pink-200">
          <p className="text-center text-gray-800 italic">"I am worthy of love and happiness. Today, I choose to be kind to myself."</p>
        </div>
      </div>
    </div>
  );

  const renderCommunities = () => (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Communities</h2>
        <p className="opacity-90">Connect with peers</p>
      </div>

      {communities.map((community, idx) => (
        <div key={idx} className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-pink-400 transition cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">{community.name}</p>
              <p className="text-sm text-gray-600 mt-1">{community.description}</p>
              <p className="text-xs text-gray-500 mt-2">{community.members} members</p>
            </div>
            <Users className="text-pink-500" size={24} />
          </div>
        </div>
      ))}

      <button className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition font-medium">
        + Create New Community
      </button>
    </div>
  );

  const renderTherapistDashboard = () => (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Therapist Dashboard</h2>
        <p className="opacity-90">Dr. Sarah Thompson - 24 assigned patients</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
          <p className="text-sm text-gray-600">High Risk</p>
          <p className="text-2xl font-bold text-red-600">2</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
          <p className="text-sm text-gray-600">Medium Risk</p>
          <p className="text-2xl font-bold text-yellow-600">7</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
          <p className="text-sm text-gray-600">Low Risk</p>
          <p className="text-2xl font-bold text-green-600">15</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Patient Overview</h3>
        {patients.map((patient) => (
          <div key={patient.id} className={`bg-white rounded-xl border-2 p-4 mb-3 ${
            patient.risk === 'high' ? 'border-red-300' :
            patient.risk === 'medium' ? 'border-yellow-300' : 'border-green-300'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{patient.name}, {patient.age}</p>
                <p className="text-sm text-gray-600 mt-1">Last active: {patient.lastActive}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.risk === 'high' ? 'bg-red-100 text-red-700' :
                    patient.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {patient.risk.toUpperCase()} RISK
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.moodTrend === 'declining' ? 'bg-red-100 text-red-700' :
                    patient.moodTrend === 'improving' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {patient.moodTrend}
                  </span>
                </div>
              </div>
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-purple-500" size={28} />
          <h1 className="text-xl font-bold text-gray-800">MindCare</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setUserRole(userRole === 'user' ? 'therapist' : 'user')}
            className="text-sm bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
          >
            {userRole === 'user' ? '👤 User' : '👨‍⚕️ Therapist'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {userRole === 'therapist' ? renderTherapistDashboard() : (
          <>
            {activeTab === 'home' && renderHome()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'journal' && renderJournal()}
            {activeTab === 'selfcare' && renderSelfCare()}
            {activeTab === 'communities' && renderCommunities()}
          </>
        )}
      </div>

      {/* Bottom Navigation - Only for users */}
      {userRole === 'user' && (
        <div className="bg-white border-t-2 border-gray-100 p-2">
          <div className="flex justify-around">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'home' ? 'text-purple-500' : 'text-gray-400'}`}
            >
              <Heart size={24} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'chat' ? 'text-purple-500' : 'text-gray-400'}`}
            >
              <MessageCircle size={24} />
              <span className="text-xs mt-1">Chat</span>
            </button>
            <button 
              onClick={() => setActiveTab('journal')}
              className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'journal' ? 'text-purple-500' : 'text-gray-400'}`}
            >
              <BookOpen size={24} />
              <span className="text-xs mt-1">Journal</span>
            </button>
            <button 
              onClick={() => setActiveTab('selfcare')}
              className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'selfcare' ? 'text-purple-500' : 'text-gray-400'}`}
            >
              <Flower2 size={24} />
              <span className="text-xs mt-1">Self-Care</span>
            </button>
            <button 
              onClick={() => setActiveTab('communities')}
              className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'communities' ? 'text-purple-500' : 'text-gray-400'}`}
            >
              <Users size={24} />
              <span className="text-xs mt-1">Community</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;