export default function EmptyState({ query }) {
  return (
    <div className="mt-16 text-center">
      <p className="text-6xl">📚</p>
      <h3 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No books found for "{query}"
      </h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Try a different title, author, or mood.
      </p>
    </div>
  );
}