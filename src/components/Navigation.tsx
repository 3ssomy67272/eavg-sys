"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [operationsOpen, setOperationsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#042C64] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-24 rounded-full flex items-center justify-center">
              <img
                src="https://i.postimg.cc/wjgZtDXk/whitelogo.png"
                alt="logo"
              />
            </div>
            <span className="text-white hidden sm:block">
              EgyptAir Virtual Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/getting-started"
              className={`text-white hover:text-gray-200 transition-colors ${
                isActive("/getting-started") ? "border-b-2 border-white" : ""
              }`}
            >
              Getting Started
            </Link>

            {/* Operations Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white hover:text-gray-200 transition-colors">
                <span>Operations</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/operations/routes"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Routes
                </Link>
                <Link
                  href="/operations/fleets"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Fleets
                </Link>
                <Link
                  href="/operations/ranks"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Ranks
                </Link>
                <Link
                  href="/operations/codeshares"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Codeshares
                </Link>
              </div>
            </div>

            <Link
              href="/events"
              className={`text-white hover:text-gray-200 transition-colors ${
                isActive("/events") ? "border-b-2 border-white" : ""
              }`}
            >
              Events
            </Link>

            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white hover:text-gray-200 transition-colors">
                <span>About</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/about/eavg"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  About EAVG
                </Link>
                <Link
                  href="/about/staff"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Staff
                </Link>
                <Link
                  href="/about/roster"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Pilot Roster
                </Link>
                <Link
                  href="/about/Conduct"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Code of Conduct
                </Link>
                <Link
                  href="/about/contact"
                  className="block px-4 py-2 text-[#042C64] hover:bg-gray-100"
                >
                  Contact
                </Link>
              </div>
            </div>

            <Link
              href="/news"
              className={`text-white hover:text-gray-200 transition-colors ${
                isActive("/news") ? "border-b-2 border-white" : ""
              }`}
            >
              News
            </Link>

            <Link
              href="/join"
              className="bg-white text-[#042C64] px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#042C64] border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/getting-started"
              className="block text-white hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Getting Started
            </Link>

            {/* Operations Mobile */}
            <div>
              <button
                onClick={() => setOperationsOpen(!operationsOpen)}
                className="flex items-center justify-between w-full text-white"
              >
                <span>Operations</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    operationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {operationsOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link
                    href="/operations/routes"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Routes
                  </Link>
                  <Link
                    href="/operations/fleets"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Fleets
                  </Link>
                  <Link
                    href="/operations/ranks"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ranks
                  </Link>
                  <Link
                    href="/operations/codeshares"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Codeshares
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/events"
              className="block text-white hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>

            {/* About Mobile */}
            <div>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center justify-between w-full text-white"
              >
                <span>About</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    aboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {aboutOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link
                    href="/about/eavg"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About EAVG
                  </Link>
                  <Link
                    href="/about/staff"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Staff
                  </Link>
                  <Link
                    href="/about/rosters"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pilot Roster
                  </Link>
                  <Link
                    href="/about/CoC"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Code of Conduct
                  </Link>
                  <Link
                    href="/about/contacts"
                    className="block text-white/80 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/news"
              className="block text-white hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              News
            </Link>

            <Link
              href="/join"
              className="block bg-white text-[#042C64] px-6 py-2 rounded-md text-center hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
