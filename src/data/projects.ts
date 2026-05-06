export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "Backend" | "API" | "Full-Stack" | "Open Source" | "Mobile" | "Web";
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  featured: boolean;
  year: number;
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Money Tracker App",
    description: "Mobile application for tracking personal finances",
    longDescription: "A Flutter-based mobile application designed to help users track their daily income and expenses efficiently.",
    category: "Mobile",
    tech: ["Flutter", "Dart"],
    featured: true,
    year: 2025,
    highlights: ["Built with Flutter for cross-platform support", "Intuitive user interface for tracking expenses"],
  },
  {
    id: "2",
    title: "Sistem Aplikasi Berbasis Web Laundry",
    description: "Web-based laundry management system",
    longDescription: "A comprehensive laundry management system built with CodeIgniter to handle customer orders, status tracking, and reporting.",
    category: "Web",
    tech: ["CodeIgniter", "PHP", "MySQL"],
    featured: true,
    year: 2024,
    highlights: ["Order tracking and management", "Reporting and analytics for laundry business"],
  },
  {
    id: "3",
    title: "Nota Dinas KOMINFOTIK Jakarta Selatan",
    description: "Web-based official memo application for KOMINFOTIK",
    longDescription: "A web-based official memo application developed for KOMINFOTIK Jakarta Selatan, built with CodeIgniter to streamline official communications.",
    category: "Web",
    tech: ["CodeIgniter", "PHP", "MySQL"],
    featured: true,
    year: 2024,
    highlights: ["Streamlined official communications", "Digital memo tracking and archiving"],
  },
  {
    id: "4",
    title: "Company Profile CMS PT.Mitra Graha Integrasi",
    description: "Content Management System for company profile",
    longDescription: "A custom CMS built with NestJS to manage the company profile and content for PT. Mitra Graha Integrasi.",
    category: "Backend",
    tech: ["NestJS", "TypeScript"],
    featured: true,
    year: 2025,
    highlights: ["Custom CMS features", "Built with modern Node.js framework (NestJS)"],
  },
  {
    id: "5",
    title: "ReflectQ App",
    description: "Application powered by Supabase",
    longDescription: "ReflectQ is an application built with Supabase providing a scalable backend and real-time features.",
    category: "Full-Stack",
    tech: ["Supabase"],
    featured: false,
    year: 2024,
    highlights: ["Real-time data synchronization", "Powered by Supabase for backend as a service"],
  },
  {
    id: "6",
    title: "Ticketing IT Helpdesk PT.Wavetek Integra Nusa",
    description: "Web-based ticketing system for IT helpdesk",
    longDescription: "An IT helpdesk ticketing system built with CodeIgniter to manage internal IT issues and requests efficiently for PT. Wavetek Integra Nusa.",
    category: "Web",
    tech: ["CodeIgniter", "PHP", "MySQL"],
    featured: true,
    year: 2024,
    highlights: ["Issue tracking and resolution management", "User-friendly interface for submitting tickets"],
  }
];
