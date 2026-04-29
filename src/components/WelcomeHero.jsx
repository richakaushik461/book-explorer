import { useState, useEffect } from 'react';

const rotatingQuotes = [
  { emoji: '📖', text: 'Your next favorite book is waiting...' },
  { emoji: '✨', text: 'Discover worlds between pages...' },
  { emoji: '🌙', text: 'Find your perfect reading mood...' },
  { emoji: '☕', text: 'Cozy up with a new story...' },
  { emoji: '🚀', text: 'Explore millions of stories...' },
];

export default function WelcomeHero() {
  const [currentEmoji, setCurrentEmoji] = useState(0);

  useEffect(() => {
    const totalQuotes = rotatingQuotes.length;
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % totalQuotes);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-16 md:py-24">
      {/* Animated Emoji */}
      <div className="text-7xl md:text-8xl mb-8 animate-bounce-in">
        {rotatingQuotes[currentEmoji].emoji}
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Let's Find Your
        </span>
        <br />
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Next Chapter
        </span>
      </h1>

      {/* Rotating Quote */}
      <div className="h-12 mb-6">
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 italic animate-fade-slide">
          {rotatingQuotes[currentEmoji].text}
        </p>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-300 dark:to-blue-600"></div>
        <div className="flex gap-1">
          {rotatingQuotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentEmoji(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentEmoji
                  ? 'bg-blue-500 w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-300 dark:to-blue-600"></div>
      </div>

      {/* Quick Stats */}
      <div className="flex justify-center gap-8 md:gap-12 mt-8">
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">20M+</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Books</p>
        </div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">13+</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Moods</p>
        </div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">∞</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Stories</p>
        </div>
      </div>
    </div>
  );
}