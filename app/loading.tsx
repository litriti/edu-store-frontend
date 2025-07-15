export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"></span>
        </div>
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
