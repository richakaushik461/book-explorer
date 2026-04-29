export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
        >
          <div className="rounded-lg bg-gray-200 dark:bg-gray-700 aspect-[2/3]" />
          <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="mt-2 h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}