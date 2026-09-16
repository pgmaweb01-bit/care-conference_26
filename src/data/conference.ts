export const EVENT = {
  name: "The Care Conference 2026",
  edition: "Third Edition",
  theme: "Care as Infrastructure",
  subtitle: "Building a National Position on Home Healthcare in Nigeria",
  date: "Thursday 19 November 2026",
  time: "08:00 – 17:45",
  venue: "IALA Hub, The Chair Centre, Lagos",
  organiser: "The Purple Global Mission",
  organiserDescription:
    "A Nigerian not for profit healthcare professional development and advocacy organisation, established 2018.",
  thesis: "You cannot finance care you cannot count.",
  type: "An independent, non partisan national convening",
};

export const STATS = [
  {
    n: "~71%",
    t: "of Nigeria's health spending is out of pocket",
    src: "WHO Global Health Expenditure Database, 2023",
  },
  {
    n: "10 to 13%",
    t: "of the population is covered by health insurance",
    src: "FMOH&SW, February 2026",
  },
  {
    n: "~29%",
    t: "of deaths in Nigeria are from noncommunicable diseases, the conditions that most demand continuing care at home",
    src: "WHO NCD Country Profile, Nigeria",
  },
  {
    n: "6m to 16m",
    t: "Nigerians aged 65 and above, approximately, between 2020 and 2050",
    src: "UN World Population Prospects",
  },
];

export const GAPS = [
  "No publicly accessible national home care dataset.",
  "No consolidated public register of home care providers.",
  "Telemedicine operating without a dedicated regulatory framework.",
];

export const POLICY_LAYERS = [
  {
    no: "1",
    title: "Care Workforce Development and Protection",
    body: "Recognition, certification, training, and labour protection for the people who deliver care.",
  },
  {
    no: "2",
    title: "Clinical Governance and Quality Assurance",
    body: "What safe care at home requires: standards, oversight, and accountability beyond the facility walls.",
  },
  {
    no: "3",
    title: "Care Coordination and Continuity of Care",
    body: "The managed journey from hospital bed to home, and the continuity that reduces avoidable readmissions.",
  },
  {
    no: "4",
    title: "Digital Health Infrastructure and Care Data Systems",
    body: "The data layer beneath every financing decision: national datasets, care records, and interoperability.",
  },
  {
    no: "5",
    title: "Care Financing, Policy and Regulatory Architecture",
    body: "Benefit design, pooled financing, and the legislative pathway from out of pocket spending to structured financing.",
  },
];

export const SPINE_NOTE =
  "Layer 4 is the spine of the convening. Counting comes before financing, which is why the thesis of the conference is: you cannot finance care you cannot count.";

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
  tag?: string;
  tagType?: "default" | "closed";
};

export const PROGRAMME: ProgrammeItem[] = [
  {
    time: "08:00",
    title: "Registration and CareSouk opens",
    body: "Delegate check in. The CareSouk, the conference's fully digital exhibition, runs on venue screens throughout the day.",
  },
  {
    time: "09:00",
    title: "Opening ceremony",
    body: "Convener welcome, opening keynote framing the National Position, ministerial address, and goodwill messages from institutional partners.",
  },
  {
    time: "Morning",
    title: "Keynotes and panels across the five layers",
    body: "Three keynotes and three panels carry the framework: digital health with financing, care coordination with the care workforce and family caregivers, and clinical governance and quality assurance. Exact running order is published with the final programme.",
    tag: "Main stage, all delegates",
    tagType: "default",
  },
  {
    time: "Midday",
    title: "Showcase: The Homecare Framework, then lunch and CareSouk",
    body: "A showcase of The Homecare Framework: Care as Infrastructure for Everyday Life, flowing into lunch, structured networking, and the digital exhibition.",
  },
  {
    time: "14:15",
    title: "Side rooms: five parallel sessions",
    body: "Every delegate attends one of five rooms: the care workforce, the hospital to home journey, counting and financing care, the pitch and demo showcase, or the conference on ageing. Seats are assigned in advance from your selection below.",
    tag: "Choose one of five, advance selection",
    tagType: "default",
  },
  {
    time: "15:45",
    title: "Closed institutional roundtable",
    body: "Twenty to thirty principals from government, regulation, financing, and practice contest and refine the National Position text. General delegates continue with the CareSouk, exhibitor spotlights, and networking.",
    tag: "Invitation only",
    tagType: "closed",
  },
  {
    time: "17:15",
    title: "Closing plenary",
    body: "Roundtable readout, unveiling of next steps for the National Position, and closing remarks from the convener.",
    tag: "Main stage, all delegates",
    tagType: "default",
  },
  {
    time: "17:45",
    title: "Close",
    body: "",
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
    tier: "CareSouk Exhibition",
    benefits: [
      "The conference's fully digital exhibition, carried on venue screens through the day",
      "Two packages: Dedicated Screen and Showcase Loop",
      "The venue is fully cladded, so exhibition is screen based, with no physical booths to build or staff",
    ],
  },
  {
    tier: "Pitch and Innovation Partner",
    benefits: [
      "Power the Pitch and Demo room",
      "The partner underwrites the showcase so that pitching stays free for selected startups",
      "Stands before the room where care innovation meets institutions and funders",
    ],
  },
  {
    tier: "Session and Room Partnership",
    benefits: [
      "Partner a plenary, a side room, or a framework layer",
      "The way Kaleyewa House partners the Conference on Ageing",
      "Session partnership pairs your institution with the policy conversation closest to your mandate",
    ],
  },
];
