import React from 'react';
import { Sparkles, MapPin, Heart, ShieldCheck, Camera, UtensilsCrossed } from 'lucide-react';
import { BUSINESS_INFO, DINING_MOMENTS } from '../data/menuData';

export const RealDiningMoments: React.FC = () => {
  return (
    <section id="dining-moments" className="py-24 bg-gradient-to-b from-[#1b100e] via-[#261613] to-[#1c110f] border-t border-b border-[#3d2621] relative overflow-hidden">
      {/* Warm ambient background lights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ba181b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>REAL MOMENTS & SIGHTS AT JHANG</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-serif-luxury text-[#fdfbf7] tracking-tight">
            Authentic Dining Moments
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#d1c2b2] leading-relaxed">
            Experience the genuine joy, sizzling fresh iron-pan pizzas, and warm family hospitality at{' '}
            <span className="text-amber-300 font-semibold">{BUSINESS_INFO.altName}</span> on Civil Lines S.S.P Rd, Jhang.
          </p>
        </div>

        {/* Two Featured Luxury Photographic Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Authentic Pan Pizza with melted cheese & sauce bottles */}
          <div className="group relative bg-gradient-to-b from-[#2a1a17] to-[#1e1311] border border-[#4d3029] rounded-3xl overflow-hidden shadow-2xl hover:border-amber-500/50 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
              <img
                src={BUSINESS_INFO.panPizzaImage}
                alt="Freshly baked pan pizza with mozzarella cheese pull at Bright Day Fried chicken and Pizza in Civil Lines Jhang"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1311] via-black/30 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fresh From The Oven</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                  Signature Stone & Pan Bake
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                  Hot Loaded Pan Pizza
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-[#d4c7b8] leading-relaxed">
                Served bubbling hot in our seasoned deep-dish pan with golden crust, double mozzarella stretch, tender spiced chicken boti, black olives, bell peppers, and signature garlic-mayo drizzle. Complete with classic ketchup and chilli garlic bottles on every table.
              </p>

              <div className="pt-4 border-t border-[#3e2722] flex flex-wrap items-center justify-between gap-3 text-xs text-[#b8a796]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ba181b]" />
                  <span>Civil Lines S.S.P Rd, Jhang 35200</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Fresh Halal Ingredients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Happy Guests & Family Dining Room */}
          <div className="group relative bg-gradient-to-b from-[#2a1a17] to-[#1e1311] border border-[#4d3029] rounded-3xl overflow-hidden shadow-2xl hover:border-amber-500/50 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
              <img
                src={BUSINESS_INFO.diningGuestsImage}
                alt="Friends and family dining together at Bright Day Fried chicken and Pizza restaurant in Civil Lines Jhang"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1311] via-black/30 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  <span>Civil Lines Hospitality</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                  Family & Friends Dining
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                  Cherished Food Moments
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-[#d4c7b8] leading-relaxed">
                Whether celebrating birthdays, weekend family dinners, or quick hangout bites with friends, our Civil Lines dining hall provides air-conditioned comfort, prompt friendly service, and a vibrant community atmosphere beloved across Jhang.
              </p>

              <div className="pt-4 border-t border-[#3e2722] flex flex-wrap items-center justify-between gap-3 text-xs text-[#b8a796]">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                  <span>Spacious Family Seating & Air-Conditioned</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Generations of Jhang Diners</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner with Direct Location Anchor */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#2c1916] via-[#351d18] to-[#251512] border border-[#52332c] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-center md:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              VISIT OUR RESTAURANT IN JHANG
            </span>
            <h4 className="text-xl font-bold font-serif-luxury text-[#fdfbf7]">
              Bright Day Fried chicken and Pizza
            </h4>
            <p className="text-xs sm:text-sm text-[#cfc0b0] mt-0.5">
              {BUSINESS_INFO.address}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ba181b] hover:bg-[#9e1416] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ba181b]/30 transition-all hover:scale-105"
            >
              <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
