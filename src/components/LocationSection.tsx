import React from 'react';
import { MapPin, Phone, Navigation, Clock, CheckCircle2, ShieldCheck, Car } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-gradient-to-b from-[#1c110f] via-[#251512] to-[#1a100e] text-[#f5efe6] relative border-t border-[#3b241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Information Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#211412] p-8 sm:p-10 rounded-3xl border border-[#442c26] shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#ba181b]" />
                <span>VISIT US IN JHANG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#fdfbf7] tracking-tight">
                {BUSINESS_INFO.name}
              </h2>
              <div className="text-base text-amber-400 font-semibold mt-1">
                {BUSINESS_INFO.altName}
              </div>
              <p className="mt-3 text-sm text-[#cbbea9] leading-relaxed">
                Experience warm hospitality, family dining seating, and freshly baked food at our central location in Jhang.
              </p>
            </div>

            {/* Key Contact & Details */}
            <div className="space-y-4 pt-4 border-t border-[#3a241f]">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-[#2a1a17] border border-[#442c26] group-hover:border-amber-400 text-amber-400 mt-1 transition-colors">
                  <MapPin className="w-5 h-5 text-[#ba181b]" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#9c8c7d] font-semibold block">
                    Restaurant Address (گوگل میپ پر دیکھیں)
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-amber-300 transition-colors leading-snug underline decoration-dotted decoration-[#78635c]">
                    {BUSINESS_INFO.address}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#2a1a17] border border-[#442c26] text-amber-400 mt-1">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#9c8c7d] font-semibold block">
                    Separate Direct Phone Call Line
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="text-lg sm:text-xl font-bold text-white hover:text-amber-400 transition-colors tabular-nums font-serif-luxury"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-[#9c8c7d] block mt-0.5">
                    For direct phone orders & takeaway reservations
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#2a1a17] border border-[#442c26] text-emerald-400 mt-1">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#9c8c7d] font-semibold block">
                    Opening Hours
                  </span>
                  <span className="text-sm font-semibold text-white block">
                    11:00 AM — 01:00 AM (Daily)
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Open 7 Days a Week for Dine-In & Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-4 border-t border-[#3a241f] flex flex-col sm:flex-row gap-3">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all hover:scale-102"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#ba181b] hover:bg-[#9e1416] text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-102"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Map Representation & Highlights Column */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#211412] p-8 sm:p-10 rounded-3xl border border-[#442c26] shadow-2xl relative overflow-hidden">
            {/* Ambient map glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                CIVIL LINES · SSP ROAD JHANG
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                Heart of Jhang Dining
              </h3>
              <p className="text-sm text-[#cbbea9] mt-2 leading-relaxed">
                Conveniently situated on S.S.P Road in Civil Lines Jhang, with hassle-free parking, prompt takeaway pickups, and full delivery coverage across Civil Lines, Colony areas, and Jhang city.
              </p>
            </div>

            {/* Simulated Interactive Map Card */}
            <div className="my-6 rounded-2xl bg-[#190f0d] border border-[#3e2722] p-6 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-red-500/5" />
              
              <div className="relative z-10 py-6 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ba181b]/20 border border-[#ba181b]/40 flex items-center justify-center text-[#e5383b] shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-serif-luxury">
                    Bride of Fried Chicken and Pizza
                  </h4>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    Bright Day Fried chicken and Pizza
                  </p>
                  <p className="text-xs text-[#b8a796] mt-1 max-w-sm mx-auto">
                    Civil Lines S.S.P Rd, Civil Lines Jhang, 35200, Pakistan
                  </p>
                </div>

                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2a1a17] hover:bg-[#38211d] border border-amber-400/50 text-xs font-bold text-amber-300 hover:text-white transition-all shadow-md mt-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate with GPS (Google Maps)</span>
                </a>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#3a241f] text-xs">
              <div className="p-3 rounded-xl bg-[#190f0d] border border-[#38221c] flex items-center gap-2.5">
                <Car className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-[#d1c4b5]">Dedicated Parking Space</span>
              </div>
              <div className="p-3 rounded-xl bg-[#190f0d] border border-[#38221c] flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[#d1c4b5]">Family Seating Hall</span>
              </div>
              <div className="p-3 rounded-xl bg-[#190f0d] border border-[#38221c] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-[#d1c4b5]">Speedy Takeaway Counter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
