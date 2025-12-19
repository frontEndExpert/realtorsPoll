
import React from 'react';
import { PollOption } from '../types';

interface Props {
  option: PollOption;
  totalVotes: number;
  isSelected: boolean;
  hasVoted: boolean;
  onSelect: (id: PollOption['id']) => void;
}

const PollOptionItem: React.FC<Props> = ({ option, totalVotes, isSelected, hasVoted, onSelect }) => {
  const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

  return (
    <div 
      onClick={() => !hasVoted && onSelect(option.id)}
      className={`relative group cursor-pointer border rounded-xl overflow-hidden transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      } ${hasVoted ? 'cursor-default' : ''}`}
    >
      {/* Progress Bar Background */}
      {hasVoted && (
        <div 
          className="absolute left-0 top-0 bottom-0 bg-blue-100 transition-all duration-700 ease-out z-0"
          style={{ width: `${percentage}%` }}
        />
      )}

      <div className="relative z-10 px-5 py-5 flex items-center justify-between">
        <div className="flex items-start space-x-4">
          <div className={`mt-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            isSelected ? 'border-blue-500' : 'border-gray-300 group-hover:border-gray-400'
          }`}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-blue-500" />}
          </div>
          <div>
            <span className="block font-bold text-gray-900 text-xl leading-tight">
              {option.id}) {option.label}
            </span>
            <span className="block text-lg text-gray-700 mt-1.5 leading-relaxed">
              {option.description}
            </span>
          </div>
        </div>
        
        {hasVoted && (
          <div className="text-right pl-6 flex-shrink-0">
            <span className="text-xl font-black text-blue-700">{percentage}%</span>
            <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">{option.votes} votes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollOptionItem;
