import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

function MobileFooter() {
  return (
    <div className="mobile-footer md:hidden px-6 py-8 space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">WORKBASE</h1>
        <p className="text-sm">Book Your Space, Unlock Your Potential</p>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="company">
          <AccordionTrigger className="text-lg font-medium">
            Company
          </AccordionTrigger>
          <AccordionContent className="text-muted flex flex-col gap-2">
            <Link href="/">About</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">FAQs</Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="spaces">
          <AccordionTrigger className="text-lg font-medium">
            Our Spaces
          </AccordionTrigger>
          <AccordionContent className="text-muted flex flex-col gap-2">
            <Link href="/">Private Office</Link>
            <Link href="/">Meeting Room</Link>
            <Link href="/">Podcast Studio</Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger className="text-lg font-medium">
            Support
          </AccordionTrigger>
          <AccordionContent className="text-muted flex flex-col gap-2">
            <Link href="/">Contact Us</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy Policy</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default MobileFooter;
