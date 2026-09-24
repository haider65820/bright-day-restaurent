import React, { useState } from 'react';
import {
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Truck,
  ChefHat,
  PackageCheck,
  Search,
  ArrowRight,
  ShieldCheck,
  Trash2,
  Plus,
  Minus,
  FileText,
  Utensils
} from 'lucide-react';
import { OrderItem, PlacedOrder, OrderStatus } from '../types/order';
import { BUSINESS_INFO } from '../data/menuData';

interface OnlineOrderPageProps {
  orderItems: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  onNavigateToMenu: () => void;
  placedOrders: PlacedOrder[];
  onAddNewOrder: (order: PlacedOrder) => void;
  activeOrderToTrack: PlacedOrder | null;
  setActiveOrderToTrack: (order: PlacedOrder | null) => void;
  initialTab?: 'checkout' | 'track';
}

export const OnlineOrderPage: React.FC<OnlineOrderPageProps> = ({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onNavigateToMenu,
  placedOrders,
  onAddNewOrder,
  activeOrderToTrack,
  setActiveOrderToTrack,
  initialTab = 'checkout',
}) => {
  const [currentTab, setCurrentTab] = useState<'checkout' | 'track'>(initialTab);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine-in'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'counter_payment' | 'easypaisa_jazzcash'>('cash_on_delivery');

  // Search input for order tracking
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchError, setSearchError] = useState('');

  // Success state after placing order
  const [recentlyPlacedOrder, setRecentlyPlacedOrder] = useState<PlacedOrder | null>(null);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.unitPrice + (item.extrasCost || 0)) * item.quantity,
    0
  );

  const deliveryFee = orderType === 'delivery' ? (subtotal > 1499 ? 0 : 99) : 0;
  const totalAmount = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      alert('Your cart is empty! Please add dishes from the menu first.');
      return;
    }

    if (!customerName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter your delivery address in Jhang.');
      return;
    }

    // Generate unique Pakistani restaurant Order ID
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `BD-${randomId}`;

    const newOrder: PlacedOrder = {
      orderId: newOrderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : BUSINESS_INFO.address,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      paymentMethod,
      items: [...orderItems],
      subtotal,
      deliveryFee,
      total: totalAmount,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentStatus: 'confirmed',
      estimatedMinutes: 35,
    };

    onAddNewOrder(newOrder);
    setRecentlyPlacedOrder(newOrder);
    setActiveOrderToTrack(newOrder);
    onClearOrder(); // Clear the active bag
    setCurrentTab('track');
  };

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const query = searchOrderId.trim().toUpperCase();
    if (!query) return;

    const found = placedOrders.find(
      (o) => o.orderId.toUpperCase() === query || o.phone.includes(query)
    );

    if (found) {
      setActiveOrderToTrack(found);
    } else {
      setSearchError(`No order found matching "${searchOrderId}". Check your Order ID (e.g. BD-12345).`);
    }
  };

  const currentTrackOrder = activeOrderToTrack || (placedOrders.length > 0 ? placedOrders[0] : null);

  // Status step progression helper
  const stages: {
    key: OrderStatus;
    title: string;
    urduTitle: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      key: 'confirmed',
      title: 'Order Confirmed',
      urduTitle: 'آرڈر موصول اور منظور ہو گیا',
      desc: 'Sent to Bride of Fried Chicken & Pizza kitchen counter',
      icon: CheckCircle2,
    },
    {
      key: 'kitchen',
      title: 'Preparing in Kitchen',
      urduTitle: 'کچن میں تیار ہو رہا ہے',
      desc: 'Baking stone-fired pizza & fresh pressure frying chicken',
      icon: ChefHat,
    },
    {
      key: 'packaging',
      title: 'Quality Check & Packed',
      urduTitle: 'پیکنگ اور کوالٹی چیک',
      desc: 'Hot thermal insulated packaging with sauces & condiments',
      icon: PackageCheck,
    },
    {
      key: 'out_for_delivery',
      title: 'Out on SSP Road',
      urduTitle: 'ڈیلیوری کے لیے روانہ',
      desc: 'Rider on the way through Civil Lines, Jhang',
      icon: Truck,
    },
    {
      key: 'delivered',
      title: 'Delivered / Completed',
      urduTitle: 'کامیابی سے ڈیلیور ہو گیا',
      desc: 'Enjoy your hot meal from Bride of Fried Chicken and Pizza!',
      icon: Utensils,
    },
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return 0;
      case 'kitchen':
        return 1;
      case 'packaging':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#180f0d] via-[#241613] to-[#1a100e] text-[#f5efe6] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>IN-WEBSITE DIRECT ORDERING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#fdfbf7] tracking-tight">
            Order Online & Live Tracking
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#c9bcad]">
            Bride of Fried Chicken and Pizza · {BUSINESS_INFO.shortAddress}
          </p>
        </div>

        {/* Separate Phone Call Option Notice (Explicitly separated per prompt) */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#2c1a17] via-[#351f1a] to-[#2a1815] border border-[#50322a] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
              <Phone className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Call Option (براہِ راست فون کال)
              </span>
              <p className="text-xs sm:text-sm text-[#e0d3c5]">
                Prefer to order by telephone or have a custom inquiry? Call directly:
              </p>
            </div>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.phoneTel}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ba181b] hover:bg-[#9c1416] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ba181b]/30 transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setCurrentTab('checkout')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'checkout'
                ? 'bg-[#ba181b] text-white shadow-xl shadow-[#ba181b]/35 border border-[#ba181b]'
                : 'bg-[#201412] text-[#bfb0a0] hover:text-white border border-[#3b2520]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>1. Place Order (آرڈر کریں)</span>
            {orderItems.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-black/40 text-amber-300 text-[11px] tabular-nums">
                {orderItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('track')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              currentTab === 'track'
                ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/25 border border-amber-500'
                : 'bg-[#201412] text-[#bfb0a0] hover:text-white border border-[#3b2520]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>2. Live Order Tracking (آرڈر ٹریک کریں)</span>
            {placedOrders.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[11px] tabular-nums font-bold">
                {placedOrders.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Checkout Form & In-Website Order Placement */}
        {currentTab === 'checkout' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Customer & Delivery Details Form */}
            <div className="lg:col-span-7 bg-[#211412] border border-[#442b24] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#fdfbf7]">
                  Customer & Delivery Information
                </h3>
                <p className="text-xs text-[#b0a090] mt-1">
                  We prepare fresh food at Civil Lines SSP Road, Jhang.
                </p>
              </div>

              <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-5">
                {/* Order Type Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d0c0b0] mb-2">
                    Select Order Type (آرڈر کی قسم)
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        orderType === 'delivery'
                          ? 'bg-[#ba181b]/20 border-[#ba181b] text-white font-bold'
                          : 'bg-[#1a100e] border-[#38221c] text-[#a99989] hover:border-[#52332c]'
                      }`}
                    >
                      <Truck className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                      <span className="text-xs block">Home Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        orderType === 'takeaway'
                          ? 'bg-[#ba181b]/20 border-[#ba181b] text-white font-bold'
                          : 'bg-[#1a100e] border-[#38221c] text-[#a99989] hover:border-[#52332c]'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                      <span className="text-xs block">Takeaway</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('dine-in')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        orderType === 'dine-in'
                          ? 'bg-[#ba181b]/20 border-[#ba181b] text-white font-bold'
                          : 'bg-[#1a100e] border-[#38221c] text-[#a99989] hover:border-[#52332c]'
                      }`}
                    >
                      <Utensils className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                      <span className="text-xs block">Dine-In Table</span>
                    </button>
                  </div>
                </div>

                {/* Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d4c5b5] mb-1.5">
                      Full Name (آپ کا مکمل نام) *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full bg-[#180f0d] border border-[#442c26] focus:border-amber-400/80 rounded-xl px-4 py-3 text-sm text-white placeholder-[#78635c] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d4c5b5] mb-1.5">
                      Phone Number (فون نمبر) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300-1234567"
                      className="w-full bg-[#180f0d] border border-[#442c26] focus:border-amber-400/80 rounded-xl px-4 py-3 text-sm text-white placeholder-[#78635c] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Address or Dine-In Table */}
                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#d4c5b5] mb-1.5 flex items-center justify-between">
                      <span>Delivery Address in Jhang (جھنگ میں ڈیلیوری کا پتہ) *</span>
                      <span className="text-[11px] text-amber-400">Civil Lines & Jhang 35200</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House/Street #, Colony, Near Landmark, Civil Lines / SSP Road, Jhang"
                      className="w-full bg-[#180f0d] border border-[#442c26] focus:border-amber-400/80 rounded-xl p-3 text-sm text-white placeholder-[#78635c] focus:outline-none resize-none"
                    />
                  </div>
                )}

                {orderType === 'dine-in' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#d4c5b5] mb-1.5">
                      Table Number (ٹیبل نمبر - اختیاری)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 4 / Family Room"
                      className="w-full bg-[#180f0d] border border-[#442c26] focus:border-amber-400/80 rounded-xl px-4 py-3 text-sm text-white placeholder-[#78635c] focus:outline-none"
                    />
                  </div>
                )}

                {/* Special Cooking Instructions */}
                <div>
                  <label className="block text-xs font-semibold text-[#d4c5b5] mb-1.5">
                    Special Kitchen Notes (خصوصی ہدایات)
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra spicy pizza, crispy broast crust, extra napkins & ketchup"
                    className="w-full bg-[#180f0d] border border-[#442c26] focus:border-amber-400/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#78635c] focus:outline-none"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d0c0b0] mb-2">
                    Payment Method (ادائیگی کا طریقہ)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash_on_delivery')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'cash_on_delivery'
                          ? 'bg-[#2f1c18] border-amber-400 text-white shadow-md'
                          : 'bg-[#180f0d] border-[#3b241e] text-[#a99989] hover:border-[#52332c]'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-white">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-[#9c8c7d]">Pay cash upon arrival</span>
                      </div>
                      {paymentMethod === 'cash_on_delivery' && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('easypaisa_jazzcash')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'easypaisa_jazzcash'
                          ? 'bg-[#2f1c18] border-amber-400 text-white shadow-md'
                          : 'bg-[#180f0d] border-[#3b241e] text-[#a99989] hover:border-[#52332c]'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-white">EasyPaisa / JazzCash</span>
                        <span className="text-[11px] text-[#9c8c7d]">Pay on delivery via mobile</span>
                      </div>
                      {paymentMethod === 'easypaisa_jazzcash' && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Order Items Summary & Submit Button */}
            <div className="lg:col-span-5 bg-[#211412] border border-[#442b24] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#3b241e] pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold font-serif-luxury text-[#fdfbf7]">
                    Order Summary
                  </h3>
                </div>
                {orderItems.length > 0 && (
                  <button
                    onClick={onClearOrder}
                    className="text-xs text-[#9c8c7d] hover:text-[#e5383b] transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Items List */}
              {orderItems.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#180f0d] border border-[#3b241e] flex items-center justify-center text-[#7a6a5c]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">No items in your bag</h4>
                  <p className="text-xs text-[#a99989] max-w-xs mx-auto">
                    Please browse the menu and add pizza, chargha, burgers, or shakes to place an online order.
                  </p>
                  <button
                    onClick={onNavigateToMenu}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ba181b] hover:bg-[#9c1416] text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                  >
                    <span>Browse Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {orderItems.map((item) => {
                    const itemTotal = (item.unitPrice + (item.extrasCost || 0)) * item.quantity;
                    return (
                      <div
                        key={item.id}
                        className="bg-[#180f0d] border border-[#38221c] rounded-xl p-3 flex items-center justify-between gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.name}
                            </span>
                            {item.selectedSizeLabel && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#331e1a] text-amber-300 border border-[#4d2d27]">
                                {item.selectedSizeLabel}
                              </span>
                            )}
                          </div>
                          {item.extras && item.extras.length > 0 && (
                            <p className="text-[10px] text-[#9c8c7d] truncate">
                              +{item.extras.join(', ')}
                            </p>
                          )}
                          <div className="text-xs font-bold text-amber-400 tabular-nums mt-1">
                            Rs. {itemTotal.toLocaleString()}
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center bg-[#291714] border border-[#442822] rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 text-[#b5a595] hover:text-white"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1.5 text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 text-[#b5a595] hover:text-white"
                              aria-label="Increase"
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
                  })}
                </div>
              )}

              {/* Price Calculation */}
              <div className="pt-4 border-t border-[#3b241e] space-y-2 text-xs text-[#c9bcad]">
                <div className="flex justify-between">
                  <span>Subtotal (اشیاء کا مجموعہ)</span>
                  <span className="font-bold text-white tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges (ڈیلیوری چارجز)</span>
                  <span className="font-bold text-amber-400 tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#3b241e] flex justify-between items-baseline text-sm sm:text-base font-bold text-white">
                  <span>Total Amount (کل رقم)</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-serif-luxury tabular-nums">
                    Rs. {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={orderItems.length === 0}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r from-[#ba181b] via-[#c62828] to-[#d93829] hover:from-[#a01417] hover:to-[#b72418] shadow-2xl shadow-[#ba181b]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-102 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Place Order Now (ابھی آرڈر کریں)</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] text-[#8c7c6e] justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Immediate Kitchen Dispatch & Live Order ID Confirmation</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Order Tracking Screen */}
        {currentTab === 'track' && (
          <div className="space-y-8">
            {/* Search by Order ID Bar */}
            <div className="bg-[#211412] border border-[#442b24] rounded-2xl p-4 sm:p-6 shadow-xl">
              <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-[#8a796c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    placeholder="Enter Order ID (e.g. BD-49210) or Phone Number..."
                    className="w-full bg-[#180f0d] border border-[#3b241e] focus:border-amber-400/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#78635c] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Track Order
                </button>
              </form>
              {searchError && (
                <p className="text-xs text-[#e5383b] mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{searchError}</span>
                </p>
              )}
            </div>

            {/* If Order Just Placed: Celebratory Success Banner */}
            {recentlyPlacedOrder && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17381d] via-[#1a4422] to-[#143319] border border-emerald-500/40 text-[#f2faf3] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block">
                        ORDER CONFIRMED & RECEIVED
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white font-serif-luxury">
                        آپ کا آرڈر کامیابی سے بک ہو چکا ہے!
                      </h3>
                      <p className="text-xs text-emerald-200/90 mt-0.5">
                        Order ID: <strong className="text-amber-300 text-sm">{recentlyPlacedOrder.orderId}</strong> — Sent to Kitchen at Civil Lines SSP Road, Jhang.
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right bg-black/30 p-3 rounded-xl border border-emerald-500/20">
                    <span className="text-[11px] text-emerald-300 uppercase block">Estimated Delivery</span>
                    <span className="text-lg font-bold text-white tabular-nums">~30-40 Mins</span>
                  </div>
                </div>
              </div>
            )}

            {/* Active Order Tracking Visualizer */}
            {currentTrackOrder ? (
              <div className="bg-[#211412] border border-[#442b24] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
                {/* Header: Order ID & Status Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#3b241e]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#ba181b] text-white text-xs font-bold uppercase tracking-wider">
                        {currentTrackOrder.orderId}
                      </span>
                      <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                        {currentTrackOrder.orderType.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif-luxury text-white mt-2">
                      Live Kitchen & Delivery Status
                    </h3>
                    <p className="text-xs text-[#a99989]">
                      Placed on: {currentTrackOrder.createdAt} · Customer: {currentTrackOrder.customerName} ({currentTrackOrder.phone})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${BUSINESS_INFO.phoneTel}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2b1916] border border-[#52332c] text-xs font-bold text-amber-300 hover:text-white hover:border-amber-400/50 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call Restaurant Support</span>
                    </a>
                  </div>
                </div>

                {/* 5-Stage Live Progress Stepper */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#cfc0b0]">
                    Order Tracking Stages (لائیو ٹریکنگ کے مراحل)
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {stages.map((stage, idx) => {
                      const currentIdx = getStageIndex(currentTrackOrder.currentStatus);
                      const isPast = idx < currentIdx;
                      const isCurrent = idx === currentIdx;
                      const StageIcon = stage.icon;

                      return (
                        <div
                          key={stage.key}
                          className={`p-4 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-gradient-to-b from-[#38201b] to-[#251412] border-amber-400 text-white shadow-xl shadow-amber-500/15 ring-1 ring-amber-400/40'
                              : isPast
                              ? 'bg-[#180f0d] border-emerald-500/40 text-emerald-300'
                              : 'bg-[#180f0d] border-[#38221c] text-[#786657] opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isCurrent
                                  ? 'bg-amber-400 text-black font-bold animate-pulse'
                                  : isPast
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-[#291714] text-[#786657]'
                              }`}
                            >
                              <StageIcon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase">
                              Step {idx + 1}
                            </span>
                          </div>

                          <div className="text-xs font-bold text-white mb-0.5">
                            {stage.title}
                          </div>
                          <div className="text-[11px] text-amber-400 font-medium mb-1">
                            {stage.urduTitle}
                          </div>
                          <p className="text-[10px] leading-snug text-[#9c8c7d]">
                            {stage.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Address & Items Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#3b241e]">
                  <div className="bg-[#180f0d] p-4 rounded-xl border border-[#38221c] space-y-2">
                    <span className="text-xs uppercase tracking-wider text-[#9c8c7d] font-bold block flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ba181b]" />
                      <span>Destination / Address</span>
                    </span>
                    <p className="text-sm font-medium text-white">
                      {currentTrackOrder.deliveryAddress}
                    </p>
                    {currentTrackOrder.specialInstructions && (
                      <p className="text-xs text-[#a99989] italic">
                        Note: &quot;{currentTrackOrder.specialInstructions}&quot;
                      </p>
                    )}
                  </div>

                  <div className="bg-[#180f0d] p-4 rounded-xl border border-[#38221c] space-y-2">
                    <span className="text-xs uppercase tracking-wider text-[#9c8c7d] font-bold block flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Order Items ({currentTrackOrder.items.length})</span>
                    </span>
                    <ul className="text-xs text-[#cfc0b0] space-y-1">
                      {currentTrackOrder.items.map((i, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>
                            {i.quantity}x {i.name} {i.selectedSizeLabel ? `(${i.selectedSizeLabel})` : ''}
                          </span>
                          <span className="text-amber-400 font-bold tabular-nums">
                            Rs. {((i.unitPrice + (i.extrasCost || 0)) * i.quantity).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-[#2d1a16] flex justify-between font-bold text-white text-xs">
                      <span>Total:</span>
                      <span className="text-amber-400">Rs. {currentTrackOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#211412] border border-[#442b24] rounded-2xl p-12 text-center space-y-3">
                <Truck className="w-12 h-12 text-[#6e5d50] mx-auto mb-2" />
                <h4 className="text-lg font-bold text-white">No active order currently tracked</h4>
                <p className="text-xs text-[#a99989] max-w-sm mx-auto">
                  Place an order online to track its kitchen baking and delivery, or enter your Order ID in the search bar above.
                </p>
                <button
                  onClick={() => setCurrentTab('checkout')}
                  className="mt-3 px-6 py-2.5 rounded-xl bg-[#ba181b] hover:bg-[#9c1416] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Place New Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
