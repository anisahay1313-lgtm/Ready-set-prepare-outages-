/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TrackerItem,
  HouseholdProfile,
  ScoreReport,
  CategoryScore,
  DiagnosticResult,
  TailoredAlert,
  OutageCategory
} from './types';

export const CIRCUMSTANCE_OPTIONS = [
  'I live alone',
  'I am over 65',
  'I have limited mobility',
  'I have health conditions affected by loss of heating, cooling, communication or power',
  'I rely on powered medical equipment',
  'I care for someone who relies on medical equipment',
  'None of the above'
];

export const CATEGORY_METADATA: Record<OutageCategory, { label: string; icon: string }> = {
  water: { label: 'Water', icon: 'Droplets' },
  communication: { label: 'Communication', icon: 'Radio' },
  food: { label: 'Food', icon: 'Utensils' },
  lighting_power: { label: 'Lighting and power', icon: 'Zap' },
  health_safety: { label: 'Health and safety', icon: 'Shield' },
  planning: { label: 'Planning', icon: 'FileText' },
  community_support: { label: 'Community support', icon: 'Users' }
};

export const TRACKER_ITEMS: TrackerItem[] = [
  // ================= DAY 1: THE POWER GOES OUT =================
  // Communication
  {
    id: 'mobile_phone',
    day: 1,
    category: 'communication',
    categoryLabel: 'Communication',
    title: 'Mobile phone',
    description: 'Phone kept fully charged and placed in low-power mode.',
    whyItMatters: 'Your phone is your primary interface to contact emergency services and receive local alerts, but battery drain can quickly cut this connection during an outage.',
    points: 4,
    cost: 'Free',
    quickWin: true
  },
  {
    id: 'power_bank',
    day: 1,
    category: 'communication',
    categoryLabel: 'Communication',
    title: 'Backup power bank',
    description: 'High-capacity, pre-charged portable USB power bank.',
    whyItMatters: 'With grid power unavailable, your mobile phone and small electronic devices will run out of power, cutting you off from emergency services, utility updates and relatives.',
    points: 4,
    cost: 'Moderate cost (££)',
    quickWin: false,
    priorityHouseholdNeed: true
  },
  // Lighting and power
  {
    id: 'torch',
    day: 1,
    category: 'lighting_power',
    categoryLabel: 'Lighting and power',
    title: 'Torch',
    description: 'Accessible, battery-operated LED torch or head torch.',
    whyItMatters: 'Navigating a dark house at night increases the risk of serious trips and falls. Relying on candles introduces a risk of fire.',
    points: 4,
    cost: 'Low cost (£)',
    quickWin: true
  },
  {
    id: 'spare_batteries',
    day: 1,
    category: 'lighting_power',
    categoryLabel: 'Lighting and power',
    title: 'Spare batteries',
    description: 'A stock of high-quality, fresh batteries in relevant sizes.',
    whyItMatters: 'Your torches, battery-powered radios and critical household medical monitors will become useless when their initial batteries drain.',
    points: 4,
    cost: 'Low cost (£)',
    quickWin: true
  },
  {
    id: 'backup_lighting',
    day: 1,
    category: 'lighting_power',
    categoryLabel: 'Lighting and power',
    title: 'Backup lighting options',
    description: 'Battery-powered lanterns, solar lights or chem-light glow sticks.',
    whyItMatters: 'Holding a torch while cooking, administering first aid or caring for children is highly impractical and tiring.',
    points: 3,
    cost: 'Low cost (£)',
    quickWin: false
  },
  {
    id: 'surge_plan',
    day: 1,
    category: 'lighting_power',
    categoryLabel: 'Lighting and power',
    title: 'Appliance surge plan',
    description: 'Switching off or unplugging sensitive electronic equipment.',
    whyItMatters: 'When electricity is restored to the grid, sudden electrical surges can damage sensitive electronic circuits or create immediate fire hazards.',
    points: 3,
    cost: 'Free',
    quickWin: true
  },
  {
    id: 'alt_power',
    day: 1,
    category: 'lighting_power',
    categoryLabel: 'Lighting and power',
    title: 'Alternative power systems',
    description: 'A solar generator, portable power station or dual-fuel inverter generator.',
    whyItMatters: 'Provides sustained backup electricity for running medical devices, keeping refrigeration active, or recharging vital battery gear.',
    points: 4,
    cost: 'Higher cost (£££)',
    quickWin: false,
    priorityHouseholdNeed: true
  },
  // Health & safety
  {
    id: 'medications',
    day: 1,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'Essential medications',
    description: 'At least a 7-day supply of essential prescription medications and medical supplies.',
    whyItMatters: 'Pharmacies and delivery services may close without warning during widespread utility disruptions.',
    points: 5,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'first_aid',
    day: 1,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'First aid kit',
    description: 'A stocked first aid kit with dressings, antiseptics, and personal medical necessities.',
    whyItMatters: 'Minor cuts, burns, or injuries are far more likely in dim conditions and emergency medical services may face severe delays.',
    points: 4,
    cost: 'Low cost (£)',
    quickWin: true
  },
  {
    id: 'warm_clothing',
    day: 1,
    category: 'health_safety',
    categoryLabel: 'Health and safety',
    title: 'Warm clothing and blankets',
    description: 'Thermal layers, hats, gloves, and thick blankets easily accessible.',
    whyItMatters: 'Without central heating, home temperatures fall steadily, especially overnight, putting household members at risk of hypothermia.',
    points: 4,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },

  // ================= DAY 2: SYSTEMS BEGIN TO STRAIN =================
  // Water
  {
    id: 'stored_water',
    day: 2,
    category: 'water',
    categoryLabel: 'Water',
    title: 'Stored drinking water',
    description: 'Clean, sealed drinking water stored in containers (minimum 2 litres per person per day for 3 days).',
    whyItMatters: 'Mains water supplies can fail rapidly during prolonged power cuts. Dehydration poses an immediate, severe health danger within 48 to 72 hours.',
    points: 7,
    cost: 'Low cost (£)',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'sanitation_water',
    day: 2,
    category: 'water',
    categoryLabel: 'Water',
    title: 'Water for sanitation and hygiene',
    description: 'Additional water stored for washing, hygiene, and flushing toilets.',
    whyItMatters: 'Maintaining hand hygiene and toilet sanitation prevents gastrointestinal illnesses and stops the spread of infections when mains supply fails.',
    points: 4,
    cost: 'Free',
    quickWin: true
  },
  // Food
  {
    id: 'non_perishable_food',
    day: 2,
    category: 'food',
    categoryLabel: 'Food',
    title: 'Non-perishable food supply',
    description: 'A 3-day supply of shelf-stable food that requires little or no cooking (canned goods, dried fruit, nut butters, biscuits).',
    whyItMatters: 'Cookers and microwaves will not work, and fresh food spoils quickly once power is lost. Shelf-stable food guarantees essential nutrition.',
    points: 5,
    cost: 'Low cost (£)',
    quickWin: true
  },
  {
    id: 'safe_food_prep',
    day: 2,
    category: 'food',
    categoryLabel: 'Food',
    title: 'Safe food preparation equipment',
    description: 'A manual can opener, camping stove (used safely outdoors or well-ventilated), and disposable utensils.',
    whyItMatters: 'Electric can openers will not operate, and improper indoor use of camping equipment creates lethal carbon monoxide and fire risks.',
    points: 3,
    cost: 'Low cost (£)',
    quickWin: true
  },
  {
    id: 'fridge_preservation',
    day: 2,
    category: 'food',
    categoryLabel: 'Food',
    title: 'Fridge and freezer preservation plan',
    description: 'Keeping fridge and freezer doors closed tightly, using thermal cool bags or consuming perishable items first.',
    whyItMatters: 'An unopened fridge keeps food cold for roughly 4 hours; a full freezer maintains temperature for 48 hours. Spoiled food causes acute food poisoning.',
    points: 3,
    cost: 'Free',
    quickWin: true
  },
  // Planning
  {
    id: 'emergency_plan',
    day: 2,
    category: 'planning',
    categoryLabel: 'Planning',
    title: 'Emergency grab bag',
    description: 'An assembled emergency bag with essential supplies ready if you need to evacuate or move quickly.',
    whyItMatters: 'If you need to leave your home quickly or relocate to an emergency rest centre, an assembled grab bag ensures you have critical supplies immediately to hand.',
    points: 4,
    cost: 'Low cost (£)',
    quickWin: true
  },
  {
    id: 'cash_reserve',
    day: 2,
    category: 'planning',
    categoryLabel: 'Planning',
    title: 'Cash reserve',
    description: 'Small denominations of cash kept safely at home.',
    whyItMatters: 'ATMs, card payment terminals, and mobile pay systems will not function during network and power blackouts.',
    points: 3,
    cost: 'Free',
    quickWin: true
  },
  {
    id: 'doc_copies',
    day: 2,
    category: 'planning',
    categoryLabel: 'Planning',
    title: 'Copies of important documents',
    description: 'Waterproof physical copies or secure offline digital copies of IDs, insurance, and medical records.',
    whyItMatters: 'Cloud access and local files may be unreachable when networks go dark, but proof of identity and policies may be needed immediately.',
    points: 3,
    cost: 'Free',
    quickWin: true
  },

  // ================= DAY 3+: ESSENTIAL SERVICES ARE DISRUPTED =================
  // Communication
  {
    id: 'radio',
    day: 3,
    category: 'communication',
    categoryLabel: 'Communication',
    title: 'Battery-powered or wind-up radio',
    description: 'A portable DAB/FM or AM radio powered by batteries, wind-up dynamo, or solar power.',
    whyItMatters: 'If internet and mobile networks fail, broadcast radio is the UK emergency services primary channel for public safety updates via BBC Radio (including BBC Radio 5 Live on 693/909 MW and BBC Local Radio).',
    points: 5,
    cost: 'Moderate cost (££)',
    quickWin: false,
    priorityHouseholdNeed: true
  },
  {
    id: 'contacts_list',
    day: 3,
    category: 'communication',
    categoryLabel: 'Communication',
    title: 'Trusted information and emergency contact list',
    description: 'A written list of local emergency numbers (including 105 for electricity, water helpline, NHS 111, GP) and family contacts.',
    whyItMatters: 'You cannot look up phone numbers online once phone batteries drain or mobile data collapses.',
    points: 4,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'family_comm_plan',
    day: 3,
    category: 'communication',
    categoryLabel: 'Communication',
    title: 'Household emergency plan',
    description: 'An agreed household plan for meeting points, out-of-area check-in contacts, and emergency steps.',
    whyItMatters: 'Confusion and panic increase during crises. An agreed household emergency plan ensures every household member knows what to do even when local mobile networks collapse.',
    points: 3,
    cost: 'Free',
    quickWin: true
  },
  {
    id: 'landline_phone',
    day: 3,
    category: 'communication',
    categoryLabel: 'Communication',
    title: 'Landline & Digital Voice emergency plan',
    description: 'Understanding how your landline works during a power cut, with battery backup or an emergency mobile alternative.',
    whyItMatters: 'Under the UK Digital Voice rollout, modern landlines run via broadband routers and will not work during a power cut without battery backup. If you depend on a landline (especially for medical alarms or telecare), check with your provider for free backup solutions or Priority Services support.',
    points: 3,
    cost: 'Low cost (£)',
    quickWin: false
  },
  // Planning
  {
    id: 'local_broadcast',
    day: 3,
    category: 'planning',
    categoryLabel: 'Planning',
    title: 'Local emergency radio frequencies',
    description: 'Knowing your local BBC radio station frequency (FM/AM) and official emergency contact routes.',
    whyItMatters: 'During major infrastructure failures, local BBC radio is the UK designated emergency broadcast partner. Knowing your station frequency beforehand ensures you can tune in immediately without relying on internet search.',
    points: 3,
    cost: 'Free',
    quickWin: true
  },
  {
    id: 'psr_105',
    day: 3,
    category: 'planning',
    categoryLabel: 'Planning',
    title: 'Priority Services Register and helpline awareness',
    description: 'Signed up to the free Priority Services Register (if eligible) and knowing to call 105 (England, Scotland & Wales) or 03457 643 643 (Northern Ireland) for power cut support.',
    whyItMatters: 'The Priority Services Register offers priority support, alternative heating/water, and welfare checks during extended outages. In England, Scotland and Wales, call 105 free to report power cuts or get updates. In Northern Ireland, call the dedicated NIE Networks helpline on 03457 643 643. Having these numbers stored ensures you can get emergency help without needing an internet connection.',
    points: 5,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  // Community support
  {
    id: 'check_neighbours',
    day: 3,
    category: 'community_support',
    categoryLabel: 'Community support',
    title: 'Checking on neighbours',
    description: 'A proactive plan to check on elderly, isolated, or higher-risk neighbours.',
    whyItMatters: 'Resilience is collective. Over 80% of immediate crisis support in communities is carried out by neighbours before emergency services arrive.',
    points: 3,
    cost: 'Free',
    quickWin: true,
    priorityHouseholdNeed: true
  },
  {
    id: 'community_support',
    day: 3,
    category: 'community_support',
    categoryLabel: 'Community support',
    title: 'Community support arrangements',
    description: 'Connections to a local community group, mutual aid network, or parish emergency committee.',
    whyItMatters: 'Shared community generators, warming centres, and distributed water supplies rely on organised local connections to reach everyone safely.',
    points: 3,
    cost: 'Free',
    quickWin: true
  }
];

/**
 * Priority Services Register (PSR) eligibility helper for tailored profile alerts.
 */
export function isPsrEligible(profile?: HouseholdProfile): boolean {
  if (!profile || !profile.circumstances || profile.circumstances.length === 0) {
    return false;
  }
  const psrKeywords = [
    'over 65',
    'limited mobility',
    'health condition',
    'medical equipment',
    'care for someone'
  ];
  return profile.circumstances.some(c =>
    psrKeywords.some(keyword => c.toLowerCase().includes(keyword.toLowerCase()))
  );
}

/**
 * Returns tracker items for assessment.
 * The 105 / emergency helpline question applies to everyone in all UK jurisdictions.
 */
export function getActiveTrackerItems(_profile?: HouseholdProfile): TrackerItem[] {
  return TRACKER_ITEMS;
}

export const DAY_NARRATIVES = {
  1: {
    badge: 'DAY 1',
    title: 'THE POWER GOES OUT',
    story: 'There is a widespread grid blackout across your area when nearby high-voltage transmission lines trip due to a storm. Streetlights, traffic lights and home heating systems immediately turn off. Your phone still has most of its battery, but your Wi-Fi drops instantly. As day turns to night, the rooms in your house are cooling down and you are plunged into darkness. Your first critical priorities are: moving around safely, preserving phone charge and handling any medical needs.',
    instruction: 'If this was your household, what would you have in place?'
  },
  2: {
    badge: 'DAY 2',
    title: 'SYSTEMS BEGIN TO STRAIN',
    story: 'It has been 24 hours without power. Grid operators report extensive physical damage to substations. The water pressure in your taps begins to drop as local water network pumps and reservoir backup generators run low on fuel. Supermarkets and local shops cannot open or process electronic card payments. You need safe drinking water, easy-to-prepare food, and emergency plans to get through the next 48 hours.',
    instruction: 'If this was your household, what would you have in place?'
  },
  3: {
    badge: 'DAY 3+',
    title: 'ESSENTIAL SERVICES ARE DISRUPTED',
    story: 'You are entering Day 3 of the outage. Mobile phone towers have exhausted their backup batteries, leaving only intermittent or dead mobile network reception. Broadband internet remains down. Tap water has completely stopped in your neighbourhood. Getting verified news, reaching family, and checking on isolated neighbours is now your top priority as community response teams mobilise.',
    instruction: 'If this was your household, what would you have in place?'
  }
};

export function calculateScore(checkedIds: string[], profile?: HouseholdProfile): ScoreReport {
  const activeItems = getActiveTrackerItems(profile);
  const strengths = activeItems.filter(item => checkedIds.includes(item.id));
  const gaps = activeItems.filter(item => !checkedIds.includes(item.id));

  const totalPoints = strengths.reduce((sum, item) => sum + item.points, 0);
  const maxPoints = activeItems.reduce((sum, item) => sum + item.points, 0);
  const score = maxPoints > 0 ? Math.min(100, Math.round((totalPoints / maxPoints) * 100)) : 0;

  // Estimated Coping Capacity in Days (0 to 3.0 Days)
  // Directly answers: "How many days could my household cope during a prolonged outage?"
  let daysResilience = 0;
  let daysLabel = '< 1 Day';
  let daysSummary = 'Immediate vulnerability within the first 12–24 hours';

  if (checkedIds.length === 0) {
    daysResilience = 0;
    daysLabel = '0 Days';
    daysSummary = 'No provisions selected yet. Tick the items your household has ready to estimate resilience.';
  } else if (score >= 90) {
    daysResilience = 3.0;
    daysLabel = '3+ Days';
    daysSummary = 'Full 3-day coping capacity achieved across power, water, and communication.';
  } else if (score >= 70) {
    daysResilience = Math.round((2.0 + ((score - 70) / 20) * 0.9) * 10) / 10;
    daysLabel = `${daysResilience} Days`;
    daysSummary = 'Strong multi-day resilience; minor gaps during extended community isolation.';
  } else if (score >= 40) {
    daysResilience = Math.round((1.0 + ((score - 40) / 30) * 0.9) * 10) / 10;
    daysLabel = `${daysResilience} Days`;
    daysSummary = 'Copes with initial power loss; will face severe strain as water and networks fail on Day 2.';
  } else {
    daysResilience = Math.max(0.5, Math.round(((score / 40) * 0.9) * 10) / 10);
    daysLabel = `${daysResilience} Day`;
    daysSummary = 'Initial emergency buffer only; critical gaps in drinking water, warmth, or communication.';
  }

  // Category breakdown
  const categoryKeys: OutageCategory[] = [
    'water',
    'communication',
    'food',
    'lighting_power',
    'health_safety',
    'planning',
    'community_support'
  ];

  const categories: CategoryScore[] = categoryKeys.map(cat => {
    const items = activeItems.filter(i => i.category === cat);
    const checked = items.filter(i => checkedIds.includes(i.id)).length;
    const total = items.length;
    return {
      category: cat,
      label: CATEGORY_METADATA[cat].label,
      checked,
      total,
      percentage: total > 0 ? Math.round((checked / total) * 100) : 0
    };
  });

  // Diagnostic Messaging
  let diagnostic: DiagnosticResult;
  if (totalPoints >= 80) {
    diagnostic = {
      title: 'Strong Household Resilience',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Your household is well prepared with robust provisions across power, water, communication, and safety. A few targeted refinements will ensure total readiness.',
      level: 'strong'
    };
  } else if (totalPoints >= 45) {
    diagnostic = {
      title: 'Moderate Preparedness — Clear Opportunities',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'You have solid essentials in place, but prolonged multi-day outages will test your household. Taking a few low-cost steps will dramatically improve resilience.',
      level: 'moderate'
    };
  } else {
    diagnostic = {
      title: 'Significant Preparedness Gaps',
      badgeColor: 'bg-red-100 text-[#EE2A24] border-red-300',
      description: 'Your household currently lacks vital buffers for sustained power and water disruptions. Starting with simple, low-effort actions will rapidly secure your home.',
      level: 'action_needed'
    };
  }

  // Tailored alerts based on household profile
  const tailoredAlerts: TailoredAlert[] = [];
  if (profile) {
    const circs = profile.circumstances || [];

    if (circs.some(c => c.includes('powered medical equipment'))) {
      tailoredAlerts.push({
        type: 'Medically Dependent',
        message: 'Loss of power may have a greater impact on your household because of your reliance on powered equipment.',
        actionText: 'Ensure dedicated battery backup or portable power station, and register with your network operator.',
        actionId: 'alt_power'
      });
    }

    if (circs.some(c => c.includes('care for someone'))) {
      tailoredAlerts.push({
        type: 'Carer Support',
        message: 'Ensure backup plans exist for anyone you support, including medical reserves, warm-room staging, and emergency transport.',
        actionText: 'Review care recipient medications, backup charging, and secondary emergency contact details.',
        actionId: 'medications'
      });
    }

    if (circs.some(c => c.includes('live alone') || c.includes('over 65'))) {
      tailoredAlerts.push({
        type: 'Neighbour & Community Connection',
        message: 'Consider establishing neighbour support arrangements and warm-room planning for peace of mind.',
        actionText: 'Connect with a trusted nearby neighbour to set up mutual check-in knocks during power cuts.',
        actionId: 'check_neighbours'
      });
    }

    if (circs.some(c => c.includes('limited mobility'))) {
      tailoredAlerts.push({
        type: 'Mobility & Navigation',
        message: 'Moving in the dark poses elevated injury risks. Position accessible head-torches and battery lanterns along primary walkways.',
        actionText: 'Keep torches by your bedside and living areas, and ensure Priority Services registration.',
        actionId: 'torch'
      });
    }

    if (circs.some(c => c.includes('health conditions affected by loss of heating'))) {
      tailoredAlerts.push({
        type: 'Thermal & Health Sensitivity',
        message: 'Thermal sensitivity requires an active warm-room strategy when heating fails: choose one room, seal drafts, and layer blankets.',
        actionText: 'Stock thermal layers, hot water flasks, and join the free Priority Services Register.',
        actionId: 'warm_clothing'
      });
    }
  }

  // Highest Impact Next Step:
  let highestImpactGap: TrackerItem | undefined;
  const storedWater = gaps.find(i => i.id === 'stored_water');
  if (storedWater) {
    highestImpactGap = storedWater;
  } else {
    highestImpactGap = gaps.find(i => i.points >= 5) || gaps[0];
  }

  return {
    score,
    totalPoints,
    maxPoints,
    daysResilience,
    daysLabel,
    daysSummary,
    diagnostic,
    categories,
    strengths,
    gaps,
    highestImpactGap,
    tailoredAlerts
  };
}

export const OFFICIAL_RESOURCES = [
  {
    title: 'Why Are We Being Asked to Prepare for 72 Hours?',
    description: 'Official British Red Cross guidance on why households across the UK are advised to build 3 days of resilience.',
    url: 'https://www.redcross.org.uk/stories/disasters-and-emergencies/uk/why-are-we-being-asked-to-prepare-for-72-hours',
    tag: 'British Red Cross Guide'
  },
  {
    title: 'Preparing for a Power Cut',
    description: 'Practical British Red Cross guidance to stay safe, warm, and informed during an electricity blackout.',
    url: 'https://www.redcross.org.uk/get-help/prepare-for-emergencies/power-cut',
    tag: 'British Red Cross Guide'
  },
  {
    title: 'How to Prepare Your Home for 72 Hours',
    description: 'Step-by-step checklist on storing water, emergency supplies, and keeping your household secure.',
    url: 'https://www.redcross.org.uk/get-help/prepare-for-emergencies/how-to-prepare-your-home-for-72-hours',
    tag: 'British Red Cross Checklist'
  },
  {
    title: 'Free Priority Services Register (PSR)',
    description: 'Free priority support from energy and water suppliers for older adults, medical equipment users, and carers.',
    url: 'https://www.thepsr.co.uk/',
    tag: 'Free Utility Support'
  },
  {
    title: 'National Power Cut Helpline (105)',
    description: 'Call 105 free anywhere in England, Scotland & Wales to report a power cut or get network updates.',
    url: 'https://www.powercut105.com/',
    tag: 'Emergency 105'
  },
  {
    title: 'NIE Networks Powercheck (Northern Ireland)',
    description: 'Check real-time power outages, network faults, and estimated restoration times across Northern Ireland.',
    url: 'https://powercheck.nienetworks.co.uk/',
    tag: 'Northern Ireland (NIE)'
  },
  {
    title: 'NIE Networks Power Cuts & 24/7 Helpline',
    description: 'Report a power cut in Northern Ireland or call 03457 643 643 for 24/7 emergency customer care and medical priority support.',
    url: 'https://www.nienetworks.co.uk/power-cuts',
    tag: 'Northern Ireland (NIE)'
  }
];

export const ONWARD_SHARE_URL = 'https://power-outage-preparedness-assessment.ai.studio';
