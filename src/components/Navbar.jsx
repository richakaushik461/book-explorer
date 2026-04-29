import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 shadow-lg shadow-blue-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 transition-colors group">
          <span className="text-2xl group-hover:scale-110 transition-transform">📚</span>
          <span>Book Explorer</span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://openlibrary.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-100 hover:text-white transition-colors"
          >
            Powered by Open Library
          </a>
        </div>
      </div>
    </nav>
  );
}