import { Button } from './ui/button';
import Link from 'next/link';

function Banner() {
  return (
    <div className="container mx-auto my-10">
      <div className="relative flex h-80 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-[url(/images/office2.jpg)] bg-cover bg-center md:h-[420px]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 text-center">
          <h1 className="text-lg font-semibold text-white md:text-4xl">
            “Your best ideas deserve the perfect environment”
          </h1>

          <h2 className="text-sm text-white/90 md:text-2xl">
            Book your space and unlock your potential.
          </h2>

          <Link href="/workspaces">
            <Button size="lg" className="mt-4 px-8 text-base font-semibold">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
