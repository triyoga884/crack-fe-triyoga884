'use client';
import React, { useState } from 'react';
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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  const menu = (
    <>
      <nav className="flex flex-col gap-4 px-2 py-4">
        <Link className=" font-medium" onClick={closeSheet} href="/">
          Home
        </Link>
        <Link className=" font-medium" onClick={closeSheet} href="/workspaces">
          Workspaces
        </Link>
        <Link className=" font-medium" onClick={closeSheet} href="/login">
          Login
        </Link>
      </nav>
    </>
  );

  return (
    <header className="shadow-sm sticky top-0 bg-white z-50">
      <div className="flex justify-between items-center p-2 container mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image width={100} height={20} src="/images/logo2.png" alt="logo" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/workspaces" className="text-sm font-medium">
              Workspaces
            </Link>
          </nav>
          <div className="hidden md:block">
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden rounded-full p-2">
                <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[70vw]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              {menu}
              <SheetFooter>
                <div className="w-full text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} WORKBASE
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
