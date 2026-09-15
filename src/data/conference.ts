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
    title: "Policy & Governance",
    body: "Creating the policies, institutions and regulatory structures required to recognise and strengthen care.",
  },
  {
    no: "02",
    title: "Infrastructure & Systems Design",
    body: "Designing systems that connect healthcare facilities, homes, communities and care providers.",
  },
  {
    no: "03",
    title: "Digital Health & Technology",
    body: "Using technology, data and digital systems to make care visible, connected and measurable.",
  },
  {
    no: "04",
    title: "Workforce & Care Economy",
    body: "Building, training, recognising and protecting the people who provide care.",
  },
  {
    no: "05",
    title: "Community & Cultural Competence",
    body: "Developing care models that understand Nigeria's communities, families, cultures and lived realities.",
  },
  {
    no: "06",
    title: "Non-Communicable Disease Management",
    body: "Strengthening long-term care for people living with chronic and non-communicable conditions.",
  },
  {
    no: "07",
    title: "Maternal & Child Health",
    body: "Building stronger systems of care for mothers, children and families across the continuum of care.",
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
    body: "Four focused rooms. Four critical questions about the future of care.",
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
    subtitle: "The Care Workforce",
    body: "Who provides care, and what does Nigeria need to do to support them? This session explores workforce development, recognition, certification, training, labour protection and the future of professional care work.",
  },
  {
    room: "Room B",
    title: "The Journey Between",
    subtitle: "From Hospital to Home",
    body: "A patient's care does not end at hospital discharge. This session examines care coordination and continuity between hospitals, homes, community providers and families.",
    focus:
      "Building systems that ensure people do not fall through the gaps between healthcare settings.",
  },
  {
    room: "Room C",
    title: "You Cannot Finance What You Cannot Count",
    subtitle: "Data, Digital Health & Care Infrastructure",
    body: "What we cannot see in the data is difficult to plan for, measure or finance. This session explores digital health infrastructure, care data systems, national digital architecture, claims data and interoperability.",
  },
  {
    room: "Room D",
    title: "Paying for the Load-Bearing Layer",
    subtitle: "Financing & Regulation",
    body: "Care requires sustainable financing. This session examines benefit design, pooled financing, policy and regulatory architecture and the legislative pathway required to strengthen home care in Nigeria.",
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

export const REGISTRATION_TYPES = [
  {
    type: "Standard Delegate",
    price: "₦25,000",
    includes: [
      "Full conference access",
      "CareSouk entry",
      "Conference materials",
      "Lunch & refreshments",
    ],
  },
  {
    type: "Professional",
    price: "₦50,000",
    includes: [
      "All Standard benefits",
      "Priority seating",
      "VIP networking session",
      "Digital certificate of participation",
    ],
  },
  {
    type: "Institutional",
    price: "₦150,000",
    includes: [
      "All Professional benefits",
      "Team table (up to 5 delegates)",
      "Roundtable access",
      "Speaker meet & greet",
    ],
  },
  {
    type: "Student / Researcher",
    price: "₦10,000",
    includes: [
      "Full conference access",
      "CareSouk entry",
      "Conference materials",
      "Valid student ID required",
    ],
  },
];
