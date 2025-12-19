
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PollOptionItem from './components/PollOptionItem';
import InsightCard from './components/InsightCard';
import { PollState, PollChoiceId, AIInsight } from './types';
import { getPollInsight } from './services/geminiService';

const INITIAL_OPTIONS = [
  { id: 'A', label: 'Time Drain', description: 'Spending too many hours manually texting/calling.', votes: 42 },
  { id: 'B', label: 'Lost Leads', description: 'They go cold because follow-up isn\'t instant or consistent.', votes: 58 },
  { id: 'C', label: 'Bad Fit', description: 'Wasting time on unqualified leads who aren\'t serious.', votes: 31 },
  { id: 'D', label: 'System Success', description: 'I\'ve got this handled – My system works well.', votes: 12 },
] as const;

const App: React.FC = () => {
  const [poll, setPoll] = useState<PollState>({
    options: [...INITIAL_OPTIONS],
    totalVotes: INITIAL_OPTIONS.reduce((acc, curr) => acc + curr.votes, 0),
    selectedOption: null,
  });
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const handleVote = useCallback(async (choiceId: PollChoiceId) => {
    if (poll.selectedOption) return;

    const selectedOption = poll.options.find(o => o.id === choiceId);
    if (!selectedOption) return;

    setPoll(prev => ({
      ...prev,
      selectedOption: choiceId,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map(opt =>
        opt.id === choiceId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }));

    if (choiceId !== 'D') {
      setLoadingInsight(true);
      try {
        const result = await getPollInsight(choiceId, selectedOption.label);
        setInsight(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingInsight(false);
      }
    }
  }, [poll]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-8">
        {/* Poll Container - Clean version without Facebook preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Poll Content */}
          <div className="px-6 py-6 text-gray-800 text-[15px] leading-relaxed">
            <p className="font-medium mb-2">Realtors, quick poll on lead management:</p>
            <p className="font-bold text-xl mb-4 text-gray-900">What's your #1 bottleneck in turning leads into appointments?</p>
          </div>

          {/* Interactive Poll */}
          <div className="px-6 pb-6 space-y-3">
            {poll.options.map(option => (
              <PollOptionItem
                key={option.id}
                option={option}
                totalVotes={poll.totalVotes}
                isSelected={poll.selectedOption === option.id}
                hasVoted={poll.selectedOption !== null}
                onSelect={handleVote}
              />
            ))}
          </div>

          {/* Vote Count Footer */}
          <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100">
            <div className="flex -space-x-1 overflow-hidden">
              {[1, 2, 3].map(i => (
                <img
                  key={i}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src={`https://picsum.photos/seed/${i + 10}/24/24`}
                  alt=""
                />
              ))}
              <span className="pl-3 text-xs text-gray-500 font-medium self-center">
                {poll.totalVotes.toLocaleString()} people voted
              </span>
            </div>
          </div>
        </div>

        {/* How it Works / Education Section */}
        {!poll.selectedOption && (
          <div className="mt-6 bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">How this works</p>
              <p className="text-xs text-blue-800/80 leading-relaxed mt-1">
                Once you select your bottleneck, our **market-trained Gemini AI** will analyze your specific challenge and provide an instant, 3-step action plan to increase your appointment rate.
              </p>
            </div>
          </div>
        )}

        {/* AI Insight Section */}
        <InsightCard insight={insight} loading={loadingInsight} />

        {/* Informational Section */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">Interactive Lead Magnet Builder</p>
          <div className="flex justify-center space-x-4 mt-2 text-[10px] uppercase tracking-widest font-bold">
            <span className="hover:text-gray-600 cursor-pointer">Built with Gemini AI</span>
            <span className="hover:text-gray-600 cursor-pointer text-gray-300">•</span>
            <span className="hover:text-gray-600 cursor-pointer">Real Estate ROI Tool</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
