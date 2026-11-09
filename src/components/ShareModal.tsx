/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Share2, MessageCircle, Send, Mail } from 'lucide-react';
import { ONWARD_SHARE_URL } from '../data';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  daysLabel: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, daysLabel }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const shareText = `I completed Ready, set, prepare: outages by the British Red Cross with a coping capacity of ${daysLabel} of a 3-day outage. Test how ready your home is for power, water, and communication cuts: ${ONWARD_SHARE_URL}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(ONWARD_SHARE_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-zinc-200 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-950 hover:text-black w-11 h-11 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
          type="button"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-zinc-950" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#C51D18] flex items-center justify-center mb-3 border-2 border-red-200">
          <Share2 className="w-6 h-6 text-[#C51D18]" />
        </div>

        <h3 className="font-display font-black text-xl text-zinc-950 leading-tight mb-1">
          Share Resilience Tracker
        </h3>
        <p className="text-xs text-zinc-950 font-semibold leading-relaxed mb-4">
          Encourage friends, family, and neighbours to test their household resilience against prolonged power and water disruptions.
        </p>

        {/* Link Copy Box */}
        <div className="p-3 bg-zinc-50 border-2 border-zinc-300 rounded-xl mb-4 flex items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-zinc-950 truncate flex-1">
            {ONWARD_SHARE_URL}
          </span>
          <button
            onClick={handleCopy}
            className="min-h-[44px] px-3.5 py-2 bg-zinc-950 hover:bg-black text-white rounded-lg text-xs font-black flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
            type="button"
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Share Buttons */}
        <div className="space-y-2.5">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5b24]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ONWARD_SHARE_URL)}&quote=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-3 px-4 bg-[#1877F2] hover:bg-[#1565cc] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2]"
          >
            <span>Share on Facebook</span>
          </a>

          <a
            href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-3 px-4 bg-[#0A66C2] hover:bg-[#084e96] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
          >
            <span>Share on LinkedIn</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Our household has prepared for ${daysLabel} of a 3-day outage on the @BritishRedCross Resilience Tracker! Check your home: ${ONWARD_SHARE_URL}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-3 px-4 bg-zinc-950 hover:bg-black text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <Send className="w-4 h-4" />
            <span>Share on X / Twitter</span>
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent('Check your household preparedness for power cuts')}&body=${encodeURIComponent(
              `Hi,\n\nI just tested our household on the British Red Cross Outages Resilience Tracker and we are prepared for ${daysLabel} of a 3-day outage.\n\nIt takes 2 minutes and helps you prepare for power and water cuts without spending lots of money:\n${ONWARD_SHARE_URL}\n\nStay safe!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-3 px-4 bg-white hover:bg-zinc-50 border-2 border-zinc-400 text-zinc-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
          >
            <Mail className="w-4 h-4" />
            <span>Share via Email</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
