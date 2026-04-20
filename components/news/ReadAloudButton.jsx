'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Square, Loader, RotateCcw, Settings } from 'lucide-react';

const FREE_TTS_API = 'https://api.voicerss.org/';
const API_KEY = ''; // Register at voicerss.org for free API key

export default function ReadAloudButton({ content, title }) {
  const [status, setStatus] = useState('idle'); // idle, loading, playing, error
  const [speed, setSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  const stripHtml = (html) => {
    if (!html) return '';
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, ' & ')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const speakWithWebSpeech = useCallback((text) => {
    if (!window.speechSynthesis) return false;

    try {
      window.speechSynthesis.cancel();

      // For Bengali text without Bengali voice, we need to speak character by character
      // or accept imperfect pronunciation
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn';
      utterance.rate = speed * 0.8; // Adjust rate based on speed setting

      // Try to find any Bengali voice
      const voices = window.speechSynthesis.getVoices();
      const bengaliVoice = voices.find(v => v.lang === 'bn-BD') ||
                          voices.find(v => v.lang === 'bn-IN') ||
                          voices.find(v => v.lang.startsWith('bn'));

      if (bengaliVoice) {
        utterance.voice = bengaliVoice;
      } else {
        // No Bengali voice - use English voice but set lang to bn for attempt
        const fallbackVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (fallbackVoice) {
          utterance.voice = fallbackVoice;
        }
      }

      utterance.onstart = () => {
        isPlayingRef.current = true;
        setStatus('playing');
      };

      utterance.onend = () => {
        isPlayingRef.current = false;
        setStatus('idle');
      };

      utterance.onerror = (e) => {
        console.error('[ReadAloud] Speech error:', e.error);
        isPlayingRef.current = false;
        setStatus('error');
      };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.error('[ReadAloud] Exception:', e);
      return false;
    }
  }, [speed]);

  const handlePlay = useCallback(() => {
    // If currently playing, stop it
    if (status === 'playing' || isPlayingRef.current) {
      window.speechSynthesis?.cancel();
      isPlayingRef.current = false;
      setStatus('idle');
      return;
    }

    const text = stripHtml(content);

    if (!text || text.length < 2) {
      alert('কোনো পাঠ্য পাওয়া যায়নি');
      return;
    }

    // Limit text length for browser limits
    const maxLength = 6000;
    const textToSpeak = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

    setStatus('loading');

    // Small delay
    setTimeout(() => {
      const success = speakWithWebSpeech(textToSpeak);
      if (!success) {
        setStatus('error');
      }
    }, 100);
  }, [content, status, speakWithWebSpeech]);

  const handleStop = useCallback(() => {
    window.speechSynthesis?.cancel();
    isPlayingRef.current = false;
    setStatus('idle');
  }, []);

  const handleReplay = useCallback(() => {
    const text = stripHtml(content);
    if (text) {
      setStatus('loading');
      setTimeout(() => speakWithWebSpeech(text.substring(0, 6000)), 100);
    }
  }, [content, speakWithWebSpeech]);

  const toggleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* Speed indicator */}
      <div className="text-xs text-gray-400 mr-1 hidden sm:inline" title="Speaking speed">
        {speed}x
      </div>

      {/* Settings/Speed button */}
      <button
        onClick={toggleSpeed}
        className="group relative flex items-center justify-center w-7 h-7 rounded-full border border-slate-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary text-gray-400 hover:text-primary"
        title={`Speed: ${speed}x`}
      >
        <Settings className="w-3.5 h-3.5" />
      </button>

      {/* Main Play/Stop Button */}
      <button
        onClick={handlePlay}
        disabled={status === 'loading'}
        className={`
          relative flex items-center justify-center w-9 h-9 rounded-full border shadow-sm
          transition-all duration-300 hover:-translate-y-1
          ${status === 'playing'
            ? 'border-primary bg-red-50 text-primary'
            : status === 'loading'
            ? 'border-gray-300 bg-white text-gray-400'
            : 'border-slate-300 bg-white text-gray-500 hover:border-primary hover:text-primary'
          }
        `}
        title={status === 'playing' ? 'থামান' : 'শোনা শুরু করুন'}
      >
        {status === 'loading' ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {/* Stop Button - shown when playing */}
      {status === 'playing' && (
        <button
          onClick={handleStop}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-slate-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500 text-gray-500"
          title="পুরোপুরি থামান"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>
      )}

      {/* Error State - Replay Button */}
      {status === 'error' && (
        <button
          onClick={handleReplay}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-orange-300 bg-orange-50 shadow-sm transition-all duration-300 hover:-translate-y-1 text-orange-500"
          title="আবার চেষ্টা করুন"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

      {/* Info tooltip */}
      {status === 'idle' && (
        <span className="absolute -bottom-6 left-0 text-xs text-gray-400 whitespace-nowrap">
          {speed}x speed
        </span>
      )}
    </div>
  );
}