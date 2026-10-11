// ─── SINGLE SOURCE OF TRUTH ───
// All content is defined here. Components read from this file only.
// Never hardcode text in components.

export const SITE = {
  meta: {
    title: "Rahul Ki Rahh — Growth Architect & System Thinker",
    description:
      "Founder of DiziDice Media. I help businesses move from scattered marketing efforts to structured, predictable revenue engines using strategy, automation, and performance-driven thinking.",
    url: "https://rahulkirahh.com",
  },

  person: {
    name: "Rahul Ki Rahh",
    roles: ["Founder", "Growth Architect", "System Thinker"],
    tagline: "I Build Scalable Growth Systems.",
    base: "Hazaribagh, Jharkhand & Delhi, India",
    remote: "Works remotely with clients in India and the Middle East.",
    shortBio:
      "Founder of DiziDice Media. I help businesses move from scattered marketing efforts to structured, predictable revenue engines using strategy, automation, and performance-driven thinking.",
    specialties: [
      "WhatsApp-led organic distribution",
      "Fintech & brokerage lead acquisition",
      "SEO",
      "Performance marketing",
      "Web development",
    ],
    philosophy:
      "My work sits at the intersection of marketing psychology, automation, and performance-driven thinking. I don't chase trends — I build systems. Systems that compound, that scale, and that turn unpredictable marketing into structured, repeatable outcomes. Growth is a system, not a hack.",
    principles: [
      "Systems > Random Campaigns",
      "Automation > Manual Effort",
      "Data > Guesswork",
    ],
  },

  hero: {
    beacon: "Open to new projects",
    counters: [
      { value: 24, suffix: "", label: "Case studies published" },
      {
        value: 60000,
        suffix: "+",
        label: "WhatsApp groups delivered in one week",
        subLabel: "PAN India campaign",
      },
      {
        value: 25,
        suffix: "L+",
        label: "Reach with zero ad spend",
        subLabel: "True Balance",
      },
      {
        value: 1300,
        suffix: "+",
        label: "Verified Upstox new users",
      },
      {
        // Compute dynamically from 2021
        value: new Date().getFullYear() - 2021,
        suffix: "+",
        label: "Years building DiziDice Media",
        subLabel: "since 2021",
      },
    ],
  },

  experience: [
    {
      title: "Client Acquisition & Marketing",
      company: "Motilal Oswal Financial Services Ltd",
      type: "Part-time, remote",
      period: "Jan 2025 – Dec 2025",
      description:
        "Crafting strategies that attract investor clients and retain them with meaningful engagement.",
    },
    {
      title: "Marketing Specialist",
      company: "Angel One",
      type: "Part-time, remote",
      period: "Jul 2025 – Sep 2025",
      description: "Marketing, building lead funnels, and onboarding.",
    },
    {
      title: "Referral Agent",
      company: "Upstox",
      type: "",
      period: "Nov 2024 – Apr 2025",
      description:
        "Promoting and referring Upstox's stock trading and investment services.",
    },
    {
      title: "Founder",
      company: "DiziDice Media",
      companyNote: "Internet Advertising Agency",
      type: "Delhi, remote",
      period: "2021 – Present",
      description:
        "Managing digital marketing campaigns, overseeing the team, and delivering marketing solutions.",
      skills: [
        "Social Media Marketing",
        "WordPress Development",
        "SEO",
        "Ads",
      ],
    },
    {
      title: "Franchise Owner",
      company: "Angel One",
      type: "Part-time, Hazaribagh",
      period: "May 2020 – Jan 2023",
      description: "",
    },
  ],

  education: [
    {
      degree: "MBA, Marketing",
      institution: "Sharda University",
      period: "Jan 2025 – Present",
      grade: "",
    },
    {
      degree: "BSc, Geology / Earth Science",
      institution: "Vinoba Bhave University",
      period: "2018 – 2021",
      grade: "",
    },
    {
      degree: "ISc, PCM",
      institution: "St. Columba's College, Hazaribag",
      period: "2015 – 2018",
      grade: "Grade A",
    },
  ],

  certifications: [
    {
      name: "Attract and Engage Customers with Digital Marketing",
      issuer: "Google",
      date: "Feb 2026",
      credentialId: "RI1TAQ7M7TLF",
    },
    {
      name: "Foundations of Digital Marketing and E-commerce",
      issuer: "Google",
      date: "Jan 2026",
      credentialId: "FK877RK29CAO",
    },
    {
      name: "Certificate Course in Digital Marketing",
      issuer: "NSDC",
      date: "Apr 2025",
      credentialId: "",
    },
    {
      name: "Certificate Course in Digital Marketing",
      issuer: "Reliance Foundation",
      date: "Apr 2025",
      credentialId: "RFSA000106407",
    },
    {
      name: "The Fundamentals of Digital Marketing",
      issuer: "Google Digital Garage",
      date: "Nov 2021",
      credentialId: "4UWPYXX2D",
    },
    {
      name: "The Complete Digital Marketing Course (12 Courses in 1)",
      issuer: "Udemy",
      date: "Nov 2021",
      credentialId: "UC-7bfd4215-e394-4bb3-89ee-a49545ace5d0",
    },
  ],

  ventures: [
    {
      name: "DiziDice Media",
      type: "AGENCY",
      url: "https://dizidice.com",
      description:
        "Full-stack growth agency built on systems, not scattered tactics: SEO, social media, performance campaigns, automation tools, client acquisition.",
    },
    {
      name: "DiziDice URL Shortener",
      type: "PRODUCT",
      url: "https://url.dizidice.com",
      description:
        "Branded short links, click tracking and campaign-level analytics.",
    },
    {
      name: "FutureSkillGrowth",
      type: "INITIATIVE",
      url: "https://futureskillgrowth.com",
      description:
        "Skill development in practical digital marketing, systems thinking and online business.",
    },
    {
      name: "Brokerage Growth Projects",
      type: "PROJECT",
      url: "",
      description:
        "Lead acquisition and onboarding systems for financial services.",
    },
    {
      name: "AI & Automation Experiments",
      type: "PROJECT",
      url: "",
      description:
        "Workflow optimisation, marketing automation, scalable content systems.",
    },
  ],

  services: [
    "Growth Strategy Consulting",
    "Funnel & Conversion Architecture",
    "Performance Marketing Systems",
    "SEO & Organic Authority",
    "AI & Automation Workflows",
    "Website Development (WordPress)",
    "Social Media Management",
    "Reviews Management",
    "Affiliate Marketing",
  ],

  caseStudyBase: "https://dizidice.com/",

  campaignCaseStudies: [
    {
      title: "Delhi EV Campaign",
      category: "WhatsApp organic",
      metric: "10K+ WhatsApp groups, zero ads",
      slug: "delhi-ev-campaign-case-study-10k-whatsapp-groups-zero-ads/",
    },
    {
      title: "True Balance",
      category: "Organic reach",
      metric: "25L+ reach, zero ad spend",
      slug: "true-balance-case-study-25l-reach-with-zero-ad-spend/",
    },
    {
      title: "Spotify QR Campaign",
      category: "Organic sharing",
      metric: "20K+ shares, zero ad spend",
      slug: "spotify-qr-campaign-case-study-20k-shares-with-zero-ad-spend/",
    },
    {
      title: "PAN India Campaign",
      category: "WhatsApp organic",
      metric: "60,000+ WhatsApp groups in a week",
      slug: "how-dizidice-delivered-60000-whatsapp-groups-for-pan-india-campaign-in-a-week/",
    },
    {
      title: "Axis Bank",
      category: "Fintech / WhatsApp",
      metric: "Devanagari PIN adoption via organic WhatsApp growth",
      slug: "viral-whatsapp-campaign-case-study-for-a-leading-private-bank/",
    },
    {
      title: "Upstox",
      category: "Fintech / performance",
      metric: "1,300+ verified new users",
      slug: "driving-1300-verified-upstox-new-users-a-performance-marketing-success-story/",
    },
    {
      title: "Airtel 5G (Kapil Dev's 175)",
      category: "Shareable storytelling",
      metric: "Turned a 5G launch into a shareable story",
      slug: "reliving-kapil-devs-175-how-dizidice-turned-airtel-5g-into-a-shareable-story/",
    },
    {
      title: "Airtel 5G Pilot Cities",
      category: "WhatsApp communities",
      metric: "Awareness through WhatsApp communities",
      slug: "airtel-5g-launch-case-study-awareness-through-whatsapp-communities/",
    },
    {
      title: "Popeyes",
      category: "Local footfall",
      metric: "20K+ shares",
      slug: "popeyes-case-study-driving-local-footfall-with-20k-shares/",
    },
    {
      title: "Fintech App Review Growth",
      category: "Reputation",
      metric: "Review growth for a fintech app",
      slug: "fintech-app-review-growth-case-study/",
    },
    {
      // "IPL 2020" wording hidden until confirmed
      title: "Dream11",
      category: "Performance",
      metric: "10,000+ leads",
      slug: "driving-over-10000-leads-for-dream11-during-ipl-2020/",
    },
  ],

  websiteCaseStudies: [
    {
      title: "Thermex AC",
      slug: "website-development-case-study-for-thermexac/",
      industry: "HVAC & Industrial",
      tags: ["B2B & Industrial", "WordPress"],
    },
    {
      title: "B2B Marketplace Platform",
      slug: "how-we-built-a-high-converting-b2b-marketplace-platform/",
      industry: "High-Converting Marketplace",
      tags: ["B2B & Industrial", "Platform"],
    },
    {
      title: "B2B Industrial Website",
      slug: "b2b-industrial-website-development-case-study/",
      industry: "Industrial Manufacturing",
      tags: ["B2B & Industrial", "Web Development"],
    },
    {
      title: "Safe Fast Movers",
      subtitle: "Website, Social, Ads",
      slug: "empowering-safe-fast-movers-website-social-media-ad-campaign-success/",
      industry: "Logistics & Moving",
      tags: ["Local Services", "Social & Ads"],
    },
    {
      title: "Bahrain Experts Movers",
      subtitle: "Website + Local SEO",
      slug: "bahrain-experts-movers-website-local-seo-growth-case-study/",
      industry: "Middle East Logistics",
      tags: ["Local Services", "Local SEO"],
    },
    {
      title: "WorldBeing (NGO)",
      slug: "worldbeing-nonprofit-website-case-study-ngo-website-development-by-dizidice/",
      industry: "Non-Profit & Social Good",
      tags: ["NGO & Healthcare", "Non-Profit"],
    },
    {
      title: "Casa Bay Villas",
      subtitle: "Luxury Travel",
      slug: "casa-bay-villas-website-case-study-luxury-travel-website-development-by-dizidice/",
      industry: "Luxury Hospitality & Travel",
      tags: ["Travel & Lifestyle", "Hospitality"],
    },
    {
      title: "Fata Rice",
      subtitle: "Food Brand",
      slug: "fata-rice-website-case-study-food-brand-website-development/",
      industry: "Consumer Food & FMCG",
      tags: ["Food & Retail", "Brand Web"],
    },
    {
      title: "MotorAxle",
      subtitle: "Automotive News",
      slug: "motoraxle-automotive-news-review-platform-website-development/",
      industry: "Automotive Media & Reviews",
      tags: ["Media & Reviews", "Automotive"],
    },
    {
      title: "Dr. Bipin Solanki",
      subtitle: "Orthopaedic Surgeon",
      slug: "dr-bipin-solanki-orthopaedic-surgeon-in-delhi-ncr-website-development/",
      industry: "Healthcare & Doctor Practice",
      tags: ["NGO & Healthcare", "Medical"],
    },
    {
      title: "Riyadh Building Contractor",
      slug: "riyadh-building-contractor-contracting-company-in-riyadh-website-development/",
      industry: "Middle East Construction",
      tags: ["B2B & Industrial", "Construction"],
    },
    {
      title: "Lightscape VC",
      slug: "lightscape-vc-website-case-study-venture-capital-website-development-by-dizidice/",
      industry: "Venture Capital & Investments",
      tags: ["Finance & VC", "Investment"],
    },
    {
      title: "ARZ Organic Beauty",
      subtitle: "Ecommerce",
      slug: "arz-organic-beauty-ecommerce-case-study-organic-skincare-website-by-dizidice/",
      industry: "Organic Skincare & D2C",
      tags: ["Ecommerce", "D2C"],
    },
  ],


  social: [
    {
      platform: "Instagram",
      url: "https://instagram.com/rahulkirahh",
      icon: "instagram",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/rahul-ki-rahh/",
      icon: "linkedin",
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/rk929336/",
      icon: "facebook",
    },
    {
      platform: "X",
      url: "https://x.com/rahul_ki_rahh",
      icon: "x",
    },
  ],
} as const;

export type SiteData = typeof SITE;
