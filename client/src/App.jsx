import { useState, useEffect } from 'react';
import { useTechnologies } from './hooks/useTechnologies';
import TechnologyChart from './components/TechnologyChart';

// Icons
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-3.36-4-3.11-4 0V19h-3v-9h3v1.5c1.39-2.58 7-2.77 7 2.47z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

function App() {
  const { data, loading, refreshData } = useTechnologies();
  const [selectedTech, setSelectedTech] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize Dark Mode based on system preference or storage
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const filteredData = data.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-select first item if nothing selected and data exists (only on initial load)
  useEffect(() => {
    if (!selectedTech && filteredData.length > 0 && searchTerm === '') {
      setSelectedTech(filteredData[0]);
    }
  }, [data, loading]); // Dependency on data load

  const currentTech = selectedTech
    ? data.find(t => t._id === selectedTech._id) || selectedTech
    : null;

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Booming': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'Fading': return 'text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'Stable': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'text-gray-500 bg-gray-50 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans dark:bg-neutral-900 dark:text-neutral-100 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 dark:bg-neutral-900 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center dark:bg-white">
              <span className="text-white font-bold text-sm dark:text-black">F</span>
            </div>
            {/* 1. Remove Interface */}
            <h1 className="text-xl font-bold tracking-tight">Flux</h1>
          </div>

          <div className="flex-1 max-w-md mx-8">
            {/* 2. Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search technology..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black/5 dark:bg-neutral-800 dark:border-neutral-700 dark:focus:ring-white/20 transition-all font-medium text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 4. Social Icons */}
            <a href="https://github.com/shash-hq" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#0077b5] transition-colors">
              <LinkedInIcon />
            </a>

            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-2"></div>

            {/* 5. Dark/Light Mode */}
            <button onClick={toggleDarkMode} className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={refreshData}
              disabled={loading}
              className={`ml-4 px-4 py-2 rounded-full text-sm font-medium transition-all ${loading
                  ? 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600'
                  : 'bg-black text-white hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                }`}
            >
              {loading ? 'Analyzing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">

          {/* List View */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-400">Monitored Tech</h2>
              <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full dark:bg-neutral-800">{filteredData.length}</span>
            </div>
            <div className="space-y-2">
              {filteredData.map((tech) => (
                <div
                  key={tech._id}
                  onClick={() => handleTechClick(tech)}
                  className={`group p-4 rounded-xl cursor-pointer border transition-all duration-200 ${currentTech && currentTech._id === tech._id
                      ? 'bg-white border-neutral-300 shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:border-neutral-600'
                      : 'bg-transparent border-transparent hover:bg-white hover:border-neutral-200 dark:hover:bg-neutral-800 dark:hover:border-neutral-700'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{tech.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(tech.status)}`}>
                      {tech.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <span>Score: {tech.hypeScore}</span>
                    <span className={tech.status === 'Booming' ? 'text-green-500' : 'text-neutral-300 dark:text-neutral-600'}>
                      {tech.status === 'Booming' ? '↗' : '→'}
                    </span>
                  </div>
                </div>
              ))}

              {filteredData.length === 0 && !loading && (
                <div className="p-4 text-center text-neutral-400 text-sm">
                  {searchTerm ? 'No matches found.' : 'Checking connection...'}
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="md:col-span-8 lg:col-span-9">
            {currentTech ? (
              <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm h-full flex flex-col dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="text-neutral-400 text-sm font-medium uppercase tracking-wider">Analysis Report</span>
                    <h2 className="text-4xl font-bold mt-1 mb-2">{currentTech.name}</h2>
                    <p className="text-neutral-500 max-w-lg dark:text-neutral-400">
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

                {/* Chart Area */}
                <div className="flex-grow bg-neutral-50 rounded-2xl p-6 border border-neutral-100 min-h-[400px] dark:bg-neutral-900 dark:border-neutral-700">
                  <TechnologyChart data={currentTech} color={isDarkMode ? '#fff' : '#000'} />
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-xl dark:bg-neutral-900 border border-transparent dark:border-neutral-700">
                    <div className="text-xs text-neutral-400 uppercase">Data Points</div>
                    <div className="text-xl font-semibold mt-1">{currentTech.history.length}</div >
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl dark:bg-neutral-900 border border-transparent dark:border-neutral-700">
                    <div className="text-xs text-neutral-400 uppercase">Last Update</div>
                    <div className="text-xl font-semibold mt-1">
                      {new Date(currentTech.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
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

      {/* 3. Footer with License */}
      <footer className="bg-black text-neutral-400 py-12 dark:bg-neutral-950 dark:border-t dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="font-bold text-white text-lg tracking-tight">Flux</span>
          </div>
          <p className="text-sm">
            © 2025 TechNiche Legal AI. All rights reserved.
          </p>
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
