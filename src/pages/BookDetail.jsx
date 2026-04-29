import { useParams, Link } from 'react-router-dom';
import { useWorkDetail } from '../hooks/useWorkDetail';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBanner from '../components/ErrorBanner';

export default function BookDetail() {
  const { id } = useParams();
  const { work, loading, error } = useWorkDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          <LoadingSkeleton count={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          <ErrorBanner message={error} />
        </div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-6xl">📖</p>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">Book not found</h2>
          <Link to="/" className="mt-6 inline-block text-blue-600 hover:text-blue-700 transition-colors">
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  const coverId = work.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;
  const description =
    typeof work.description === 'string'
      ? work.description
      : work.description?.value || 'No description available.';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Apple-style Glass Container */}
      <div className="w-full max-w-3xl h-[85vh] 
        /* Glass effect */
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-2xl backdrop-saturate-150
        border border-white/20 dark:border-gray-700/30
        rounded-3xl
        shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20
        overflow-hidden
        flex flex-col"
      >
        {/* Header with back button */}
        <div className="flex-shrink-0 px-8 py-5 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all group"
          >
            <svg 
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to results</span>
          </Link>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="p-8 flex flex-col items-center">
            
            {/* Book Cover - Centered */}
            <div className="w-56 md:w-64 flex-shrink-0 mb-8">
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-blue-500/20 dark:shadow-blue-900/30 bg-gray-200 dark:bg-gray-700 aspect-[2/3] hover:shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-900/40 transition-shadow duration-300">
                {coverUrl ? (
                  <img 
                    src={coverUrl} 
                    alt={work.title} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-6xl">
                    📖
                  </div>
                )}
              </div>
            </div>

            {/* Book Info - Below Cover */}
            <div className="w-full flex flex-col items-center text-center">
              
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                {work.title}
              </h1>

              {/* Publish Date */}
              {work.first_publish_date && (
                <div className="mt-4 inline-flex items-center gap-2">
                  <div className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200">
                    📅 First published: {work.first_publish_date}
                  </div>
                </div>
              )}

              {/* Subjects */}
              {work.subjects && work.subjects.length > 0 && (
                <div className="mt-6 w-full">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Subjects
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {work.subjects.slice(0, 15).map((subject) => (
                      <span 
                        key={subject} 
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-default"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-8 w-full text-left">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Description
                </h3>
                <div className="space-y-4">
                  {description.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p 
                        key={index} 
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      >
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              </div>

              {/* Bottom spacing */}
              <div className="h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Blue Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin: 8px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 100px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.6);
        }
        
        /* Dark mode scrollbar */
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.3);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.6);
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
        }
      `}</style>
    </div>
  );
}