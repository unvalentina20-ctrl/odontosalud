import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { X, Send, Bot, User, Sparkles, Calendar, ShieldAlert, RefreshCw } from 'lucide-react';

interface DentalChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

const SUGGESTED_QUESTIONS = [
  "¿Qué hacer si tengo un dolor agudo de muelas?",
  "¿Cuánto cuesta la ortodoncia invisible Invisalign?",
  "¿Atienden con Obras Sociales o Prepagas?",
  "¿Cómo es el proceso de blanqueamiento LED?",
  "¿Ofrecen cuotas sin interés para implantes?"
];

export const DentalChatDrawer: React.FC<DentalChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  onOpenEmergency
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '¡Hola! Soy OdontoBot, el asistente virtual de OdontoSalud. ¿En qué puedo ayudarte hoy? Puedes hacerme cualquier consulta sobre tratamientos, precios o recomendaciones de salud bucal.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map(m => ({ role: m.sender, content: m.text }))
        })
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Disculpa, tuve una breve interrupción. Puedes llamarnos telefónicamente o agendar tu cita directa.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fallback: data.fallback
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error('Chat error:', e);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'Hola. Disculpa la interrupción de señal. Nuestro equipo de recepcionistas está disponible para responderte. ¿Deseas agendar una cita directamente?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fallback: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-sky-800 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold font-serif">OdontoBot IA</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-teal-100">Asistente Dental OdontoSalud</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gradient-to-tr from-cyan-600 to-sky-600 text-white shadow-2xs'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 font-medium ${
                    msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium p-2 bg-white rounded-xl border border-slate-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 text-teal-600 animate-spin" />
              <span>OdontoBot está redactando respuesta...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="p-3 bg-white border-t border-slate-200/80 overflow-x-auto whitespace-nowrap space-x-2 no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Sugerencias rápidas:
          </span>
          <div className="flex items-center gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={loading}
                className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 border border-slate-200 text-[11px] font-semibold rounded-lg shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu consulta dental..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct actions */}
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <button
              onClick={() => { onClose(); onOpenBooking(); }}
              className="text-teal-700 font-bold hover:underline flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar Cita</span>
            </button>

            <button
              onClick={() => { onClose(); onOpenEmergency(); }}
              className="text-rose-600 font-bold hover:underline flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Urgencias 24/7</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
