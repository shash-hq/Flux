import { toast } from 'sonner';

export const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        console.log('Form Submission:', data);

        // Show success badge
        toast.success("Message Sent! Thank you for reaching out.");

        // Reset form
        e.target.reset();
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 w-full flex-grow">
            <h1 className="text-3xl font-bold mb-12 text-center">Get in Touch</h1>

            <div className="space-y-12">
                {/* Section A: About */}
                <section className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">About Me</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                        Hi, I'm Shashank. I am a Computer Science student and Full-Stack Developer passionate about building intelligent web systems.
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                        I built Flux as part of my advanced Node.js coursework to explore the intersection of automated data gathering and predictive analytics.
                        My focus lies in the MERN stack (MongoDB, Express, React, Node.js), Data Structures, and building scalable architectures.
                        I am always looking for challenging engineering problems to solve.
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Whether you have feedback on this project's architecture or want to discuss a potential collaboration, feel free to reach out.
                    </p>
                </section>

                {/* Section B: Connect */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="mailto:shashank1.hq@gmail.com"
                        className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors flex items-center justify-center gap-2 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-500 group-hover:text-black dark:group-hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span className="font-medium text-sm">shashank1.hq@gmail.com</span>
                    </a>

                    <div className="flex gap-4">
                        <a href="https://github.com/shash-hq" target="_blank" rel="noopener noreferrer" className="flex-1 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors flex items-center justify-center">
                            <span className="sr-only">GitHub</span>
                            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/shash-hq/" target="_blank" rel="noopener noreferrer" className="flex-1 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#0077b5] transition-colors flex items-center justify-center">
                            <span className="sr-only">LinkedIn</span>
                            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-3.36-4-3.11-4 0V19h-3v-9h3v1.5c1.39-2.58 7-2.77 7 2.47z" /></svg>
                        </a>
                    </div>
                </section>

                {/* Section C: Contact Form */}
                <section>
                    <h2 className="text-xl font-bold mb-4">Send Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-500 mb-1">Name</label>
                                <input id="name" name="name" type="text" required className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-500 mb-1">Email</label>
                                <input id="email" name="email" type="email" required className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-neutral-500 mb-1">Message</label>
                            <textarea id="message" name="message" rows="4" required className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"></textarea>
                        </div>
                        <button type="submit" className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-80 transition-opacity">
                            Send Message
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};
