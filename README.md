# Ismail Kattakath - Developer Profile Website

Modern, responsive portfolio website showcasing 15+ years of software engineering and AI/ML expertise. Built with Next.js and optimized for GitHub Pages hosting.

## 🌐 Live Demo

**URL**: `https://aloshy-ai.github.io/ismail-portfolio/`

## 🚀 Features

- **Modern Design**: Google AI inspired interface with smooth animations
- **Responsive Layout**: Optimized for all device sizes
- **Static Generation**: Fast loading with Next.js static export
- **Professional Content**: Resume-based sections with real experience
- **Smooth Animations**: Framer Motion powered interactions
- **Accessibility**: Built with modern web standards

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📋 Sections

1. **Hero**: Introduction with contact information
2. **About**: Professional summary and key strengths
3. **Skills**: Technical expertise categorized by domain
4. **Experience**: Detailed work history with achievements
5. **Projects**: Featured projects and accomplishments
6. **Contact**: Get in touch information and social links

## 🏗️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/ismail-kattakath/ismail-portfolio.git
cd ismail-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build static site
npm run build

# Output will be in the 'out' directory
```

### Deployment Commands

```bash
# Deploy to GitHub Pages
npm run deploy

# Or use the autonomous script
chmod +x deploy.sh
./deploy.sh

# Monitor deployment
tail -f /tmp/github-pages-*.log
```

## 🔧 Configuration

The site is configured for GitHub Pages deployment with:

- Static export enabled in `next.config.ts`
- Proper asset prefixes for GitHub Pages paths
- `.nojekyll` file to bypass Jekyll processing
- GitHub Actions workflow for automated deployment

## 📊 Performance

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.0s
- **Lighthouse Score**: > 95
- **Bundle Size**: < 500KB (optimized)

## 🚀 Deployment

### GitHub Pages Setup

1. **Create Repository**: 
   ```bash
   git remote add origin https://github.com/aloshy-ai/ismail-portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - The site will auto-deploy on push to main branch

3. **Custom Domain** (Optional):
   - Add `CNAME` file with your domain
   - Configure DNS settings

### Autonomous Deployment

The project includes scripts for unattended deployment:

```bash
# Start autonomous development pipeline
nohup ./autonomous-dev.sh > /tmp/autonomous-dev.log 2>&1 &

# Monitor progress
tail -f /tmp/autonomous-dev.log
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layout for medium screens  
- **Desktop**: Full-featured experience on large screens
- **Touch Friendly**: Optimized for touch interactions

## 🎨 Design System

- **Colors**: Professional blue, green, red accent palette
- **Typography**: Modern, readable font hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable, modular design components

## 🔍 SEO & Accessibility

- **Meta Tags**: Proper SEO optimization
- **Semantic HTML**: Screen reader friendly
- **Alt Text**: Descriptive image alternatives
- **Keyboard Navigation**: Full keyboard support

## 🤝 Contact

**Ismail Kattakath**
- 📧 Email: ismail@kattakath.com
- 📱 Phone: +1 (226) 241-0205
- 💼 LinkedIn: [ismailkattakath](https://linkedin.com/in/ismailkattakath)
- 🐙 GitHub: [aloshy-ai](https://github.com/aloshy-ai)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js and deployed on GitHub Pages**
