/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, MessageSquareHeart, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-xs">
      {/* Top red accent line */}
      <div className="h-1 bg-[#EE2A24] w-full" />
      
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Approved British Red Cross Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center text-left hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18] rounded-lg p-1.5 -ml-1.5 min-h-[44px] min-w-[44px]"
          type="button"
          aria-label="British Red Cross - Return to Profile"
        >
          <img
            src="/assets/aistudio/image_f99f54f6.png"
            alt="British Red Cross"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </button>

        {/* Right side: survey button + user avatar (WCAG AAA 44px min targets) */}
        <div className="flex items-center gap-2">
          <a
            href="https://forms.cloud.microsoft/e/M2BG66Kzr6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-full bg-red-50 hover:bg-red-100 border-2 border-[#B3100B] text-[#B3100B] font-black text-xs transition-colors shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
            aria-label="Give feedback on Microsoft Forms (opens in new tab)"
            title="Complete our short survey"
          >
            <MessageSquareHeart className="w-4 h-4 text-[#B3100B]" />
            <span>Survey</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#B3100B]" />
          </a>

          <div 
            className="w-11 h-11 rounded-full bg-zinc-100 border-2 border-zinc-300 flex items-center justify-center text-zinc-950"
            title="Household Profile Active"
            aria-label="Household Profile Active"
          >
            <User className="w-5 h-5 text-zinc-950" />
          </div>
        </div>
      </div>
    </header>
  );
};
