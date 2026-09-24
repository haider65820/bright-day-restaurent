import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedMenu } from './components/FeaturedMenu';
import { SpecialValueSection } from './components/SpecialValueSection';
import { MenuSection } from './components/MenuSection';
import { RealDiningMoments } from './components/RealDiningMoments';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { ReviewModal } from './components/ReviewModal';
import { OnlineOrderPage } from './components/OnlineOrderPage';
import { PizzaCustomizerModal } from './components/PizzaCustomizerModal';
import { OrderDrawer } from './components/OrderDrawer';
import { AboutSection } from './components/AboutSection';
import { LocationSection } from './components/LocationSection';
import { OrderCTA } from './components/OrderCTA';
import { Footer } from './components/Footer';
import { MENU_CATEGORIES, MenuItem, BUSINESS_INFO, AUTHENTIC_REVIEWS } from './data/menuData';
import { OrderItem, PlacedOrder, CustomerReview } from './types/order';
import { Phone, ShoppingBag, Star, Truck, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'order' | 'track'>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('pizzas');

  // Order Cart Items in Bag
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('variety_order_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Placed Orders for Live Tracking
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('variety_placed_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrderToTrack, setActiveOrderToTrack] = useState<PlacedOrder | null>(null);

  // Customer Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('variety_customer_reviews');
      return saved ? JSON.parse(saved) : AUTHENTIC_REVIEWS;
    } catch {
      return AUTHENTIC_REVIEWS;
    }
  });

  // UI Modal States
  const [isOrderBagOpen, setIsOrderBagOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [customizingPizza, setCustomizingPizza] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist Order Items
  useEffect(() => {
    try {
      localStorage.setItem('variety_order_items', JSON.stringify(orderItems));
    } catch {
      // storage unavailable
    }
  }, [orderItems]);

  // Persist Placed Orders
  useEffect(() => {
    try {
      localStorage.setItem('variety_placed_orders', JSON.stringify(placedOrders));
    } catch {
      // storage unavailable
    }
  }, [placedOrders]);

  // Persist Customer Reviews
  useEffect(() => {
    try {
      localStorage.setItem('variety_customer_reviews', JSON.stringify(reviews));
    } catch {
      // storage unavailable
    }
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectItem = (item: MenuItem, defaultSize?: 's' | 'm' | 'l') => {
    if (item.pizzaPrices) {
      setCustomizingPizza(item);
      return;
    }

    const newItem: OrderItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      category: item.category,
      unitPrice: item.price || 0,
      quantity: 1,
    };

    setOrderItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.id && !i.selectedSize);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, newItem];
    });

    showToast(`Added ${item.name} to Order Bag`);
  };

  const handleConfirmPizza = (
    size: 's' | 'm' | 'l',
    selectedExtras: string[],
    totalPrice: number
  ) => {
    if (!customizingPizza) return;

    const sizeLabels = { s: 'Small 6"', m: 'Medium 10"', l: 'Large 13"' };

    const newItem: OrderItem = {
      id: `${customizingPizza.id}-${size}-${Date.now()}`,
      menuItemId: customizingPizza.id,
      name: customizingPizza.name,
      category: 'pizzas',
      selectedSize: size,
      selectedSizeLabel: sizeLabels[size],
      unitPrice: totalPrice,
      quantity: 1,
      extras: selectedExtras,
    };

    setOrderItems((prev) => [...prev, newItem]);
    showToast(`Added ${customizingPizza.name} (${sizeLabels[size]}) to Bag`);
    setCustomizingPizza(null);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleAddNewOrder = (order: PlacedOrder) => {
    setPlacedOrders((prev) => [order, ...prev]);
    showToast(`Order ${order.orderId} Placed Successfully!`);
  };

  const handleAddNewReview = (newReview: CustomerReview) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast(`Thank you! Your review has been published.`);
  };

  const scrollToMenuCategory = (catId?: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        if (catId) setActiveCategoryId(catId);
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      if (catId) setActiveCategoryId(catId);
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const pizzaCategory = MENU_CATEGORIES.find((c) => c.id === 'pizzas');

  return (
    <div className="min-h-screen bg-[#160e0d] text-[#f5efe6] flex flex-col selection:bg-[#ba181b] selection:text-white">
      {/* Top Header */}
      <Header
        orderCount={totalItemCount}
        onOpenOrderBag={() => setIsOrderBagOpen(true)}
        onNavigateToHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToMenu={scrollToMenuCategory}
        onNavigateToOrderOnline={() => {
          setCurrentView('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToTracking={() => {
          setCurrentView('track');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
        currentView={currentView}
      />

      <main className="flex-1">
        {/* VIEW 1: HOME (Full Restaurant Experience) */}
        {currentView === 'home' && (
          <>
            {/* Cinematic Hero */}
            <Hero
              onExploreMenu={() => scrollToMenuCategory()}
              onOrderOnline={() => {
                setCurrentView('order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Signature Picks */}
            <FeaturedMenu
              onSelectItem={handleSelectItem}
              onExploreFullMenu={() => scrollToMenuCategory()}
            />

            {/* Real Dining Moments & Photos Showcase (Authentic Pan Pizza & Dining Guests) */}
            <RealDiningMoments />

            {/* Value Proposition */}
            <SpecialValueSection onExploreFullMenu={() => scrollToMenuCategory()} />

            {/* Complete 16-Category Menu */}
            <MenuSection
              onSelectItem={handleSelectItem}
              activeCategoryId={activeCategoryId}
              setActiveCategoryId={setActiveCategoryId}
            />

            {/* Customer Reviews Section */}
            <CustomerReviewsSection
              reviews={reviews}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
            />

            {/* Brand Story */}
            <AboutSection />

            {/* Location & Map Section with Exact Address */}
            <LocationSection />

            {/* In-Website & Call CTA Section */}
            <OrderCTA
              onOrderOnline={() => {
                setCurrentView('order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewMenu={() => scrollToMenuCategory()}
            />
          </>
        )}

        {/* VIEW 2 & 3: ONLINE ORDERING & LIVE ORDER TRACKING */}
        {(currentView === 'order' || currentView === 'track') && (
          <OnlineOrderPage
            orderItems={orderItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearOrder={handleClearOrder}
            onNavigateToMenu={() => {
              setCurrentView('home');
              setTimeout(() => scrollToMenuCategory(), 100);
            }}
            placedOrders={placedOrders}
            onAddNewOrder={handleAddNewOrder}
            activeOrderToTrack={activeOrderToTrack}
            setActiveOrderToTrack={setActiveOrderToTrack}
            initialTab={currentView === 'track' ? 'track' : 'checkout'}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateToCategory={scrollToMenuCategory}
        onNavigateToOrderOnline={() => {
          setCurrentView('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToTracking={() => {
          setCurrentView('track');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
      />

      {/* Pizza Customizer Modal */}
      {customizingPizza && (
        <PizzaCustomizerModal
          item={customizingPizza}
          extras={pizzaCategory?.extras}
          onClose={() => setCustomizingPizza(null)}
          onConfirm={handleConfirmPizza}
        />
      )}

      {/* Slide-over Order Bag Drawer */}
      <OrderDrawer
        isOpen={isOrderBagOpen}
        onClose={() => setIsOrderBagOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        onProceedToCheckout={() => {
          setCurrentView('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddNewReview}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#2b1916] border border-amber-400/70 text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Review Icon Button (Always visible on desktop & tablet for quick review) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col gap-2.5">
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 border border-amber-300 transition-all hover:scale-108 cursor-pointer"
          title="Rate food or website experience"
          aria-label="Rate food or website"
        >
          <Star className="w-4 h-4 fill-black" />
          <span>Review / ریویو دیں</span>
        </button>
      </div>

      {/* Sticky Mobile Bar with Distinct Call & Online Order Options */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#1a100e]/95 backdrop-blur-md border-t border-[#3e2722] p-2.5 flex items-center gap-2 shadow-2xl">
        {/* Distinct Separate Phone Call button */}
        <a
          href={`tel:${BUSINESS_INFO.phoneTel}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#ba181b] rounded-xl shadow-md"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
        </a>

        {/* Order Online Button */}
        <button
          onClick={() => {
            setCurrentView('order');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-black bg-amber-500 rounded-xl shadow-md"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Order Online</span>
        </button>

        {/* Review Button */}
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="p-2.5 text-amber-400 bg-[#251715] border border-[#3e2722] rounded-xl"
          aria-label="Leave review"
        >
          <Star className="w-4 h-4 fill-amber-400" />
        </button>
      </div>
    </div>
  );
}
