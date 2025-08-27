import { Suspense, lazy } from 'react';
import { Router, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { queryClient } from './lib/queryClient';
import ErrorBoundary from './error/ErrorBoundary';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import '@/i18n';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Manufacturing = lazy(() => import('./pages/Manufacturing'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Stocks = lazy(() => import('./pages/Stocks'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./error/NotFound'));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return null;
}

function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/manufacturing" component={Manufacturing} />
          <Route path="/sustainability" component={Sustainability} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/stocks" component={Stocks} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Suspense>
      </main>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <AppRouter />
            <Footer />
            <Toaster />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
