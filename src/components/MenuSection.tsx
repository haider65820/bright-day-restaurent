import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, ChefHat, Filter, Info, X } from 'lucide-react';
import { MENU_CATEGORIES, MenuItem, MenuCategory } from '../data/menuData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem, defaultSize?: 's' | 'm' | 'l') => void;
  activeCategoryId: string;
  setActiveCategoryId: (id: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  activeCategoryId,
  setActiveCategoryId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'popular' | 'signature'>('all');

  // Find active category
  const activeCategory = useMemo(() => {
    return MENU_CATEGORIES.find((c) => c.id === activeCategoryId) || MENU_CATEGORIES[0];
  }, [activeCategoryId]);

  // Filter items based on search query or filterType
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      let items = activeCategory.items;
      if (filterType === 'popular') {
        items = items.filter((i) => i.isPopular || i.isSignature);
      } else if (filterType === 'signature') {
        items = items.filter((i) => i.isSignature);
      }
      return [
        {
          ...activeCategory,
          items,
        },
      ];
    }

    const query = searchQuery.toLowerCase().trim();
    const results: MenuCategory[] = [];

    MENU_CATEGORIES.forEach((cat) => {
      const matchingItems = cat.items.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesCat = cat.name.toLowerCase().includes(query) || cat.shortName.toLowerCase().includes(query);

        let matchesFilter = true;
        if (filterType === 'popular') matchesFilter = !!(item.isPopular || item.isSignature);
        if (filterType === 'signature') matchesFilter = !!item.isSignature;

        return (matchesName || matchesDesc || matchesCat) && matchesFilter;
      });

      if (matchingItems.length > 0) {
        results.push({
          ...cat,
          items: matchingItems,
        });
      }
    });

    return results;
  }, [searchQuery, activeCategory, filterType]);

  const totalResultsCount = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-[#1e1210] via-[#261613] to-[#1c110f] text-[#f5efe6] min-h-screen border-b border-[#3b241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUTHENTIC MENU & FRESH RECIPES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#fdfbf7] font-serif-luxury tracking-tight">
            Complete Restaurant Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#cfc0b0]">
            Explore all 16 categories crafted fresh in our Civil Lines Jhang kitchen. Prices in Pakistani Rupees (Rs.).
          </p>
        </div>

        {/* Search & Quick Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#231512] p-3.5 sm:p-4 rounded-2xl border border-[#442c26] shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#8a796c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizza, burger, chargha, pasta, shake..."
              className="w-full bg-[#190f0d] border border-[#3d2722] focus:border-amber-400/80 rounded-xl pl-10 pr-9 py-2.5 text-sm text-[#f5efe6] placeholder-[#78635c] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a796c] hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <span className="text-xs text-[#8a796c] flex items-center gap-1 mr-1 hidden sm:flex font-medium">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                filterType === 'all'
                  ? 'bg-amber-500 text-black font-bold shadow-md'
                  : 'bg-[#1a100e] text-[#bcaea0] hover:text-white hover:bg-[#2b1a17] border border-[#3d2722]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilterType('popular')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                filterType === 'popular'
                  ? 'bg-amber-500 text-black font-bold shadow-md'
                  : 'bg-[#1a100e] text-[#bcaea0] hover:text-white hover:bg-[#2b1a17] border border-[#3d2722]'
              }`}
            >
              Popular Choices
            </button>
            <button
              onClick={() => setFilterType('signature')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                filterType === 'signature'
                  ? 'bg-[#ba181b] text-white font-bold shadow-md'
                  : 'bg-[#1a100e] text-[#bcaea0] hover:text-white hover:bg-[#2b1a17] border border-[#3d2722]'
              }`}
            >
              Signatures
            </button>
          </div>
        </div>

        {/* 16 Category Navigation System */}
        {!searchQuery && (
          <div className="relative mb-12">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#3b241e] scroll-smooth">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ba181b] to-[#d93829] text-white shadow-lg shadow-[#ba181b]/35 border border-[#ba181b]'
                        : 'bg-[#221412] text-[#bcaea0] hover:text-white hover:bg-[#2e1c18] border border-[#3d2722]'
                    }`}
                  >
                    <span>{cat.shortName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${
                        isActive ? 'bg-black/40 text-amber-300' : 'bg-[#180f0d] text-[#8c7c6e]'
                      }`}
                    >
                      {cat.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Results Notification */}
        {searchQuery && (
          <div className="mb-8 flex items-center justify-between text-xs text-[#bcaea0] bg-[#221412] px-4 py-3 rounded-xl border border-[#3d2722]">
            <span>
              Showing <strong className="text-amber-300">{totalResultsCount}</strong> menu items matching &quot;{searchQuery}&quot;
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Menu Items Render */}
        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.id} className="scroll-mt-24">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-6 border-b border-[#3b241e]">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fdfbf7] flex items-center gap-3">
                    <span>{category.name}</span>
                    <span className="text-xs font-normal text-[#8c7c6e] font-sans">
                      ({category.items.length} {category.items.length === 1 ? 'item' : 'items'})
                    </span>
                  </h3>
                </div>

                {category.extras && (
                  <span className="text-xs text-amber-400 font-medium">
                    Cheese crust & extra topping options available
                  </span>
                )}
              </div>

              {/* Category Note */}
              {category.note && (
                <div className="mb-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-[#221412] border border-[#3e2722] text-xs text-[#d1c4b5]">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{category.note}</p>
                </div>
              )}

              {/* Category Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.items.map((item) => {
                  const isPizza = !!item.pizzaPrices;

                  return (
                    <div
                      key={item.id}
                      className="group bg-[#231512] hover:bg-[#2a1a17] border border-[#3d2722] hover:border-amber-500/50 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50"
                    >
                      <div>
                        {/* Top indicators */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            {item.isSignature && (
                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#e5383b] flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Signature
                              </span>
                            )}
                            {item.isPopular && !item.isSignature && (
                              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1">
                                <ChefHat className="w-3 h-3" /> Popular
                              </span>
                            )}
                          </div>

                          <span className="text-[11px] text-[#8c7c6e] uppercase font-medium">
                            {category.shortName}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base sm:text-lg font-bold text-[#fdfbf7] font-serif-luxury group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h4>

                        {/* Description */}
                        {item.description && (
                          <p className="mt-1.5 text-xs text-[#b8a796] leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Pricing & Add Action */}
                      <div className="mt-5 pt-4 border-t border-[#34201c] flex items-center justify-between gap-3">
                        {isPizza ? (
                          /* Pizza Size Multi-Price display */
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-xs font-semibold tabular-nums text-[#fdfbf7]">
                              {item.pizzaPrices?.s !== undefined && (
                                <span className="bg-[#1a100e] px-2 py-0.5 rounded-md border border-[#3e2722]">
                                  S: Rs. {item.pizzaPrices.s.toLocaleString()}
                                </span>
                              )}
                              {item.pizzaPrices?.m !== undefined && (
                                <span className="bg-[#1a100e] px-2 py-0.5 rounded-md border border-[#3e2722]">
                                  M: Rs. {item.pizzaPrices.m.toLocaleString()}
                                </span>
                              )}
                              {item.pizzaPrices?.l !== undefined && (
                                <span className="bg-[#1a100e] px-2 py-0.5 rounded-md border border-[#3e2722]">
                                  L: Rs. {item.pizzaPrices.l.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#8c7c6e]">
                              Click to choose size & crust
                            </span>
                          </div>
                        ) : (
                          /* Single item price */
                          <div>
                            <span className="text-[10px] text-[#8c7c6e] block uppercase">Price</span>
                            <span className="text-base font-bold text-amber-400 font-serif-luxury tabular-nums">
                              Rs. {item.price?.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (isPizza) {
                              const defaultSize = item.pizzaPrices?.s !== undefined ? 's' : (item.pizzaPrices?.m !== undefined ? 'm' : 'l');
                              onSelectItem(item, defaultSize);
                            } else {
                              onSelectItem(item);
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#be281a] rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shadow-md shadow-[#ba181b]/25"
                          title={isPizza ? 'Select Pizza Size' : 'Add to Order'}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isPizza ? 'Sizes' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16 bg-[#211412] rounded-2xl border border-[#3d2722]">
              <Search className="w-8 h-8 text-[#78635c] mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white">No dishes found</h4>
              <p className="text-xs text-[#a99989] mt-1 max-w-sm mx-auto">
                No menu items match &quot;{searchQuery}&quot;. Try searching for &quot;pizza&quot;, &quot;burger&quot;, &quot;wings&quot;, or &quot;shake&quot;.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#ba181b] rounded-xl"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
