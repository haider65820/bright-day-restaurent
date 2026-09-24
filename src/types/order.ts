export interface OrderItem {
  id: string; // unique id per cart entry
  menuItemId: string;
  name: string;
  category: string;
  selectedSize?: 's' | 'm' | 'l';
  selectedSizeLabel?: string;
  unitPrice: number;
  quantity: number;
  extras?: string[];
  extrasCost?: number;
}

export type OrderStatus =
  | 'confirmed'
  | 'kitchen'
  | 'packaging'
  | 'out_for_delivery'
  | 'delivered';

export interface OrderTimelineStep {
  stage: OrderStatus;
  title: string;
  description: string;
  timeEstimate: string;
  iconName: string;
}

export interface PlacedOrder {
  orderId: string; // e.g. "BD-49210"
  customerName: string;
  phone: string;
  orderType: 'delivery' | 'takeaway' | 'dine-in';
  deliveryAddress: string;
  tableNumber?: string;
  specialInstructions?: string;
  paymentMethod: 'cash_on_delivery' | 'counter_payment' | 'easypaisa_jazzcash';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  currentStatus: OrderStatus;
  estimatedMinutes: number;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  rating: number; // 1-5
  date: string;
  location: string;
  serviceType: string;
  favoriteDish?: string;
  comment: string;
  websiteRating?: number;
  verified?: boolean;
}
