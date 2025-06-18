import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-white/80 shadow-md backdrop-blur-[10px]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Area */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/RoyaltyRepairLogo1.jpeg" // Updated src
            alt="Royalty Repair Logo"
            width={36} // Adjusted size
            height={36} // Adjusted size
            className="rounded-full" // Added for JPEG
            // priority // Add if logo is LCP
          />
          <span className="text-lg md:text-xl font-semibold text-dark-gray">
            Royalty Repair
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="#features" className="text-dark-gray hover:text-primary-blue transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-dark-gray hover:text-primary-blue transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-dark-gray hover:text-primary-blue transition-colors">
            About Us
          </Link>
        </nav>

        {/* CTA Button */}
        <Link href="#get-started" legacyBehavior>
          <a className="bg-primary-blue hover:bg-royal-purple text-neutral-white font-medium py-2 px-4 rounded-lg transition-colors active:scale-95 transform">
            Get Started
          </a>
        </Link>

        {/* Mobile Menu Button (Optional - for later enhancement) */}
        {/* <div className="md:hidden">
          <button>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
