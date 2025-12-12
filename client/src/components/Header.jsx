import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

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

export const Header = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-10 dark:bg-neutral-900/80 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center dark:bg-white">
                        <span className="text-white font-bold text-sm dark:text-black">F</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Flux</h1>
                </Link>

                <div className="flex items-center gap-4">
                    <a href="https://github.com/shash-hq" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        <GithubIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/shash-hq/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#0077b5] transition-colors">
                        <LinkedInIcon />
                    </a>

                    <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-2"></div>

                    <button onClick={toggleDarkMode} className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>
            </div>
        </header>
    );
};
