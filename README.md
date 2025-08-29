# Kattali Textile Ltd - Corporate Website

A premium corporate website for Kattali Textile Ltd, built with modern web technologies and deployed on Vercel.

## 🚀 Tech Stack

### Frontend (client/)
- **React 18** with TypeScript
- **Vite 5+** for build tooling
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Zustand** for state management
- **Wouter** for routing
- **React Query** for server state
- **i18next** for internationalization

### Backend (api/)
- **Vercel Serverless Functions**
- **TypeScript** with Node.js 20.x
- **RESTful API** endpoints

### Features
- 🌍 **Multilingual Support** (English & Bengali)
- 📱 **PWA** capabilities
- 🎨 **Modern Design** with glassmorphism
- 🌙 **Dark/Light Mode** toggle
- ♿ **Accessibility** compliant
- 🔍 **SEO Optimized**
- 📊 **Stock Market Integration**
- 🎭 **Advanced Animations**

## 🏗️ Project Structure

```
├── client/                 # Frontend React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json        # SPA routing config
├── api/                   # Vercel serverless functions
│   ├── health.ts
│   ├── stocks.ts
│   ├── contact.ts
│   └── newsletter.ts
├── shared/                # Shared types and utilities
│   └── types.ts
├── vercel.json           # Vercel deployment config
└── package.json          # Root package.json
```

## 🛠️ Local Development

1. **Install dependencies:**
   ```bash
   npm install
   npm run install:client
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   This will start the Vite dev server on http://localhost:5173

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🚀 Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Deployment Steps

1. **Connect Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `client/`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/`
   - **Install Command:** `npm install`
   - **Node.js Version:** 20.x

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Environment Variables (if needed)
```bash
# Add these in Vercel Dashboard → Project → Settings → Environment Variables
NODE_ENV=production
```

### Deployment Checklist

- ✅ **Vercel Project Settings:**
  - Root Directory = `client/`
  - Framework = Vite
  - Build Command = `npm run build`
  - Output Directory = `dist/`
  - Node.js = 20.x

- ✅ **Files Present:**
  - `client/vercel.json` (SPA rewrites)
  - `vercel.json` (root config)
  - API routes under `/api`

- ✅ **Testing:**
  - Frontend loads correctly
  - Deep links work (no 404s)
  - API endpoints respond: `/api/health`, `/api/stocks`
  - Contact form submits successfully
  - Newsletter subscription works

## 📡 API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/stocks` - Stock market data (DSE/CSE)
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter subscription

## 🔧 Development Commands

```bash
# Install all dependencies
npm install && npm run install:client

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

## 🌐 Stock Market Integration

The stocks page integrates with DSE (Dhaka Stock Exchange) and CSE (Chittagong Stock Exchange) data. Currently uses mock data, but the API adapter in `/api/stocks.ts` can be easily modified to connect to real stock APIs.

To integrate with real stock data:
1. Update `/api/stocks.ts` with actual API endpoints
2. Add authentication if required
3. Handle rate limiting and caching
4. Update the data adapter if response format differs

## 🎨 Customization

### Theme Colors
Edit `client/src/index.css` to modify the color scheme:
```css
:root {
  --primary: hsl(96, 85.19%, 73.53%);
  --chart-1: hsl(203.8863, 88.2845%, 53.1373%);
  /* ... other colors */
}
```

### Content & Translations
- English: `client/src/i18n/en.json`
- Bengali: `client/src/i18n/bn.json`

### Product Data
- Products: `client/src/data/products.ts`
- Fabric pricing: `client/src/data/fabrics.ts`

## 📱 PWA Features

The application includes Progressive Web App capabilities:
- Offline functionality
- Installable on mobile devices
- Service worker for caching
- Web app manifest

## ♿ Accessibility

Built with accessibility in mind:
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

## 📊 Performance

Optimized for performance:
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Web vitals tracking
- Efficient re-renders with React Query

## 🔒 Security

Security best practices implemented:
- Input validation and sanitization
- CORS configuration
- Security headers
- XSS protection
- Content Security Policy ready
