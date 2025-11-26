import React from 'react';
import MobileFooter from './MobileFooter';
import DesktopFooter from './DesktopFooter';

function Footer() {
  return (
    <div className="footer bg-primary mt-4 md:mt-20 p-4 md:py-8 text-primary-foreground rounded-t-xl">
      <div className="container mx-auto">
        <MobileFooter />
        <DesktopFooter />
        <div className="mt-6 pt-4 text-center text-sm  border-t border-green-700/50">
          &copy; WORKBASE. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
