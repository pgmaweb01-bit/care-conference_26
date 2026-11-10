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
  image?: string;
  bio?: string;
};

export const SPEAKERS: Speaker[] = [
  {
    name: "Abiola Hakeemat Etti-Ayilara",
    role: "Convener, Care Conference. Founder, The Purple Global Mission",
    image: "/speakers/abiola-hakeemat-etti-ayilara.jpg",
    bio: [
      "Abiola Ayilara is a Nigerian nurse, health informatics leader, and systems entrepreneur redefining how home and community-based care is structured across Africa. She is the Founder and CEO of MyQura, a technology-enabled care coordination platform, and the Founder of The Purple Global Mission, a healthcare initiative advancing professional education, prevention outreach, and workforce development.",
      "She began her clinical training at the Lagos State College of Nursing, Awolowo Road, Ikoyi, before relocating abroad to expand her academic and clinical expertise. She earned a Bachelor’s degree in Nursing, a Master’s degree in Nursing with a specialization in Palliative Care, and later a Master’s degree in Healthcare Analytics and Artificial Intelligence. She also holds advanced academic training in Health Informatics from Sheffield Hallam University (UK), alongside studies in Healthcare Management and executive education in Patient Quality & Safety from Harvard Business School.",
      "Her clinical career in the United Kingdom exposed her to structured patient care coordination systems, multidisciplinary collaboration, and continuity-of-care models that significantly improved patient outcomes and quality of life after hospital discharge. Returning to Nigeria, she identified a stark structural gap, a far cry from the coordinated systems she had experienced abroad. In much of Africa, patients often survive acute hospital treatment only to return home to informal, unsupported environments without supervision, documentation, or escalation pathways.",
      "The issue became deeply personal following the loss of a loved one due to poor informal post-discharge care. That experience solidified her resolve to design structured care support pathways that protect vulnerable individuals beyond hospital walls.",
      "In response, she founded MyCare Assistant in 2021, now restructured as MyQura, an integrated home and community-based care ecosystem bridging hospitals, families, and trained caregivers. The launch of the MyQura App marked a major milestone, enabling supervised caregivers, digital documentation, and coordinated escalation pathways directly within homes. By addressing long-term care complications in stroke recovery, oncology support, elderly stabilization, and chronic disease management, MyQura improves quality of life for vulnerable individuals while reducing preventable deterioration.",
      "Under her leadership, more than 1,000 care professionals have been trained, formalizing what is often invisible informal caregiving into accountable, income-generating work. The organization has also expanded to include ambulance and event medical response services, reinforcing continuity of care across settings.",
      "Alongside MyQura, Abiola founded The Purple Global Mission, which provides professional education for healthcare workers, hosts national mixer events for care professionals to connect and share professional insights, and leads community prevention outreaches. During these outreaches, the team delivers on-the-spot care, conducts basic health screenings, and facilitates referral pathways for ill patients, bridging underserved communities with formal healthcare systems. The Mission cultivates a growing professional network where care workers gain education, mentorship, and work opportunities.",
      "Abiola serves as a Wimboard Fellow, Executive Committee Chair for Membership at the Women in Healthcare Network, and a volunteer member of the HIMSS TIGER working group for healthcare professionals.",
      "Her thought leadership centres on “Care as Infrastructure”, the conviction that home and community-based care systems must be structured, supervised, digitally integrated, and economically viable to support sustainable health systems in emerging markets. She has convened national dialogues such as Care Ignite and the Care Conference, bringing together clinicians, policymakers, technologists, and community leaders to address workforce shortages, discharge gaps, and continuity-of-care challenges.",
      "Beyond enterprise, Abiola is deeply committed to women’s economic empowerment and workforce formalization. Over 90% of MyQura’s trained care professionals are women, many transitioning from unpaid informal caregiving roles into structured professional income pathways. Her work sits at the intersection of health systems strengthening, digital transformation, and female workforce participation in Africa.",
      "As a global speaker and advocate, she continues to engage ministries, health institutions, and international stakeholders on scalable models for coordinated home and community-based care. Her long-term vision is to position MyQura as a national care infrastructure platform that bridges hospitals, families, and trained professionals through accountable, technology-driven systems, strengthening continuity of care and improving quality of life across Africa.",
    ].join("\n\n"),
  },
  {
    name: "Dr. 'Bosun Tijani",
    role: "Minister of Communications, Innovation and Digital Economy of the Federal Republic of Nigeria",
    image: "/speakers/dr-bosun-tijani.jpg",
    bio: [
      "Dr. 'Bosun Tijani is the Minister of Communications, Innovation and Digital Economy of the Federal Republic of Nigeria.",
      "An accomplished entrepreneur and business leader, Dr. Tijani is a pioneer in the African startup ecosystem and has been instrumental in driving innovation and fostering the growth of tech startups across the continent.",
      "He is the co-founder and former CEO of Co-Creation Hub (CcHUB), the leading pan-African technology and innovation center with presence in Nigeria, Kenya, Rwanda and Namibia. Founded in 2010, CcHUB has played a pivotal role in nurturing startups through mentorship programs, funding initiatives, and access to essential resources.",
      "Under his leadership, CcHUB became a vital catalyst for the African tech ecosystem, promoting collaboration, knowledge sharing and the development of groundbreaking solutions to local and global challenges. Dr. Tijani's visionary leadership, passion for technology, and commitment to fostering a thriving startup ecosystem have made him a respected figure in the African tech communities. His dedication to creating opportunities and driving innovation continues to inspire the next generation of entrepreneurs in Nigeria and beyond.",
      "Prior to CcHUB, he led the networking and coordination of leading innovation agencies across Europe as European Innovation Manager at PERA, with the aim of standardizing the varying methodologies for commercializing research results. He had also previously worked at the International Trade Centre, in Geneva Switzerland overseeing the design and implementation of technical support programmes geared towards enlightening and assisting exporters in Sub-Saharan Africa in maximising the use of information and communication technologies for export marketing.",
      "Dr. Tijani is an exemplary scholar who holds a Bachelor's Degree in Economics from the University of Jos, a Masters degree in Information Systems and Management from Warwick University and a Doctorate degree in Innovation and Economic Development from the University of Leicester.",
      "He is also an adjunct professor at the Wits School of Governance, South Africa.",
      "His PhD research focussed on contributing to a better understanding of how the network perspective to innovation capacity serves as a contextually relevant framework for explaining the adoption and adaptation of innovation in developing countries and offers an alternative path to how African countries can effectively organise to strengthen their innovation ecosystems.",
      "He was a member of the UK Advisory Committee on Digital Access Africa, a Committee member for NESG on Science and Technology and a member of the Expert Advisory Group to the European Commission on mainstreaming technology and innovation in the relationship between Europe and Africa.",
      "Dr. Tijani is a Desmond Tutu Fellow and fellow of the Centre for Democracy and Rule of Law at the prestigious Stanford University and is happily married with three children.",
    ].join("\n\n"),
  },
  {
    name: "Dr Obiageli Obi Ezekwesili",
    role: "Special Guest of Honour and Chair, The Homecare Framework - Care as Infrastructure for Everyday Life",
    image: "/speakers/dr-obiageli-ezekwesili.jpg",
    bio: [
      "Obiageli ‘Oby’ Katryn Ezekwesili is a Chartered Accountant and former Vice President of the World Bank for Africa overseeing more than 1,500 staff with responsibility for the delivery of projects, economic and sectoral work in 47 Sub-Saharan countries with a lending portfolio of nearly $40 billion.",
      "She is a Senior Economic Advisor, Africa Economic Development Policy Initiative at Open Society Foundation, advising nine reform-committed African heads of state on their economic development strategy, policies, and implementation.",
      "Before this, Ezekwesili who holds a Masters Degree in International Law & Diplomacy from the University of Lagos, a Masters Degree in Public Policy & Administration from Harvard University’s Kennedy School of Government, and a Bachelors Degree from the University of Nigeria, worked with Deloitte & Touche as an auditor, management, and financial services consultant. She then served as a founding Director of Transparency International (TI) and as its Director for Africa from 1994 to 1999. From 2000 to 2002, she worked with Professor Jeffrey Sachs as Director of the Harvard-Nigeria Economic Strategy program, during which time she was also appointed as an aide to former President Olusegun Obasanjo.",
      "She served as Minister of Education and Minister of Solid Minerals in the Nigerian government during the Obasanjo administration. While in government, Ezekwesili led the restructuring and refocusing of the Education Ministry for the attainment of Education for All (EfA) targets and Millennium Development Goals. She also introduced the Public-Private Partnership models for education service delivery; revamped the Federal Inspectorate Service as an improved quality assurance mechanism and introduced transparency and accountability mechanisms for better governance of the budget.",
      "As Minister of Solid Minerals, she oversaw the passage of the Minerals and Mining Act, the establishment of the Nigerian Mining Cadastre Office, and opening of the sector to private participation.",
      "Ezekwesili led the establishment of the Innovation and Vocational Enterprise Institutions initiatives which focuses on the development of skills for economic competitiveness, and in conjunction with the Nigerian Stock Exchange, launched the ‘Adopt-A-School’ program, an initiative that fosters philanthropy by corporations, community groups, and individuals.",
      "She is the architect of the Bureau for Public Procurement legislation, pioneer head of the Budget Monitoring and Price Intelligence Unit aka Due Process, key member of the Economic Team of the President, member of the Power Sector Reform Team which engineered the Power Sector Act of 2007, and pioneer Chairperson of the Nigeria Extractive Industries Transparency Initiative (NEITI), leading on the legislation that created the initiative and first ever national implementation of the global EITI standards.",
      "Ezekwesili, who is one of the co-founders of Transparency International – the global anti-corruption body with headquarters in Berlin, Germany, functioning as the organization’s Director for Africa from 1994 to 1999 – was given the national award of Commander of the Order of the Federal Republic (CFR). She holds an Honorary Doctorate Degree from the University of Agriculture, Abeokuta, and the University of Sussex, England, United Kingdom for her work in promoting transparency and accountability in government and lending a voice to the importance of the office of the citizen.",
      "She was recently shortlisted as nominee for the Nobel Peace Prize by PRIO of Norway owing to her “efforts in making the world more transparent and less corrupt”.",
      "Ezekwesili is on the board of Bharti Airtel, World Wildlife Fund (WWF), the School of Public Policy of Central European University, The Harold Hartog School of Government and Policy, New Africa Magazine, The Center for Global Leadership at Tufts University, and Global Advisory Board of Facebook’s Community Leadership Program. She is a member of Board of Directors of the Economic Policy Think Tank, AfriHeritage Institute, member of The Global Board of Governors, NCMG International, member of the UN Refugee Agency (UNHCR)’s Advisory Group on Gender, Forced Displacement and Protection, and member of the Advisory Board of the Atlantic Dialogues.",
      "She was in 2014 selected as one of the British Broadcasting Corporation 100 Women, TIME Magazine 100 Most Influential People in the World in 2015, and Genius: 100 Visions of the Future by the Albert Einstein Foundation in 2017.",
      "Ezekwesili has a long history of socio-political activism under her belt as evidenced in her work as good governance advocate starting from her days as a young professional in the late ‘80s, as member and first woman to Chair The Concerned Professionals Citizens Movement which championed democracy in the ‘90s, and advocate to end military rule and restoration of the annulled presidential election of Moshood Abiola.",
      "She co-founded the Bring Back Our Girls pressure group in 2014 raising global awareness for the rescue of over 200 schoolgirls kidnapped in Borno. The group’s activities continue to be a reference point in the struggle to ensure all the girls kidnapped by terrorists in Nigeria’s North East region are reunited with their families. She is the Founder and Convener of the #RedCardMovement (RCM), a citizens’ centered advocacy movement which started organically in January 2018. The movement was borne out of citizens’ determination to end the recurrent plague of bad governance in Nigeria regardless of which political party has held sway at national, state, and local government levels.",
      "Oby Ezekwesili, who is a sought after speaker, advocate for good governance and active citizenship, is married to Chinedu Ezekwesili. They are blessed with three children.",
      "Open Society Foundation: She served as Senior Economic Adviser for the Africa Economic Development Policy Initiative, directly advising the leaders and policymakers of some African countries on their economic strategy and policy reforms to boost investment and create jobs in the Mano River region. The three-year initiative expanded to include other countries across Africa.",
    ].join("\n\n"),
  },
  {
    name: "Hon. Medinat Omobolanle Akinyemi-Obe",
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
    name: "Alhaji Dr. Ndagi Alhassan",
    role: "Registrar, Nursing and Midwifery Council of Nigeria",
    image: "/speakers/dr-alhassan-ndagi.jpg",
  },
  {
    name: "Prof. Akin Abayomi",
    role: "Honourable Commissioner for Health, Lagos State",
  },
  {
    name: "Dr Kemi Ogunyemi",
    role: "Special Adviser on Health to the Governor Lagos State",
    image: "/speakers/dr-kemi-ogunyemi.jpg",
  },
  {
    name: "Dr Emmanuella Zamba",
    role: "Permanent Secretary/CEO, Lagos State Health Management Agency",
    image: "/speakers/dr-emmanuella-zamba.jpg",
  },
  {
    name: "Dr. Victoria Egunjobi",
    role: "Executive Secretary, Health Facility Monitoring and Accreditation Agency (HEFAMAA)",
    image: "/speakers/dr-victoria-egunjobi.jpg",
  },
  {
    name: "Adenike Oyetunde-Lawal",
    role: "General Manager, Lagos State Office for Disability Affairs (LASODA)",
    image: "/speakers/adenike-oyetunde-lawal.jpg",
  },
  {
    name: "Dr Simisola Alabi",
    role: "Physician | Health Policy Consultant | Founder, Dr. Simisola Alabi Foundation",
    image: "/speakers/dr-simisola-alabi.jpg",
  },
  {
    name: "Chike Chukwuelue",
    role: "Group Head, Equity Investments, Bank of Industry Limited",
    image: "/speakers/chike-chukwuelue.jpg",
    bio: [
      "Chike Chukwuelue is a seasoned finance professional with over 20 years of experience across banking, corporate finance, investment structuring, and development finance. He is currently the Group Head, Equity Investments at the Bank of Industry (BOI), Nigeria's oldest and foremost Development Finance Institution.",
      "His experience spans SME, commercial and corporate banking, treasury and financial markets, private equity, and deal origination and structuring. He has been involved in mobilising approximately US$7 billion in funding from international financial institutions, working with development finance institutions and government-backed financial institutions.",
      "At BOI, his work focuses on equity investments, portfolio management, and structuring investments that support business growth and economic development. He is particularly interested in private capital, innovative financing solutions, and investments that promote enterprise growth, job creation, and sustainable economic development in Nigeria and across Africa.",
    ].join("\n\n"),
  },
  {
    name: "Prof Prisca Adejumo",
    role: "Special Guest of Honour and Co-Chair, The Homecare Framework - Care as Infrastructure for Everyday Life",
    image: "/speakers/prof-prisca-adejumo.jpg",
  },
  {
    name: "Dr OluToyin Akande-Ajala",
    role: "MD/Founder, JBS Gerontology Centre",
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
    name: "Zahid Ali",
    role: "Digital Health Strategist, Founder TECHMEDO",
    image: "/speakers/zahid-ali.jpg",
    bio: [
      "Zahid Ali is a digital health strategist and health system transformation leader with more than two decades of experience in healthcare IT, AI and data. He is Founder of TECHMEDO, a Rural health transformation platform, with a focus on underserved and remote populations.",
      "Over the last decade, Zahid has led digital transformation of healthcare at country and state level, shaping the digital platforms, data architecture and information systems that underpin modern health services. His expertise spans interoperability (FHIR/HL7), smart hospital design, value-based care and national-scale health data integration.",
      "Zahid has worked with leading institutions including Harvard, UCSF, Mayo Clinic, Houston Methodist and Cleveland Clinic, and has advised the NHS on AI adoption. He leads the Integration of Data subgroup within the WHO/Europe Public Health Innovation Platform, serves on the IT Advisory Committee of the Indus Hospital and Health Network, and sits on multiple advisory boards and regulatory and standards task forces.",
      "A recognized thought leader, he has spoken at more than 30 international conferences, including HIMSS, HLTH, CHIME, KLAS, FII, SDAIA and the Global Health Exhibition. His honors include the HIMSS EMERGE 2025 Innovation Award, the HIMSS 2022 Changemaker Award, Global CIO 200 recognition and selection as a Prix Galien USA finalist.",
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
    role: "MD/Founder KajiCare",
    image: "/speakers/dr-nkajima-nwakaji.jpg",
    bio: [
      "Dr. Nkajima is a medical doctor, clinical researcher, healthcare entrepreneur, and the Founder of KajiCare, an elder home-care and concierge agency focused on professional, compassionate, and clinically informed care, with particular expertise in dementia and memory care.",
      "She holds an MSc in Clinical Trials from the University of London and has professional experience with Médecins Sans Frontières (MSF). Dr. Nkajima is particularly passionate about advancing the recognition of care as an essential component of health and social infrastructure. She advocates for a shift from viewing home and community care as informal support to recognising it as a professional, accountable, evidence-informed component of the healthcare system, supported by appropriate standards, trained caregivers, clinical oversight, technology, and meaningful family engagement.",
      "Through KajiCare, she brings practical experience of the systems, workforce, and accountability required to deliver safe, high-quality care beyond the hospital. She is passionate about advancing care as an essential component of Nigeria's health and social infrastructure and ensuring that older adults can age with dignity, safety, and quality of life.",
    ].join("\n\n"),
  },
  {
    name: "Dr. Gbonjubola Abiri",
    role: "C.E.O Redi-Med Consulting Services",
    image: "/speakers/dr-gbonjubola-abiri.jpg",
  },
  {
    name: "Bisola Edun",
    role: "MD/CEO Taé",
    image: "/speakers/bisola-edun.jpg",
  },
  {
    name: "Olayinka Aremu",
    role: "Founder and CEO, AgeWell CareLink",
    image: "/speakers/olayinka-aremu.jpg",
  },
  {
    name: "Opeyemi 'Yemi' Adamolekun",
    role: "Board Member, Kaleyewa Elder Care Foundation",
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
    name: "Tobilola Ajayi",
    role: "Chief Responsibility Officer, The Let Cerebral Palsy Kids Learn Foundation",
    image: "/speakers/tobiloba-ajayi.jpg",
    bio: [
      "Tobilola has over 17 years experience working with various organisations in the Disability Management sector in different countries. She holds a degree in Law and was called to the Nigerian Bar in 2008. She also holds a Masters Degree in International Law. She started by working on Disability Policy as a member of the Nigerian Vision 20:20:20 policy drafting team, and went on to work with various NGO's in a quest to improving the lives of persons with disabilities.",
      "In March 2017, she launched ‘The Let Cerebral Palsy Kids Learn Foundation’ to promote inclusive mainstream education for children with Cerebral Palsy in Nigeria. This was born out of a realization in 2016, during her Mandela Washington Fellowship Professional Development Experience; that children with Cerebral palsy were being excluded from mainstream education by the school system in Nigeria.",
      "To date, the Foundation has provided support to 1000+ children and their families and enabled over 150+ of these children access inclusive education. Each family accesses continuous counselling, referrals, school placement supports and school readiness assessments. The project has also trained over 1000 Teachers in its bid to address the knowledge and skill gap of mainstream classroom teachers to engage children with Cerebral Palsy in their classrooms.",
      "Tobilola is also a 9 time published author- 5 of which are books in the Cerebral Palsy Rollercoaster Series, a series of books that cover various areas of managing a Cerebral Palsy diagnosis.",
    ].join("\n\n"),
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
