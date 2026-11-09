/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Droplet,
  Info,
  ShieldAlert,
  Clock,
  RotateCcw
} from 'lucide-react';
import { HouseholdProfile, OutageCategory } from '../types';
import { getActiveTrackerItems, DAY_NARRATIVES, CATEGORY_METADATA } from '../data';

interface DaySimulationProps {
  day: 1 | 2 | 3;
  householdProfile: HouseholdProfile;
  checkedItemIds: string[];
  onToggleItem: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

export const DaySimulation: React.FC<DaySimulationProps> = ({
  day,
  householdProfile,
  checkedItemIds,
  onToggleItem,
  onNext,
  onPrev,
  onReset
}) => {
  const narrative = DAY_NARRATIVES[day];
  // Filter items dynamically: if user profile does not require PSR, it is omitted
  const activeItems = getActiveTrackerItems(householdProfile);
  const dayItems = activeItems.filter(item => item.day === day);
  const checkedInDayCount = dayItems.filter(item => checkedItemIds.includes(item.id)).length;

  // Ensure page strictly starts at the top for every day/scenario transition
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    const frameId = requestAnimationFrame(scrollToTop);
    const timer = setTimeout(scrollToTop, 25);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [day]);

  // Track expanded "Why it matters" items
  const [expandedWhy, setExpandedWhy] = useState<Record<string, boolean>>({});

  const toggleWhy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedWhy(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrevClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    onPrev();
  };

  const handleNextClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    onNext();
  };

  // Group items by category in sequence
  const categoriesInDay = Array.from(new Set(dayItems.map(i => i.category))) as OutageCategory[];

  const dayTotalLitres = householdProfile.size * 6; // 2L x 3 days

  return (
    <div className="flex flex-col pb-28 max-w-md mx-auto px-4 pt-2">
      {/* Top Navigation & Day Progress with Reset Option - WCAG AAA 44px min targets */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <button
          onClick={handlePrevClick}
          className="text-xs font-black text-zinc-950 hover:text-[#C51D18] flex items-center gap-1 cursor-pointer min-h-[44px] min-w-[44px] py-2 px-2.5 rounded-lg hover:bg-white border-2 border-transparent hover:border-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
          type="button"
          aria-label={day === 1 ? 'Go back to Profile' : `Go back to Day ${day - 1}`}
        >
          <ArrowLeft className="w-4 h-4 text-zinc-950" />
          <span>{day === 1 ? 'Profile' : `Day ${day - 1}`}</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-black text-zinc-950 uppercase tracking-wider bg-white px-3 py-2 rounded-lg border-2 border-zinc-300 min-h-[44px] shadow-2xs">
          <span>Day {day} of 3</span>
          <span className="text-zinc-400">•</span>
          <span className="text-[#B3100B]">{checkedInDayCount}/{dayItems.length} ready</span>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-black text-zinc-950 hover:text-[#C51D18] flex items-center gap-1 cursor-pointer min-h-[44px] py-2 px-3 rounded-lg bg-white hover:bg-zinc-100 border-2 border-zinc-300 hover:border-zinc-400 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
          type="button"
          title="Reset assessment and start over"
          aria-label="Reset assessment and start over"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-950" />
          <span>Reset</span>
        </button>
      </div>

      {/* Narrative Scenario Box - Highlighted with style example green theme */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={`day-narrative-${day}`}
        className="bg-[#EAF7EE] rounded-3xl border-2 border-[#85d49a] p-5 shadow-xs mb-5 overflow-hidden relative"
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="px-3 py-1.5 rounded-full bg-[#0f5b24] text-white font-black text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-2xs">
            <ShieldAlert className="w-3.5 h-3.5" />
            {narrative.badge}
          </span>
          <span className="text-xs font-black text-zinc-950 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border-2 border-[#85d49a] shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#0f5b24]" />
            {day === 1 ? 'Hour 0 – 24' : day === 2 ? 'Hour 24 – 48' : 'Hour 48 – 72+'}
          </span>
        </div>

        <h2 className="font-display font-black text-xl text-zinc-950 tracking-tight leading-snug mb-2">
          {narrative.title}
        </h2>

        <p className="text-xs sm:text-[13px] text-zinc-950 leading-relaxed mb-3.5 font-semibold">
          {narrative.story}
        </p>

        {/* Dynamic Water Calculation on Day 2 */}
        {day === 2 && (
          <div className="p-3.5 bg-white border-2 border-blue-200 rounded-2xl flex items-center gap-2.5 text-zinc-950 text-xs mb-3.5 shadow-2xs">
            <Droplet className="w-4 h-4 text-blue-700 shrink-0" />
            <div className="leading-snug">
              <strong className="font-black text-zinc-950">Water Requirement:</strong> Requires{' '}
              <span className="underline decoration-blue-500 font-black text-blue-950">
                {dayTotalLitres} litres
              </span>{' '}
              of drinking water for your <strong>{householdProfile.size}</strong> household member{householdProfile.size > 1 ? 's' : ''} (3 Days).
            </div>
          </div>
        )}

        <div className="pt-2.5 border-t border-[#85d49a] text-xs font-black text-zinc-950">
          <span>{narrative.instruction}</span>
        </div>
      </motion.div>

      {/* Checklist Sections by Category */}
      <div className="space-y-6">
        {categoriesInDay.map(categoryKey => {
          const categoryMeta = CATEGORY_METADATA[categoryKey];
          const itemsInCategory = dayItems.filter(i => i.category === categoryKey);

          return (
            <div key={categoryKey} className="space-y-2.5">
              {/* Category Header */}
              <div className="flex items-center justify-between px-1">
                <h3 className="font-display font-black text-xs uppercase tracking-wider text-zinc-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-[#C51D18] rounded-full inline-block" />
                  {categoryMeta.label}
                </h3>
                <span className="text-xs font-black text-zinc-950 bg-white px-2.5 py-1 rounded-md border-2 border-zinc-300 shadow-2xs">
                  {itemsInCategory.filter(i => checkedItemIds.includes(i.id)).length}/{itemsInCategory.length} ready
                </span>
              </div>

              {/* Items in Category */}
              <div className="space-y-2.5">
                {itemsInCategory.map(item => {
                  const isChecked = checkedItemIds.includes(item.id);
                  const isWhyExpanded = expandedWhy[item.id] || false;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onClick={() => onToggleItem(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          onToggleItem(item.id);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18] min-h-[64px] ${
                        isChecked
                          ? 'bg-[#EAF7EE] border-[#0f5b24] shadow-xs'
                          : 'bg-white border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50/70'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox - 24x24 with high-contrast check */}
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-[#0f5b24] border-[#0f5b24] text-white shadow-xs'
                              : 'border-zinc-400 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3px]" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-black text-sm text-zinc-950 leading-snug mb-1">
                            {item.title}
                          </h4>

                          <p className="text-xs text-zinc-950 leading-relaxed mb-2 font-semibold">
                            {item.description}
                          </p>

                          {/* Expandable Why It Matters Toggle - 44px min touch target */}
                          <div className="mt-1">
                            <button
                              onClick={(e) => toggleWhy(item.id, e)}
                              className={`inline-flex items-center gap-1.5 text-xs font-black min-h-[44px] py-2 px-2.5 -ml-2.5 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18] rounded-lg ${
                                isChecked ? 'text-[#0a5c28] hover:text-[#063b19]' : 'text-zinc-950 hover:text-black'
                              }`}
                              type="button"
                              aria-expanded={isWhyExpanded}
                            >
                              <Info className="w-4 h-4 shrink-0" />
                              <span>{isWhyExpanded ? 'Hide why it matters' : 'Why it matters'}</span>
                              {isWhyExpanded ? (
                                <ChevronUp className="w-4 h-4 shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 shrink-0" />
                              )}
                            </button>

                            <AnimatePresence>
                              {isWhyExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-3.5 bg-white border-2 border-zinc-300 rounded-xl mt-2 text-xs text-zinc-950 leading-relaxed font-semibold">
                                    <strong className="font-black text-zinc-950 block mb-0.5">
                                      Why it matters:
                                    </strong>
                                    {item.whyItMatters}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar - WCAG AAA 44px+ touch targets */}
      <div className="mt-8 pt-4 border-t-2 border-zinc-200 flex items-center justify-between gap-3">
        <button
          onClick={handlePrevClick}
          className="min-h-[48px] py-3.5 px-5 bg-white border-2 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-50 text-zinc-950 font-black text-xs sm:text-sm rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
          type="button"
        >
          Back
        </button>

        <button
          onClick={handleNextClick}
          className="flex-1 min-h-[48px] py-3.5 px-4 bg-[#C51D18] hover:bg-[#A31612] text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C51D18]"
          type="button"
        >
          <span>
            {day === 1
              ? 'Continue to Day 2'
              : day === 2
              ? 'Continue to Day 3'
              : 'View Results & Resilience Plan'}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
