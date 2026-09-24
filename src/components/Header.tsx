import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, Menu, X, Star, Truck, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

interface HeaderProps {
  orderCount: number;
  onOpenOrderBag: () => void;
  onNavigateToHome: () => void;
  onNavigateToMenu: (categoryId?: string) => void;
  onNavigateToOrderOnline: () => void;
  onNavigateToTracking: () => void;
  onOpenReviewModal: () => void;
  currentView: 'home' | 'order' | 'track';
}

export const Header: React.FC<HeaderProps> = ({
  orderCount,
  onOpenOrderBag,
  onNavigateToHome,
  onNavigateToMenu,
  onNavigateToOrderOnline,
  onNavigateToTracking,
  onOpenReviewModal,
  currentView,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#190f0d]/95 backdrop-blur-md border-b border-[#3d2722] py-2.5 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-[#180f0d]/95 via-[#1a110f]/75 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Zone 1: Restaurant Name & Wordmark */}
          <button
            onClick={onNavigateToHome}
            className="text-left group flex flex-col focus:outline-none cursor-pointer"
            aria-label="Bride of Fried Chicken and Pizza Home"
          >
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-xl font-bold font-serif-luxury tracking-tight text-[#fdfbf7] group-hover:text-amber-400 transition-colors uppercase">
                Bride of Fried Chicken and Pizza
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-wider text-[#d4c0ae] font-medium flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">Bright Day</span>
              <span>·</span>
              <span>Civil Lines S.S.P Rd, Jhang</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-[#d4c7b8]">
            <button
              onClick={() => {
                onNavigateToHome();
                setTimeout(() => onNavigateToMenu(), 100);
              }}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-amber-400 font-bold' : ''
              }`}
            >
              Menu (مینو)
            </button>

            <button
              onClick={onNavigateToOrderOnline}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                currentView === 'order'
                  ? 'bg-[#ba181b] border-[#ba181b] text-white font-bold shadow-md'
                  : 'bg-[#2a1a17] border-[#4d2f28] text-amber-300 hover:text-white hover:border-amber-400'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Online (آن لائن آرڈر)</span>
            </button>

            <button
              onClick={onNavigateToTracking}
              className={`flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer ${
                currentView === 'track' ? 'text-amber-400 font-bold' : ''
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order (آرڈر ٹریک کریں)</span>
            </button>

            <a
              href="#dining-moments"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  onNavigateToHome();
                  setTimeout(() => {
                    document.getElementById('dining-moments')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Real Moments (تصاویر)
            </a>

            <a
              href="#reviews-section"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  onNavigateToHome();
                  setTimeout(() => {
                    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Reviews (ریویوز)
            </a>

            <a
              href="#location"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  onNavigateToHome();
                  setTimeout(() => {
                    document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#ba181b]" />
              <span>Location</span>
            </a>
          </nav>

          {/* Zone 3: Distinct Call Option, Review Icon, and Bag Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Separate Phone Call Option Button (Always accessible) */}
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2b1b18] hover:bg-[#3b231f] border border-[#52332c] text-xs font-bold text-[#f7f0e6] transition-all hover:scale-102"
              title="Call restaurant directly"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline">Call:</span>
              <span className="text-amber-300 tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            {/* Dedicated Review Icon Button */}
            <button
              onClick={onOpenReviewModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-[#281816] hover:bg-[#38211d] border border-amber-500/40 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-all cursor-pointer"
              title="Leave a Review for restaurant or website"
              aria-label="Leave a review"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="hidden md:inline">Review</span>
            </button>

            {/* Order Bag / Cart Button */}
            <button
              onClick={onOpenOrderBag}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#c12e20] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ba181b]/30 transition-all hover:scale-105 cursor-pointer"
              aria-label={`Order Bag with ${orderCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {orderCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-black/40 text-amber-300 text-[11px] font-black flex items-center justify-center tabular-nums">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#d4c7b8] hover:text-white rounded-lg bg-[#251715] border border-[#3d2621]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1f1311] border-b border-[#442c26] px-4 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2.5 text-sm font-semibold">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToHome();
              }}
              className="text-left px-3 py-2 rounded-lg bg-[#271714] text-white font-medium"
            >
              Home (ہوم)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToHome();
                setTimeout(() => onNavigateToMenu(), 100);
              }}
              className="text-left px-3 py-2 rounded-lg bg-[#271714] text-white font-medium"
            >
              Browse Menu (مینو دیکھیں)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToOrderOnline();
              }}
              className="text-left px-3 py-2.5 rounded-lg bg-[#ba181b] text-white font-bold flex items-center justify-between"
            >
              <span>Place Order Online (آن لائن آرڈر کریں)</span>
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToTracking();
              }}
              className="text-left px-3 py-2.5 rounded-lg bg-amber-500 text-black font-bold flex items-center justify-between"
            >
              <span>Live Order Tracking (لائیو آرڈر ٹریک کریں)</span>
              <Truck className="w-4 h-4" />
            </button>

            <a
              href="#dining-moments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-[#d4c7b8] hover:bg-[#271714]"
            >
              Authentic Dining Moments (تصاویر)
            </a>

            <a
              href="#reviews-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-[#d4c7b8] hover:bg-[#271714]"
            >
              Customer Reviews (صارفین کی رائے)
            </a>

            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-[#d4c7b8] hover:bg-[#271714]"
            >
              Visit Location & Map (لوکیشن اور پتہ)
            </a>
          </div>

          <div className="pt-3 border-t border-[#3b241e] space-y-2">
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2a1916] border border-[#52332c] text-amber-300 font-bold text-xs uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Direct Call: {BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReviewModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#241614] text-[#cfc0b0] font-semibold text-xs border border-[#3b241e]"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Write a Review / ریویو دیں</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
