import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-black text-neutral-400 py-12 dark:bg-neutral-950 dark:border-t dark:border-neutral-800 mt-auto">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="mb-4">
                    <span className="font-bold text-white text-lg tracking-tight">Flux</span>
                </div>
                <p className="text-sm">
                    © 2025 Flux. All rights reserved.
                </p>
                <div className="mt-6 flex justify-center gap-6 text-sm">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
};
