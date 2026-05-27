export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image?: string;
  link?: string;
  category: 'Professional' | 'Training' | 'Language' | 'Experience' | 'Technical' | 'Cloud' | 'Development' | 'Database' | 'Security' | 'DevOps';
};

export const certificates: Certificate[] = [
  { id: '1', title: 'BNSP Certification', issuer: 'BNSP', date: 'N/A', category: 'Professional', image: '/certificate/bnsp.jpg' },
  { id: '2', title: 'The Basic Of Google Cloud Compute Skill Badge', issuer: 'Google Cloud', date: 'N/A', category: 'Training', image: '/certificate/google-cloud.jpg' },
  { id: '3', title: 'IAI Indonesia Certification', issuer: 'IAI Indonesia', date: 'N/A', category: 'Professional', image: '/certificate/iai.jpg' },
  { id: '4', title: 'TOEFL Prediction Test', issuer: 'N/A', date: 'N/A', category: 'Language', image: '/certificate/toefl.jpg' },
  { id: '5', title: 'Web Developer Internship Certificate', issuer: 'PT Wavetek Integra Nusa', date: 'N/A', category: 'Experience', image: '/certificate/wavetek.jpg' },
  { id: '6', title: 'Software Development Bootcamp', issuer: 'N/A', date: 'N/A', category: 'Training', image: '/certificate/software-bootcamp.jpg' },
  { id: '7', title: 'Machine Learning Bootcamp', issuer: 'N/A', date: 'N/A', category: 'Training', image: '/certificate/ml-bootcamp.jpg' },
  { id: '8', title: 'Data Analyst Bootcamp', issuer: 'N/A', date: 'N/A', category: 'Training', image: '/certificate/data-bootcamp.jpg' },
  { id: '9', title: 'Frontend Development - Dicoding', issuer: 'Dicoding', date: 'N/A', category: 'Technical', image: '/certificate/frontend-dicoding.jpg' },
  { id: '10', title: 'Flutter Coding Camp', issuer: 'N/A', date: 'N/A', category: 'Technical', image: '/certificate/flutter.jpg' },
  { id: '11', title: 'Data Analysis with Excel', issuer: 'N/A', date: 'N/A', category: 'Technical', image: '/certificate/excel.jpg' },
  { id: '12', title: 'Data Analysis with SQL & Python', issuer: 'N/A', date: 'N/A', category: 'Technical', image: '/certificate/sql-python.jpg' },
  { id: '13', title: 'Belajar Basic AI - Dicoding', issuer: 'Dicoding', date: 'N/A', category: 'Technical', image: '/certificate/ai-dicoding.jpg' }
];