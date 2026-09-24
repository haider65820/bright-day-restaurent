import React from 'react';
import { Plus, Sparkles, ChefHat } from 'lucide-react';
import { SIGNATURE_PICKS, MenuItem } from '../data/menuData';

interface FeaturedMenuProps {
  onSelectItem: (item: MenuItem, defaultSize?: 's' | 'm' | 'l') => void;
  onExploreFullMenu: () => void;
}

export const FeaturedMenu: React.FC<FeaturedMenuProps> = ({
  onSelectItem,
  onExploreFullMenu,
}) => {
  return (
    <section id="signatures" className="py-20 bg-gradient-to-b from-[#221512] via-[#281815] to-[#1e1210] border-y border-[#3d2722]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HAND-CRAFTED EXCELLENCE IN JHANG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfbf7] font-serif-luxury tracking-tight">
              Signature House Picks
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#cfc0b0] max-w-xl">
              Curated chef favorites prepared with our signature seasoning blends, tender chicken, and stone-oven perfection.
            </p>
          </div>

          <button
            onClick={onExploreFullMenu}
            className="mt-4 md:mt-0 self-start md:self-auto text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 underline underline-offset-4 decoration-amber-400/40 hover:decoration-amber-300 cursor-pointer"
          >
            <span>View All 16 Menu Categories</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* 6 Signature Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SIGNATURE_PICKS.map((item) => {
            const isPizza = !!item.pizzaPrices;
            const fallbackPrice = item.price ? `Rs. ${item.price.toLocaleString()}` : item.priceLabel;

            return (
              <div
                key={item.id}
                className="group bg-gradient-to-b from-[#2a1a17] to-[#201412] rounded-2xl overflow-hidden border border-[#442c26] hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#180f0d]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201412] via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#180f0d]/85 backdrop-blur-md border border-[#482d27] text-[11px] font-semibold tracking-wider uppercase text-amber-300">
                      {item.category}
                    </span>
                  </div>

                  {/* Pizza badge if customizer is used */}
                  {isPizza && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        Choose Size & Crust
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#fdfbf7] font-serif-luxury group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#bcaea0] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Add to Bag */}
                  <div className="mt-6 pt-4 border-t border-[#3b241e] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase text-[#9c8c7d] block">
                        Price
                      </span>
                      <span className="text-sm sm:text-base font-bold text-amber-400 font-serif-luxury tabular-nums">
                        {fallbackPrice}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        onSelectItem(
                          {
                            id: item.id,
                            name: item.name,
                            category: item.category.toLowerCase(),
                            description: item.description,
                            price: item.price,
                            pizzaPrices: item.pizzaPrices,
                          },
                          'm'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#ba181b] hover:bg-[#9e1416] text-white transition-all shadow-md shadow-[#ba181b]/30 hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label={`Add ${item.name} to order`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isPizza ? 'Customize' : 'Add to Bag'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
