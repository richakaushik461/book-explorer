import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const title = book.title || 'Untitled';
  const author = book.author_name?.[0] || 'Unknown author';
  const year = book.first_publish_year || '';
  const key = book.key;

  return (
    <Link
      to={`/book/${key.replace('/works/', '')}`}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-500/20 border border-transparent hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 p-4 flex flex-col group"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 aspect-[2/3]">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-4xl">
            📖
          </div>
        )}
        {/* Blue overlay on hover */}
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 rounded-lg" />
      </div>
      <div className="mt-3 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{author}</p>
        {year && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">{year}</p>
        )}
      </div>
    </Link>
  );
}