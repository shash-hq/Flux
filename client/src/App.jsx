import { useState } from 'react';
import { useTechnologies } from './hooks/useTechnologies';
import TechnologyChart from './components/TechnologyChart';

function App() {
  const { data, loading, refreshData } = useTechnologies();
  const [selectedTech, setSelectedTech] = useState(null);

  if (!selectedTech && data.length > 0) {
    setSelectedTech(data[0]);
  }

  const currentTech = selectedTech
    ? data.find(t => t._id === selectedTech._id) || selectedTech
    : null;

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Booming': return 'text-green-600 bg-green-50';
      case 'Fading': return 'text-red-500 bg-red-50';
      case 'Stable': return 'text-blue-500 bg-blue-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Flux Interface</h1>
          </div>
          <button
            onClick={refreshData}
            disabled={loading}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${loading
              ? 'bg-neutral-100 text-neutral-400'
              : 'bg-black text-white hover:bg-neutral-800 active:scale-95'
              }`}
          >
            {loading ? 'Analyzing...' : 'Refresh Intelligence'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Monitored Tech</h2>
            <div className="space-y-2">
              {data.map((tech) => (
                <div
                  key={tech._id}
                  onClick={() => handleTechClick(tech)}
                  className={`group p-4 rounded-xl cursor-pointer border transition-all duration-200 ${currentTech && currentTech._id === tech._id
                    ? 'bg-white border-neutral-300 shadow-sm ring-1 ring-black/5'
                    : 'bg-transparent border-transparent hover:bg-white hover:border-neutral-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{tech.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(tech.status)}`}>
                      {tech.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm text-neutral-500">
                    <span>Score: {tech.hypeScore}</span>
                    <span className={tech.status === 'Booming' ? 'text-green-500' : 'text-neutral-300'}>
                      {tech.status === 'Booming' ? '↗' : '→'}
                    </span>
                  </div>
                </div>
              ))}
              {data.length === 0 && !loading && (
                <div className="p-4 text-center text-neutral-400 text-sm">
                  Checking connection...
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            {currentTech ? (
              <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="text-neutral-400 text-sm font-medium uppercase tracking-wider">Analysis Report</span>
                    <h2 className="text-4xl font-bold mt-1 mb-2">{currentTech.name}</h2>
                    <p className="text-neutral-500 max-w-lg">
                      Tracking trends and market sentiment.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-light tracking-tighter">
                      {currentTech.hypeScore}
                    </div>
                    <div className={`mt-2 text-sm font-medium px-3 py-1 inline-block rounded-full ${getStatusColor(currentTech.status)}`}>
                      {currentTech.status.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="flex-grow bg-neutral-50 rounded-2xl p-6 border border-neutral-100 min-h-[400px]">
                  <TechnologyChart data={currentTech} />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-neutral-400">
                Select a technology to view analysis
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
