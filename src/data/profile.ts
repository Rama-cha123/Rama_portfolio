/** Personal details, experience, skills and credentials — edit here. */

export const profile = {
  name: "B. Rama Chandra",
  shortName: "Rama Chandra",
  role: "AI Technology Intern & Creative Technologist",
  email: "bheemanapalliram@gmail.com",
  phone: "+91 8074068137",
  phoneHref: "tel:+918074068137",
  location: "Guntur, Andhra Pradesh, India",
  socials: {
    linkedin: "https://www.linkedin.com/in/b-rama-chandra-646a1b293/",
    github: "https://github.com/Rama-cha123",
    instagram: "https://www.instagram.com/auraaniimate.ai/",
  },
  languages: ["English", "Hindi", "Telugu"],
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "lab", label: "Creative Lab" },
  { id: "showreel", label: "Showreel" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const experience = {
  role: "AI Technology Intern",
  company: "SZ Ventures",
  mode: "Remote",
  period: "August 2026 – Present",
  responsibilities: [
    {
      title: "AI/ML applications",
      body: "Developing AI/ML applications and digital infrastructure.",
    },
    {
      title: "Generative AI with Gemini",
      body: "Implementing Generative AI solutions using Gemini APIs.",
    },
    {
      title: "Prompt engineering & RAG",
      body: "Designing prompts and retrieval-augmented generation (RAG) workflows.",
    },
    {
      title: "AI-assisted development",
      body: "Building applications with AI-assisted development practices.",
    },
    {
      title: "Automation & integrations",
      body: "Creating automation workflows and API integrations.",
    },
    {
      title: "Multi-venture infrastructure",
      body: "Supporting technology infrastructure across multiple ventures.",
    },
  ],
};

export interface SkillCategory {
  id: string;
  name: string;
  tagline: string;
  tools: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "video",
    name: "AI Video Generation",
    tagline: "Turning prompts into moving images.",
    tools: ["HeyGen", "Runway ML", "OpenAI Sora", "InVideo"],
  },
  {
    id: "creative",
    name: "AI Creative Tools",
    tagline: "Ideation, imagery and design at speed.",
    tools: ["ChatGPT", "Midjourney", "Canva Magic Studio"],
  },
  {
    id: "genai",
    name: "Generative AI",
    tagline: "Models, prompts and generated content.",
    tools: ["Gemini APIs", "Prompt Engineering", "AI Content Generation"],
  },
  {
    id: "editing",
    name: "Video Editing",
    tagline: "Cutting rhythm, pace and emotion.",
    tools: ["CapCut", "KwaiCut", "Adobe Premiere Pro"],
  },
  {
    id: "production",
    name: "Creative Production",
    tagline: "The craft behind every frame.",
    tools: [
      "Cinematic Storytelling",
      "Scriptwriting",
      "Visual Composition",
      "Voiceover Synchronization",
    ],
  },
  {
    id: "strategy",
    name: "Content Strategy",
    tagline: "Formats built for how people watch.",
    tools: ["YouTube Shorts", "Instagram Reels", "Long-form Video Production"],
  },
];

export const education = [
  {
    degree: "B.Tech — Computer Science Engineering (AI & ML)",
    school: "Acharya Nagarjuna University",
    period: "2022 – 2026",
    score: "CGPA 8.00 / 10",
  },
  {
    degree: "Intermediate — MPC",
    school: "Narayana Junior College",
    period: "2020 – 2022",
    score: "76%",
  },
];

export const certifications = [
  { name: "Prompt Engineering", issuer: "IBM SkillsBuild" },
  { name: "Gen AI Academy", issuer: "Google Cloud & Hack2skill" },
];
