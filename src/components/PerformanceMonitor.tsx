"use client";

import React, { useEffect } from 'react';
import { performanceUtils } from '../lib/analytics';

interface PerformanceMonitorProps {
  pageName: string;
  trackUserInteractions?: boolean;
  trackPageLoad?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  pageName,
  trackUserInteractions = true,
  trackPageLoad = true
}) => {
  useEffect(() => {
    // Mark page load start
    performanceUtils.mark(`${pageName}-load-start`);

    // Track page load completion
    if (trackPageLoad) {
      const trackLoad = () => {
        performanceUtils.mark(`${pageName}-load-end`);
        performanceUtils.measure(`${pageName}-load-time`, `${pageName}-load-start`, `${pageName}-load-end`);
      };

      if (document.readyState === 'complete') {
        trackLoad();
      } else {
        window.addEventListener('load', trackLoad);
        return () => window.removeEventListener('load', trackLoad);
      }
    }

    // Track user interactions
    if (trackUserInteractions) {
      const trackInteraction = (event: Event) => {
        const target = event.target as HTMLElement;
        const interactionName = `${pageName}-${event.type}-${target.tagName.toLowerCase()}`;
        
        performanceUtils.mark(`${interactionName}-start`);
        
        // Measure interaction time
        setTimeout(() => {
          performanceUtils.mark(`${interactionName}-end`);
          performanceUtils.measure(`${interactionName}-duration`, `${interactionName}-start`, `${interactionName}-end`);
        }, 0);
      };

      // Track clicks, scrolls, and form interactions
      const events = ['click', 'scroll', 'submit', 'input'];
      events.forEach(eventType => {
        document.addEventListener(eventType, trackInteraction, { passive: true });
      });

      return () => {
        events.forEach(eventType => {
          document.removeEventListener(eventType, trackInteraction);
        });
      };
    }
  }, [pageName, trackUserInteractions, trackPageLoad]);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor; 