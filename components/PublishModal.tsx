
import React, { useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PublishModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [githubUser, setGithubUser] = useState('');
    const [repoName, setRepoName] = useState('realtor-poll');
    const [copyStatus, setCopyStatus] = useState(false);

    if (!isOpen) return null;

    const predictedUrl = githubUser && repoName
        ? `https://${githubUser.toLowerCase()}.github.io/${repoName.toLowerCase()}/`
        : 'https://username.github.io/realtor-poll/';

    const gitCommands = `git init
git add .
git commit -m "Initial Realtor Poll"
git branch -M main
git remote add origin https://github.com/${githubUser || 'YOUR_USER'}/${repoName}.git
git push -u origin main`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(gitCommands);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-900">
                    <div>
                        <h2 className="text-xl font-black text-white">GitHub Pages Deployment</h2>
                        <p className="text-sm text-gray-400 font-medium">Follow these steps to go live</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
                    {/* Step 1: Naming */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <label className="block text-[10px] font-black text-blue-900 uppercase tracking-widest mb-3">1. Setup Your Repository</label>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Your GitHub Username"
                                className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={githubUser}
                                onChange={(e) => setGithubUser(e.target.value)}
                            />
                            <p className="text-[11px] text-blue-700 italic">Create a new repo on GitHub first named &quot;{repoName}&quot;</p>
                        </div>
                    </div>

                    {/* Step 2: Terminal Commands */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">2. Run these commands in your folder</label>
                            <button
                                onClick={copyToClipboard}
                                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase"
                            >
                                {copyStatus ? 'Copied!' : 'Copy All'}
                            </button>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                            <pre className="text-green-400 font-mono text-xs leading-relaxed">
                                {gitCommands}
                            </pre>
                        </div>
                    </div>

                    {/* Step 3: Activation */}
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <label className="block text-[10px] font-black text-amber-900 uppercase tracking-widest mb-2">3. Final Step on GitHub.com</label>
                        <ul className="text-xs text-amber-800 space-y-1 list-disc pl-4">
                            <li>Go to <strong>Settings &gt; Pages</strong> in your repo</li>
                            <li>Set Source to <strong>&quot;Deploy from a branch&quot;</strong></li>
                            <li>Select <strong>main</strong> / (root) and click Save</li>
                        </ul>
                    </div>

                    {/* Result URL */}
                    <div className="border-t border-gray-100 pt-4 text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Your Live Facebook Link will be:</p>
                        <code className="text-blue-600 font-bold text-xs">{predictedUrl}</code>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-900 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg text-sm"
                    >
                        I&apos;ve pushed the code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublishModal;
