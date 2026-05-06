export type Skill = {
  name: string;
  level: number; // 1-100
  icon: string; // react-icons name
  color: string; // hex color
};

export type SkillCategory = {
  category: string;
  icon: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: 'FaCode',
    skills: [
      { name: 'JavaScript', level: 90, icon: 'SiJavascript', color: '#F7DF1E' },
      { name: 'Python', level: 85, icon: 'SiPython', color: '#3776AB' },
      { name: 'PHP', level: 85, icon: 'SiPhp', color: '#777BB4' },
      { name: 'SQL', level: 85, icon: 'SiPostgresql', color: '#4169E1' },
      { name: 'Dart', level: 75, icon: 'SiDart', color: '#0175C2' }
    ]
  },
  {
    category: 'Backend Frameworks',
    icon: 'FaServer',
    skills: [
      { name: 'Express.js', level: 85, icon: 'SiExpress', color: '#000000' },
      { name: 'NestJS', level: 80, icon: 'SiNestjs', color: '#E0234E' },
      { name: 'Laravel', level: 80, icon: 'FaLaravel', color: '#FF2D20' },
      { name: 'CodeIgniter', level: 85, icon: 'SiCodeigniter', color: '#EE4323' }
    ]
  },
  {
    category: 'Databases',
    icon: 'FaDatabase',
    skills: [
      { name: 'PostgreSQL', level: 85, icon: 'SiPostgresql', color: '#4169E1' },
      { name: 'MySQL', level: 85, icon: 'SiMysql', color: '#4479A1' }
    ]
  },
  {
    category: 'DevOps & Tools',
    icon: 'FaCloud',
    skills: [
      { name: 'Docker', level: 75, icon: 'SiDocker', color: '#2496ED' },
      { name: 'GitHub', level: 85, icon: 'SiGithub', color: '#181717' },
      { name: 'Nginx', level: 75, icon: 'SiNginx', color: '#009639' },
      { name: 'VPS', level: 75, icon: 'FaLinux', color: '#FCC624' }
    ]
  },
  {
    category: 'Frontend',
    icon: 'FaLaptopCode',
    skills: [
      { name: 'HTML', level: 90, icon: 'SiHtml5', color: '#E34F26' },
      { name: 'CSS', level: 90, icon: 'SiCss3', color: '#1572B6' },
      { name: 'Bootstrap', level: 85, icon: 'SiBootstrap', color: '#7952B3' },
      { name: 'Next.js', level: 80, icon: 'SiNextdotjs', color: '#000000' }
    ]
  }
];