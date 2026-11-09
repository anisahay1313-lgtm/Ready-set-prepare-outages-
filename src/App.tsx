/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Page1Profile } from './components/Page1Profile';
import { DaySimulation } from './components/DaySimulation';
import { ResultsView } from './components/ResultsView';
import { ShareModal } from './components/ShareModal';
import { HouseholdProfile, ScoreReport } from './types';
import { calculateScore } from './data';

export type AppStep = 'profile' | 'day1' | 'day2' | 'day3' | 'results';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('profile');
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  // Household Profile
  const [householdProfile, setHouseholdProfile] = useState<HouseholdProfile>({
    size: 2,
    circumstances: []
  });

  // Checked items (26 items total) - starts with nothing selected so users begin at zero
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([]);

  // Real-time calculated score report
  const scoreReport: ScoreReport = calculateScore(checkedItemIds, householdProfile);

  // Strict scroll-to-top on every single step transition
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
  }, [currentStep]);

  const handleToggleItem = (id: string) => {
    setCheckedItemIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRestart = () => {
    setCheckedItemIds([]);
    handleNavigate('profile');
  };

  const handleNavigate = (step: AppStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 25);
  };

  const stepsList: { key: AppStep; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'day1', label: 'Day 1' },
    { key: 'day2', label: 'Day 2' },
    { key: 'day3', label: 'Day 3' },
    { key: 'results', label: 'Results' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-zinc-950 flex flex-col font-sans selection:bg-[#EE2A24] selection:text-white">
      {/* British Red Cross Header */}
      <Header
        onNavigateHome={() => handleNavigate('profile')}
      />

      {/* Top Dashboard Navigation Bar */}
      <nav aria-label="Simulation steps" className="bg-white border-b-2 border-zinc-200 sticky top-[53px] z-30 shadow-2xs">
        <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-between gap-2">
          {/* Horizontal Tabs: Profile, Day 1, Day 2, Day 3, Results - WCAG AAA 44px min height */}
          <div className="flex items-center gap-1 flex-1 bg-zinc-100 p-1 rounded-xl">
            {stepsList.map((step) => {
              const isActive = step.key === currentStep;

              return (
                <button
                  key={step.key}
                  onClick={() => handleNavigate(step.key)}
                  className={`flex-1 min-h-[44px] py-2 px-1 rounded-lg text-center text-xs font-black transition-all cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18] ${
                    isActive
                      ? 'bg-[#C51D18] text-white shadow-xs'
                      : 'text-zinc-950 hover:text-black hover:bg-white'
                  }`}
                  type="button"
                  aria-current={isActive ? 'step' : undefined}
                >
                  {step.label}
                </button>
              );
            })}
          </div>

          {/* Quick Capacity Indicator in Days (WCAG AAA contrast text) */}
          <div className="flex items-center gap-1.5 pl-1 shrink-0">
            <span className="text-[10px] font-black text-zinc-950 uppercase tracking-wider">Capacity</span>
            <span className="text-xs font-black text-[#0a5c28] bg-emerald-50 border-2 border-[#85d49a] px-2.5 py-1.5 rounded-lg shadow-2xs">
              {scoreReport.daysLabel}
            </span>
          </div>
        </div>
      </nav>

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-md mx-auto pt-2">
        {currentStep === 'profile' && (
          <Page1Profile
            householdProfile={householdProfile}
            onChangeHouseholdProfile={setHouseholdProfile}
            onStartSimulation={() => handleNavigate('day1')}
          />
        )}

        {currentStep === 'day1' && (
          <DaySimulation
            day={1}
            householdProfile={householdProfile}
            checkedItemIds={checkedItemIds}
            onToggleItem={handleToggleItem}
            onPrev={() => handleNavigate('profile')}
            onNext={() => handleNavigate('day2')}
            onReset={handleRestart}
          />
        )}

        {currentStep === 'day2' && (
          <DaySimulation
            day={2}
            householdProfile={householdProfile}
            checkedItemIds={checkedItemIds}
            onToggleItem={handleToggleItem}
            onPrev={() => handleNavigate('day1')}
            onNext={() => handleNavigate('day3')}
            onReset={handleRestart}
          />
        )}

        {currentStep === 'day3' && (
          <DaySimulation
            day={3}
            householdProfile={householdProfile}
            checkedItemIds={checkedItemIds}
            onToggleItem={handleToggleItem}
            onPrev={() => handleNavigate('day2')}
            onNext={() => handleNavigate('results')}
            onReset={handleRestart}
          />
        )}

        {currentStep === 'results' && (
          <ResultsView
            scoreReport={scoreReport}
            householdProfile={householdProfile}
            checkedItemIds={checkedItemIds}
            onToggleItem={handleToggleItem}
            onRestart={handleRestart}
            onOpenShare={() => setIsShareOpen(true)}
          />
        )}
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        daysLabel={scoreReport.daysLabel}
      />
    </div>
  );
}
