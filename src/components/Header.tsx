"use client";

import React, { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRafId = useRef<number | null>(null);
  const lastIsScrolled = useRef(false);
  const { data: session } = useSession();
  const user = session?.user;
  const displayName =
    user?.name ?? user?.email?.split("@")[0] ?? "Account";
  const avatarUrl = user?.image ?? "";

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ").filter(Boolean);
    return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafId.current !== null) {
        return;
      }

      scrollRafId.current = window.requestAnimationFrame(() => {
        scrollRafId.current = null;
        const nextIsScrolled = window.scrollY > 50;
        if (nextIsScrolled !== lastIsScrolled.current) {
          lastIsScrolled.current = nextIsScrolled;
          setIsScrolled(nextIsScrolled);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafId.current !== null) {
        window.cancelAnimationFrame(scrollRafId.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    startTransition(() => setIsMobileMenuOpen((o) => !o));
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "AI Solutions", href: "/ai-solutions" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Career", href: "/career" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/20"
          : "bg-white/95 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/qbrix-logo.png"
                alt="QBrix Solutions"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                      : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  {item.name}
                </Link>
                <span
                  className="pointer-events-none absolute bottom-0 left-2 right-2 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-200 group-hover:scale-x-100"
                  aria-hidden
                />
              </div>
            ))}
          </nav>

          {/* User */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-50 text-gray-700">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-purple-600 text-white text-xs font-semibold flex items-center justify-center">
                      {getInitials(displayName)}
                    </div>
                  )}
                  <span className="text-sm font-semibold">{displayName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className={`inline-block px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] ${
                isScrolled
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
              }`}
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={`md:hidden touch-manipulation p-3 rounded-lg transition-colors duration-200 active:scale-95 ${
              isScrolled
                ? "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu — CSS only, no layout animation library */}
        {isMobileMenuOpen ? (
          <div className="md:hidden bg-white/95 backdrop-blur-xl rounded-xl mt-3 shadow-2xl border border-gray-200/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="px-4 py-3">
                {user ? (
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={displayName}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-purple-600 text-white text-xs font-semibold flex items-center justify-center">
                        {getInitials(displayName)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-800">
                        {displayName}
                      </div>
                      <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-xs text-gray-600 hover:text-purple-700"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200"
                  >
                    Sign in
                  </Link>
                )}
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full mt-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Start Project
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
