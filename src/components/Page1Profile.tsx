/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Plus, Minus, Check, ArrowRight, Shield, Zap, Droplets, Radio, Heart } from 'lucide-react';
import { HouseholdProfile } from '../types';
import { CIRCUMSTANCE_OPTIONS } from '../data';

interface Page1ProfileProps {
  householdProfile: HouseholdProfile;
  onChangeHouseholdProfile: (profile: HouseholdProfile) => void;
  onStartSimulation: () => void;
}

export const Page1Profile: React.FC<Page1ProfileProps> = ({
  householdProfile,
  onChangeHouseholdProfile,
  onStartSimulation
}) => {
  // Always scroll to top when Profile screen is viewed
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleSetSize = (newSize: number) => {
    onChangeHouseholdProfile({
      ...householdProfile,
      size: Math.max(1, Math.min(12, newSize))
    });
  };

  const handleToggleCircumstance = (opt: string) => {
    if (opt === 'None of the above') {
      onChangeHouseholdProfile({
        ...householdProfile,
        circumstances: []
      });
      return;
    }

    const current = householdProfile.circumstances.filter(c => c !== 'None of the above');
    const exists = current.includes(opt);
    const updated = exists ? current.filter(c => c !== opt) : [...current, opt];

    onChangeHouseholdProfile({
      ...householdProfile,
      circumstances: updated
    });
  };

  const isNoneSelected = householdProfile.circumstances.length === 0;

  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto px-4 pt-2">
      {/* Hero Badge */}
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border-2 border-red-300 text-[#B3100B] font-black text-xs uppercase tracking-wider shadow-2xs">
          <Shield className="w-3.5 h-3.5 fill-[#B3100B] text-[#B3100B]" />
          British Red Cross Resilience Tracker
        </span>
      </div>

      {/* Hero Image - Zero white borders, edge-to-edge dark scenario artwork */}
      <div className="w-full aspect-[274/182] rounded-2xl bg-zinc-900 overflow-hidden mb-4 relative shadow-sm border border-zinc-300">
        <img
          src="/assets/illustrations/outages.png"
          alt="Illustration of a person using a torch and candle during a power cut, with an emergency radio on the table and dark city buildings outside the window"
          className="w-full h-full object-cover object-center block"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-xs text-white text-xs font-black tracking-wide shadow-xs border border-white/20">
          3-day outage simulation
        </div>
      </div>

      {/* Main Title & Action-Oriented CTA */}
      <div className="mb-4">
        <h1 className="font-display font-black text-2xl sm:text-3xl text-zinc-950 tracking-tight leading-tight">
          Ready, set, prepare: outages
          <span className="block text-lg sm:text-xl font-extrabold text-zinc-950 mt-1">
            Test your household preparedness
          </span>
        </h1>

        <div className="mt-3 p-4 rounded-2xl bg-red-50/90 border-2 border-red-300">
          <p className="font-black text-base text-[#B3100B] leading-snug">
            Are you prepared for 3 days?
          </p>
          <p className="font-bold text-xs sm:text-[13px] text-zinc-950 mt-1 leading-relaxed">
            See if your household can manage 3 days without power, water, or communication.
          </p>
        </div>
      </div>

      {/* Cascading Outage Scenario Box - WCAG AAA high-contrast text on green theme */}
      <div className="bg-[#EAF7EE] rounded-2xl border-2 border-[#85d49a] p-4 shadow-xs mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full bg-[#0f5b24] text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
            Outage Scenario
          </span>
          <span className="text-xs font-black text-zinc-950">
            Essential Services at Risk
          </span>
        </div>

        <p className="text-xs text-zinc-950 font-bold leading-relaxed mb-3">
          Outages are the temporary or prolonged disruptions of essential services. Such as:
        </p>

        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border-2 border-[#85d49a] text-xs shadow-2xs">
            <Zap className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-zinc-950">Power:</span>
              <span className="text-zinc-950 font-semibold ml-1">gas and electric, cooking and heating</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border-2 border-[#85d49a] text-xs shadow-2xs">
            <Droplets className="w-4 h-4 text-sky-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-zinc-950">Water:</span>
              <span className="text-zinc-950 font-semibold ml-1">drinking, sanitation and cleaning</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border-2 border-[#85d49a] text-xs shadow-2xs">
            <Radio className="w-4 h-4 text-purple-900 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-zinc-950">Communication:</span>
              <span className="text-zinc-950 font-semibold ml-1">phone networks and access to information</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white border-2 border-[#85d49a] text-xs text-zinc-950 leading-relaxed font-bold shadow-2xs">
          While an outage may begin with one service, it can quickly affect many aspects of daily life, creating wider impacts for individuals, households and communities.
        </div>
      </div>

      <div className="mb-4">
        <p className="font-black text-xs text-zinc-950 uppercase tracking-wider mb-1">
          Test your household
        </p>
        <p className="text-xs text-zinc-950 font-semibold">
          How prepared is it to outages of vital services?
        </p>
      </div>

      {/* Household Size Counter - WCAG AAA 44x44px touch targets */}
      <div className="bg-white rounded-2xl border-2 border-zinc-300 p-4 shadow-xs mb-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-xs font-black text-zinc-950 uppercase tracking-wider">
              Household size
            </label>
            <p className="text-xs text-zinc-950 font-medium mt-0.5 leading-snug">
              This calculates your critical water needs (minimum {householdProfile.size * 6} litres for 3 days).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSetSize(householdProfile.size - 1)}
              disabled={householdProfile.size <= 1}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border-2 border-zinc-300 bg-white text-zinc-950 flex items-center justify-center hover:border-[#C51D18] hover:text-[#C51D18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18] disabled:opacity-30 transition-colors cursor-pointer"
              type="button"
              aria-label="Decrease household members by 1"
            >
              <Minus className="w-4 h-4 stroke-[3px]" />
            </button>
            <span className="font-display font-black text-xl text-zinc-950 min-w-6 text-center" aria-live="polite">
              {householdProfile.size}
            </span>
            <button
              onClick={() => handleSetSize(householdProfile.size + 1)}
              disabled={householdProfile.size >= 12}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border-2 border-zinc-300 bg-white text-zinc-950 flex items-center justify-center hover:border-[#C51D18] hover:text-[#C51D18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18] disabled:opacity-30 transition-colors cursor-pointer"
              type="button"
              aria-label="Increase household members by 1"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Household Profile Checkboxes (Script Circumstances) */}
      <div className="bg-white rounded-2xl border-2 border-zinc-300 p-4 shadow-xs mb-5">
        <div className="mb-2">
          <label className="block text-xs font-black text-zinc-950 uppercase tracking-wider">
            Household profile
          </label>
          <p className="text-xs text-zinc-950 font-medium mt-0.5 leading-snug">
            Outages affect households differently. Select any circumstances that apply to you to receive tailored guidance:
          </p>
        </div>

        <div className="space-y-2 mt-3">
          {CIRCUMSTANCE_OPTIONS.map((circ) => {
            const isNone = circ === 'None of the above';
            const isSelected = isNone ? isNoneSelected : householdProfile.circumstances.includes(circ);

            return (
              <div
                key={circ}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => handleToggleCircumstance(circ)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggleCircumstance(circ);
                  }
                }}
                className={`flex items-start gap-3 p-3.5 min-h-[48px] rounded-xl border-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18] ${
                  isSelected
                    ? isNone
                      ? 'bg-zinc-100 border-zinc-900 text-zinc-950 font-black'
                      : 'bg-red-50/90 border-[#C51D18] text-zinc-950 shadow-xs'
                    : 'bg-white border-zinc-300 hover:border-zinc-500 text-zinc-950 font-medium'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? isNone
                        ? 'bg-zinc-950 border-zinc-950 text-white'
                        : 'bg-[#C51D18] border-[#C51D18] text-white'
                      : 'border-zinc-400 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                </div>

                <div className="flex-1">
                  <span className="text-xs font-black leading-snug block text-zinc-950">
                    {circ}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* British Red Cross Guidance Notice */}
      <div className="p-4 bg-red-50/90 rounded-2xl border-2 border-red-300 text-xs text-zinc-950 mb-6 flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-[#C51D18] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Heart className="w-3 h-3 fill-white" />
        </div>
        <p className="text-xs leading-relaxed text-zinc-950 font-semibold">
          <strong className="text-zinc-950 font-black">British Red Cross guidance:</strong> The advice given throughout aligns with British Red Cross emergency preparedness guidelines.
        </p>
      </div>

      {/* Continue to Day 1 Button */}
      <button
        onClick={onStartSimulation}
        className="w-full min-h-[48px] py-4 px-4 bg-[#C51D18] hover:bg-[#A31612] text-white font-black text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C51D18]"
        type="button"
      >
        <span>Begin Day 1: The Power Goes Out</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
