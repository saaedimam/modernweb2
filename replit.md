# Kattali Textile Ltd - Corporate Website

## Overview

This is a premium corporate website for Kattali Textile Ltd, a leading textile manufacturer specializing in premium fabrics and sustainable production. The application is built as a modern web platform featuring an ultra-modern design with glassmorphism effects, advanced animations, and comprehensive business functionality including product showcasing, pricing calculations, stock market integration, and multilingual support.

The website serves as a corporate presence without e-commerce functionality, focusing on brand representation, product information, company history, manufacturing processes, sustainability initiatives, and customer engagement through reviews and contact forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern React features including Concurrent Features and Suspense
- **Vite 5+** as the build tool with advanced optimizations and development server
- **Tailwind CSS 3.4+** for styling with custom design system and glassmorphism effects
- **Wouter** for lightweight client-side routing instead of React Router
- **Framer Motion** for advanced animations and micro-interactions
- **Component Architecture**: Modular component structure with reusable UI components from Radix UI
- **State Management**: Zustand for lightweight global state management (theme, locale, UI state)
- **Internationalization**: i18next with react-i18next for English and Bengali language support

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints and static file serving
- **Vite Integration**: Development server with hot module replacement and production build serving
- **Memory Storage**: In-memory data storage for development with interface for future database integration
- **Middleware Stack**: JSON parsing, URL encoding, compression, and security middleware

### Data Storage Solutions
- **Drizzle ORM** with PostgreSQL schema definitions for future database integration
- **Neon Database** configuration for serverless PostgreSQL
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **Schema Design**: User management schema with Zod validation

### Design System & UI
- **Shadcn/UI Components**: Comprehensive component library built on Radix UI primitives
- **CSS Custom Properties**: Dynamic theming with CSS variables for light/dark mode
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities
- **Accessibility**: WCAG 2.1 compliant components with proper ARIA attributes and focus management

### Performance & Developer Experience
- **Code Splitting**: Lazy loading of page components for optimal bundle sizes
- **PWA Support**: Service worker registration and offline capabilities
- **TypeScript**: Strict typing throughout the application
- **Error Boundaries**: React error boundaries for graceful error handling
- **Analytics Integration**: Web vitals tracking and custom event analytics

### SEO & Marketing Features
- **Structured Data**: JSON-LD schema markup for organization information
- **Meta Tags**: Comprehensive Open Graph and Twitter Card meta tags
- **Sitemap & Robots**: SEO optimization with proper crawling directives
- **Social Sharing**: Built-in social media sharing components

## External Dependencies

### UI & Styling
- **@radix-ui/react-*** - Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss** - Utility-first CSS framework with PostCSS and Autoprefixer
- **framer-motion** - Animation library for React components
- **lucide-react** - Modern icon library with consistent design
- **class-variance-authority** - Utility for creating variant-based component APIs

### State Management & Data Fetching
- **zustand** - Lightweight state management solution
- **@tanstack/react-query** - Server state management and caching
- **react-hook-form** - Performant forms with easy validation
- **@hookform/resolvers** - Validation resolvers for react-hook-form

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **i18next-browser-languagedetector** - Language detection plugin

### Backend & Database
- **express** - Web application framework for Node.js
- **drizzle-orm** - TypeScript ORM with PostgreSQL support
- **@neondatabase/serverless** - Serverless PostgreSQL driver
- **drizzle-zod** - Zod integration for schema validation
- **connect-pg-simple** - PostgreSQL session store for Express

### Utilities & Helpers
- **clsx** & **tailwind-merge** - Utility for conditional CSS classes
- **date-fns** - Modern JavaScript date utility library
- **dayjs** - Lightweight date manipulation library
- **nanoid** - URL-safe unique string ID generator

### Development Tools
- **typescript** - Static type checking
- **vite** - Build tool and development server
- **@vitejs/plugin-react** - React plugin for Vite
- **@replit/vite-plugin-runtime-error-modal** - Runtime error overlay for Replit
- **@replit/vite-plugin-cartographer** - Development tooling for Replit environment

### Production Dependencies
- **embla-carousel-react** - Carousel component for image galleries
- **cmdk** - Command palette component
- **web-vitals** - Library for measuring web performance metrics