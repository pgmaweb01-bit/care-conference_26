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

export const PAYMENT_LINK = "https://paystack.shop/pay/careconferene26";

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

export type Speaker = {
  name: string;
  role: string;
  image: string;
  bio?: string;
};

export const SPEAKERS: Speaker[] = [
  {
    name: "Hon. Omobolanle Akinyemi-Obe",
    role: "Director General, National Senior Citizens Centre",
    image: "/speakers/hon-omobolanle-akinyemi-obe.jpg",
    bio: [
      "Honourable Omobolanle Akinyemi-Obe is an accomplished public administrator, educationist and development advocate with a distinguished record of service in governance, education, community development and social welfare. She currently serves as the Director General of the National Senior Citizens Centre (NSCC), where she provides strategic leadership in advancing the welfare, dignity, care and inclusion of older persons in Nigeria.",
      "A graduate of History and International Studies from Lagos State University, where she also obtained a Master's degree, Hon. Akinyemi-Obe further holds a Diploma from the Maria Montessori Centre for Education. She is also the founder of Itana Schools in Surulere, Lagos, reflecting her longstanding commitment to education, human development and intergenerational progress.",
      "Her extensive public service experience includes two terms as Executive Chairman of Coker/Aguda Local Council Development Area, as well as appointments as a Permanent Member of the Lagos State Universal Basic Education Board, a Full-Time Member of the Lagos State Scholarship Board and a Member of the Lagos State Market Board.",
      "Demonstrating her commitment to advancing knowledge and global best practices in ageing, Hon. Akinyemi-Obe was a participant at the 55th Annual Conference of the British Society of Gerontology (BSG), hosted by Oxford Brookes University from June 24 to 26, 2026. Her participation further reflects her interest in engaging with global conversations, research and emerging approaches to ageing, gerontology and the wellbeing of older persons.",
      "A passionate advocate for inclusive development and social protection, Hon. Akinyemi-Obe brings a people-centred approach to public leadership. Her experience in grassroots governance, education and community development continues to shape her vision for a society where older persons are respected, protected, supported and actively engaged in national development.",
      "As Director General of the National Senior Citizens Centre, she is committed to strengthening age-sensitive policies and programmes, promoting healthy and dignified ageing, expanding access to relevant services and advancing the inclusion of senior citizens in Nigeria's development agenda.",
      "Hon. Omobolanle Akinyemi-Obe represents a leadership style defined by experience, compassion, strategic vision and an unwavering commitment to improving the quality of life of Nigeria's senior citizens.",
    ].join("\n\n"),
  },
  {
    name: "Dr OluToyin Akande-Ajala",
    role: "Consultant Geriatrician, FRCP",
    image: "/speakers/dr-olutoyin-akande-ajala.jpg",
    bio: [
      "Dr OluToyin Akande-Ajala, a luminary in geriatric medicine, is a UK-trained and fully certified Consultant Geriatrician, Fellow of the Royal College of Physicians of London (FRCP), and a passionate advocate for healthy aging.",
      "She obtained her Certificate of Completion of Specialist Training in Geriatric Medicine and Internal Medicine from the London Deanery of the United Kingdom. She has over 30 years of experience working in Geriatric Medicine within the UK's NHS.",
      "In 2018, recognising a critical gap in Geriatric Care in Nigeria, she established JBS Medicare Services, a pioneering hospital-at-home service that has become a leading provider of geriatric healthcare in Nigeria. Under her leadership, JBS Medicare Services ensures personalised and dignified medical and social care for the elderly.",
      "In 2021, she founded JBS Elderly Care Foundation Africa, to cater for underprivileged older adults across Sub-Saharan Africa through initiatives including its hallmark Adopt a Gran Programme.",
      "In 2023, she established JBS Gerontology Centre, Lekki, Lagos, Nigeria's first private Geriatrics Hospital and Specialist Centre for the Older Age Group.",
      "JBS Gerontology Centre is a specialist hospital providing comprehensive inpatient and outpatient medical care for older adults, including acute medical admissions, stroke management, dementia management, specialist outpatient clinics, rehabilitation and medical repatriations. It also boasts Nigeria's first Dementia Day Activities Unit and Memory Clinic. Since commencing operations, the Centre has registered over 2,000 patients from across Nigeria and Sub-Saharan Africa.",
      "In 2017, she was appointed Visiting Consultant Geriatrician at the Chief Tony Anenih Geriatric Centre, University College Hospital, Ibadan, by Nigeria's Minister of Health. She has also contributed to the Centre's Basic Certificate Course in Geriatric Medicine for doctors.",
      "She is the Convener of The Healthier Aging Conference and has received several awards for her contribution to healthcare in both Nigeria and the United Kingdom.",
      "She is married to a Consultant Obstetrician and Gynaecologist, and they have four children.",
      "An avid traveller, she has visited all seven continents, including Antarctica, and 84 countries.",
    ].join("\n\n"),
  },
  {
    name: "Dr. Ifeoma Orifa",
    role: "Executive Director, AccentCare Home Health Services",
    image: "/speakers/dr-ifeoma-orifa.jpg",
    bio: [
      "Dr. Ifeoma Orifa is a registered nurse, healthcare entrepreneur and experienced nursing leader with over 15 years of experience across nursing, healthcare operations, workforce development and patient-centred care.",
      "She is the Executive Director of AccentCare Home Health Services, a healthcare organisation focused on delivering compassionate, professional and person-centred care to older adults, vulnerable individuals and families within the home and assisted-living environment.",
      "Through AccentCare and its training arm, AccentCare Academy, Dr. Orifa has been actively involved in developing and preparing caregivers and healthcare professionals for the realities of modern care delivery. Her work reflects a strong commitment to bridging the gap between healthcare needs and the availability of a competent, ethical and adequately prepared care workforce.",
      "Her professional interests include geriatric nursing, home healthcare, caregiver development, workforce capacity building, ageing and long-term care, patient safety, and the professionalisation and protection of caregivers.",
      "Dr. Orifa brings to the care sector a unique combination of clinical nursing experience and entrepreneurial leadership. She understands the realities of care delivery not only from the perspective of a healthcare professional, but also from that of an organisation responsible for recruiting, training, deploying and supporting care workers.",
      "She is passionate about building a care ecosystem in Nigeria where caregivers are properly trained, appropriately recognised, fairly treated and equipped to provide safe, dignified and compassionate care.",
      "As a panelist at The Care Conference 2026, Dr. Orifa brings a practical, frontline and systems-level perspective to the conversation on Care Workforce Development and Protection, with a particular interest in how Nigeria can build a sustainable care workforce that serves both those who receive care and those who provide it.",
    ].join("\n\n"),
  },
  {
    name: "Dr. Nkajima Nwakaji",
    role: "Founder, KajiCare",
    image: "/speakers/dr-nkajima-nwakaji.jpg",
    bio: [
      "Dr. Nkajima is a medical doctor, clinical researcher, healthcare entrepreneur, and the Founder of KajiCare, an elder home-care and concierge agency focused on professional, compassionate, and clinically informed care, with particular expertise in dementia and memory care.",
      "She holds an MSc in Clinical Trials from the University of London and has professional experience with Médecins Sans Frontières (MSF). Dr. Nkajima is particularly passionate about advancing the recognition of care as an essential component of health and social infrastructure. She advocates for a shift from viewing home and community care as informal support to recognising it as a professional, accountable, evidence-informed component of the healthcare system, supported by appropriate standards, trained caregivers, clinical oversight, technology, and meaningful family engagement.",
      "Through KajiCare, she brings practical experience of the systems, workforce, and accountability required to deliver safe, high-quality care beyond the hospital. She is passionate about advancing care as an essential component of Nigeria's health and social infrastructure and ensuring that older adults can age with dignity, safety, and quality of life.",
    ].join("\n\n"),
  },
  {
    name: "Chike Chukwuelue",
    role: "Group Head, Equity Investments, BOI",
    image: "/speakers/chike-chukwuelue.jpg",
    bio: [
      "Chike Chukwuelue is a seasoned finance professional with over 20 years of experience across banking, corporate finance, investment structuring, and development finance. He is currently the Group Head, Equity Investments at the Bank of Industry (BOI), Nigeria's oldest and foremost Development Finance Institution.",
      "His experience spans SME, commercial and corporate banking, treasury and financial markets, private equity, and deal origination and structuring. He has been involved in mobilising approximately US$7 billion in funding from international financial institutions, working with development finance institutions and government-backed financial institutions.",
      "At BOI, his work focuses on equity investments, portfolio management, and structuring investments that support business growth and economic development. He is particularly interested in private capital, innovative financing solutions, and investments that promote enterprise growth, job creation, and sustainable economic development in Nigeria and across Africa.",
    ].join("\n\n"),
  },
  {
    name: "Zahid Ali",
    role: "Digital Health Strategist & Founder, TECHMEDO",
    image: "/speakers/zahid-ali.jpg",
    bio: [
      "Zahid Ali is a digital health strategist and health system transformation leader with more than two decades of experience in healthcare IT, AI and data. He is Founder of TECHMEDO, a Rural health transformation platform, with a focus on underserved and remote populations.",
      "Over the last decade, Zahid has led digital transformation of healthcare at country and state level, shaping the digital platforms, data architecture and information systems that underpin modern health services. His expertise spans interoperability (FHIR/HL7), smart hospital design, value-based care and national-scale health data integration.",
      "Zahid has worked with leading institutions including Harvard, UCSF, Mayo Clinic, Houston Methodist and Cleveland Clinic, and has advised the NHS on AI adoption. He leads the Integration of Data subgroup within the WHO/Europe Public Health Innovation Platform, serves on the IT Advisory Committee of the Indus Hospital and Health Network, and sits on multiple advisory boards and regulatory and standards task forces.",
      "A recognized thought leader, he has spoken at more than 30 international conferences, including HIMSS, HLTH, CHIME, KLAS, FII, SDAIA and the Global Health Exhibition. His honors include the HIMSS EMERGE 2025 Innovation Award, the HIMSS 2022 Changemaker Award, Global CIO 200 recognition and selection as a Prix Galien USA finalist.",
    ].join("\n\n"),
  },
  {
    name: "Opeyemi Adamolekun",
    role: "Governance Advocate & Co-Founder, EiE Nigeria",
    image: "/speakers/opeyemi-adamolekun.jpg",
    bio: [
      "Opeyemi is an active citizen, advocate and thought leader, working at the intersection of governance, public accountability and the rights & responsibilities of citizens. From 2011 to 2025, she served as the Pioneer Executive Director of Enough is Enough (EiE) Nigeria, a non-partisan network of individuals and organisations committed to building a culture of good governance & public accountability in Nigeria through active citizenship. She is a co-Founder of the organisation and continues to serve on the Board.",
      "Under her leadership, EiE led or participated in the most significant protests in Nigeria in the last 15 years: #OccupyNigeria, #OpenNASS, #BringBackOurGirls, #OneVoice, #EndSARS, and #EndBadGovernance. Its flagship #RSVP: Register to vote | Select credible candidates | Vote not fight | Protect your vote Campaign, which promotes civic education and participation, is Nigeria's longest-running get-out-the-vote campaign. With the “Select” component, EiE has hosted / co-hosted the most debates of different formats in Nigeria, pioneering multilingual and multi-channel debates.",
      "To mark its 5th anniversary in 2015, EiE started the ‘Office of the Citizen’ Campaign, focused on teaching citizens their rights & responsibilities as they occupy the highest office in the land. To mark its 10th anniversary in 2020, EiE created the #OnePerson Campaign to highlight the impact one person can have in their community, as “One person can and does make a difference.”",
      "Opeyemi serves on the Board of Kaleyewa Elder Care Foundation (aka Kaleyewa House), an NGO founded by her late mother. She also serves on the boards of These Genes Foundation (sickle cell advocacy), ThisDay Newspapers (editorial), and NewsCentral TV (editorial). In 2018, she was named one of the Most Influential People of African Descent (MIPAD), endorsed by the United Nations in the Humanitarian & Religious category. In May 2022, she won the Global Citizen Prize.",
      "Opeyemi has a first degree in Mathematics & Economics from the University of Virginia; an MSc in Development Studies from The London School of Economics (LSE), and an MBA from Oxford University's Said Business School.",
    ].join("\n\n"),
  },
  {
    name: "Tobiloba Ajayi",
    role: "Founder, Let Cerebral Palsy Kids Learn Foundation",
    image: "/speakers/tobiloba-ajayi.jpg",
    bio: [
      "Tobiloba has over 17 years experience working with various organisations in the Disability Management sector in different countries. She holds a degree in Law and was called to the Nigerian Bar in 2008. She also holds a Masters Degree in International Law. She started by working on Disability Policy as a member of the Nigerian Vision 20:20:20 policy drafting team, and went on to work with various NGO's in a quest to improving the lives of persons with disabilities.",
      "In March 2017, she launched ‘The Let Cerebral Palsy Kids Learn Foundation’ to promote inclusive mainstream education for children with Cerebral Palsy in Nigeria. This was born out of a realization in 2016, during her Mandela Washington Fellowship Professional Development Experience; that children with Cerebral palsy were being excluded from mainstream education by the school system in Nigeria.",
      "To date, the Foundation has provided support to 1000+ children and their families and enabled over 150+ of these children access inclusive education. Each family accesses continuous counselling, referrals, school placement supports and school readiness assessments. The project has also trained over 1000 Teachers in its bid to address the knowledge and skill gap of mainstream classroom teachers to engage children with Cerebral Palsy in their classrooms.",
      "Tobiloba is also a 9 time published author- 5 of which are books in the Cerebral Palsy Rollercoaster Series, a series of books that cover various areas of managing a Cerebral Palsy diagnosis.",
    ].join("\n\n"),
  },
  {
    name: "Tara Koko",
    role: "Beauty Founder & Business Executive",
    image: "/speakers/tara-koko.jpg",
    bio: "Tara Koko is a thoroughbred professional with public speaking experience spanning over 25 years and over 16 years of Business Leadership as a Beauty Founder and Executive.",
  },
  {
    name: "Esther Adeshina",
    role: "Registered Nurse & Founder, Fonia Academy",
    image: "/speakers/esther-adeshina.jpg",
    bio: [
      "Esther Adeshina is a visionary leader and Registered Nurse working at the intersection of community development, corporate leadership, and communications. She is deeply committed to building quality minds and creating environments where young people can thrive, guided by the belief that personal development drives community transformation.",
      "She is a multiple award-winning public speaker; Founder and Lead Facilitator at Fonia Academy where she helps individuals discover, develop, and deploy their voices with confidence and clarity.",
      "In addition to facilitating sessions on effective communication, she serves as an event host and master of ceremonies for high-impact events, bringing the ambience, warmth, and exquisite professionalism needed at such events.",
    ].join("\n\n"),
  },
  { name: "Dr. Bosun Tijani", role: "", image: "/speakers/dr-bosun-tijani.jpg" },
  { name: "Dr. Alhassan Ndagi", role: "", image: "/speakers/dr-alhassan-ndagi.jpg" },
  { name: "Dr. Victoria Egunjobi", role: "", image: "/speakers/dr-victoria-egunjobi.jpg" },
  { name: "Olayinka Aremu", role: "", image: "/speakers/olayinka-aremu.jpg" },
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
      "Host your side event",
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
