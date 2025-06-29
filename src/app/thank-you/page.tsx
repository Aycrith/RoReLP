import React from 'react';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Thank You!
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your service request has been submitted successfully.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                What happens next?
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                    ✓
                  </span>
                  We&apos;ll review your service request within 24 hours
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                    ✓
                  </span>
                  Our team will contact you to schedule your service
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                    ✓
                  </span>
                  We&apos;ll provide an estimated timeline for your repair
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium text-gray-900 mb-2">
                Need immediate assistance?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                For urgent repairs, call us directly:
              </p>
              <a
                href="tel:+13862748701"
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Call (386) 274-8701
              </a>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <Link
                href="/"
                className="block w-full text-center bg-gray-100 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
