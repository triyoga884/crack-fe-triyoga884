'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import Hamburger from 'hamburger-react';
import { useAuth } from '../hooks/useAuth';
import { Skeleton } from './ui/skeleton';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  const { isAuthenticated, isLoading } = useAuth();

  const menu = (
    <>
      {isLoading ? (
        <nav className="flex flex-col gap-4 px-2 py-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </nav>
      ) : (
        <nav className="flex flex-col gap-4 px-2 py-4">
          <Link
            className="text-base font-medium transition-colors hover:text-primary"
            onClick={closeSheet}
            href="/"
          >
            Home
          </Link>

          <Link
            className="text-base font-medium transition-colors hover:text-primary"
            onClick={closeSheet}
            href="/workspaces"
          >
            Workspaces
          </Link>

          {!isAuthenticated && (
            <Link
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={closeSheet}
              href="/login"
            >
              Login
            </Link>
          )}

          {isAuthenticated && (
            <Link
              className="text-base font-medium transition-colors hover:text-primary"
              onClick={closeSheet}
              href="/profile"
            >
              Profile
            </Link>
          )}
        </nav>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      {isLoading ? (
        <div className="container mx-auto flex items-center justify-between p-2">
          {/* Logo Skeleton */}
          <Skeleton className="h-6 w-28" />

          {/* Desktop Nav Skeleton */}
          <div className="hidden md:flex items-center gap-4">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>

          {/* Mobile Menu Icon Skeleton */}
          <Skeleton className="h-9 w-9 rounded-full md:hidden" />
        </div>
      ) : (
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={110}
              height={24}
              src="/images/logo2.png"
              alt="WORKBASE logo"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/workspaces"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Workspaces
              </Link>
            </nav>

            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              {!isAuthenticated ? (
                <Button size="sm">
                  <Link href="/login">Login</Link>
                </Button>
              ) : (
                <Button size="sm">
                  <Link href="/profile">Profile</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="md:hidden rounded-full p-2 transition hover:bg-muted"
                >
                  <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[75vw] max-w-sm">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-left text-lg font-semibold">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                {menu}

                <SheetFooter className="mt-auto pt-6">
                  <div className="w-full text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} WORKBASE
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
