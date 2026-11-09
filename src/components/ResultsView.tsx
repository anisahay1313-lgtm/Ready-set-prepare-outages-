/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  RotateCcw,
  Heart,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Droplets,
  Radio,
  Utensils,
  Zap,
  ShieldCheck,
  FileText,
  Users,
  Share2,
  Sprout
} from 'lucide-react';
import { HouseholdProfile, ScoreReport, OutageCategory } from '../types';
import { OFFICIAL_RESOURCES, ONWARD_SHARE_URL, getActiveTrackerItems } from '../data';

interface ResultsViewProps {
  scoreReport: ScoreReport;
  householdProfile: HouseholdProfile;
  checkedItemIds: string[];
  onToggleItem: (id: string) => void;
  onRestart: () => void;
  onOpenShare: () => void;
}

const CATEGORY_ICONS: Record<OutageCategory, React.ComponentType<{ className?: string }>> = {
  water: Droplets,
  communication: Radio,
  food: Utensils,
  lighting_power: Zap,
  health_safety: ShieldCheck,
  planning: FileText,
  community_support: Users
};

export const ResultsView: React.FC<ResultsViewProps> = ({
  scoreReport,
  householdProfile,
  onRestart
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [socialToast, setSocialToast] = useState<string | null>(null);

  // Guarantee navigation brings the user to the absolute top of the page
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
  }, []);

  const totalProvisions = getActiveTrackerItems(householdProfile).length;

  const shareText = `I completed Ready, set, prepare: outages by the British Red Cross. Our household is prepared for ${scoreReport.daysLabel} of a 3-day outage. Check your household resilience: ${ONWARD_SHARE_URL}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ONWARD_SHARE_URL).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleSocialClick = (platformName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setSocialToast(`Message copied to clipboard! Paste it into your ${platformName} post.`);
      setTimeout(() => setSocialToast(null), 4000);
    }
  };

  return (
    <div className="flex flex-col pb-28 max-w-md mx-auto px-4 pt-2">
      {/* Top Header Title */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-display font-extrabold text-sm text-zinc-950 tracking-tight flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-[#C51D18]" />
          Preparedness Results
        </span>
        <span className="text-xs font-black uppercase tracking-wider text-zinc-950 bg-white px-3 py-1.5 rounded-lg border-2 border-zinc-300 shadow-2xs">
          {scoreReport.strengths.length} of {totalProvisions} Ready
        </span>
      </div>

      {/* 1. HOUSEHOLD PREPAREDNESS CAPACITY (RED CROSS ACCENTED HERO CARD) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl border-2 border-zinc-300 border-t-4 border-t-[#C51D18] p-5 sm:p-6 shadow-xs mb-5 text-center relative overflow-hidden"
      >
        {/* Trophy Graphic - Fixed from attached asset */}
        <div className="flex items-center justify-center mb-2">
          <img
            src="/assets/aistudio/image_13369626.png"
            alt="Achievement trophy celebrating completed household preparedness assessment"
            className="w-20 h-auto sm:w-24 object-contain drop-shadow-xs"
          />
        </div>

        {/* Circular Capacity Gauge (Matching Attached Reference While Using Days) */}
        <div className="my-4 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center" role="img" aria-label={`Capacity gauge: ${scoreReport.daysResilience} out of 3 days`}>
            {/* SVG Circular Progress Track */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r="64"
                className="stroke-zinc-200"
                strokeWidth="14"
                fill="transparent"
              />
              {/* Foreground Green Progress Arc */}
              <motion.circle
                cx="80"
                cy="80"
                r="64"
                stroke="#0f5b24"
                strokeWidth="14"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={402.12}
                initial={{ strokeDashoffset: 402.12 }}
                animate={{
                  strokeDashoffset:
                    402.12 -
                    (402.12 * Math.min(100, Math.max(0, (scoreReport.daysResilience / 3) * 100))) / 100
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </svg>

            {/* Metric Inside Circle: Days of Coping Capacity */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
              <div className="flex items-baseline justify-center">
                <span className="font-display font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight">
                  {scoreReport.daysResilience}
                </span>
                <span className="text-lg sm:text-xl font-black text-zinc-950 ml-1">
                  / 3 Days
                </span>
              </div>
              <span className="text-xs sm:text-[13px] font-black text-zinc-950 mt-0.5">
                Overall score
              </span>
            </div>
          </div>

          {/* Household Ready Status Underneath Circle */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <Sprout className="w-5 h-5 text-[#0f5b24]" />
            <span className="font-display font-black text-sm sm:text-base text-zinc-950">
              {scoreReport.daysResilience >= 2.5
                ? 'Household Ready'
                : scoreReport.daysResilience >= 1.5
                ? 'Building Resilience'
                : 'Action Needed'}
            </span>
          </div>

          <div className="mt-1.5 text-xs font-black text-zinc-950">
            {scoreReport.strengths.length} of {totalProvisions} provisions ready
          </div>
        </div>

        {/* Diagnostic Status Card - High Contrast Green Theme */}
        <div className="p-4 rounded-2xl bg-[#EAF7EE] border-2 border-[#85d49a] flex items-center gap-3 text-left shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#85d49a] flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-[#0f5b24]" />
          </div>
          <div>
            <h4 className="font-display font-black text-sm text-zinc-950 leading-tight">
              {scoreReport.diagnostic.title}
            </h4>
            <p className="text-xs text-zinc-950 font-semibold leading-snug mt-1">
              {scoreReport.diagnostic.description}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t-2 border-zinc-200 flex items-center justify-center gap-2 text-xs text-zinc-950 font-bold">
          <span>Household: <strong className="text-zinc-950 font-black">{householdProfile.size} {householdProfile.size === 1 ? 'person' : 'people'}</strong></span>
          <span>•</span>
          <span>Critical water need: <strong className="text-zinc-950 font-black">{householdProfile.size * 6} litres</strong></span>
        </div>
      </motion.div>

      {/* 2. PREPAREDNESS BY CATEGORY (HIGHLIGHTED WARM AMBER CARD) */}
      <div className="bg-white rounded-3xl border-2 border-amber-400 p-5 shadow-xs mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#FEF6E0] text-[#78350F] font-black text-[10px] uppercase tracking-wider border-2 border-[#FDE68A] shadow-2xs">
              Breakdown
            </span>
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-zinc-950">
              Preparedness by Category
            </h3>
          </div>
          <span className="text-xs font-black text-zinc-950">
            {scoreReport.strengths.length} of {totalProvisions}
          </span>
        </div>

        <div className="space-y-4">
          {scoreReport.categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.category] || Shield;
            const isComplete = cat.percentage === 100;

            return (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-zinc-950 flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-zinc-950" />
                    <span>{cat.label}</span>
                  </span>
                  <span className="font-black text-zinc-950">
                    {cat.checked} / {cat.total}{' '}
                    <span className={`text-xs font-black ${isComplete ? 'text-[#0f5b24]' : 'text-[#78350F]'}`}>
                      ({cat.percentage}%)
                    </span>
                  </span>
                </div>

                <div className="h-3.5 w-full bg-zinc-200 rounded-full overflow-hidden border border-zinc-300">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      isComplete
                        ? 'bg-[#0f5b24]'
                        : 'bg-[#FFB81C]'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SIGNPOST TO RESOURCES - BRITISH RED CROSS SUPPORT (HIGHLIGHTED RED RESOURCE CARDS + BRC LOGO & OFFICIAL GUIDANCE ICON) */}
      <div className="bg-white rounded-3xl border-2 border-red-300 p-5 shadow-xs mb-5">
        <div className="mb-3.5">
          {/* British Red Cross Support with Official Logo */}
          <div className="flex items-center gap-2.5 mb-2">
            <img
              src="/assets/aistudio/image_f99f54f6.png"
              alt="British Red Cross"
              className="h-7 sm:h-8 w-auto object-contain"
            />
            <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-zinc-950">
              British Red Cross Support
            </h3>
          </div>

          {/* Underneath: Official Guidance Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-md bg-red-100 text-[#B3100B] font-black text-[11px] uppercase tracking-wider border-2 border-red-300 flex items-center gap-1.5 shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-[#B3100B] fill-[#B3100B]" />
              Official Guidance
            </span>
          </div>

          <p className="text-xs text-zinc-950 font-semibold leading-snug">
            Free guides, priority network assistance, and national outage helplines:
          </p>
        </div>

        {/* Highlighted Red Resource Components */}
        <div className="space-y-3">
          {OFFICIAL_RESOURCES.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 min-h-[64px] rounded-2xl border-2 border-red-200 bg-[#FDF2F2] hover:bg-[#FCE8E7] hover:border-[#C51D18] transition-all group cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
            >
              <div className="min-w-0 pr-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-white border border-red-300 text-[10px] font-black text-[#B3100B] uppercase tracking-wider mb-1 shadow-2xs">
                  {res.tag}
                </span>
                <h4 className="text-xs font-black text-zinc-950 group-hover:text-[#C51D18] transition-colors leading-tight flex items-center gap-1.5">
                  <span>{res.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-950 group-hover:text-[#C51D18] shrink-0" />
                </h4>
                <p className="text-xs text-zinc-950 font-medium mt-1 leading-snug">
                  {res.description}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C51D18] group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* 4. HELP OTHERS GET PREPARED (HIGHLIGHT YELLOW WITH VISUAL SOCIAL SHARING ICONS) */}
      <div className="bg-[#FEF6E0] rounded-3xl border-2 border-[#FDE68A] p-5 shadow-xs mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-md bg-white text-[#78350F] font-black text-[10px] uppercase tracking-wider border-2 border-[#FDE68A] shadow-2xs flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-[#78350F]" />
            Spread the word
          </span>
          <h3 className="font-display font-black text-xs uppercase tracking-wider text-zinc-950">
            Help Others Get Prepared
          </h3>
        </div>

        <h4 className="font-display font-black text-base text-zinc-950 leading-snug mb-1">
          Small actions. Stronger communities.
        </h4>
        <p className="text-xs text-zinc-950 font-semibold mb-4 leading-relaxed">
          Share your results and encourage friends, family and neighbours to test their preparedness too.
        </p>

        {/* Visual Social Share Icons Row - WCAG AAA 44x44px touch targets */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('WhatsApp')}
            className="flex flex-col items-center group cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5b24] rounded-xl"
            aria-label="Share on WhatsApp"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.742.949 3.71 1.449 5.711 1.45h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5 leading-tight">WhatsApp</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ONWARD_SHARE_URL)}&quote=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('Facebook')}
            className="flex flex-col items-center group cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] rounded-xl"
            aria-label="Share on Facebook"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1877F2] hover:bg-[#1565cc] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5 leading-tight">Facebook</span>
          </a>

          {/* X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Our household has prepared for ${scoreReport.daysLabel} of a 3-day outage on the @BritishRedCross Resilience Tracker! Check your home: ${ONWARD_SHARE_URL}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('X')}
            className="flex flex-col items-center group cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xl"
            aria-label="Share on X"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#000000] hover:bg-zinc-800 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5 leading-tight">X</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('LinkedIn')}
            className="flex flex-col items-center group cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] rounded-xl"
            aria-label="Share on LinkedIn"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0A66C2] hover:bg-[#084e96] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5 leading-tight">LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodeURIComponent('Check your household preparedness for power cuts')}&body=${encodeURIComponent(
              `Hi,\n\nI just tested our household on the British Red Cross Outages Resilience Tracker and we are prepared for ${scoreReport.daysLabel} of a 3-day outage.\n\nIt takes 2 minutes and helps you prepare for power and water cuts without spending lots of money:\n${ONWARD_SHARE_URL}\n\nStay safe!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('Email')}
            className="flex flex-col items-center group cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#374151] rounded-xl"
            aria-label="Share via Email"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#4B5563] hover:bg-[#374151] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-zinc-950 mt-1.5 leading-tight">Email</span>
          </a>
        </div>

        {/* Temporary toast notification for social share message copy */}
        {socialToast && (
          <div className="mb-3 p-3 bg-white border-2 border-[#FDE68A] rounded-xl text-xs font-black text-[#78350F] flex items-center justify-center gap-1.5 shadow-2xs" role="status">
            <Check className="w-4 h-4 text-[#0f5b24] stroke-[3px]" />
            <span>{socialToast}</span>
          </div>
        )}

        {/* Copy Tracker Link Button - WCAG AAA 44px+ touch target */}
        <button
          onClick={handleCopyLink}
          className="w-full min-h-[48px] py-3.5 px-4 bg-[#FFB81C] hover:bg-[#E5A516] text-[#1D1D1D] font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB81C]"
          type="button"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#1D1D1D] stroke-[3px]" />
              <span className="text-[#1D1D1D]">Link copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#1D1D1D]" />
              <span>Copy tracker link</span>
            </>
          )}
        </button>
      </div>

      {/* 5. USER TESTING SURVEY (MICROSOFT FORM) */}
      <div className="bg-[#FEF2F2] rounded-3xl border-2 border-red-300 p-5 shadow-xs mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-4 h-4 text-[#B3100B] fill-[#B3100B]" />
          <h3 className="font-display font-black text-xs uppercase tracking-wider text-zinc-950">
            Help Improve Community Preparedness
          </h3>
        </div>
        <p className="text-xs text-zinc-950 font-semibold mb-4 leading-relaxed">
          Your feedback directly helps the British Red Cross refine practical, reassuring resilience tools for households across the UK.
        </p>

        <a
          href="https://forms.cloud.microsoft/e/M2BG66Kzr6"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] py-3.5 px-4 bg-[#C51D18] hover:bg-[#A31612] text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C51D18]"
        >
          <span>Complete user testing survey</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* 6. BOTTOM ACTION BUTTON - "RESET" (WCAG AAA 44px+ touch target) */}
      <div className="mt-2 mb-6">
        <button
          onClick={onRestart}
          className="w-full min-h-[52px] py-4 px-4 bg-white hover:bg-zinc-100 border-2 border-zinc-400 hover:border-zinc-600 text-zinc-950 font-black text-sm sm:text-base rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C51D18]"
          type="button"
        >
          <RotateCcw className="w-4 h-4 text-zinc-950" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
