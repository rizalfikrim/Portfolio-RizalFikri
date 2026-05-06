# 🚀 Rizal Fikri Mulyana - Portfolio

A modern, interactive portfolio website showcasing backend development expertise with stunning 3D animations and a dark tech aesthetic.

![Portfolio Preview](./public/images/preview.png)

## ✨ Features

- **🎨 Dark Tech Aesthetic** - Ultra-modern design with cyan/purple gradients and neon glows
- **🤖 Interactive 3D Robot** - Cursor-following robot built with Three.js and React Three Fiber
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ Performance Optimized** - Fast loading with Next.js optimizations
- **🎭 Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **🔍 SEO Optimized** - Complete meta tags and structured data
- **♿ Accessibility** - WCAG compliant with keyboard navigation
- **🎯 TypeScript** - Fully typed for better development experience

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js + React Three Fiber
- **Icons:** React Icons
- **Fonts:** Google Fonts (Orbitron, Syne, JetBrains Mono)
- **Language:** TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rizalfikri/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles and design tokens
├── components/
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections (Hero, About, etc.)
│   ├── ui/              # Reusable UI components
│   └── three/           # 3D scene components
├── data/                # Static data (experience, projects, etc.)
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

## 🎨 Customization

### Changing Colors

Update the design tokens in `src/app/globals.css`:

```css
:root {
  --color-primary: #00d4ff;    /* Electric cyan */
  --color-secondary: #7c3aed;  /* Vivid purple */
  --color-accent: #f59e0b;     /* Amber gold */
}
```

### Adding Projects

Edit `src/data/projects.ts` to add new projects:

```typescript
{
  id: 'new-project',
  title: 'New Project',
  description: 'Project description',
  category: 'Backend',
  tech: ['Node.js', 'PostgreSQL'],
  github: 'https://github.com/username/project',
  live: 'https://project-demo.com',
  featured: true,
  year: 2024,
  highlights: ['Feature 1', 'Feature 2']
}
```

### Updating Personal Information

Modify the data files in `src/data/`:
- `experience.ts` - Work experience
- `certificates.ts` - Certifications
- `skills.ts` - Technical skills

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📱 Mobile Optimization

The portfolio is fully responsive with:
- Touch-friendly interactions
- Optimized 3D scenes for mobile
- Fast loading on slow connections
- Accessible navigation

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by modern tech portfolios
- 3D robot concept from sci-fi aesthetics
- Built with ❤️ by Rizal Fikri Mulyana

## 📞 Contact

**Rizal Fikri Mulyana**
- Email: rizalfikri@example.com
- LinkedIn: [linkedin.com/in/rizalfikri](https://linkedin.com/in/rizalfikri)
- GitHub: [github.com/rizalfikri](https://github.com/rizalfikri)

---

⭐ Star this repo if you found it helpful!
