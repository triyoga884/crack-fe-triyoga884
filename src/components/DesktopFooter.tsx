import Link from 'next/link';

function DesktopFooter() {
  return (
    <div className="hidden md:grid grid-cols-4 gap-10 px-12 py-10">
      {/* Brand */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">WORKBASE</h1>
        <p className="text-sm leading-relaxed text-muted">
          Book Your Space, Unlock Your Potential
        </p>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">Company</h2>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          About
        </Link>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          Pricing
        </Link>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          FAQs
        </Link>
      </div>

      {/* Our Spaces */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">Our Spaces</h2>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          Private Office
        </Link>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          Meeting Room
        </Link>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          Podcast Studio
        </Link>
      </div>

      {/* Support */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">Support</h2>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          Contact Us
        </Link>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          Terms of Service
        </Link>
        <Link
          className="text-sm text-muted transition-colors hover:text-background"
          href="/"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default DesktopFooter;
