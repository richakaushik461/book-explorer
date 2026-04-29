import { useState, useRef, useEffect } from 'react';

export const moodList = [
  { label: 'All', query: '' },
  { label: '🧘 Calm', query: 'philosophy OR meditation OR mindfulness' },
  { label: '😂 Humor', query: 'humor OR comedy' },
  { label: '💘 Romance', query: 'romance' },
  { label: '🕵️ Mystery', query: 'mystery OR detective' },
  { label: '🚀 Sci-Fi', query: 'science fiction' },
  { label: '🏰 Fantasy', query: 'fantasy' },
  { label: '📚 Classics', query: 'classic literature' },
  { label: '🎭 Drama', query: 'drama' },
  { label: '👻 Horror', query: 'horror' },
  { label: '✨ Inspiration', query: 'self-help OR inspirational' },
  { label: '🌍 History', query: 'history' },
  { label: '🔬 Science', query: 'science' },
];

export default function MoodSelector({ active, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeMood = moodList.find((m) => m.label === active) || moodList[0];

  return (
    <div className="relative h-full" ref={dropdownRef}>
      {/* Dropdown Button - Full Height */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex items-center justify-between gap-2 px-5 py-4
          /* Glass effect */
          bg-white/70 dark:bg-gray-800/70
          backdrop-blur-xl backdrop-saturate-150
          border border-white/20 dark:border-gray-700/30
          rounded-2xl
          shadow-lg shadow-black/5 dark:shadow-black/20
          text-gray-700 dark:text-gray-200
          hover:border-blue-500/50 hover:shadow-blue-500/10
          transition-all duration-200
          font-medium text-sm"
      >
        <span className="truncate">{activeMood.label}</span>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full min-w-[200px] right-0
          /* Glass effect */
          bg-white/95 dark:bg-gray-800/95
          backdrop-blur-2xl backdrop-saturate-150
          border border-white/20 dark:border-gray-700/30
          rounded-2xl
          shadow-2xl shadow-black/10 dark:shadow-black/30
          overflow-hidden
          z-50
          animate-fadeIn"
        >
          <div className="py-2 max-h-64 overflow-y-auto custom-scrollbar">
            {moodList.map((mood) => (
              <button
                key={mood.label}
                onClick={() => {
                  onSelect(mood.label, mood.query);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-sm transition-all duration-150 flex items-center gap-3
                  ${
                    active === mood.label
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium border-l-2 border-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 hover:text-blue-500 dark:hover:text-blue-400 border-l-2 border-transparent'
                  }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}