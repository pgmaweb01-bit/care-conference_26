export const EVENT = {
  name: "The Care Conference 2026",
  edition: "The Third Edition",
  theme: "Care as Infrastructure",
  subtitle: "Building a National Position on Home Care for Nigeria",
  date: "19 November 2026",
  time: "8:00 AM – 5:45 PM",
  venue: "IALA Hub, The Chair Centre, Lagos",
  organiser: "The Purple Global Mission",
};

export const POLICY_LAYERS = [
  {
    no: "01",
    title: "Care Workforce Development and Protection",
    body: "Recognition, certification, training, and labour protection for the people who deliver care.",
  },
  {
    no: "02",
    title: "Clinical Governance and Quality Assurance",
    body: "What safe care at home requires: standards, oversight, and accountability beyond the facility walls.",
  },
  {
    no: "03",
    title: "Care Coordination and Continuity of Care",
    body: "The managed journey from hospital bed to home, and the continuity that reduces avoidable readmissions.",
  },
  {
    no: "04",
    title: "Digital Health Infrastructure and Care Data Systems",
    body: "The data layer beneath every financing decision: national datasets, care records, and interoperability.",
  },
  {
    no: "05",
    title: "Care Financing, Policy and Regulatory Architecture",
    body: "Benefit design, pooled financing, and the legislative pathway from out of pocket spending to structured financing.",
  },
];

export const AUDIENCE = [
  {
    title: "Policymakers & Government",
    body: "Government officials, regulators and public-sector leaders shaping national health policy.",
  },
  {
    title: "Healthcare Leaders",
    body: "Hospital executives, clinical leaders and health-system decision makers.",
  },
  {
    title: "Health Professionals",
    body: "Doctors, nurses, allied health professionals and other practitioners involved in care delivery.",
  },
  {
    title: "Care Providers & Caregivers",
    body: "Homecare organisations, professional caregivers, family caregivers and community-based providers.",
  },
  {
    title: "Technology & Innovation",
    body: "Digital health founders, technology companies, product teams and innovators developing the future of care.",
  },
  {
    title: "Investors & Funders",
    body: "Investors, development partners, donors and strategic funders interested in healthcare and social infrastructure.",
  },
  {
    title: "Researchers & Academia",
    body: "Researchers, academics and institutions generating evidence for better care systems.",
  },
  {
    title: "Insurers & HMOs",
    body: "Health financing organisations working to expand sustainable access to care.",
  },
  {
    title: "Civil Society & Communities",
    body: "Community leaders, advocates and organisations working to improve health and social outcomes.",
  },
];

export type ProgrammeItem = {
  time: string;
  title: string;
  kicker?: string;
  body: string;
  focus?: string;
  question?: string;
  highlight?: boolean;
};

export const PROGRAMME: ProgrammeItem[] = [
  {
    time: "8:00 AM",
    title: "Registration & CareSouk Opens",
    body: "Delegate check-in begins alongside the opening of CareSouk, providing an opportunity to explore solutions, organisations and innovations within the care ecosystem.",
  },
  {
    time: "9:00 AM",
    title: "Opening Ceremony",
    body: "The conference officially begins with welcome remarks, keynote reflections, national-position framing, a ministerial address and goodwill messages.",
    focus: "Why care must become part of Nigeria's infrastructure.",
  },
  {
    time: "10:15 AM",
    kicker: "Plenary 1",
    title: "The First Caregivers",
    body: "Families are often the first and most consistent caregivers. This session brings lived experiences to the centre of the conversation, exploring the realities of dementia care, stroke recovery, disability care and long-term caregiving.",
    question: "What happens when families become the primary care system?",
  },
  {
    time: "11:30 AM",
    kicker: "Plenary 2",
    title: "Safe at Home",
    body: "As healthcare increasingly extends into homes and communities, clinical governance and quality assurance become critical. This session examines what is required to make home-based care safe, effective, accountable and connected to the wider health system.",
  },
  {
    time: "12:45 PM",
    kicker: "Book Launch",
    title: "The Homecare Framework",
    body: "A special launch introducing a framework for understanding home care as a fundamental component of everyday health and social infrastructure.",
    highlight: true,
  },
  {
    time: "1:15 PM",
    title: "Lunch, CareSouk & Networking",
    body: "Connect with fellow delegates, explore care innovations and continue conversations from the morning sessions.",
  },
  {
    time: "2:15 PM",
    title: "Parallel Policy Sessions",
    body: "Five focused rooms. Five critical questions about the future of care.",
  },
  {
    time: "3:45 PM",
    kicker: "Closed Institutional Roundtable",
    title: "From Conversation to Commitment",
    body: "An institutional roundtable bringing together government, regulatory, financing and practice leaders, focused on refining the emerging National Position on Care as Infrastructure and identifying practical pathways for implementation.",
  },
  {
    time: "5:15 PM",
    kicker: "Closing Plenary",
    title: "The National Position",
    body: "The conference closes with a readout of key discussions, proposed actions and next steps. The goal is not simply to have a conversation about care. It is to define what comes next.",
    highlight: true,
  },
  {
    time: "5:45 PM",
    title: "Conference Close",
    body: "Delegates depart with the emerging national position and next steps.",
  },
];

export const ROOMS = [
  {
    room: "Room A",
    title: "Who Cares for Nigeria?",
    subtitle: "Care Workforce Development and Protection",
    body: "Recognition, certification, training, and labour protection for the people who deliver care, with regulators, nursing academics, training institutions, and practising care workers in the room.",
  },
  {
    room: "Room B",
    title: "The Journey Between",
    subtitle: "Care Coordination and Continuity of Care",
    body: "The path from hospital discharge to home. Hospital leaders, insurers, rehabilitation specialists, and coordination leads on making continuity of care reimbursable and routine.",
  },
  {
    room: "Room C",
    title: "You Cannot Finance What You Cannot Count",
    subtitle: "Digital Health, Care Data, and Financing",
    body: "The merged data and financing room: the national data layer beneath every financing decision, benefit design, pooled financing, and the legislative pathway that moves home healthcare into structured financing.",
  },
  {
    room: "Room D",
    title: "Pitch and Demo",
    subtitle: "Innovation Showcase",
    body: "Live pitches and demonstrations from innovators building for care, presented in the cinema room before delegates, institutions, and funders. Pitching is free for selected startups.",
  },
  {
    room: "Room E",
    title: "Conference on Ageing",
    subtitle: "Healthy Ageing and Care of Older Persons",
    body: "A dedicated session on ageing in Nigeria: what growing older at home requires of families, communities, and the health system. Delivered in partnership with Kaleyewa House, a non profit that has supported elderly Nigerians for more than two decades under the promise of Ageing with Dignity.",
  },
];

export const SPEAKERS = [
  {
    name: "Dr. Adeola Onakoya",
    role: "Keynote Speaker",
    initials: "AO",
    bio: "Dr. Adeola Onakoya will deliver the keynote address, setting the context for the 2026 conversation around care as critical infrastructure for Nigeria.",
  },
  {
    name: "Prof. Amina Mohammed",
    role: "Panel Chair",
    initials: "AM",
    bio: "Prof. Amina Mohammed will chair one of the conference's key panel conversations, guiding the discussion and connecting diverse perspectives around the future of care.",
  },
  {
    name: "Barr. Chukwuma Eze",
    role: "Panelist",
    initials: "CE",
    bio: "Barr. Chukwuma Eze joins the conference as a panelist, contributing to the broader conversation on the policy, regulatory and institutional dimensions of care.",
  },
  {
    name: "Dr. Fatima Bello",
    role: "Panelist",
    initials: "FB",
    bio: "Dr. Fatima Bello joins the panel discussions bringing a healthcare perspective to the conversation around care delivery and health-system strengthening.",
  },
  {
    name: "Mr. Olusegun Adebayo",
    role: "Panelist",
    initials: "OA",
    bio: "Mr. Olusegun Adebayo contributes to the conference dialogue as a panelist, bringing his perspective to the evolving care ecosystem.",
  },
  {
    name: "Mrs. Ngozi Okafor",
    role: "Panelist",
    initials: "NO",
    bio: "Mrs. Ngozi Okafor joins the conference as a panelist, contributing to the conversation on building more responsive and sustainable systems of care.",
  },
  {
    name: "Dr. Emeka Nwosu",
    role: "Panelist",
    initials: "EN",
    bio: "Dr. Emeka Nwosu contributes to the conference discussions, bringing professional insight into the challenges and opportunities shaping care in Nigeria.",
  },
  {
    name: "Ms. Aisha Dikko",
    role: "Moderator",
    initials: "AD",
    bio: "Ms. Aisha Dikko will moderate the conference discussions, facilitating meaningful dialogue between speakers, stakeholders and delegates.",
  },
];

export const TAKEAWAYS = [
  {
    title: "Shape Policy",
    body: "Contribute directly to conversations informing a national position on care.",
  },
  {
    title: "Learn",
    body: "Explore global and local approaches to integrated, home and community-based care.",
  },
  {
    title: "Connect",
    body: "Build relationships with policymakers, healthcare leaders, innovators, investors and care providers.",
  },
  {
    title: "Discover",
    body: "Explore new technologies, organisations and approaches transforming care delivery.",
  },
  {
    title: "Contribute",
    body: "Be part of the movement toward Universal Health Coverage and stronger health systems.",
  },
  {
    title: "Build Partnerships",
    body: "Find opportunities for collaboration across policy, healthcare, technology, research and community development.",
  },
];

export const RECOGNITIONS = [
  "Recognised within national policy",
  "Properly measured and documented",
  "Supported by digital infrastructure",
  "Delivered through trained and protected workers",
  "Integrated across hospitals, homes and communities",
  "Supported through sustainable financing",
  "Included within broader health-system planning",
];

export const CARESOUK_EXHIBITORS = [
  {
    name: "CareConnect Nigeria",
    category: "Digital Health",
    description:
      "A digital platform connecting families with verified home care providers across Lagos and Abuja.",
  },
  {
    name: "HealthBridge Systems",
    category: "Telemedicine",
    description:
      "Telehealth solutions enabling remote consultations and continuous patient monitoring from home.",
  },
  {
    name: "MamaCare Foundation",
    category: "Maternal Health",
    description:
      "Community-based maternal and child health programmes reaching underserved populations.",
  },
  {
    name: "WellHome Technologies",
    category: "IoT & Monitoring",
    description:
      "Smart home health devices for tracking vitals and alerting caregivers to changes in patient status.",
  },
  {
    name: "NurseGrid Africa",
    category: "Workforce",
    description:
      "A staffing platform matching trained nurses and caregivers with healthcare facilities and home care clients.",
  },
  {
    name: "CareFinance NG",
    category: "Health Financing",
    description:
      "Micro-insurance and payment solutions making home care affordable for low-income families.",
  },
];

export const PARTNER_TIERS = [
  {
    tier: "Platinum",
    benefits: [
      "Premier branding on all conference materials",
      "Keynote speaking opportunity",
      "Exclusive exhibition space at CareSouk",
      "Full-page feature in conference programme",
      "VIP access to institutional roundtable",
      "Dedicated media coverage",
    ],
    price: "₦10,000,000",
  },
  {
    tier: "Gold",
    benefits: [
      "Prominent branding on conference materials",
      "Panel speaking opportunity",
      "Premium exhibition space at CareSouk",
      "Half-page feature in conference programme",
      "VIP access to closing plenary",
    ],
    price: "₦5,000,000",
  },
  {
    tier: "Silver",
    benefits: [
      "Branding on conference website and signage",
      "Exhibition space at CareSouk",
      "Quarter-page feature in conference programme",
      "Access to networking sessions",
    ],
    price: "₦2,500,000",
  },
  {
    tier: "Bronze",
    benefits: [
      "Logo on conference website",
      "Shared exhibition space at CareSouk",
      "Listing in conference programme",
    ],
    price: "₦1,000,000",
  },
];

export const CASE_STATS = [
  {
    number: "~71%",
    text: "of Nigeria's health spending is out of pocket",
    source: "WHO Global Health Expenditure Database, 2023",
  },
  {
    number: "10 to 13%",
    text: "of the population is covered by health insurance",
    source: "FMOH&SW, February 2026",
  },
  {
    number: "~29%",
    text: "of deaths in Nigeria are from noncommunicable diseases, the conditions that most demand continuing care at home",
    source: "WHO NCD Country Profile, Nigeria",
  },
  {
    number: "6m to 16m",
    text: "Nigerians aged 65 and above, approximately, between 2020 and 2050",
    source: "UN World Population Prospects",
  },
];

export const CASE_GAPS = [
  "No publicly accessible national home care dataset.",
  "No consolidated public register of home care providers.",
  "Telemedicine operating without a dedicated regulatory framework.",
];


