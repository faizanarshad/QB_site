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
  education: EducationItem[];
  achievements: string[];
  linkedin: string;
  github: string;
  twitter: string;
};

/** Single source for Usman's expertise badges (team card + profile). */
const USMAN_EXPERTISE_LABELS: readonly string[] = [
  "Software Engineering",
  "Full Stack",
  "System Design",
];

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
    role: "Head of Digital Marketing",
    image: "/images/team/hamza.webp",
    imageObjectClassName: "object-cover",
    shortBio:
      "Digital marketing expert driving growth and brand awareness through innovative strategies.",
    fullBio:
      "Hamza leads digital marketing and demand generation for QBrix Solutions. He focuses on clear positioning of complex technical offerings, multi-channel campaigns, and analytics-driven optimization—aligning marketing with sales and delivery.",
    expertise: ["Digital Marketing", "SEO/SEM", "Social Media Strategy"],
    experience: [
      {
        title: "Head of Digital Marketing",
        organization: "QBrix Solutions",
        period: "Present",
        description:
          "Brand, campaigns, content, and performance marketing leadership.",
      },
      {
        title: "Growth & digital marketing",
        organization: "B2B technology",
        period: "Prior experience",
        description:
          "Lead generation, marketing automation, and analytics.",
      },
    ],
    education: [
      {
        degree: "Marketing / Communications / related",
        institution: "University or professional programs",
      },
    ],
    achievements: [
      "Built measurable funnel reporting tied to pipeline and content performance",
      "Strengthens QBrix brand presence across digital channels",
      "Partners with leadership on messaging for AI and services offerings",
    ],
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    slug: "muhammad-usman",
    name: "Muhammad Usman",
    role: "Senior Software Engineer",
    image: "/images/team/usman.webp",
    imageObjectClassName: "object-cover object-top",
    shortBio:
      "Software engineer focused on end-to-end delivery, performance, and maintainable systems.",
    fullBio:
      "Usman builds and evolves client-facing applications and internal tooling with emphasis on code quality, performance, and developer experience. He contributes across the stack—from APIs and data layers to modern frontends—and collaborates on architecture for scalable features.",
    expertise: [...USMAN_EXPERTISE_LABELS],
    experience: [
      {
        title: "Senior Software Engineer",
        organization: "QBrix Solutions",
        period: "Present",
        description:
          "Feature delivery, refactoring, reviews, and technical mentorship.",
      },
      {
        title: "Software development",
        organization: "Product & services",
        period: "Prior experience",
        description:
          "Web applications, integrations, and performance optimization.",
      },
    ],
    education: [
      {
        degree: "Computer Science / Software Engineering (or related)",
        institution: "University program",
      },
    ],
    achievements: [
      "Delivers reliable releases with testing and observability in mind",
      "Helps standardize patterns for Next.js/React and API design",
      "Supports cross-team integration between AI services and product UIs",
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

/** Expertise strings to show on team cards and profile (normalized + pinned where needed). */
export function expertiseForMember(member: TeamMember): string[] {
  if (member.slug === "muhammad-usman") {
    return [...USMAN_EXPERTISE_LABELS];
  }
  return member.expertise.map(formatExpertiseLabel);
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}

export function getAllTeamSlugs(): string[] {
  return teamMembers.map((m) => m.slug);
}
