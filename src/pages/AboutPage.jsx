// src/pages/AboutPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// AnimatedSection component to handle animations
const AnimatedSection = ({ children, delay, direction }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-10';
    
    if (direction === 'left') {
      return 'opacity-100 translate-x-0';
    } else if (direction === 'right') {
      return 'opacity-100 translate-x-0';
    } else {
      return 'opacity-100 translate-y-0';
    }
  };

  const getInitialClass = () => {
    if (direction === 'left') {
      return 'opacity-0 -translate-x-20';
    } else if (direction === 'right') {
      return 'opacity-0 translate-x-20';
    } else {
      return 'opacity-0 translate-y-10';
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`transform transition-all duration-1000 ease-out ${isVisible ? getAnimationClass() : getInitialClass()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full">
          <div className="relative h-full">
            <svg
              className="absolute right-0 inset-y-0 h-full w-48 text-indigo-800 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>
        <div className="relative pt-16 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <AnimatedSection delay={100}>
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Welcome to</span>{' '}
                  <span className="block text-indigo-400 xl:inline">TokoHappy</span>
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={300}>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Your one-stop destination for all your shopping needs. We offer quality products with exceptional customer service.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={500}>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/products"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={200}>
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to shop
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Discover why customers love shopping at TokoHappy.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <AnimatedSection delay={400} direction="left">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Quality Products</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    All our products are carefully selected to ensure the highest quality standards for our customers.
                  </dd>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={600} direction="right">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Delivery</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    We offer lightning-fast delivery to ensure you get your products quickly and efficiently.
                  </dd>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={800} direction="left">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Payments</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Your payment information is secure with our advanced encryption systems and security protocols.
                  </dd>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={1000} direction="right">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">24/7 Support</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Our customer support team is available around the clock to assist you with any queries or concerns.
                  </dd>
                </div>
              </AnimatedSection>
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={300}>
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by Shoppers Worldwide
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Read what our customers have to say about their shopping experience.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          <AnimatedSection delay={500} direction="left">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    Customer Review
                  </p>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">Amazing Selection</p>
                    <p className="mt-3 text-base text-gray-500">
                      "I was impressed by the wide selection of products available at TokoHappy. I found exactly what I was looking for and more!"
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">Sarah Johnson</span>
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">SJ</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Sarah Johnson
                    </p>
                    <div className="flex space-x-1 text-sm text-yellow-500">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={700}>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    Customer Review
                  </p>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">Fast Shipping</p>
                    <p className="mt-3 text-base text-gray-500">
                      "I ordered on Monday and received my package by Wednesday! The shipping speed exceeded my expectations. Will definitely shop here again."
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">Michael Chen</span>
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">MC</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Michael Chen
                    </p>
                    <div className="flex space-x-1 text-sm text-yellow-500">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={900} direction="right">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    Customer Review
                  </p>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">Excellent Service</p>
                    <p className="mt-3 text-base text-gray-500">
                      "Customer service was outstanding when I had an issue with my order. The team resolved it promptly and went above and beyond to ensure I was satisfied."
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">Amanda Rodriguez</span>
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">AR</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Amanda Rodriguez
                    </p>
                    <div className="flex space-x-1 text-sm text-yellow-500">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection delay={200}>
            <div className="text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Story</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                About TokoHappy
              </p>
            </div>
          </AnimatedSection>
          
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <AnimatedSection delay={400} direction="left">
              <div className="relative h-64 sm:h-80 lg:h-full">
                <div className="absolute inset-0 bg-indigo-500 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800 mix-blend-multiply"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl font-extrabold text-white">TokoHappy</h3>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={600} direction="right">
              <div>
                <p className="text-lg text-gray-500">
                  Founded in 2020, TokoHappy started with a simple mission: to create a delightful shopping experience for customers around the world. 
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  What began as a small startup has now grown into one of the most trusted e-commerce platforms, serving thousands of happy customers every day.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  At TokoHappy, we believe in the power of quality products and exceptional service. Our team works tirelessly to source the best products from around the globe and bring them to your doorstep with just a few clicks.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  We take pride in our community of loyal customers who have made TokoHappy what it is today. Your satisfaction is our top priority, and we're committed to continuously improving our platform to serve you better.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <AnimatedSection delay={300}>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start shopping?</span>
              <span className="block text-indigo-200">Join thousands of happy customers today.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={500}>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;