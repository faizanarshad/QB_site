export type ExperienceItem = {
  title: string;
  organization: string;
  period: string;
  description?: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  year?: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  technologies: string;
  role: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Tailwind classes for next/image fill (object position) */
  imageObjectClassName: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  experience: ExperienceItem[];
  /** Optional highlighted projects (e.g. portfolio work). */
  projects?: ProjectItem[];
  education: EducationItem[];
  achievements: string[];
  linkedin: string;
  github: string;
  twitter: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "faizan-arshad",
    name: "Faizan Arshad",
    role: "Chief Executive Officer",
    image: "/images/team/faizan.webp",
    imageObjectClassName: "object-cover object-top",
    shortBio:
      "Visionary leader driving innovation and excellence at QBrix Solutions.",
    fullBio:
      "Faizan leads QBrix Solutions with a focus on sustainable growth, client outcomes, and a culture of innovation. He sets company strategy across AI services, delivery, and partnerships, ensuring every engagement aligns with long-term value for healthcare, retail, and industrial clients.",
    expertise: ["AI Strategy", "Business Leadership", "Innovation"],
    experience: [
      {
        title: "Chief Executive Officer",
        organization: "QBrix Solutions",
        period: "Present",
        description:
          "Overall P&L, vision, and executive sponsorship of major client programs.",
      },
      {
        title: "Executive leadership & advisory",
        organization: "Technology & services sector",
        period: "Previous roles",
        description:
          "Strategy, go-to-market, and scaling delivery organizations.",
      },
    ],
    education: [
      {
        degree: "Executive leadership & business (continuous)",
        institution: "Industry programs & certifications",
      },
    ],
    achievements: [
      "Established QBrix Solutions as a trusted partner for AI and automation delivery",
      "Drives cross-functional alignment between engineering, product, and client success",
      "Champions ethical AI and clear communication with stakeholders",
    ],
    linkedin: "https://www.linkedin.com/in/mfaizanarshad/",
    github: "https://github.com/faizanarshad",
    twitter: "https://x.com/Faizaan_Arshad",
  },
  {
    slug: "zeeshan-arshad",
    name: "Zeeshan Arshad",
    role: "Chief Technology Officer",
    image: "/images/team/zeeshan.webp",
    imageObjectClassName: "object-cover object-top",
    shortBio:
      "Technology expert overseeing all technical aspects and product development.",
    fullBio:
      "Zeeshan owns the technical roadmap at QBrix Solutions—from architecture standards and cloud strategy to engineering quality and security. He works closely with delivery teams to ensure scalable, maintainable systems across AI, data, and full-stack engagements.",
    expertise: ["System Architecture", "AI Development", "Cloud Computing"],
    experience: [
      {
        title: "Chief Technology Officer",
        organization: "QBrix Solutions",
        period: "Present",
        description:
          "Technology vision, architecture review board, and engineering leadership.",
      },
      {
        title: "Senior engineering & architecture",
        organization: "Enterprise software & cloud",
        period: "Prior experience",
        description:
          "Large-scale distributed systems, DevOps practices, and AI platform integration.",
      },
    ],
    education: [
      {
        degree: "Computer Science & engineering (relevant field)",
        institution: "University program",
      },
    ],
    achievements: [
      "Defines reference architectures for client and internal platforms",
      "Mentors senior engineers and promotes engineering excellence",
      "Aligns technology choices with performance, cost, and compliance goals",
    ],
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    slug: "iqra-nazir",
    name: "Iqra Nazir",
    role: "Lead Robotics Engineer",
    image: "/images/team/iqra.webp",
    imageObjectClassName: "object-cover",
    shortBio:
      "Robotics engineer with a passion for automation and intelligent systems.",
    fullBio:
      "Iqra leads robotics and automation initiatives, combining control systems, sensing, and software to deliver reliable solutions for industrial and operational workflows. She collaborates with AI and software teams to integrate perception, planning, and safe human–machine interaction.",
    expertise: ["Robotics", "Automation", "IoT Integration"],
    experience: [
      {
        title: "Lead Robotics Engineer",
        organization: "QBrix Solutions",
        period: "Present",
        description:
          "End-to-end robotics solutions: design, integration, testing, and deployment support.",
      },
      {
        title: "Automation & robotics engineering",
        organization: "Industry projects",
        period: "Prior experience",
        description:
          "PLC/robot integration, simulation, and field commissioning.",
      },
    ],
    education: [
      {
        degree: "Robotics / Mechatronics / related engineering",
        institution: "University program",
      },
    ],
    achievements: [
      "Delivered automation systems with measurable uptime and safety improvements",
      "Bridges hardware teams with software and AI for integrated solutions",
      "Active contributor to internal standards for robotics delivery",
    ],
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    slug: "mohammad-farhan",
    name: "Mohammad Farhan",
    role: "Senior AI/ML Engineer",
    image: "/images/team/farhan.png",
    imageObjectClassName: "object-cover object-top",
    shortBio:
      "AI/ML engineer focused on production models, experimentation, and scalable pipelines.",
    fullBio:
      "Farhan designs, trains, and deploys machine learning systems for real-world constraints—latency, data quality, and monitoring. He works across computer vision, NLP, and classical ML, partnering with product and infrastructure to ship reliable models and evaluation practices.",
    expertise: [
      "Deep Learning",
      "MLOps",
      "Python",
      "Model Evaluation",
      "Cloud ML",
    ],
    experience: [
      {
        title: "Senior AI/ML Engineer",
        organization: "QBrix Solutions",
        period: "Present",
        description:
          "Model development, experimentation frameworks, and production deployment.",
      },
      {
        title: "Machine learning engineering",
        organization: "Technology sector",
        period: "Prior experience",
        description:
          "End-to-end ML pipelines, feature stores, and model serving.",
      },
    ],
    education: [
      {
        degree: "Computer Science / Data Science (or related)",
        institution: "University program",
      },
    ],
    achievements: [
      "Shipped models used in client production environments with monitoring and rollback plans",
      "Improves reproducibility and documentation across ML projects",
      "Collaborates with stakeholders to translate business metrics into model objectives",
    ],
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    slug: "hamza",
    name: "Hamza",
    role: "Social Media Ads Manager",
    image: "/images/team/hamza.webp",
    imageObjectClassName: "object-cover object-top",
    shortBio:
      "Social Media Ads Manager specializing in Meta, TikTok, and Amazon PPC—building and scaling campaigns that turn data and creativity into measurable business growth.",
    fullBio:
      "Hamza is a Social Media Ads Manager specializing in Meta, TikTok, and Amazon PPC. He builds and scales campaigns that transform data and creativity into measurable business growth. Partnering with eCommerce brands and service-based businesses, he provides end-to-end campaign management—strategy development, creative direction, ad copywriting, execution, optimization, and performance reporting. His approach integrates analytical rigor with compelling creative storytelling to capture attention, convert audiences, and foster community growth. Every campaign is engineered for profitability while building lasting brand impact.",
    expertise: [
      "Meta Ads",
      "TikTok Ads",
      "Amazon PPC",
      "Paid Media",
      "Creative Strategy",
    ],
    experience: [
      {
        title: "Social Media Ads Manager",
        organization: "QBrix Solutions",
        period: "March 2026 – Present",
        description: `• Leads paid social and marketplace advertising across Meta, TikTok, and Amazon PPC for QBrix and partner brands.
• End-to-end campaign management: strategy, creative direction, copy, launch, optimization, and reporting tied to revenue and ROAS.
• Aligns creative and analytics to improve conversion, audience growth, and profitable scaling in eCommerce and service verticals.`,
      },
      {
        title: "Social Media & Content Manager",
        organization: "IBLC · Lahore, Pakistan",
        period: "July 2025 – Feb 2026",
        description: `• Shaped the center's digital presence through strategic content and community engagement.
• Developed and executed content across platforms that reflects the school's nurturing environment and specialized therapy programs.
• Managed content calendars and storytelling initiatives that communicate IBLC's unique value.`,
      },
      {
        title: "Facebook Manager & Creative Designer",
        organization: "BOFT · Lahore, Pakistan",
        period: "Feb 2024 – July 2025",
        description: `• Developed and executed Meta daily posting schedules that doubled lead generation.
• Designed creatives while monitoring performance metrics to optimize strategy; strengthened the brand's online presence through consistent campaign success.`,
      },
      {
        title: "Meta Ads Manager",
        organization: "HashClub · Lahore, Pakistan",
        period: "Aug 2024 – Feb 2025",
        description: `• Led Meta Ads campaigns that increased reach, engagement, and conversions for a fashion brand.
• Created visually compelling content and managed posting schedules to grow the audience base.
• Applied A/B testing and targeting refinement to maximize ROI.`,
      },
      {
        title: "Shopify Store Creation & Social Media Ads Advisor",
        organization: "AdaptZone · USA",
        period: "April 2024 – Nov 2024",
        description: `• Scaled Facebook Ads campaigns globally for an ergonomic product line, achieving consistent sales growth.
• Managed the Shopify storefront and aligned ads with the customer journey for higher conversions.
• Applied data-driven insights to refine targeting, creatives, and budgets.`,
      },
      {
        title: "Facebook Ads Specialist",
        organization: "Just Clean · West Yorkshire, UK",
        period: "May 2022 – Dec 2023",
        description: `• Ran Facebook Lead Ads that generated consistent inquiries for a UK-based cleaning service.
• Improved cost efficiency by refining targeting and creative messaging; helped establish a reliable digital funnel for lead generation.`,
      },
      {
        title: "Meta Ads & Facebook Marketing Manager",
        organization: "Happy Trails Pakistan · Lahore, Pakistan",
        period: "Jan 2020 – Feb 2023",
        description: `• Drove brand visibility and engagement in travel and tourism; improved cost efficiency through targeting and creative refinement.
• Helped establish a reliable digital funnel for lead generation.
• Applied social media strategies for a leading travel company, growing online presence and community engagement.`,
      },
    ],
    education: [
      {
        degree: "Bachelor of Science",
        institution: "University of the Punjab, Lahore",
        year: "2016–2020",
      },
      {
        degree: "Facebook Ads Specialist",
        institution: "Extreme Commerce",
        year: "2021",
      },
      {
        degree: "AI in Digital Marketing",
        institution: "Simplilearn",
        year: "2023",
      },
    ],
    achievements: [
      "Designs campaigns for profitability first—clear KPIs, structured tests, and disciplined budget pacing",
      "Combines creative storytelling with performance data to improve CTR, conversion, and community growth",
      "Trusted partner for eCommerce and service businesses from strategy through ongoing optimization",
    ],
    linkedin: "https://www.linkedin.com/in/hamza-nazir/",
    github: "#",
    twitter: "#",
  },
  {
    slug: "muhammad-usman",
    name: "Muhammad Usman",
    role: "Senior Software Engineer",
    image: "/images/team/usman.webp",
    imageObjectClassName: "object-cover object-[50%_0%]",
    shortBio:
      "Accomplished software engineer with 5+ years in backend and full-stack development, specializing in .NET, microservices, and AI-driven enterprise platforms.",
    fullBio:
      "Accomplished software engineer with 5+ years of experience in backend and full-stack development, specializing in .NET, microservices, and AI-driven enterprise platforms. Skilled in designing scalable architectures, integrating enterprise systems, and delivering robust solutions in Agile environments. Proficient in cloud-native development, Kubernetes, Kafka, RESTful APIs, and payment workflows, with a strong track record of leading projects from design to deployment while ensuring high performance, reliability, and maintainability.",
    expertise: [
      ".NET",
      "Microservices",
      "Kubernetes",
      "Kafka",
      "REST APIs",
      "Full Stack",
      "Cloud Computing",
      "Software Engineering",
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        organization: "QBrix Solutions",
        period: "April 2026 – Present",
        description:
          "Senior software engineer delivering backend and full-stack work for client platforms, AI-driven products, and integrations—.NET, APIs, microservices, and cloud-native patterns in line with QBrix delivery standards.",
      },
      {
        title: "Senior Software Engineer — .NET / FastAPI",
        organization: "Addo AI",
        period: "April 2024 – March 2026",
        description: `• Led backend development across multiple projects including an enterprise-grade AI platform, focusing on scalability, reliability, and integration with external enterprise systems.
• Contributed to low-level design (LLD), including system architecture planning and data flow diagrams.
• Designed and implemented event-driven microservices with Apache Kafka: topic design, message flow optimization, partitions, and dead letter queues (DLQs).
• Analyzed and planned integrations with external systems and APIs including SAP and Microsoft Dynamics (MSD).
• Operated Kubernetes for monitoring and troubleshooting microservices: cluster concepts (pods, services, deployments), log analysis, and debugging with Lens.`,
      },
      {
        title: "Senior Software Engineer — .NET",
        organization: "NorthBay Solutions",
        period: "Nov 2022 – April 2024",
        description: `• Improved core platform services in .NET Framework and delivered full-stack features from database through backend with solid engineering principles.
• Designed and implemented subscription flows with Stripe, including invoicing and secure payment processing.
• Built a matrices feature for law firms to compare multiple documents and sections accurately.
• Integrated PDF and Word conversion tooling; improved format compatibility and document management.
• Worked in Agile: backlog creation and grooming, sprint planning, demos, and client coordination.`,
      },
      {
        title: ".NET Developer",
        organization: "3s Solutions (Pvt) Ltd",
        period: "Nov 2021 – Nov 2022",
        description: `• Planned and implemented scalable RESTful web services exposing JSON to web and mobile clients.
• Delivered incremental enhancements on schedule against sprint goals.
• Delivered single sign-on (SSO) across client applications.
• Tested APIs with Postman, JMeter, and SOAP UI; supported CI/CD with Jenkins and Git.`,
      },
      {
        title: "Software Engineer — JavaScript / .NET",
        organization: "IMSI Technologies",
        period: "Oct 2020 – Nov 2022",
        description: `• Enhanced a desktop application for performance and new capabilities.
• Built interactive canvas with drag-and-drop for cards, letters, drawings, and multimedia.
• Ran complex tests, debugging, and system hardening.
• Partnered with QA and UX in stand-ups to iterate on UI from feedback.`,
      },
    ],
    projects: [
      {
        name: "J&J BionicAssist",
        description:
          "An AI-powered customer inquiry management solution on top of Dynamics 365, leveraging agentic AI to automate and enhance the end-to-end inquiry lifecycle, including intelligent case triaging, routing, investigation, and resolution.",
        technologies:
          ".NET, FastAPI, Azure AD, Dynamics 365, Kafka, Kubernetes, React, PostgreSQL, Elasticsearch",
        role: "Lead backend developer",
      },
      {
        name: "Intelligize",
        description:
          "A web-based compliance and analytics platform for legal, accounting, and finance professionals to research, analyze, and benchmark SEC (Securities and Exchange Commission) filings and regulatory disclosures.",
        technologies: ".NET Core, React, JavaScript, SQL Server, LINQ, Redis",
        role: "Backend developer",
      },
      {
        name: "Dilner's Secure Client Portal",
        description:
          "A paperless online platform for accountants to securely exchange documents and payroll information with clients. It offers unlimited portals for staff and clients, working across PCs and mobile devices for secure file sharing and communication.",
        technologies:
          ".NET MVC, Razor Web Pages, JavaScript, MySQL, SignalR, Entity Framework Core (ORM)",
        role: "Full stack developer",
      },
      {
        name: "The Printshop",
        description:
          "A desktop application for Windows and Mac for creating personalized print projects such as greeting cards, banners, business cards, and marketing materials.",
        technologies: ".NET MVC, Electron.NET, AngularJS, Bootstrap",
        role: "Full stack developer",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Information Technology",
        institution: "PUCIT, Lahore",
        year: "July 2016 – Aug 2020",
      },
    ],
    achievements: [
      "Coursework: Data Structures, Algorithms, Databases, Computer Systems, Linear Algebra",
      "Final year project: Transportation assistant app providing local transit options (buses, metro, vans) from source to destination with travel time and cost estimates for convenience, efficiency, and budget planning",
      "Skills: .NET, SQL (MySQL, PostgreSQL), microservices architecture, Kafka, Kubernetes, Stripe, Redis, Firebase, Azure AD auth, REST APIs, LINQ, HTML/CSS, JavaScript, AngularJS, SignalR",
      "Tools: Jira, Bitbucket, Kubernetes Lens, Jenkins, Kibana, DBeaver, Visual Studio, Postman, JMeter, Hangfire, RedisInsight, Apache JMeter, browser developer tools, Swagger",
    ],
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
];

/** Maps legacy expertise strings to display labels (team cards + profile). */
export function formatExpertiseLabel(skill: string): string {
  if (skill === "Full-Stack Development" || skill === "Full Stack Development") {
    return "Full Stack";
  }
  return skill;
}

/** Expertise strings to show on team cards and profile (normalized). */
export function expertiseForMember(member: TeamMember): string[] {
  return member.expertise.map(formatExpertiseLabel);
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}

export function getAllTeamSlugs(): string[] {
  return teamMembers.map((m) => m.slug);
}
