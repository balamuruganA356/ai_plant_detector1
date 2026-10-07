import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Trash2, 
  Sparkles, 
  User, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  Leaf
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { translations } from '../data/translations';
import { api } from '../services/api';

interface AssistantPageProps {
  language: Language;
  initialQuery?: string | null;
}

export const AssistantPage: React.FC<AssistantPageProps> = ({ language, initialQuery }) => {
  const t = translations[language].assistant;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: language === 'ta'
        ? 'வணக்கம்! நான் உங்கள் அக்ரோவிஷன் AI விவசாய உதவியாளர். பயிர் நோய்கள், இயற்கை உரம், நீர்ப்பாசனம் மற்றும் பூச்சி மேலாண்மை குறித்த உங்கள் கேள்விகளை என்னிடம் கேட்கலாம்.'
        : 'Hello! I am your AgroVision AI Agronomic Assistant. How can I assist you with your crops, leaf health, or organic remedies today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: translations[language].assistant.suggestions.slice(0, 3)
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: m.text }],
      }));

      const res = await api.chatWithAssistant(prompt, historyPayload, language);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: res.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: res.suggestions,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: language === 'ta'
          ? 'மன்னிக்கவும், தகவலைப் பெறுவதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
          : 'Unable to connect to the agronomy server. Please check your network and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setActiveSpeechId(null);
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'assistant',
        text: language === 'ta'
          ? 'அரட்டை அழிக்கப்பட்டது. பயிர் பாதுகாப்பு குறித்து உங்கள் புதிய கேள்வியைக் கேளுங்கள்.'
          : 'Chat history cleared. What crop question would you like to explore next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: translations[language].assistant.suggestions.slice(0, 3)
      }
    ]);
  };

  const handleSpeakText = (msgId: string, text: string) => {
    if (!window.speechSynthesis) return;

    if (activeSpeechId === msgId) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="py-6 sm:py-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              {t.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.clearChat}</span>
        </button>
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div className="glass-card rounded-3xl h-[540px] flex flex-col overflow-hidden shadow-xl">
        
        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                    isUser
                      ? 'bg-stone-800 dark:bg-stone-700'
                      : 'bg-emerald-700 dark:bg-emerald-600 shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-emerald-700 text-white rounded-tr-xs shadow-md shadow-emerald-900/20'
                        : 'glass-panel-subtle text-stone-900 dark:text-white rounded-tl-xs whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Metadata & Audio Action */}
                  <div
                    className={`flex items-center gap-2 text-[10px] text-stone-500 dark:text-stone-400 px-1 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSpeakText(msg.id, msg.text)}
                        className="hover:text-stone-700 dark:hover:text-emerald-300 transition-colors"
                        title="Read answer aloud"
                      >
                        {activeSpeechId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Contextual Suggestions Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(sug)}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-50/80 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 mr-auto max-w-[85%] items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl glass-panel-subtle text-stone-500 rounded-tl-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT PROMPT BOX */}
        <div className="p-3 bg-stone-100/60 dark:bg-stone-950/70 border-t border-stone-200/60 dark:border-emerald-500/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={t.placeholder}
              disabled={isTyping}
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl glass-input text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* QUICK SUGGESTIONS BOTTOM BAR */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-600 dark:text-emerald-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{t.suggestedQueriesTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {t.suggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item)}
              className="px-3.5 py-1.5 rounded-xl glass-card-interactive text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white text-xs font-medium transition-colors text-left"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
