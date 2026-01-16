import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, BookOpen, Flower2, Users, Send, Moon, Wind, Brain, TrendingUp, AlertCircle, Loader2, ArrowLeft, Play, Pause, Sun, Activity, Settings, X, Watch, Info } from 'lucide-react';

const HealTechApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('user');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [tempName, setTempName] = useState('');
  const [tempAge, setTempAge] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [journalEntries, setJournalEntries] = useState([
    { id: 1, date: '2026-01-12', mood: 'calm', entry: 'Had a good day, felt peaceful after meditation.', aiAnalysis: 'Positive coping through mindfulness' },
    { id: 2, date: '2026-01-11', mood: 'anxious', entry: 'Worried about upcoming exams.', aiAnalysis: 'Academic stress, needs support' }
  ]);
  const [currentJournalEntry, setCurrentJournalEntry] = useState('');
  const [currentJournalMood, setCurrentJournalMood] = useState('');
  const [moodScore] = useState(65);
  const [todayMood, setTodayMood] = useState('');
  const [showMoodMessage, setShowMoodMessage] = useState(false);
  const [userProgress, setUserProgress] = useState({
    level: 3,
    points: 450,
    streak: 5,
    treeStage: 3,
    achievements: ['first_chat', 'week_streak', 'journal_master']
  });
  
  const [selectedBreathingExercise, setSelectedBreathingExercise] = useState(null);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [selectedSleepStory, setSelectedSleepStory] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (userName && chatMessages.length === 0) {
      setChatMessages([
        { role: 'assistant', content: `Hi ${userName}! I'm here to listen and support you. How are you feeling today? Feel free to share anything that's on your mind.` }
      ]);
    }
  }, [userName, chatMessages.length]);

  const handleSetUserName = () => {
    if (tempName.trim() && tempAge.trim()) {
      setUserName(tempName.trim());
      setUserAge(tempAge.trim());
      setShowNameInput(false);
    } else {
      alert('Please enter both your name and age');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim().toLowerCase();
    const newMessages = [...chatMessages, { role: 'user', content: inputMessage.trim() }];
    setChatMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    setUserProgress(prev => ({
      ...prev,
      points: prev.points + 10
    }));

    // Simulate AI thinking delay
    setTimeout(() => {
      let aiResponse = '';

      // Smart keyword-based responses
      if (userMessage.includes('anxious') || userMessage.includes('anxiety') || userMessage.includes('worried') || userMessage.includes('nervous')) {
        const anxietyResponses = [
          `I hear you, ${userName}. Anxiety can feel really overwhelming. What's been triggering these feelings lately?`,
          `${userName}, it's completely valid to feel anxious. Have you tried any of our breathing exercises? They can help calm your nervous system.`,
          `I'm here for you, ${userName}. Anxiety is tough, but you're not alone. What specific situations make you feel most anxious?`,
          `That sounds really hard, ${userName}. Many people your age experience anxiety. Would you like to talk about what's worrying you most?`
        ];
        aiResponse = anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
      } 
      else if (userMessage.includes('exam') || userMessage.includes('test') || userMessage.includes('study') || userMessage.includes('school')) {
        const studyResponses = [
          `Exam stress is so real, ${userName}. Have you tried breaking your study sessions into 25-minute chunks? It can make things feel less overwhelming.`,
          `I understand, ${userName}. Academic pressure affects so many students. What subject is stressing you out the most?`,
          `${userName}, school stress is valid and you're not alone in feeling this way. Are you getting enough breaks while studying?`,
          `That's a lot of pressure, ${userName}. Remember, your worth isn't defined by grades. How are you taking care of yourself during this time?`
        ];
        aiResponse = studyResponses[Math.floor(Math.random() * studyResponses.length)];
      }
      else if (userMessage.includes('sad') || userMessage.includes('depressed') || userMessage.includes('down') || userMessage.includes('unhappy')) {
        const sadResponses = [
          `I'm really sorry you're feeling this way, ${userName}. 💙 Your feelings are completely valid. How long have you been feeling down?`,
          `${userName}, it's okay to feel sad. Sometimes just acknowledging these feelings is an important first step. Do you want to talk about what's happening?`,
          `I hear you, ${userName}. Sadness can feel heavy. Have you been able to talk to anyone you trust about how you're feeling?`,
          `Thank you for sharing that with me, ${userName}. You're brave for opening up. What usually helps you feel a bit better when you're down?`
        ];
        aiResponse = sadResponses[Math.floor(Math.random() * sadResponses.length)];
      }
      else if (userMessage.includes('sleep') || userMessage.includes('insomnia') || userMessage.includes('tired') || userMessage.includes('exhausted')) {
        const sleepResponses = [
          `Sleep issues can make everything harder, ${userName}. 😴 Have you checked out our sleep stories? They might help you relax before bed.`,
          `I understand, ${userName}. Good sleep is so important for mental health. What's your bedtime routine like?`,
          `That sounds exhausting, ${userName}. Try avoiding screens an hour before bed - the blue light can mess with your sleep cycle.`,
          `${userName}, poor sleep and mental health are really connected. Our meditation section has some great bedtime relaxation exercises!`
        ];
        aiResponse = sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
      }
      else if (userMessage.includes('lonely') || userMessage.includes('alone') || userMessage.includes('isolated') || userMessage.includes('friends')) {
        const lonelyResponses = [
          `Feeling lonely is really tough, ${userName}. You're not alone in feeling this way. Have you explored our communities? There are others who understand.`,
          `I hear you, ${userName}. Social connection is so important. Our communities feature has people going through similar experiences - you might find support there.`,
          `${userName}, loneliness is painful, but reaching out like you're doing now is a great step. Would joining a support community help?`,
          `That must be really hard, ${userName}. Remember, feeling lonely doesn't mean something is wrong with you. Many people feel this way.`
        ];
        aiResponse = lonelyResponses[Math.floor(Math.random() * lonelyResponses.length)];
      }
      else if (userMessage.includes('stress') || userMessage.includes('overwhelmed') || userMessage.includes('pressure')) {
        const stressResponses = [
          `Stress can feel so heavy, ${userName}. What's the biggest thing weighing on you right now?`,
          `I understand, ${userName}. When everything feels overwhelming, sometimes we need to focus on just one small thing at a time. What's one thing you could do today to help yourself?`,
          `${userName}, it sounds like you're carrying a lot. Have you tried our breathing exercises? Even 5 minutes can help reduce stress.`,
          `That's a lot to handle, ${userName}. Remember to be kind to yourself - you're doing the best you can.`
        ];
        aiResponse = stressResponses[Math.floor(Math.random() * stressResponses.length)];
      }
      else if (userMessage.includes('thank') || userMessage.includes('thanks') || userMessage.includes('helped')) {
        const thanksResponses = [
          `I'm glad I could help, ${userName}! 💜 Remember, I'm here whenever you need to talk.`,
          `You're so welcome, ${userName}. Taking care of your mental health is really important - I'm proud of you for reaching out!`,
          `Anytime, ${userName}! You're taking great steps by using this app and being open about your feelings.`,
          `I'm here for you, ${userName}. Keep up the self-care - you deserve support! 🌟`
        ];
        aiResponse = thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
      }
      else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey')) {
        const greetingResponses = [
          `Hey ${userName}! 👋 How are you feeling today? I'm here to listen.`,
          `Hi ${userName}! It's good to hear from you. What's on your mind?`,
          `Hello ${userName}! I'm glad you're here. How can I support you today?`,
          `Hey there, ${userName}! How's your day going? Feel free to share anything.`
        ];
        aiResponse = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
      }
      else if (userMessage.includes('help') || userMessage.includes('what can you do')) {
        aiResponse = `I'm here to listen and support you, ${userName}! You can talk to me about anything - stress, anxiety, school, relationships, or just how you're feeling. I can also suggest coping strategies and remind you about our self-care tools. What would help you most right now?`;
      }
      else {
        // Generic supportive responses for anything else
        const genericResponses = [
          `I hear you, ${userName}. Can you tell me more about that? I'm here to listen.`,
          `Thank you for sharing that with me, ${userName}. How are you feeling about this situation?`,
          `That sounds important to you, ${userName}. What's been on your mind about this?`,
          `I'm listening, ${userName}. Your feelings and experiences matter. What else would you like to share?`,
          `${userName}, I appreciate you opening up. How long have you been feeling this way?`,
          `It takes courage to talk about these things, ${userName}. What kind of support do you think would help?`
        ];
        aiResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }

      setChatMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 1500); // Realistic AI thinking delay
  };

  const handleSaveJournal = async () => {
    if (!currentJournalEntry.trim() || !currentJournalMood) {
      alert('Please select a mood and write an entry');
      return;
    }

    const entry = currentJournalEntry.toLowerCase();
    let aiAnalysis = '';

    // Smart analysis based on mood and keywords
    if (currentJournalMood === 'anxious') {
      if (entry.includes('exam') || entry.includes('test') || entry.includes('school')) {
        aiAnalysis = 'Academic stress detected. Student is experiencing test anxiety. Recommend stress management techniques and study break reminders.';
      } else if (entry.includes('social') || entry.includes('friends') || entry.includes('people')) {
        aiAnalysis = 'Social anxiety present. May benefit from gradual exposure therapy and communication skills support.';
      } else if (entry.includes('sleep') || entry.includes('night')) {
        aiAnalysis = 'Sleep-related anxiety noted. Recommend bedtime routine optimization and relaxation exercises before bed.';
      } else {
        aiAnalysis = 'Generalized anxiety symptoms. User would benefit from breathing exercises and mindfulness practices. Monitor for escalation.';
      }
    } 
    else if (currentJournalMood === 'sad') {
      if (entry.includes('lonely') || entry.includes('alone') || entry.includes('isolated')) {
        aiAnalysis = 'Feelings of isolation and loneliness. Recommend community engagement and peer support groups. Consider therapist check-in.';
      } else if (entry.includes('tired') || entry.includes('exhausted') || entry.includes('energy')) {
        aiAnalysis = 'Low energy and possible depression symptoms. Monitor for persistent sadness. Encourage physical activity and sleep hygiene.';
      } else {
        aiAnalysis = 'Mild depressive symptoms noted. User is processing emotions through journaling (positive sign). Continue monitoring mood patterns.';
      }
    }
    else if (currentJournalMood === 'calm') {
      if (entry.includes('meditation') || entry.includes('breathing') || entry.includes('exercise')) {
        aiAnalysis = 'Excellent self-care practices! User is actively using coping strategies. Positive mental health trajectory - encourage continuation.';
      } else {
        aiAnalysis = 'Stable emotional state. User demonstrating good emotional regulation. Continue current wellness practices.';
      }
    }
    else if (currentJournalMood === 'happy') {
      aiAnalysis = 'Positive mood and emotional wellness. Celebrating wins is important for mental health. Encourage gratitude practices.';
    }
    else {
      aiAnalysis = 'Emotional state noted. User is actively engaging with mental health through journaling. Continue supportive monitoring.';
    }

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      mood: currentJournalMood,
      entry: currentJournalEntry,
      aiAnalysis: aiAnalysis
    };

    setJournalEntries([newEntry, ...journalEntries]);
    
    setUserProgress(prev => ({
      ...prev,
      points: prev.points + 25
    }));

    setCurrentJournalEntry('');
    setCurrentJournalMood('');
    alert('Journal entry saved! 🎉');
  };

  const handleMoodSelection = (mood) => {
    setTodayMood(mood);
    setShowMoodMessage(true);
    setUserProgress(prev => ({
      ...prev,
      points: prev.points + 5
    }));
  };

  const breathingExercises = [
    {
      id: 1,
      name: '4-7-8 Breathing',
      description: 'Calm anxiety and reduce stress',
      duration: '5 minutes',
      steps: [
        'Breathe in quietly through your nose for 4 seconds',
        'Hold your breath for 7 seconds',
        'Exhale completely through your mouth for 8 seconds',
        'Repeat this cycle 4 times'
      ],
      benefits: 'Reduces anxiety, helps with sleep, lowers blood pressure'
    },
    {
      id: 2,
      name: 'Box Breathing',
      description: 'Used by Navy SEALs for focus',
      duration: '4 minutes',
      steps: [
        'Breathe in for 4 counts',
        'Hold for 4 counts',
        'Breathe out for 4 counts',
        'Hold for 4 counts',
        'Repeat'
      ],
      benefits: 'Improves focus, reduces stress, enhances performance'
    },
    {
      id: 3,
      name: 'Belly Breathing',
      description: 'Deep diaphragmatic breathing',
      duration: '6 minutes',
      steps: [
        'Place one hand on your chest, one on your belly',
        'Breathe in deeply through your nose, feeling your belly rise',
        'Breathe out slowly through your mouth',
        'Focus on the movement of your belly'
      ],
      benefits: 'Activates relaxation response, reduces tension'
    }
  ];

  const meditations = [
    { id: 1, name: 'Morning Mindfulness', description: 'Start your day with clarity', duration: '10 minutes', type: 'Guided', script: 'Close your eyes and take a deep breath. Feel the morning energy...', benefits: 'Increases focus, positive mindset' },
    { id: 2, name: 'Body Scan Relaxation', description: 'Release tension', duration: '15 minutes', type: 'Progressive', script: 'Lie down comfortably. We will scan through your body...', benefits: 'Deep relaxation, better sleep' },
    { id: 3, name: 'Loving-Kindness', description: 'Self-compassion', duration: '12 minutes', type: 'Heart-Centered', script: 'Bring to mind someone you love...', benefits: 'Self-compassion, reduces self-criticism' },
    { id: 4, name: 'Breath Awareness', description: 'Simple focus', duration: '8 minutes', type: 'Mindfulness', script: 'Simply notice your breath...', benefits: 'Calms mind, improves concentration' }
  ];

  const sleepStories = [
    { id: 1, name: 'The Peaceful Forest', description: 'Walk through enchanted woods', duration: '20 minutes', preview: 'Imagine yourself walking through a serene forest at twilight...', narrator: 'Soft female voice' },
    { id: 2, name: 'Ocean Waves at Night', description: 'Sound of the sea', duration: '25 minutes', preview: 'You are lying on a warm beach under the stars...', narrator: 'Calm male voice' },
    { id: 3, name: 'Mountain Cabin', description: 'Cozy evening', duration: '18 minutes', preview: 'You are in a warm cabin, snow falling softly outside...', narrator: 'Soothing voice' },
    { id: 4, name: 'Stargazing Journey', description: 'Explore the cosmos', duration: '22 minutes', preview: 'Look up at the infinite night sky...', narrator: 'Gentle voice' }
  ];

  const communities = [
    { id: 1, name: 'Anxiety Support', members: 1247, description: 'A safe space to discuss anxiety', fullDescription: 'Judgment-free zone where young people share experiences with anxiety disorders, panic attacks, and stress.', location: 'Mumbai, Maharashtra', meetups: 'Every Saturday 4 PM IST', moderators: 3, activities: ['Weekly check-ins', 'Breathing exercises', 'Journaling challenges'] },
    { id: 2, name: 'Study Stress', members: 892, description: 'Academic pressure and coping', fullDescription: 'For students dealing with exam stress and academic pressure.', location: 'Delhi NCR', meetups: 'Weekdays 6 PM IST', moderators: 2, activities: ['Study groups', 'Stress workshops', 'Exam prep'] },
    { id: 3, name: 'Self-Love Journey', members: 2103, description: 'Building confidence', fullDescription: 'Focused on self-acceptance and building genuine self-esteem.', location: 'Bangalore, Karnataka', meetups: 'Sundays 11 AM IST', moderators: 5, activities: ['Affirmation circles', 'Self-care challenges', 'Confidence exercises'] },
    { id: 4, name: 'Sleep Better', members: 756, description: 'Healthy sleep habits', fullDescription: 'For those struggling with insomnia and irregular sleep.', location: 'Pune, Maharashtra', meetups: 'Wednesdays 8 PM IST', moderators: 2, activities: ['Sleep tracking', 'Bedtime routines', 'Sleep meditations'] }
  ];

  const patients = [
    { id: 1, name: 'Alex M.', age: 17, risk: 'high', lastActive: '2 hours ago', moodTrend: 'declining', recentJournal: 'Feeling overwhelmed', mentalHealthSummary: 'Increased anxiety and academic stress. Shows signs of social withdrawal. Recommend immediate intervention.' },
    { id: 2, name: 'Sam K.', age: 16, risk: 'high', lastActive: '1 day ago', moodTrend: 'stable', recentJournal: 'Sleep and anxiety issues', mentalHealthSummary: 'Persistent sleep disturbances. Shows good engagement with app features. Monitor closely.' },
    { id: 3, name: 'Jordan L.', age: 18, risk: 'medium', lastActive: '3 hours ago', moodTrend: 'improving', recentJournal: 'Therapy helping', mentalHealthSummary: 'Positive progress with therapy. Mood trend improving. Continue current treatment.' },
    { id: 4, name: 'Casey P.', age: 15, risk: 'medium', lastActive: '5 hours ago', moodTrend: 'stable', recentJournal: 'School stress manageable', mentalHealthSummary: 'Managing school stress adequately. Uses journaling effectively. Stable mood patterns.' },
    { id: 5, name: 'Riley T.', age: 17, risk: 'low', lastActive: '1 hour ago', moodTrend: 'improving', recentJournal: 'Meditation working!', mentalHealthSummary: 'Excellent progress and self-management. Consistently uses wellness features.' }
  ];

  const getMoodMessage = (mood) => {
    const messages = {
      great: `That's wonderful, ${userName}! 🎉 Keep that positive energy flowing!`,
      okay: `I'm glad you're doing okay, ${userName}. 😊 Remember, okay days are valid too.`,
      low: `I'm sorry you're feeling low, ${userName}. 💙 I'm here to listen.`,
      anxious: `I hear you, ${userName}. 🫂 Let's work through this together.`
    };
    return messages[mood] || '';
  };

  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';

  if (showNameInput) {
    return (
      <div className={`h-screen ${bgClass} flex items-center justify-center p-6`}>
        <div className={`${cardBgClass} rounded-2xl p-8 max-w-md w-full border-2 ${borderClass} shadow-lg`}>
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
              <Heart className="text-white" size={48} />
            </div>
          </div>
          <h1 className={`text-3xl font-bold text-center mb-2 ${textClass}`}>Welcome to HealTech</h1>
          <p className={`text-center mb-6 ${textSecondaryClass}`}>Your mental health companion</p>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${textClass}`}>What's your name?</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSetUserName()}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 border-2 ${borderClass} rounded-xl focus:outline-none focus:border-purple-400 ${inputBgClass} ${textClass}`}
                autoFocus
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${textClass}`}>How old are you?</label>
              <input
                type="number"
                value={tempAge}
                onChange={(e) => setTempAge(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSetUserName()}
                placeholder="Enter your age"
                min="13"
                max="25"
                className={`w-full px-4 py-3 border-2 ${borderClass} rounded-xl focus:outline-none focus:border-purple-400 ${inputBgClass} ${textClass}`}
              />
            </div>
            <button
              onClick={handleSetUserName}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition font-medium"
            >
              Get Started
            </button>
          </div>

          <div className={`mt-6 p-4 ${isDarkMode ? 'bg-blue-900 bg-opacity-30 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border`}>
            <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              🔒 Your privacy matters. HealTech is designed for youth ages 13-25.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
    const progressToNext = ((userProgress.points % 200) / 200) * 100;

    return (
      <div className={`${cardBgClass} rounded-2xl p-6 border-2 ${isDarkMode ? 'border-green-700' : 'border-green-200'}`}>
        <h3 className={`font-semibold mb-4 ${textClass}`}>Your Growth Journey</h3>
        <div className={`bg-gradient-to-br ${currentStage.color} rounded-xl p-8 mb-4 flex flex-col items-center justify-center`}>
          <div className="text-7xl mb-3">{currentStage.emoji}</div>
          <p className="text-white font-bold text-lg">{currentStage.name}</p>
          <p className="text-white text-sm opacity-90">Level {userProgress.level}</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className={textSecondaryClass}>Progress</span>
              <span className={textSecondaryClass}>{userProgress.points} pts</span>
            </div>
            <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{userProgress.streak}</p>
              <p className={`text-xs ${textSecondaryClass}`}>Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{userProgress.achievements.length}</p>
              <p className={`text-xs ${textSecondaryClass}`}>Badges</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{userProgress.level}</p>
              <p className={`text-xs ${textSecondaryClass}`}>Level</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
        <p className="opacity-90">How are you feeling today?</p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <button onClick={() => handleMoodSelection('great')} className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😊 Great</button>
          <button onClick={() => handleMoodSelection('okay')} className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😌 Okay</button>
          <button onClick={() => handleMoodSelection('low')} className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😔 Low</button>
          <button onClick={() => handleMoodSelection('anxious')} className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg hover:bg-opacity-30 transition">😰 Anxious</button>
        </div>
      </div>

      {showMoodMessage && (
        <div className={`${isDarkMode ? 'bg-blue-900 bg-opacity-30 border-blue-700' : 'bg-blue-50 border-blue-200'} border-2 rounded-xl p-4`}>
          <p className={`${textClass} mb-3`}>{getMoodMessage(todayMood)}</p>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('chat')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm">Chat with AI</button>
            <button onClick={() => setShowMoodMessage(false)} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ${textClass} px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm`}>Later</button>
          </div>
        </div>
      )}

      {renderGrowthTree()}

      <div className="grid grid-cols-2 gap-4">
        <div className={`${isDarkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} rounded-xl p-4`}>
          <Activity className="text-blue-500 mb-2" size={24} />
          <p className={`text-sm ${textSecondaryClass}`}>Mood Score</p>
          <p className="text-2xl font-bold text-blue-600">{moodScore}%</p>
        </div>
        <div className={`${isDarkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-50'} rounded-xl p-4`}>
          <TrendingUp className="text-green-500 mb-2" size={24} />
          <p className={`text-sm ${textSecondaryClass}`}>Streak</p>
          <p className="text-2xl font-bold text-green-600">{userProgress.streak} days</p>
        </div>
      </div>

      <div>
        <h3 className={`font-semibold mb-3 ${textClass}`}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setActiveTab('chat')} className={`${cardBgClass} border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 transition`}>
            <MessageCircle className="text-purple-500 mx-auto mb-2" size={28} />
            <span className={`text-sm font-medium ${textClass}`}>Talk to AI</span>
          </button>
          <button onClick={() => setActiveTab('journal')} className={`${cardBgClass} border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition`}>
            <BookOpen className="text-blue-500 mx-auto mb-2" size={28} />
            <span className={`text-sm font-medium ${textClass}`}>Journal</span>
          </button>
          <button onClick={() => setActiveTab('selfcare')} className={`${cardBgClass} border-2 border-green-200 rounded-xl p-4 hover:border-green-400 transition`}>
            <Flower2 className="text-green-500 mx-auto mb-2" size={28} />
            <span className={`text-sm font-medium ${textClass}`}>Self-Care</span>
          </button>
          <button onClick={() => setActiveTab('communities')} className={`${cardBgClass} border-2 border-pink-200 rounded-xl p-4 hover:border-pink-400 transition`}>
            <Users className="text-pink-500 mx-auto mb-2" size={28} />
            <span className={`text-sm font-medium ${textClass}`}>Communities</span>
          </button>
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
        <p className="text-sm opacity-90">Safe, confidential</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-purple-500 text-white rounded-br-none' 
                : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} ${textClass} rounded-bl-none`
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} px-4 py-3 rounded-2xl flex items-center gap-2`}>
              <Loader2 className="animate-spin text-purple-500" size={16} />
              <span className={textSecondaryClass}>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 ${cardBgClass} border-t-2 ${borderClass}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="Share what's on your mind..."
            disabled={isLoading}
            className={`flex-1 px-4 py-3 border-2 ${borderClass} rounded-xl focus:outline-none focus:border-purple-400 ${inputBgClass} ${textClass}`}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-600 transition disabled:bg-purple-300"
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
        <p className="opacity-90">Express yourself, {userName}</p>
      </div>

      <div className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4`}>
        <p className={`text-sm ${textSecondaryClass} mb-2`}>How are you feeling?</p>
        <div className="flex gap-2 mb-4 flex-wrap">
          <button onClick={() => setCurrentJournalMood('happy')} className={`px-3 py-2 rounded-lg ${currentJournalMood === 'happy' ? 'bg-green-200 text-green-800' : 'bg-green-100 text-green-700'}`}>😊 Happy</button>
          <button onClick={() => setCurrentJournalMood('calm')} className={`px-3 py-2 rounded-lg ${currentJournalMood === 'calm' ? 'bg-blue-200 text-blue-800' : 'bg-blue-100 text-blue-700'}`}>😌 Calm</button>
          <button onClick={() => setCurrentJournalMood('anxious')} className={`px-3 py-2 rounded-lg ${currentJournalMood === 'anxious' ? 'bg-yellow-200 text-yellow-800' : 'bg-yellow-100 text-yellow-700'}`}>😰 Anxious</button>
          <button onClick={() => setCurrentJournalMood('sad')} className={`px-3 py-2 rounded-lg ${currentJournalMood === 'sad' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700'}`}>😔 Sad</button>
        </div>
        <textarea 
          value={currentJournalEntry}
          onChange={(e) => setCurrentJournalEntry(e.target.value)}
          placeholder="Write about your day..."
          className={`w-full h-32 p-3 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-blue-400 resize-none ${inputBgClass} ${textClass}`}
        />
        <button onClick={handleSaveJournal} className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Save Entry
        </button>
      </div>

      <div>
        <h3 className={`font-semibold mb-3 ${textClass}`}>Recent Entries</h3>
        {journalEntries.map((entry) => (
          <div key={entry.id} className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4 mb-3`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${textSecondaryClass}`}>{entry.date}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${entry.mood === 'calm' || entry.mood === 'happy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {entry.mood}
              </span>
            </div>
            <p className={`${textClass} mb-2`}>{entry.entry}</p>
            <div className={`${isDarkMode ? 'bg-purple-900 bg-opacity-30 border-purple-700' : 'bg-purple-50 border-purple-400'} border-l-4 p-2 mt-2`}>
              <p className={`text-xs font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'} mb-1`}>AI Analysis:</p>
              <p className={`text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{entry.aiAnalysis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelfCare = () => {
    if (selectedBreathingExercise) {
      return (
        <div className="p-6 space-y-4">
          <button onClick={() => setSelectedBreathingExercise(null)} className={`flex items-center gap-2 ${textSecondaryClass}`}>
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{selectedBreathingExercise.name}</h2>
            <p className="opacity-90">{selectedBreathingExercise.description}</p>
          </div>
          <div className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4`}>
            <h3 className={`font-semibold mb-3 ${textClass}`}>Steps:</h3>
            <ol className="space-y-3">
              {selectedBreathingExercise.steps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">{idx + 1}</span>
                  <span className={textClass}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <button onClick={() => { setUserProgress(prev => ({ ...prev, points: prev.points + 15 })); alert('Great job! +15 points 🎉'); }} className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition font-medium">
            Start Exercise
          </button>
        </div>
      );
    }

    if (selectedMeditation) {
      return (
        <div className="p-6 space-y-4">
          <button onClick={() => setSelectedMeditation(null)} className={`flex items-center gap-2 ${textSecondaryClass}`}>
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{selectedMeditation.name}</h2>
            <p className="opacity-90">{selectedMeditation.description}</p>
            <p className="text-sm mt-2">{selectedMeditation.duration} • {selectedMeditation.type}</p>
          </div>
          <div className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4`}>
            <h3 className={`font-semibold mb-2 ${textClass}`}>Script:</h3>
            <p className={`${textClass} italic`}>{selectedMeditation.script}</p>
          </div>
          <button onClick={() => { setUserProgress(prev => ({ ...prev, points: prev.points + 15 })); setIsPlaying(!isPlaying); }} className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition font-medium flex items-center justify-center gap-2">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Start'}
          </button>
        </div>
      );
    }

    if (selectedSleepStory) {
      return (
        <div className="p-6 space-y-4">
          <button onClick={() => setSelectedSleepStory(null)} className={`flex items-center gap-2 ${textSecondaryClass}`}>
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{selectedSleepStory.name}</h2>
            <p className="opacity-90">{selectedSleepStory.description}</p>
            <p className="text-sm mt-2">{selectedSleepStory.duration}</p>
          </div>
          <div className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4`}>
            <p className={`${textClass} italic`}>{selectedSleepStory.preview}</p>
          </div>
          <button onClick={() => { setUserProgress(prev => ({ ...prev, points: prev.points + 15 })); setIsPlaying(!isPlaying); }} className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Self-Care</h2>
          <p className="opacity-90">Take time for yourself, {userName}</p>
        </div>

        <div>
          <h3 className={`font-semibold mb-3 ${textClass}`}>Breathing Exercises</h3>
          {breathingExercises.map(ex => (
            <div key={ex.id} onClick={() => setSelectedBreathingExercise(ex)} className={`${cardBgClass} rounded-xl border-2 border-green-200 p-4 mb-3 cursor-pointer hover:border-green-400 transition`}>
              <div className="flex items-center gap-3">
                <Wind className="text-green-500" size={32} />
                <div>
                  <p className={`font-medium ${textClass}`}>{ex.name}</p>
                  <p className={`text-sm ${textSecondaryClass}`}>{ex.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className={`font-semibold mb-3 ${textClass}`}>Meditation</h3>
          {meditations.map(med => (
            <div key={med.id} onClick={() => setSelectedMeditation(med)} className={`${cardBgClass} rounded-xl border-2 border-purple-200 p-4 mb-3 cursor-pointer hover:border-purple-400 transition`}>
              <div className="flex items-center gap-3">
                <Brain className="text-purple-500" size={32} />
                <div>
                  <p className={`font-medium ${textClass}`}>{med.name}</p>
                  <p className={`text-sm ${textSecondaryClass}`}>{med.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className={`font-semibold mb-3 ${textClass}`}>Sleep Stories</h3>
          {sleepStories.map(story => (
            <div key={story.id} onClick={() => setSelectedSleepStory(story)} className={`${cardBgClass} rounded-xl border-2 border-blue-200 p-4 mb-3 cursor-pointer hover:border-blue-400 transition`}>
              <div className="flex items-center gap-3">
                <Moon className="text-blue-500" size={32} />
                <div>
                  <p className={`font-medium ${textClass}`}>{story.name}</p>
                  <p className={`text-sm ${textSecondaryClass}`}>{story.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCommunities = () => {
    if (selectedCommunity) {
      return (
        <div className="p-6 space-y-4">
          <button onClick={() => setSelectedCommunity(null)} className={`flex items-center gap-2 ${textSecondaryClass}`}>
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{selectedCommunity.name}</h2>
            <p className="opacity-90">{selectedCommunity.description}</p>
          </div>
          <div className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4`}>
            <h3 className={`font-semibold mb-2 ${textClass}`}>About</h3>
            <p className={textClass}>{selectedCommunity.fullDescription}</p>
          </div>
          <div className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4`}>
            <h3 className={`font-semibold mb-2 ${textClass}`}>Details</h3>
            <p className={textSecondaryClass}>📍 {selectedCommunity.location}</p>
            <p className={textSecondaryClass}>📅 {selectedCommunity.meetups}</p>
            <p className={textSecondaryClass}>👥 {selectedCommunity.moderators} moderators</p>
          </div>
          <button onClick={() => { setUserProgress(prev => ({ ...prev, points: prev.points + 20 })); alert('Welcome! +20 points 🎉'); }} className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition font-medium">
            Join Community
          </button>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Communities</h2>
          <p className="opacity-90">Connect with peers</p>
        </div>

        {communities.map(comm => (
          <div key={comm.id} onClick={() => setSelectedCommunity(comm)} className={`${cardBgClass} rounded-xl border-2 ${borderClass} p-4 mb-3 cursor-pointer hover:border-pink-400 transition`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`font-semibold ${textClass}`}>{comm.name}</p>
                <p className={`text-sm ${textSecondaryClass} mt-1`}>{comm.description}</p>
                <p className={`text-xs ${textSecondaryClass} mt-2`}>📍 {comm.location} • 👥 {comm.members} members</p>
              </div>
              <Users className="text-pink-500" size={24} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTherapistDashboard = () => (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Therapist Dashboard</h2>
        <p className="opacity-90">Dr. Sarah Thompson - 24 patients</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
          <p className="text-sm text-gray-600">High Risk</p>
          <p className="text-2xl font-bold text-red-600">2</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
          <p className="text-sm text-gray-600">Medium</p>
          <p className="text-2xl font-bold text-yellow-600">7</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
          <p className="text-sm text-gray-600">Low Risk</p>
          <p className="text-2xl font-bold text-green-600">15</p>
        </div>
      </div>

      <div>
        <h3 className={`font-semibold mb-3 ${textClass}`}>Patients</h3>
        {patients.map(patient => (
          <div key={patient.id} className={`${cardBgClass} rounded-xl border-2 p-4 mb-3 ${patient.risk === 'high' ? 'border-red-300' : patient.risk === 'medium' ? 'border-yellow-300' : 'border-green-300'}`}>
            <div className="flex justify-between mb-2">
              <div>
                <p className={`font-semibold ${textClass}`}>{patient.name}, {patient.age}</p>
                <p className={`text-sm ${textSecondaryClass}`}>{patient.lastActive}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${patient.risk === 'high' ? 'bg-red-100 text-red-700' : patient.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {patient.risk.toUpperCase()}
                </span>
              </div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded p-2 mb-2`}>
              <p className={`text-xs ${textSecondaryClass} mb-1`}>Recent:</p>
              <p className={`text-sm ${textClass} italic`}>"{patient.recentJournal}"</p>
            </div>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Mental Health Summary:</p>
              <p className="text-sm text-indigo-600">{patient.mentalHealthSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`h-screen ${bgClass} flex flex-col max-w-md mx-auto`}>
      <div className={`${cardBgClass} border-b-2 ${borderClass} p-4 flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <Heart className="text-purple-500" size={28} />
          <h1 className={`text-xl font-bold ${textClass}`}>HealTech</h1>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg transition ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            {isDarkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-600" size={20} />}
          </button>
          <button onClick={() => setUserRole(userRole === 'user' ? 'therapist' : 'user')} className={`text-sm px-3 py-1 rounded-lg transition ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${textClass}`}>
            {userRole === 'user' ? '👤 User' : '👨‍⚕️ Therapist'}
          </button>
        </div>
      </div>

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

      {userRole === 'user' && (
        <div className={`${cardBgClass} border-t-2 ${borderClass} p-2`}>
          <div className="flex justify-around">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-purple-500' : textSecondaryClass}`}>
              <Heart size={24} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center p-2 ${activeTab === 'chat' ? 'text-purple-500' : textSecondaryClass}`}>
              <MessageCircle size={24} />
              <span className="text-xs mt-1">Chat</span>
            </button>
            <button onClick={() => setActiveTab('journal')} className={`flex flex-col items-center p-2 ${activeTab === 'journal' ? 'text-purple-500' : textSecondaryClass}`}>
              <BookOpen size={24} />
              <span className="text-xs mt-1">Journal</span>
            </button>
            <button onClick={() => setActiveTab('selfcare')} className={`flex flex-col items-center p-2 ${activeTab === 'selfcare' ? 'text-purple-500' : textSecondaryClass}`}>
              <Flower2 size={24} />
              <span className="text-xs mt-1">Self-Care</span>
            </button>
            <button onClick={() => setActiveTab('communities')} className={`flex flex-col items-center p-2 ${activeTab === 'communities' ? 'text-purple-500' : textSecondaryClass}`}>
              <Users size={24} />
              <span className="text-xs mt-1">Community</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealTechApp;