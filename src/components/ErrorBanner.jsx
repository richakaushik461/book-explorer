export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="mt-8 p-8 rounded-2xl bg-red-50 dark:bg-red-900/20 text-center">
      <p className="text-2xl">⚠️</p>
      <p className="mt-3 text-red-700 dark:text-red-300 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}