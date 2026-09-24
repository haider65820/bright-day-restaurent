import React, { useState } from 'react';
import { X, Check, Pizza } from 'lucide-react';
import { MenuItem, MenuExtra, PIZZA_SIZES } from '../data/menuData';

interface PizzaCustomizerModalProps {
  item: MenuItem;
  extras?: MenuExtra[];
  onClose: () => void;
  onConfirm: (size: 's' | 'm' | 'l', selectedExtras: string[], totalPrice: number) => void;
}

export const PizzaCustomizerModal: React.FC<PizzaCustomizerModalProps> = ({
  item,
  extras = [],
  onClose,
  onConfirm,
}) => {
  const availableSizes = PIZZA_SIZES.filter(
    (size) => item.pizzaPrices && item.pizzaPrices[size.key] !== undefined
  );

  const [selectedSize, setSelectedSize] = useState<'s' | 'm' | 'l'>(
    availableSizes[0]?.key || 'm'
  );
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);

  const basePrice = (item.pizzaPrices && item.pizzaPrices[selectedSize]) || 0;

  const extrasCost = selectedExtraIds.reduce((sum, extraId) => {
    const extra = extras.find((e) => e.id === extraId);
    if (!extra) return sum;
    if (selectedSize === 's' && extra.sPrice) return sum + extra.sPrice;
    if (selectedSize === 'm' && extra.mPrice) return sum + extra.mPrice;
    return sum;
  }, 0);

  const totalPrice = basePrice + extrasCost;

  const toggleExtra = (extraId: string) => {
    if (selectedExtraIds.includes(extraId)) {
      setSelectedExtraIds(selectedExtraIds.filter((id) => id !== extraId));
    } else {
      setSelectedExtraIds([...selectedExtraIds, extraId]);
    }
  };

  const handleConfirm = () => {
    const extraNames = selectedExtraIds
      .map((id) => extras.find((e) => e.id === id)?.name)
      .filter(Boolean) as string[];
    onConfirm(selectedSize, extraNames, totalPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] flex flex-col bg-gradient-to-b from-[#2a1a17] via-[#211412] to-[#1a100f] border border-[#52332c] rounded-2xl sm:rounded-3xl shadow-2xl text-[#f5efe6] my-auto overflow-hidden">
        {/* Pinned Modal Header */}
        <div className="flex-shrink-0 px-6 pt-5 pb-3.5 border-b border-[#3d2722] flex items-center justify-between bg-[#291916]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ba181b]/20 border border-[#ba181b]/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Pizza className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                PIZZA SIZE & CRUST CUSTOMIZER
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#fdfbf7]">
                {item.name}
              </h3>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 -mr-1 text-[#a99989] hover:text-white rounded-xl hover:bg-[#38221c] transition-colors cursor-pointer"
            aria-label="Close pizza customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 modal-scroll">
          {/* Pizza Description */}
          {item.description && (
            <p className="text-xs text-[#c4b5a5] leading-relaxed bg-[#190f0d] p-3 rounded-xl border border-[#3e2722]">
              {item.description}
            </p>
          )}

        {/* Size Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#d1c2b2] mb-2.5">
            1. Select Size (سائز منتخب کریں)
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {availableSizes.map((size) => {
              const price = item.pizzaPrices ? item.pizzaPrices[size.key] : 0;
              const isSelected = selectedSize === size.key;

              return (
                <button
                  key={size.key}
                  type="button"
                  onClick={() => setSelectedSize(size.key)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ba181b] border-[#ba181b] text-white shadow-lg shadow-[#ba181b]/30'
                      : 'bg-[#1a100e] border-[#3e2722] text-[#b8a796] hover:border-[#5a3830] hover:text-white'
                  }`}
                >
                  <span className="block text-xs sm:text-sm font-bold">{size.label}</span>
                  <span className="block text-[10px] text-amber-300 opacity-90">{size.dimension}</span>
                  <span className="block text-xs font-black mt-1 tabular-nums font-serif-luxury">
                    Rs. {price?.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extras / Upgrades (Cheese Crust, Extra Toppings) */}
        {extras.length > 0 && (
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#d1c2b2] mb-2.5">
              2. Optional Upgrades (اضافی ٹاپنگ اور کرسٹ)
            </label>
            <div className="space-y-2">
              {extras.map((extra) => {
                const cost =
                  selectedSize === 's'
                    ? extra.sPrice
                    : selectedSize === 'm'
                    ? extra.mPrice
                    : extra.mPrice;
                const isSelected = selectedExtraIds.includes(extra.id);

                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra.id)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#311d19] border-amber-400 text-white'
                        : 'bg-[#1a100e] border-[#3e2722] text-[#b8a796] hover:border-[#5a3830]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected
                            ? 'bg-amber-400 border-amber-400 text-black'
                            : 'border-[#5a3830]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold text-[#f5efe6]">{extra.name}</span>
                    </div>

                    {cost && (
                      <span className="text-xs font-bold text-amber-400 tabular-nums">
                        +Rs. {cost}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        </div>

        {/* Pinned Sticky Bottom Price Bar & Confirm Button */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-[#3e2722] bg-[#1d1210]/95 backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8c7c6e] block">
              Total Item Price
            </span>
            <span className="text-2xl font-black text-amber-400 font-serif-luxury tabular-nums">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-[#a99989] hover:text-white rounded-xl hover:bg-[#2e1c18] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#be281a] rounded-xl shadow-lg shadow-[#ba181b]/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
