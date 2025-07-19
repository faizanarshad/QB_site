import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Performance monitoring configuration
const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || 'qbrik-solutions';

// Custom performance tracking
export const trackPerformance = (metric: any) => {
  // Enhanced console logging in development
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    const color = metric.rating === 'good' ? '#22c55e' : metric.rating === 'needs-improvement' ? '#eab308' : '#ef4444';
    
    console.log(
      `%c${emoji} ${metric.name}%c\n` +
      `Value: ${metric.value.toFixed(2)}\n` +
      `Rating: ${metric.rating}\n` +
      `ID: ${metric.id}`,
      `color: ${color}; font-weight: bold; font-size: 14px;`,
      'color: inherit; font-size: 12px;'
    );
  }

  // Dispatch custom event for performance dashboard
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('performance-metric', {
      detail: {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id
      }
    });
    window.dispatchEvent(event);
  }

  // Send to analytics service (you can replace with your preferred service)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
};

// Initialize Web Vitals monitoring
export const initWebVitals = () => {
  if (typeof window === 'undefined') return;

  console.log('🚀 Initializing Performance Monitoring...');

  // Core Web Vitals (FID is deprecated in v5, using INP instead)
  onCLS(trackPerformance);
  onFCP(trackPerformance);
  onLCP(trackPerformance);
  onTTFB(trackPerformance);

  // Additional performance metrics
  trackPageLoadTime();
  trackResourceLoadTimes();
  trackUserInteractions();
};

// Track page load time
const trackPageLoadTime = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    
    trackPerformance({
      name: 'Page Load Time',
      value: loadTime,
      rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor',
      delta: 0,
      id: 'page-load-time'
    });
  });
};

// Track resource load times
const trackResourceLoadTimes = () => {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        trackPerformance({
          name: 'Resource Load',
          value: resourceEntry.duration,
          rating: resourceEntry.duration < 1000 ? 'good' : resourceEntry.duration < 3000 ? 'needs-improvement' : 'poor',
          delta: 0,
          id: `resource-${resourceEntry.name}`
        });
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

// Track user interactions
const trackUserInteractions = () => {
  if (typeof window === 'undefined') return;

  let firstInteraction = true;
  let firstInteractionTime = 0;

  const trackInteraction = () => {
    if (firstInteraction) {
      firstInteraction = false;
      firstInteractionTime = performance.now();
      
      trackPerformance({
        name: 'First Interaction',
        value: firstInteractionTime,
        rating: firstInteractionTime < 1000 ? 'good' : firstInteractionTime < 3000 ? 'needs-improvement' : 'poor',
        delta: 0,
        id: 'first-interaction'
      });
    }
  };

  // Track various user interactions
  ['click', 'scroll', 'keydown', 'touchstart'].forEach(eventType => {
    window.addEventListener(eventType, trackInteraction, { once: true, passive: true });
  });
};

// Custom performance mark and measure utilities
export const performanceUtils = {
  mark: (name: string) => {
    if (typeof window !== 'undefined') {
      performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== 'undefined') {
      try {
        const measure = performance.measure(name, startMark, endMark);
        trackPerformance({
          name: `Custom: ${name}`,
          value: measure.duration,
          rating: measure.duration < 100 ? 'good' : measure.duration < 300 ? 'needs-improvement' : 'poor',
          delta: 0,
          id: `custom-${name}`
        });
      } catch (error) {
        console.warn(`Failed to measure ${name}:`, error);
      }
    }
  }
};

// Initialize analytics when the module is imported
if (typeof window !== 'undefined') {
  // Initialize after a short delay to ensure the page is ready
  setTimeout(() => {
    initWebVitals();
    console.log('📊 Performance monitoring is now active!');
  }, 1000);
} 