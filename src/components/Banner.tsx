import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

function Banner() {
  return (
    <div className="banner rounded-xl bg-[url(/images/office2.jpg)] gap-2 h-[300px] w-full md:h-[400px] bg-center bg-cover container mx-auto min-h-50 flex flex-col items-center justify-center">
      <h1 className="quote text-primary-foreground md:text-4xl text-lg text-shadow-lg/30 text-center">
        "Your best ideas deserve the perfect environment"
      </h1>
      <h2 className="text-primary-foreground text-lg md:text-3xl text-shadow-lg/30 ">
        Book your space and unlock your potential.
      </h2>
      <Link href="/workspaces">
        <Button className=" mt-3 text-primary-foreground text-lg">
          Book Now
        </Button>
      </Link>
    </div>
  );
}

export default Banner;
