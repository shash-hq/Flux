export const Terms = () => {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
                <p>
                    By accessing Flux, you agree to these Terms of Service.
                </p>

                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/30 my-8">
                    <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">No Professional Advice</h2>
                    <p className="text-sm">
                        The forecasts, "Hype Scores," and trend data provided by Flux are for <strong>educational and informational purposes only</strong>.
                        They do not constitute financial, investment, or career advice. The software is provided "as-is" without warranties of any kind.
                    </p>
                </div>

                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mt-8">Usage License</h2>
                <p>
                    This project is open-source for educational review. You may not use this platform for any commercial predictive activities.
                </p>
            </div>
        </main>
    );
};
