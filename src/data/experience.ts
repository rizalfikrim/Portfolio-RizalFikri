export type Experience = {
  id: string;
  company: string;
  position: string;
  period: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance';
  location: string;
  description: string[];
  tech: string[];
  logo?: string;
};

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'PT Mitra Graha Integrasi',
    position: 'Backend Developer Intern',
    period: 'Nov 2025 - Present',
    type: 'Internship',
    location: 'Indonesia',
    description: [
      'Backend development for company profile CMS',
      'Worked with Nest.js to build CMS applications'
    ],
    tech: ['NestJS', 'TypeScript']
  },
  {
    id: '2',
    company: 'PT Wavetek Integra Nusa',
    position: 'Web Developer Intern',
    period: 'Jul 2024 - Okt 2024',
    type: 'Internship',
    location: 'Indonesia',
    description: [
      'Developed web-based ticketing IT helpdesk system',
      'Worked with CodeIgniter to build robust applications'
    ],
    tech: ['CodeIgniter', 'PHP']
  }
];