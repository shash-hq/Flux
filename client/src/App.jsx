import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize Dark Mode
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        toast('Dark Mode Activated 🌙');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        toast('Light Mode Activated ☀️');
      }
      return newMode;
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans dark:bg-neutral-900 dark:text-neutral-100 flex flex-col transition-colors duration-200">
        <Toaster position="bottom-right" theme={isDarkMode ? 'dark' : 'light'} />

        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
