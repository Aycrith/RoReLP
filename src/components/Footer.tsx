import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For logo if included

// Placeholder icons (actual SVGs or a library would be used in a real project)
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-gold transition-colors">
    {children}
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray text-neutral-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo & Company */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/RoyaltyRepairLogo1.jpeg" // Updated src
                alt="Royalty Repair Logo"
                width={36}
                height={36}
                className="rounded-full" // Added for JPEG
              />
              <span className="text-lg md:text-xl font-semibold text-neutral-white">
                Royalty Repair
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              The #1 CRM for Small-Engine Repair Shops.
            </p>
            <p className="text-sm text-gray-500">
              <a href="mailto:support@royaltyrepair.com" className="hover:text-accent-gold transition-colors">support@royaltyrepair.com</a>
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h5 className="font-semibold text-neutral-white mb-4">Product</h5>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-gray-400 hover:text-accent-gold transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-accent-gold transition-colors">Pricing</Link></li>
              <li><Link href="/request-demo" className="text-gray-400 hover:text-accent-gold transition-colors">Schedule Demo</Link></li>
              <li><Link href="/signup" className="text-gray-400 hover:text-accent-gold transition-colors">Free Trial</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h5 className="font-semibold text-neutral-white mb-4">Company</h5>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-gray-400 hover:text-accent-gold transition-colors">About Us</Link></li>
              {/* <li><Link href="/careers" className="text-gray-400 hover:text-accent-gold transition-colors">Careers</Link></li> */}
              {/* <li><Link href="/contact" className="text-gray-400 hover:text-accent-gold transition-colors">Contact</Link></li> */}
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div>
            <h5 className="font-semibold text-neutral-white mb-4">Legal</h5>
            <ul className="space-y-3 mb-6">
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-accent-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-accent-gold transition-colors">Terms of Service</Link></li>
            </ul>
            <h5 className="font-semibold text-neutral-white mb-4">Connect</h5>
            <div className="flex space-x-4">
              <SocialIcon href="https://linkedin.com">LI</SocialIcon> {/* Replace with actual SVG icons */}
              <SocialIcon href="https://twitter.com">TW</SocialIcon>
              <SocialIcon href="https://facebook.com">FB</SocialIcon>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-700">
          © {currentYear} Royalty Repair. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
