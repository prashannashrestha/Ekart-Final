import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Cpu,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Constants ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Mechanical RGB Keyboard",
    price: 10499,
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-responsive mechanical switches with customizable RGB lighting."
  },
  {
    id: 2,
    name: "4K UltraWide Monitor",
    price: 39999,
    category: "Displays",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    description: "34-inch curved display with stunning color accuracy and 144Hz refresh rate."
  },
  {
    id: 3,
    name: "Wireless Gaming Mouse",
    price: 6499,
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?auto=format&fit=crop&q=80&w=800",
    description: "Ergonomic design with 25k DPI sensor and 70 hours of battery life."
  },
  {
    id: 4,
    name: "Noise Cancelling Headphones",
    price: 19999,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    description: "Industry-leading noise cancellation for an immersive audio experience."
  },
  {
    id: 5,
    name: "Gaming PC Case",
    price: 12999,
    category: "Components",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
    description: "Tempered glass side panel with excellent airflow and cable management."
  },
  {
    id: 6,
    name: "Ergonomic Office Chair",
    price: 27999,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
    description: "Full lumbar support and breathable mesh for long working hours."
  },
  {
    id: 7,
    name: "Streamer Microphone",
    price: 14999,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
    description: "Studio-quality USB microphone with four polar patterns."
  },
  {
    id: 8,
    name: "External SSD 2TB",
    price: 15999,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1628557118391-56cd62c9f2cb?auto=format&fit=crop&q=80&w=800",
    description: "Blazing fast transfer speeds in a rugged, pocket-sized design."
  },
  {
    id: 9,
    name: "Pendrive",
    price: 1,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800",
    description: "Compact and reliable USB flash drive for your everyday data storage needs."
  }
];

// --- Components ---

const Navbar = ({ 
  cartCount, 
  onOpenCart,
  onOpenAdmin,
  searchQuery,
  setSearchQuery
}: { 
  cartCount: number; 
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 text-white p-1.5 rounded-lg">
              <Cpu size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">eKart</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">Shop</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Categories</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Deals</a>
            <a href="https://wa.me/917978998558" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">Support</a>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <AnimatePresence>
              {isSearchVisible && (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative hidden sm:block"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-full bg-zinc-100 px-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-300"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={onOpenAdmin}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors mr-2"
            >
              Admin
            </button>
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className={cn(
                "p-2 transition-colors rounded-full",
                isSearchVisible ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={onOpenCart}
              className="group relative p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-zinc-500 hover:text-zinc-900 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4 px-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl bg-zinc-100 pl-10 pr-4 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void; key?: React.Key }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl hover:shadow-zinc-200/50"
  >
    <div className="aspect-square overflow-hidden bg-zinc-100">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{product.category}</p>
          <h3 className="mt-1 text-lg font-bold text-zinc-900 truncate">{product.name}</h3>
        </div>
        <p className="text-lg font-bold text-zinc-900 ml-4">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{product.description}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95"
      >
        <Plus size={18} />
        Add to Cart
      </button>
    </div>
  </motion.div>
);

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  total,
  cart,
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  total: number;
  cart: CartItem[];
  onSuccess: () => void;
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'success'>('details');
  const [isValidating, setIsValidating] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });

  const handleProceedToPayment = async () => {
    if (!customer.firstName || !customer.lastName || !customer.email || !customer.address) {
      setError('Please fill in all details.');
      return;
    }

    setIsValidating(true);
    setError('');
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, customer })
      });
      
      if (!response.ok) throw new Error('Failed to create order');
      
      const data = await response.json();
      setOrderId(data.orderId);
      setStep('payment');
    } catch (err) {
      setError('Failed to validate order. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handlePaymentComplete = async () => {
    if (!transactionId.trim()) {
      setError('Please enter the Transaction ID to proceed.');
      return;
    }

    if (!/^\d{12}$/.test(transactionId)) {
      setError('Invalid Transaction ID. Must be exactly 12 digits.');
      return;
    }
    
    setError('');
    setStep('verifying');
    
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, transactionId })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onClose();
          setStep('details');
          setTransactionId('');
          setOrderId('');
        }, 3000);
      } else {
        setError(data.error || 'Payment verification failed.');
        setStep('payment');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      setStep('payment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">
              {step === 'details' && "Checkout Details"}
              {step === 'payment' && "Scan to Pay"}
              {step === 'verifying' && "Verifying Payment"}
              {step === 'success' && "Order Confirmed"}
            </h2>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">First Name</label>
                      <input 
                        type="text" 
                        value={customer.firstName}
                        onChange={(e) => setCustomer({...customer, firstName: e.target.value})}
                        className="w-full rounded-xl border border-zinc-200 p-3 text-sm focus:border-zinc-900 focus:outline-none" 
                        placeholder="John" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Last Name</label>
                      <input 
                        type="text" 
                        value={customer.lastName}
                        onChange={(e) => setCustomer({...customer, lastName: e.target.value})}
                        className="w-full rounded-xl border border-zinc-200 p-3 text-sm focus:border-zinc-900 focus:outline-none" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                    <input 
                      type="email" 
                      value={customer.email}
                      onChange={(e) => setCustomer({...customer, email: e.target.value})}
                      className="w-full rounded-xl border border-zinc-200 p-3 text-sm focus:border-zinc-900 focus:outline-none" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Shipping Address</label>
                    <textarea 
                      value={customer.address}
                      onChange={(e) => setCustomer({...customer, address: e.target.value})}
                      className="w-full rounded-xl border border-zinc-200 p-3 text-sm focus:border-zinc-900 focus:outline-none" 
                      rows={3} 
                      placeholder="123 Street Name, City, Country" 
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                <div className="rounded-2xl bg-zinc-50 p-6">
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600 mt-2">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-lg font-bold text-zinc-900">Total</span>
                    <span className="text-2xl font-black text-zinc-900">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  disabled={isValidating}
                  onClick={handleProceedToPayment}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-4 text-lg font-bold text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
                >
                  {isValidating ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Validating Price...
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 rounded-3xl border-4 border-zinc-100 p-4 bg-white shadow-xl">
                  <div className="relative w-64 h-64 bg-zinc-50 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=upi://pay?pa=ps5470950-3@okicici&pn=Prashanna%20Shrestha&am=${total}`} 
                      alt="Payment QR"
                      className="w-full h-full p-4"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <CreditCard size={120} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-zinc-500 text-sm">Scan with Google Pay or any UPI App</p>
                  <p className="text-xl font-black text-zinc-900">Amount: ₹{total.toLocaleString('en-IN')}</p>
                  <p className="text-xs font-mono text-zinc-400">UPI ID: ps5470950-3@okicici</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-2">DEMO: Use a Transaction ID starting with '2026'</p>
                </div>

                <div className="w-full mb-6 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">UPI Transaction ID</label>
                  <input 
                    type="text" 
                    value={transactionId}
                    onChange={(e) => {
                      setTransactionId(e.target.value);
                      if (error) setError('');
                    }}
                    className={cn(
                      "w-full rounded-xl border p-3 text-sm focus:outline-none transition-colors",
                      error ? "border-red-500 bg-red-50" : "border-zinc-200 focus:border-zinc-900"
                    )}
                    placeholder="Enter 12-digit Transaction ID" 
                  />
                  {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    onClick={() => setStep('details')}
                    className="rounded-xl border border-zinc-200 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handlePaymentComplete}
                    className="rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    I've Paid
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'verifying' && (
              <motion.div 
                key="verifying"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent" />
                <h3 className="text-2xl font-bold text-zinc-900">Verifying Payment</h3>
                <p className="mt-2 text-zinc-500">Checking Transaction ID: <span className="font-mono">{transactionId}</span></p>
                <p className="mt-4 text-xs text-zinc-400 italic">This usually takes a few seconds...</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="mb-6 rounded-full bg-emerald-100 p-4 text-emerald-600">
                  <CheckCircle2 size={64} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">Payment Successful!</h3>
                <p className="mt-2 text-zinc-500">Your order #EK-{(Math.random() * 10000).toFixed(0)} is being processed.</p>
                <p className="mt-8 text-sm text-zinc-400">Redirecting to shop...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const AdminDashboard = ({ onClose }: { onClose: () => void }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">Admin Dashboard - Orders (SQL)</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center py-12 text-zinc-500">No orders found in database.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="pb-4 font-bold text-zinc-400 uppercase tracking-wider">Order ID</th>
                    <th className="pb-4 font-bold text-zinc-400 uppercase tracking-wider">Customer</th>
                    <th className="pb-4 font-bold text-zinc-400 uppercase tracking-wider">Total</th>
                    <th className="pb-4 font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="pb-4 font-bold text-zinc-400 uppercase tracking-wider">Transaction ID</th>
                    <th className="pb-4 font-bold text-zinc-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="py-4 font-mono font-bold">{order.id}</td>
                      <td className="py-4">
                        <div className="font-bold">{order.customer_name}</div>
                        <div className="text-xs text-zinc-400">{order.email}</div>
                      </td>
                      <td className="py-4 font-bold">₹{order.total.toLocaleString('en-IN')}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                          order.status === 'paid' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 font-mono text-xs">{order.transaction_id || '-'}</td>
                      <td className="py-4 text-zinc-400">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900 mb-6"
          >
            Upgrade Your <span className="text-zinc-400">Setup.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-500 max-w-2xl mx-auto"
          >
            Premium electronics and peripherals for the modern professional and enthusiast. 
            Experience the next level of performance.
          </motion.p>
        </section>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                activeCategory === cat 
                  ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20" 
                  : "bg-white text-zinc-500 hover:bg-zinc-100 border border-zinc-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-zinc-100 p-6">
                  <h2 className="text-xl font-bold text-zinc-900">Your Cart</h2>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-900">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="mb-4 rounded-full bg-zinc-50 p-6 text-zinc-300">
                        <ShoppingCart size={48} />
                      </div>
                      <p className="text-zinc-500">Your cart is empty</p>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 text-sm font-bold text-zinc-900 underline underline-offset-4"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-bold text-zinc-900">{item.name}</h4>
                              <p className="text-sm font-bold text-zinc-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-3 rounded-lg border border-zinc-200 px-2 py-1">
                                <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-400 hover:text-zinc-900">
                                  <Minus size={14} />
                                </button>
                                <span className="text-sm font-bold text-zinc-900">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="text-zinc-400 hover:text-zinc-900">
                                  <Plus size={14} />
                                </button>
                              </div>
                              <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-500">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-zinc-100 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Total</span>
                      <span className="text-2xl font-black text-zinc-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-4 text-lg font-bold text-white transition-all hover:bg-zinc-800"
                    >
                      Checkout
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        total={cartTotal}
        cart={cart}
        onSuccess={() => setCart([])}
      />

      {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-zinc-900 text-white p-1.5 rounded-lg">
                  <Cpu size={24} />
                </div>
                <span className="text-xl font-bold tracking-tight text-zinc-900">eKart</span>
              </div>
              <p className="text-zinc-500 max-w-sm">
                The ultimate destination for tech enthusiasts. We provide high-quality electronics 
                with a focus on design and performance.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-zinc-900">All Products</a></li>
                <li><a href="#" className="hover:text-zinc-900">Keyboards</a></li>
                <li><a href="#" className="hover:text-zinc-900">Monitors</a></li>
                <li><a href="#" className="hover:text-zinc-900">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-zinc-900">About Us</a></li>
                <li><a href="#" className="hover:text-zinc-900">Contact</a></li>
                <li><a href="#" className="hover:text-zinc-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-zinc-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
            <p>© 2026 eKart Electronics. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-900">Twitter</a>
              <a href="https://instagram.com/prashannashrestha20" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">Instagram</a>
              <a href="https://github.com/prashannashrestha" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
