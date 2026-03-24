"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/ui/gradient-button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-orange-500">
            <span className="text-xs font-black text-black tracking-tighter">T</span>
          </div>
          <span className="text-lg font-bold tracking-wider uppercase">
            Trove
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 ml-6 md:flex">
          {["Dashboard", "Collection", "Marketplace"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="rounded-full px-4 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white hover:bg-white/[0.06] cursor-pointer"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden flex-1 max-w-md ml-auto lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search cards..."
              className="h-9 pl-9 text-xs bg-white/5 border-white/10 placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-orange-500/20"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0">
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-xs text-zinc-400 hover:text-white sm:inline-flex cursor-pointer"
          >
            Sign In
          </Button>
          <GradientButton className="min-w-0 px-5 py-2 text-xs cursor-pointer">
            Get Started
          </GradientButton>
          <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden cursor-pointer">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
