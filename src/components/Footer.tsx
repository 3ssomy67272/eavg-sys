import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="bg-[#042C64] text-white mt-auto overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <ScrollReveal animation="slide-up" delay={0}>
            <div>
              <div className="flex items-center space-x-3 mb-4 items-center justify-center">
                <div className="w-24 rounded-full flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/wjgZtDXk/whitelogo.png"
                    alt="logo"
                  />
                </div>
              </div>
              <p className="text-white/80 text-center md:text-left">
                Professional virtual airline operations with a community-driven approach.
              </p>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal animation="slide-up" delay={100}>
            <div>
              <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/getting-started" className="text-white/80 hover:text-white transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-white/80 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-white/80 hover:text-white transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="text-white/80 hover:text-white transition-colors">
                    Join Now
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Operations */}
          <ScrollReveal animation="slide-up" delay={200}>
            <div>
              <h3 className="mb-4 text-xl font-bold">Operations</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/operations/routes" className="text-white/80 hover:text-white transition-colors">
                    Routes
                  </Link>
                </li>
                <li>
                  <Link href="/operations/fleets" className="text-white/80 hover:text-white transition-colors">
                    Fleets
                  </Link>
                </li>
                <li>
                  <Link href="/operations/ranks" className="text-white/80 hover:text-white transition-colors">
                    Ranks
                  </Link>
                </li>
                <li>
                  <Link href="/operations/codeshares" className="text-white/80 hover:text-white transition-colors">
                    Codeshares
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Community */}
          <ScrollReveal animation="slide-up" delay={300}>
            <div>
              <h3 className="mb-4 text-xl font-bold">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://community.infiniteflight.com/t/egypt-air-virtual-group-fly-with-pride-fly-with-us-official-thread-2024/899511?" className="text-white/80 hover:text-white transition-colors">
                    IFC Thread
                  </a>
                </li>
                <li>
                  <Link href="/about/contacts" className="text-white/80 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/egyptairvirtualgroup/" className="text-white/80 hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-in" delay={400}>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} EgyprAir Virtual Group. All rights reserved</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

