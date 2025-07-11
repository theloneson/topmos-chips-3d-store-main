
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CartItem from '@/components/CartItem';
import { formatCurrency } from '@/data/products';
import { ShoppingBag, ArrowRight, Trash2, MoveLeft } from 'lucide-react';

const Cart = () => {
  const { items, clearCart, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const isEmpty = items.length === 0;
  
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16">
      <div className="container mx-auto">
        {/* Guest Shopping Banner */}
        {!isAuthenticated && items.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <ShoppingBag className="text-green-600 mr-2" size={20} />
                <span className="font-medium text-green-800">Shopping as guest – no account needed! 🛒</span>
              </div>
              <div className="text-sm text-gray-600">
                <Link to="/login" className="text-primary hover:underline">
                  Want to save your cart & earn rewards? Sign up here
                </Link>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Your Cart</h1>
          <Link to="/products" className="text-gray-600 hover:text-primary flex items-center text-sm">
            <MoveLeft size={16} className="mr-1" />
            Continue Shopping
          </Link>
        </div>
        
        {isEmpty ? (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-primary/10 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={28} className="text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
                Browse our products and find something you like.
              </p>
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">
                    Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200 p-4 sm:p-6">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                      weight={item.weight}
                    />
                  ))}
                </div>
                
                <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-between items-center flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex items-center text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                  <Link to="/products">
                    <Button variant="link">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3"></div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </motion.div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </Button>
                
                <div className="mt-6">
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">We accept the following payment methods:</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-gray-200 rounded px-2 py-1 text-xs">Bank Transfer</div>
                      <div className="bg-gray-200 rounded px-2 py-1 text-xs">Credit Card</div>
                      <div className="bg-gray-200 rounded px-2 py-1 text-xs">Cash on Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
