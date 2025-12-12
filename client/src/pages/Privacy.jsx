export const Privacy = () => {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
                <p>
                    This is a student project and a demonstration of <strong>Advanced Web Development</strong>.
                    Any data shown is aggregated from public sources (such as NewsAPI) for educational analysis.
                </p>

                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mt-8">Data Collection & Use</h2>
                <p>
                    We do not sell personal data. Flux is a demonstration platform and does not actively collect user data for commercial purposes.
                </p>

                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mt-8">Cookies</h2>
                <p>
                    Cookies are used strictly for session management and local preferences (such as Dark Mode).
                </p>
            </div>
        </main>
    );
};
