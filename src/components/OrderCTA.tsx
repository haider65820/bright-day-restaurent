import React from 'react';
import { Phone, ShoppingBag, Sparkles, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

interface OrderCTAProps {
  onOrderOnline: () => void;
  onViewMenu: () => void;
}

export const OrderCTA: React.FC<OrderCTAProps> = ({ onOrderOnline, onViewMenu }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a100e] via-[#241512] to-[#180f0d] border-y border-[#3b241e] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-3 px-3.5 py-1.5 rounded-full bg-[#2a1a17] border border-[#50322a]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>IN-WEBSITE DIRECT ORDERING OR PHONE CALL</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-[#fdfbf7] font-serif-luxury tracking-tight leading-tight">
          Ready for Big Flavor? <br className="hidden sm:inline" />
          Order Online or Call Today.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#cbbea9] max-w-xl mx-auto font-light leading-relaxed">
          Order your favorite stone-baked pan pizzas, crispy fried chicken, giant zinger burgers, and creamy gelato shakes right inside the website or call us directly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* In-Website Ordering */}
          <button
            onClick={onOrderOnline}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#be281a] rounded-xl transition-all shadow-xl shadow-[#ba181b]/35 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ORDER ONLINE (آن لائن آرڈر کریں)</span>
          </button>

          {/* Separate Phone Call */}
          <a
            href={`tel:${BUSINESS_INFO.phoneTel}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#2a1a17] hover:bg-[#38221c] border border-[#52332c] hover:border-amber-400/60 rounded-xl transition-all shadow-lg hover:scale-105"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>CALL TO ORDER: {BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Address tag */}
        <a
          href={BUSINESS_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#a99989] hover:text-amber-400 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-[#ba181b]" />
          <span>{BUSINESS_INFO.address}</span>
        </a>
      </div>
    </section>
  );
};
