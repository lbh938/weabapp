import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 pt-20">
        <main className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bienvenue
          </h1>
          <p className="text-gray-600 mb-4">
            Ceci est votre nouvelle application Next.js
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Commencer
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors">
              En savoir plus
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
