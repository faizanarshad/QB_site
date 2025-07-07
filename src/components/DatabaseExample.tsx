"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Example of how to fetch data from the database
export default function DatabaseExample() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (formData: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      const result = await response.json();
      alert('Contact form submitted successfully!');
    } catch (err: any) {
      alert('Error submitting form: ' + err.message);
    }
  };

  const handleNewsletterSubscribe = async (email: string) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      alert('Successfully subscribed to newsletter!');
    } catch (err: any) {
      alert('Error subscribing: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Database Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchServices}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Database Integration Example
      </h1>

      {/* Services from Database */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Services from Database</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.subtitle}</p>
              <p className="text-sm text-gray-500">{service.description}</p>
              
              {/* Service Features */}
              {service.features && service.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <ul className="text-sm text-gray-600">
                    {service.features.slice(0, 3).map((feature: any) => (
                      <li key={feature.id} className="flex items-center mb-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Contact Form Example</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleContactSubmit(new FormData(e.currentTarget));
          }}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Submit Contact Form
          </button>
        </form>
      </section>

      {/* Newsletter Subscription Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Newsletter Subscription Example</h2>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="newsletter-email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            onClick={() => {
              const email = (document.getElementById('newsletter-email') as HTMLInputElement).value;
              if (email) {
                handleNewsletterSubscribe(email);
              } else {
                alert('Please enter an email address');
              }
            }}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Subscribe to Newsletter
          </button>
        </div>
      </section>

      {/* Database Status */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Database Status</h2>
        <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
          Connected to Database
        </div>
        <p className="text-gray-600 mt-2">
          {services.length} services loaded from database
        </p>
      </section>
    </div>
  );
} 