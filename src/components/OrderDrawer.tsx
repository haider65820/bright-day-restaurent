import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Phone, Copy, Check, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { OrderItem } from '../types/order';
import { BUSINESS_INFO } from '../data/menuData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  onProceedToCheckout: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onProceedToCheckout,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.unitPrice + (item.extrasCost || 0)) * item.quantity,
    0
  );

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const orderSummaryText = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name}${
          item.selectedSizeLabel ? ` (${item.selectedSizeLabel})` : ''
        }${
          item.extras && item.extras.length > 0 ? ` + ${item.extras.join(', ')}` : ''
        } = Rs. ${((item.unitPrice + (item.extrasCost || 0)) * item.quantity).toLocaleString()}`
    )
    .join('\n');

  const fullClipboardText = `${BUSINESS_INFO.name} Order:\n${orderSummaryText}\nTotal: Rs. ${totalAmount.toLocaleString()}\nDestination: ${BUSINESS_INFO.shortAddress} (Call: ${BUSINESS_INFO.phoneDisplay})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullClipboardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-gradient-to-b from-[#251613] via-[#1f1311] to-[#180f0d] border-l border-[#442c26] h-full flex flex-col justify-between text-[#f5efe6] shadow-2xl">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#3b241e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ba181b]/20 border border-[#ba181b]/40 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base font-serif-luxury text-[#fdfbf7]">
                Your Order Bag
              </h3>
              <p className="text-[11px] text-[#a99989]">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearOrder}
                className="text-[11px] text-[#9c8c7d] hover:text-[#e5383b] transition-colors p-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#a99989] hover:text-white rounded-lg hover:bg-[#341e1a] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body Items */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-[#9c8c7d]">
              <div className="w-16 h-16 rounded-full bg-[#1c110f] border border-[#3b241e] flex items-center justify-center text-[#6e5e52]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">Your bag is empty</h4>
              <p className="text-xs max-w-xs text-[#a99989]">
                Add freshly baked pizza, crispy fried chicken, burgers, or shakes from our menu to begin.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const itemTotal =
                (item.unitPrice + (item.extrasCost || 0)) * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-[#1c110f] border border-[#38221c] rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-md"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white truncate">
                        {item.name}
                      </span>
                      {item.selectedSizeLabel && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#331e1a] text-amber-300 border border-[#4d2d27]">
                          {item.selectedSizeLabel}
                        </span>
                      )}
                    </div>

                    {item.extras && item.extras.length > 0 && (
                      <p className="text-[10px] text-[#a99989] mt-0.5 truncate">
                        +{item.extras.join(', ')}
                      </p>
                    )}

                    <div className="text-xs font-bold text-amber-400 tabular-nums mt-1 font-serif-luxury">
                      Rs. {itemTotal.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#291714] border border-[#442822] rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 text-[#b5a595] hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 text-[#b5a595] hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-[#786657] hover:text-[#e5383b]"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Direct Actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#3b241e] bg-[#1c110f]/95 space-y-4">
            {/* Subtotal */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider text-[#9c8c7d] font-semibold">
                Estimated Subtotal
              </span>
              <span className="text-2xl font-black text-amber-400 font-serif-luxury tabular-nums">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            {/* In-Website Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#be281a] shadow-xl shadow-[#ba181b]/35 transition-all hover:scale-102 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Proceed to In-Website Checkout (آرڈر مکمل کریں)</span>
            </button>

            {/* Separate Phone Call Option */}
            <div className="pt-2 border-t border-[#2e1c18] flex items-center justify-between gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2b1916] hover:bg-[#38201b] border border-[#52332c] text-xs font-bold text-amber-300 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call to Order: {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={handleCopy}
                className="px-3 py-2.5 rounded-xl bg-[#231411] border border-[#442822] text-[#bcaea0] hover:text-white transition-colors"
                title="Copy order list to clipboard"
                aria-label="Copy order text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
