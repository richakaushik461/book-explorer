import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useBookSearch } from '../hooks/useBookSearch';
import BookCard from '../components/BookCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBanner from '../components/ErrorBanner';
import EmptyState from '../components/EmptyState';
import WelcomeHero from '../components/WelcomeHero';
import MoodSelector, { moodList } from '../components/MoodSelector';

export default function Home() {
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [activeMood, setActiveMood] = useState('All');

  const debouncedTerm = useDebounce(term, 400);

  const selectedMoodObj = moodList.find((m) => m.label === activeMood);
  const moodQuery = selectedMoodObj?.query || '';
  const combinedQuery = moodQuery
    ? debouncedTerm
      ? `(${debouncedTerm}) AND ${moodQuery}`
      : moodQuery
    : debouncedTerm;

  const { data, loading, error, hasSearched } = useBookSearch(combinedQuery, page);

  const books = data?.docs ?? [];
  const totalResults = data?.numFound ?? 0;
  const totalPages = Math.ceil(totalResults / 20);

  const updateTerm = (newTerm) => {
    setTerm(newTerm);
    setPage(1);
  };

  const selectMood = (label) => {
    setActiveMood(label);
    setPage(1);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Bar + Mood Dropdown Side by Side */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={term}
            onChange={(e) => updateTerm(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full h-full pl-12 pr-12 py-4 rounded-2xl
              /* Glass effect */
              bg-white/70 dark:bg-gray-800/70
              backdrop-blur-xl backdrop-saturate-150
              border border-white/20 dark:border-gray-700/30
              shadow-lg shadow-black/5 dark:shadow-black/20
              /* Focus */
              focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30
              outline-none
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              transition-all duration-300"
            autoFocus
          />
          {/* Clear button */}
          {term && (
            <button
              onClick={() => updateTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mood Dropdown - Side by Side */}
        <div className="sm:w-56">
          <MoodSelector active={activeMood} onSelect={selectMood} />
        </div>
      </div>

      {/* States */}
      {!hasSearched && !loading && <WelcomeHero />}

      {loading && <LoadingSkeleton count={8} />}

      {error && !loading && (
        <ErrorBanner message={error} onRetry={() => updateTerm(term)} />
      )}

      {hasSearched && !loading && !error && books.length === 0 && (
        <EmptyState query={combinedQuery || term} />
      )}

      {hasSearched && !loading && !error && books.length > 0 && (
        <>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Showing {books.length} of {totalResults.toLocaleString()} results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}