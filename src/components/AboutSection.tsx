import React from 'react';
import { Sparkles, Utensils, HeartHandshake, ShieldCheck, Flame, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#1c110f] via-[#241512] to-[#1c110f] border-b border-[#3b241e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#442c26] shadow-2xl bg-[#201412]">
              <img
                src={BUSINESS_INFO.heroImage}
                alt="Bride of Fried Chicken and Pizza culinary spread in Civil Lines Jhang"
                className="w-full aspect-[4/3] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180f0d] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#231512]/95 backdrop-blur-md border border-[#442c26] shadow-xl">
                <div className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5 text-[#ba181b]" />
                  <span>CRAFTED FRESH DAILY</span>
                </div>
                <p className="text-xs text-[#d1c4b5]">
                  Stone-fired dough, aromatic local marinades, and hand-breaded crispy chicken.
                </p>
              </div>
            </div>

            {/* Accent backdrop card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-48 bg-[#ba181b]/10 rounded-2xl border border-[#ba181b]/20 -z-10 blur-xl" />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE HOSPITALITY TRADITION OF JHANG</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] font-serif-luxury tracking-tight leading-tight">
              One Table. <br className="hidden sm:inline" />
              Every Kind of Favorite.
            </h2>

            {/* Editorial Body */}
            <p className="mt-5 text-base sm:text-lg text-[#cbbea9] leading-relaxed">
              <strong className="text-white font-semibold">{BUSINESS_INFO.name}</strong> (known and loved as <span className="text-amber-300">{BUSINESS_INFO.altName}</span>) brings together the comfort of bubbling pan pizza, crispy fried chicken broast, giant double zingers, malai boti pasta, rolls, and cold gelato shakes at our welcoming dining address on Civil Lines S.S.P Road, Jhang.
            </p>

            {/* Quality Commitments */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#3b241e]">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#2a1a17] border border-[#442c26] text-amber-400 flex-shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">Fresh to Order</h4>
                  <p className="text-xs text-[#a99989] mt-0.5">
                    Never pre-fried or microwaved. Made hot when you order.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#2a1a17] border border-[#442c26] text-amber-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">100% Halal Cuts</h4>
                  <p className="text-xs text-[#a99989] mt-0.5">
                    Certified poultry and top-grade real mozzarella cheese.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#2a1a17] border border-[#442c26] text-amber-400 flex-shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">Family Seating</h4>
                  <p className="text-xs text-[#a99989] mt-0.5">
                    Air-conditioned dining space crafted for families in Jhang.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#2a1a17] border border-[#442c26] text-[#ba181b] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif-luxury">Civil Lines Location</h4>
                  <p className="text-xs text-[#a99989] mt-0.5">
                    Easy parking and central access on SSP Road, Jhang 35200.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
