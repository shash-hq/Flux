import React, { useState } from 'react';
import TechnologyChart from './TechnologyChart';

const ComparisonView = ({ technologies, onClose, analyzeTechnology }) => {
    const [tech1Query, setTech1Query] = useState('');
    const [tech2Query, setTech2Query] = useState('');
    const [tech1, setTech1] = useState(null);
    const [tech2, setTech2] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCompare = async () => {
        if (!tech1Query || !tech2Query) return;
        setLoading(true);

        // We assume analyzeTechnology updates the global list, but we need to find the items from the global list
        // OR we can pass a function that returns the tech object.
        // Actually, simpler: Use the analyzeTechnology function passed from parent to ensure they exist,
        // then find them in the 'technologies' prop. 
        // BUT we need to wait for them. 
        // Let's assume the parent handles the global state update.

        // We will trigger analysis for both.
        await analyzeTechnology(tech1Query);
        await analyzeTechnology(tech2Query);

        setLoading(false);
    };

    // Effect to sync local tech1/tech2 with the global 'technologies' list when it updates
    React.useEffect(() => {
        if (tech1Query) {
            const found = technologies.find(t => t.name.toLowerCase() === tech1Query.toLowerCase());
            if (found) setTech1(found);
        }
        if (tech2Query) {
            const found = technologies.find(t => t.name.toLowerCase() === tech2Query.toLowerCase());
            if (found) setTech2(found);
        }
    }, [technologies, tech1Query, tech2Query]);

    const getSentimentColor = (label) => {
        if (label === 'Positive') return 'text-green-500';
        if (label === 'Negative') return 'text-red-500';
        return 'text-neutral-500';
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-neutral-50 dark:bg-neutral-950">
                    <h2 className="text-2xl font-bold">Tech Comparison Arena ⚔️</h2>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Controls */}
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">Contender 1</label>
                        <input
                            type="text"
                            value={tech1Query}
                            onChange={(e) => setTech1Query(e.target.value)}
                            placeholder="e.g. React"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
                        />
                    </div>
                    <div className="pb-3 text-neutral-400 font-bold italic">VS</div>
                    <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">Contender 2</label>
                        <input
                            type="text"
                            value={tech2Query}
                            onChange={(e) => setTech2Query(e.target.value)}
                            placeholder="e.g. Svelte"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
                        />
                    </div>
                </div>

                {/* Action */}
                {(!tech1 || !tech2) && (
                    <div className="p-4 text-center">
                        <button
                            onClick={handleCompare}
                            disabled={loading || !tech1Query || !tech2Query}
                            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? 'Analyzing...' : 'FIGHT!'}
                        </button>
                    </div>
                )}

                {/* Results */}
                <div className="flex-grow overflow-y-auto p-6">
                    {tech1 && tech2 && !loading && (
                        <div className="space-y-8">
                            {/* Head to Head Table */}
                            <div className="grid grid-cols-3 text-center border rounded-2xl overflow-hidden border-neutral-200 dark:border-neutral-800">
                                {/* Headers */}
                                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-bold text-xl">{tech1.name}</div>
                                <div className="p-4 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-xs uppercase tracking-widest text-neutral-500 py-6">Metric</div>
                                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-bold text-xl">{tech2.name}</div>

                                {/* Hype Score */}
                                <div className={`p-4 flex items-center justify-center font-bold text-2xl ${tech1.hypeScore > tech2.hypeScore ? 'text-green-500 bg-green-50 dark:bg-green-900/10' : ''}`}>
                                    {tech1.hypeScore}
                                </div>
                                <div className="p-4 flex items-center justify-center text-sm text-neutral-500">Hype Score</div>
                                <div className={`p-4 flex items-center justify-center font-bold text-2xl ${tech2.hypeScore > tech1.hypeScore ? 'text-green-500 bg-green-50 dark:bg-green-900/10' : ''}`}>
                                    {tech2.hypeScore}
                                </div>

                                {/* Status */}
                                <div className="p-4 flex items-center justify-center border-t border-neutral-100 dark:border-neutral-800">
                                    {tech1.status}
                                </div>
                                <div className="p-4 flex items-center justify-center text-sm text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">Trend</div>
                                <div className="p-4 flex items-center justify-center border-t border-neutral-100 dark:border-neutral-800">
                                    {tech2.status}
                                </div>

                                {/* Sentiment */}
                                <div className={`p-4 flex items-center justify-center border-t border-neutral-100 dark:border-neutral-800 font-medium ${getSentimentColor(tech1.sentiment?.label)}`}>
                                    {tech1.sentiment?.label}
                                </div>
                                <div className="p-4 flex items-center justify-center text-sm text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">Sentiment</div>
                                <div className={`p-4 flex items-center justify-center border-t border-neutral-100 dark:border-neutral-800 font-medium ${getSentimentColor(tech2.sentiment?.label)}`}>
                                    {tech2.sentiment?.label}
                                </div>
                            </div>

                            {/* TODO: Multi-line chart could go here if we update TechnologyChart to accept multiple data sets. 
                        For now, side by side charts is easier.
                    */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComparisonView;
