import React from 'react';
import { Phone, MapPin, Star, Truck, ShoppingBag, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

interface FooterProps {
  onNavigateToCategory: (categoryId: string) => void;
  onNavigateToOrderOnline: () => void;
  onNavigateToTracking: () => void;
  onOpenReviewModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToCategory,
  onNavigateToOrderOnline,
  onNavigateToTracking,
  onOpenReviewModal,
}) => {
  return (
    <footer className="bg-[#130b0a] text-[#f5efe6] border-t border-[#341f1a] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2d1b17]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif-luxury font-bold text-xl tracking-tight text-white uppercase block">
                {BUSINESS_INFO.name}
              </span>
              <span className="text-xs font-semibold text-amber-400 tracking-wider">
                {BUSINESS_INFO.altName}
              </span>
            </div>

            <p className="text-sm text-[#c4b5a5] leading-relaxed">
              Stone-Baked Pizza • Crispy Fried Chicken • Colossal Burgers • Malai Boti Pasta • Rolls • Gelato Shakes & Mocktails
            </p>

            <p className="text-xs text-[#9c8c7d] leading-relaxed">
              Serving the authentic, craveable flavors of Pakistan from our flagship kitchen on Civil Lines S.S.P Road, Jhang 35200.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenReviewModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241512] border border-amber-500/40 text-amber-300 text-xs font-semibold hover:text-white transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Leave a Review / ریویو دیں</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#a99989] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#d4c7b8]">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Home (ہوم)
                </a>
              </li>
              <li>
                <button
                  onClick={onNavigateToOrderOnline}
                  className="hover:text-amber-400 transition-colors text-left font-semibold text-white flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#ba181b]" />
                  <span>Order Online</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToTracking}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Track Order</span>
                </button>
              </li>
              <li>
                <a href="#dining-moments" className="hover:text-amber-400 transition-colors">
                  Dining Moments (تصاویر)
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-amber-400 transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Location & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Top Menu Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#a99989] mb-4">
              Featured Categories
            </h4>
            <ul className="space-y-2 text-sm text-[#d4c7b8]">
              <li>
                <button
                  onClick={() => onNavigateToCategory('pizzas')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Specialty Pizzas (17 Flavors)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToCategory('fried-chicken')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Fried Chicken & Chargha
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToCategory('burgers')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  BD Special Zinger Burgers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToCategory('pasta')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Malai Boti & Creamy Pastas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToCategory('special-gelato-shakes')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Special Gelato Shakes
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details with Exact Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#a99989] mb-4">
              Visit Us in Jhang
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-[#cfc2b2]">
              <MapPin className="w-4 h-4 text-[#ba181b] flex-shrink-0 mt-0.5" />
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 transition-colors underline decoration-dotted"
              >
                {BUSINESS_INFO.address}
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[#9c8c7d] block uppercase tracking-wider font-semibold">
                Direct Phone Call
              </span>
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="text-base font-bold text-amber-400 hover:text-white transition-colors tabular-nums font-serif-luxury"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[#9c8c7d] block uppercase tracking-wider font-semibold">
                Timings
              </span>
              <span className="text-xs text-white block">11:00 AM — 01:00 AM</span>
              <span className="text-[11px] text-emerald-400">Open Daily in Jhang</span>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c7c6e]">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#bcaea0]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#ba181b] fill-[#ba181b]" />
            <span>for food lovers in Civil Lines, Jhang</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
