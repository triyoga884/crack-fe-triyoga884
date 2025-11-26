import React from 'react';
import Link from 'next/link';

function DesktopFooter() {
  return (
    <div className="desktop-footer hidden md:grid grid-cols-4 gap-4">
      <div>
        <h1 className="text-2xl font-bold ">WORKBASE</h1>
        <p className="">Book Your Space, Unlock Your Potential</p>
      </div>
      <div className="company flex flex-col gap-2">
        <h2 className="text-xl font-medium mb-2">Company</h2>
        <Link className="text-muted text-sm" href="/">
          About
        </Link>
        <Link className="text-muted text-sm" href="/">
          Pricing
        </Link>
        <Link className="text-muted text-sm" href="/">
          FAQs
        </Link>
      </div>
      <div className="spaces flex flex-col gap-2">
        <h2 className="text-xl font-medium mb-2">Our Spaces</h2>
        <Link className="text-muted text-sm" href="/">
          Private Office
        </Link>
        <Link className="text-muted text-sm" href="/">
          Meeting Room
        </Link>
        <Link className="text-muted text-sm" href="/">
          Podcast Studio
        </Link>
      </div>
      <div className="support  flex flex-col gap-2">
        <h2 className="text-xl font-medium mb-2">Support</h2>
        <Link className="text-muted text-sm" href="/">
          Contact Us
        </Link>
        <Link className="text-muted text-sm" href="/">
          Terms of Service
        </Link>
        <Link className="text-muted text-sm" href="/">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default DesktopFooter;
