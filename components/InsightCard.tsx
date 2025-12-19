
import React from 'react';
import { AIInsight } from '../types';

interface Props {
  insight: AIInsight | null;
  loading: boolean;
}

const InsightCard: React.FC<Props> = ({ insight, loading }) => {
  if (!insight && !loading) return null;

  const handleShare = () => {
    const url = window.location.href;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent("Check out this AI strategy for Realtors!")}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="mt-8 bg-white border-2 border-indigo-500 rounded-2xl shadow-xl overflow-hidden animate-slide-up">
      <div className="bg-indigo-600 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95V4.69l3.393.463a1 1 0 01.866.985v10.512a1 1 0 01-1.482.876l-3.37-1.894-3.37 1.894a1 1 0 01-1.482-.876V7.138a1 1 0 01.866-.985l3.393-.463V1.997a1 1 0 01.897-.95zM12 5.69l-1.173-.16a1 1 0 00-1.254 1.254l.16 1.173L12 5.69z" clipRule="evenodd" />
          </svg>
          <span className="text-white font-bold text-sm tracking-widest uppercase">Your Custom AI Fix</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-indigo-200 text-[10px] font-medium uppercase">Powered by</span>
          <span className="text-white text-xs font-black">Gemini 3</span>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-900 font-bold animate-pulse">Analyzing bottleneck & generating strategy...</p>
            <p className="text-gray-400 text-sm mt-2">Accessing Real Estate Market Intelligence</p>
          </div>
        ) : insight ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-gray-900 leading-tight mb-3">
                {insight.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-indigo-200 pl-4">
                "{insight.suggestion}"
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
              <h4 className="text-indigo-900 font-bold text-sm uppercase tracking-wider mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011-1V4z" />
                </svg>
                The Implementation Path
              </h4>
              <p className="text-indigo-800 text-base font-medium">
                {insight.toolReference}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <button className="bg-gray-900 hover:bg-black text-white font-bold py-4 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2">
                <span className="text-sm">Strategy Call</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button 
                onClick={handleShare}
                className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-4 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm">Share on FB</span>
              </button>
            </div>
            <p className="text-center text-gray-400 text-[10px] italic">
              Strategy generated based on current real estate market trends.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InsightCard;
