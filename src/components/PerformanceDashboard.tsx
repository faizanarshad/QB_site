"use client";

import React, { useState, useEffect } from 'react';
import { performanceUtils } from '../lib/analytics';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    // Get current page name from URL
    setCurrentPage(window.location.pathname || 'home');

    // Listen for performance metrics
    const handlePerformanceMetric = (event: CustomEvent) => {
      const metric = event.detail;
      setMetrics(prev => [
        {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          timestamp: Date.now()
        },
        ...prev.slice(0, 9) // Keep only last 10 metrics
      ]);
    };

    // Custom event listener for performance metrics
    window.addEventListener('performance-metric', handlePerformanceMetric as EventListener);

    // Track page load time
    const trackPageLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      const rating = loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor';
      
      setMetrics(prev => [
        {
          name: 'Page Load Time',
          value: loadTime,
          rating,
          timestamp: Date.now()
        },
        ...prev.slice(0, 9)
      ]);
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
    }

    return () => {
      window.removeEventListener('performance-metric', handlePerformanceMetric as EventListener);
      window.removeEventListener('load', trackPageLoad);
    };
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good': return '✅';
      case 'needs-improvement': return '⚠️';
      case 'poor': return '❌';
      default: return '📊';
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name.includes('CLS')) return value.toFixed(3);
    if (name.includes('Time') || name.includes('Duration')) return `${Math.round(value)}ms`;
    return Math.round(value).toString();
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          📊 Performance
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Performance Dashboard</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
        <p className="text-sm opacity-90 mt-1">Page: {currentPage}</p>
      </div>

      {/* Metrics */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {metrics.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">📊</div>
            <p>Collecting performance data...</p>
            <p className="text-sm mt-1">Interact with the page to see metrics</p>
          </div>
        ) : (
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getRatingIcon(metric.rating)}</span>
                      <span className="font-medium text-sm">{metric.name}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-lg font-bold ${getRatingColor(metric.rating)}`}>
                        {formatValue(metric.name, metric.value)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRatingColor(metric.rating)} bg-opacity-10`}>
                        {metric.rating.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(metric.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2 rounded-b-lg border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Real-time monitoring</span>
          <span>{metrics.length} metrics</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard; 