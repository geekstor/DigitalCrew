export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Kaizen AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI agents that discover operational inefficiencies and build custom solutions on-the-fly
        </p>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <p className="text-gray-700">
            Frontend is ready for UI design implementation.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Waiting for design specifications...
          </p>
        </div>
      </main>
    </div>
  );
}
