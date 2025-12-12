export const SkeletonCard = () => (
    <div className="p-4 rounded-xl border border-transparent bg-white dark:bg-neutral-800 animate-pulse">
        <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
            <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between">
            <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
            <div className="h-4 w-6 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
        </div>
    </div>
);
