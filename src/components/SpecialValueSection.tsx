import React from 'react';
import { ArrowRight, Pizza, Flame, Sandwich, Coffee } from 'lucide-react';

interface SpecialValueSectionProps {
  onExploreFullMenu: () => void;
}

export const SpecialValueSection: React.FC<SpecialValueSectionProps> = ({
  onExploreFullMenu,
}) => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1e1210] via-[#261512] to-[#1c110f] relative overflow-hidden border-b border-[#3b241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#2c1a17] via-[#351f1a] to-[#261512] rounded-3xl border border-[#52332c] p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              COMPLETE CULINARY VARIETY IN JHANG
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fdfbf7] font-serif-luxury mt-2 mb-3">
              Something Made for Every Craving
            </h2>
            <p className="text-base sm:text-lg text-[#d1c2b2] leading-relaxed">
              Stone-baked pizzas, crackling broast & fried chargha, colossal zinger burgers, creamy pasta, paratha rolls, and chilled gelato shakes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm text-[#e6dad0]">
              <div className="flex items-center gap-2 bg-[#1c110f]/90 px-3.5 py-2 rounded-xl border border-[#442c26]">
                <Pizza className="w-4 h-4 text-amber-400" />
                <span>17 Specialty Pizzas</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1c110f]/90 px-3.5 py-2 rounded-xl border border-[#442c26]">
                <Flame className="w-4 h-4 text-[#ba181b]" />
                <span>Chargha & Crispy Broast</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1c110f]/90 px-3.5 py-2 rounded-xl border border-[#442c26]">
                <Sandwich className="w-4 h-4 text-amber-300" />
                <span>Zingers, Paninis & Rolls</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1c110f]/90 px-3.5 py-2 rounded-xl border border-[#442c26]">
                <Coffee className="w-4 h-4 text-emerald-400" />
                <span>Gelato Shakes & Mocktails</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onExploreFullMenu}
              className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#c12e20] rounded-xl transition-all shadow-xl shadow-[#ba181b]/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>EXPLORE FULL MENU</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
