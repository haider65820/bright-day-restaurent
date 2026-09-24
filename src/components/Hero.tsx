import React from 'react';
import { ArrowDown, Phone, ShoppingBag, Sparkles, MapPin, Star, Utensils } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderOnline: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderOnline }) => {
  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#140d0c] via-[#1a100e] to-[#221512]">
      {/* Background Image with Warm Amber & Espresso Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUSINESS_INFO.heroImage}
          alt="Bride of Fried Chicken and Pizza feast spread in Civil Lines Jhang"
          className="w-full h-full object-cover object-center scale-105 transform duration-1000"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedFallback) {
              target.dataset.triedFallback = 'true';
              target.src = BUSINESS_INFO.heroFallback;
            }
          }}
        />
        {/* Warm appetizing gradient scrims (rich espresso & spiced terracotta undertones) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#221512] via-[#180f0d]/80 to-[#120a09]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140d0c]/90 via-[#1a100e]/60 to-[#180f0d]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(24,15,13,0.85)_100%)]" />
      </div>

      {/* Warm ambient flare */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Eyebrow Tag with Restaurant Name */}
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#2a1a17]/90 border border-[#52332c] text-xs font-bold tracking-widest uppercase text-amber-400 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>WELCOME TO JHANG&apos;S PREMIER FOOD DESTINATION</span>
        </div>

        {/* Primary Restaurant Name prominently displayed */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#fdfbf7] font-serif-luxury mb-2 leading-[1.08] max-w-4xl">
          Bride of Fried Chicken and Pizza
        </h1>

        {/* Brand Subtitle / Reference */}
        <div className="text-base sm:text-2xl font-semibold text-amber-400 font-sans tracking-wide mb-4">
          Bright Day Fried chicken and Pizza
        </div>

        {/* Direct Address Badge with Google Maps Link */}
        <a
          href={BUSINESS_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-[#261614]/80 hover:bg-[#341e1b] border border-[#4a2e27] hover:border-amber-400/60 text-xs sm:text-sm text-[#e6dad0] transition-all group shadow-md"
        >
          <MapPin className="w-4 h-4 text-[#ba181b] group-hover:text-amber-400 transition-colors flex-shrink-0" />
          <span className="font-medium underline decoration-dotted decoration-[#78635c] group-hover:decoration-amber-400">
            {BUSINESS_INFO.address}
          </span>
        </a>

        {/* Supporting Tagline Text */}
        <p className="text-base sm:text-lg md:text-xl text-[#dcd1c4] max-w-2xl font-light mb-8 leading-relaxed text-balance">
          Loaded hand-stretched pizzas, crispy fried chicken, giant zinger burgers, creamy malai boti pasta, rolls, thick gelato shakes & mocktails.
        </p>

        {/* Call to Actions - Distinct In-Website Order vs Phone Call */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          {/* Main In-Website Online Order CTA */}
          <button
            onClick={onOrderOnline}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba181b] via-[#c62828] to-[#d93829] hover:from-[#a01417] hover:to-[#b72418] rounded-xl transition-all shadow-2xl shadow-[#ba181b]/40 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ORDER ONLINE (آن لائن آرڈر کریں)</span>
          </button>

          {/* Dedicated Separate Phone Call Option */}
          <a
            href={`tel:${BUSINESS_INFO.phoneTel}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#fbf7f0] bg-[#291815] hover:bg-[#38201b] border border-[#52332c] hover:border-amber-400/60 rounded-xl transition-all shadow-lg hover:scale-105"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>CALL TO ORDER: {BUSINESS_INFO.phoneDisplay}</span>
          </a>

          {/* Browse Menu button */}
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#d4c7b8] hover:text-white bg-transparent hover:bg-[#251714] border border-[#3d2722] rounded-xl transition-all cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>EXPLORE MENU</span>
          </button>
        </div>

        {/* Key Real Value Metrics in Jhang */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#3a2520] w-full max-w-3xl text-center">
          <div className="p-2.5 rounded-xl bg-[#221513]/60 border border-[#3b241e]">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-serif-luxury block">
              100%
            </span>
            <span className="text-[11px] text-[#b0a090] uppercase tracking-wider font-semibold">
              Fresh Halal Food
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#221513]/60 border border-[#3b241e]">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-serif-luxury block">
              16+
            </span>
            <span className="text-[11px] text-[#b0a090] uppercase tracking-wider font-semibold">
              Menu Categories
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#221513]/60 border border-[#3b241e]">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-serif-luxury block">
              30-40m
            </span>
            <span className="text-[11px] text-[#b0a090] uppercase tracking-wider font-semibold">
              Fast Delivery in Jhang
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#221513]/60 border border-[#3b241e]">
            <div className="flex items-center justify-center gap-0.5 text-amber-400 text-xl sm:text-2xl font-black font-serif-luxury">
              <span>4.9</span>
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="text-[11px] text-[#b0a090] uppercase tracking-wider font-semibold">
              340+ Top Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={onExploreMenu}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 p-2 text-[#9c8b7c] hover:text-amber-400 transition-colors animate-bounce cursor-pointer"
        aria-label="Scroll down to explore menu"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};
