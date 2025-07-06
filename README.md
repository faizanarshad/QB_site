# Modern Website - Next.js + Tailwind CSS + Framer Motion

A stunning, modern website built with the latest frontend technologies:

- **React.js** with **Next.js** for SSR & performance
- **Tailwind CSS** for modern utility-first design
- **Framer Motion** for stunning animations
- **TypeScript** for type safety

## 🚀 Features

- **Responsive Design** - Perfect on all devices
- **Smooth Animations** - Powered by Framer Motion
- **Modern UI/UX** - Clean, professional design
- **Performance Optimized** - Built with Next.js
- **SEO Ready** - Server-side rendering
- **Interactive Elements** - Hover effects and micro-interactions

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Services.tsx        # Services section
│   ├── Features.tsx        # Features section
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qb-site-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Sections

### 1. Header
- Fixed navigation with scroll effects
- Mobile-responsive menu
- Smooth animations

### 2. Hero
- Gradient background with animated elements
- Call-to-action buttons
- Statistics display
- Scroll indicator

### 3. About
- Feature highlights
- Animated cards
- CTA section

### 4. Services
- Service cards with hover effects
- Feature lists
- Modern design

### 5. Features
- Performance highlights
- Animated content
- Visual elements

### 6. Contact
- Contact form with validation
- Contact information
- Responsive layout

### 7. Footer
- Social links
- Company information
- Navigation links

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
    }
  }
}
```

### Animations
Modify Framer Motion animations in components:
```javascript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

### Content
Update text content in each component file to match your brand.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized
- **SEO**: Server-side rendered
- **Accessibility**: WCAG compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

For support, email hello@modernsite.com or create an issue in the repository.

---

Built with ❤️ using modern web technologies