
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import GuestOrderSuccess from '@/components/GuestOrderSuccess';
import { Check, CreditCard, MapPin, ShoppingBag, Truck } from 'lucide-react';

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [showGuestSuccess, setShowGuestSuccess] = useState(false);
  const [guestOrderDetails, setGuestOrderDetails] = useState<any>(null);
  
  // Form data states
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Handle shipping details form change
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      setStep(3);
      window.scrollTo(0, 0);
    } else {
      // Process payment and submit order
      setIsProcessingOrder(true);
      
      try {
        // Call the order processing endpoint
        const response = await fetch(`https://qmhovxtnavxbuonhnmwl.supabase.co/functions/v1/process-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_name: shippingDetails.fullName,
            phone: shippingDetails.phone,
            email: shippingDetails.email,
            address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zipCode}`,
            products: items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price
            })),
            total_amount: totalAmount,
            delivery_note: `Shipping: ${shippingMethod}, Payment: ${paymentMethod}`,
            user_id: user?.id || null
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to place order');
        }

        if (isAuthenticated) {
          toast({
            title: "Order Placed Successfully",
            description: "Thank you for your purchase! We'll send you an email with your order details.",
          });
          clearCart();
          navigate('/');
        } else {
          // Show guest signup incentive
          setGuestOrderDetails({
            orderId: result.order_id || 'TF' + Date.now(),
            customerName: shippingDetails.fullName,
            email: shippingDetails.email,
            totalAmount: totalAmount
          });
          setShowGuestSuccess(true);
          clearCart();
        }
      } catch (error: any) {
        toast({
          title: "Order Failed",
          description: error.message || "Failed to place order. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsProcessingOrder(false);
      }
    }
  };

  // Calculate order summary
  const subtotal = totalPrice;
  const shippingCost = shippingMethod === 'express' ? 3000 : 1500;
  const taxRate = 0.075; // 7.5% VAT
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount;

  // We don't require authentication anymore - guest checkout is allowed
  // if (!isAuthenticated) {
  //   navigate('/login');
  //   return null;
  // }

  if (items.length === 0 && !isProcessingOrder) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Guest Checkout Banner */}
        {!isAuthenticated && (
          <div className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <ShoppingBag className="text-primary mr-2" size={20} />
                <span className="font-medium text-primary">No account needed – checkout instantly! 🍌</span>
              </div>
              <div className="text-sm text-gray-600">
                Want to track orders and earn chips points? 
                <Link to="/login" className="text-primary hover:underline ml-1">Sign up here</Link>
              </div>
            </div>
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <div className={`text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>
                <span className="hidden md:inline ml-2">Shipping</span>
              </div>
            </div>
            
            <div className={`w-16 md:w-32 h-1 mx-1 md:mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <div className={`text-sm font-medium ${step >= 2 ? 'text-primary' : 'text-gray-500'}`}>
                <span className="hidden md:inline ml-2">Payment</span>
              </div>
            </div>
            
            <div className={`w-16 md:w-32 h-1 mx-1 md:mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <div className={`text-sm font-medium ${step >= 3 ? 'text-primary' : 'text-gray-500'}`}>
                <span className="hidden md:inline ml-2">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Checkout Options Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button className="border-b-2 border-primary text-primary py-2 px-1 text-sm font-medium">
                    {isAuthenticated ? 'Your Details' : 'Guest Checkout'}
                  </button>
                  {!isAuthenticated && (
                    <Link 
                      to="/login" 
                      className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 text-sm font-medium"
                    >
                      Login / Sign Up
                    </Link>
                  )}
                </nav>
              </div>
            </div>
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MapPin size={20} className="mr-2 text-primary" />
                  Shipping Information
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={shippingDetails.fullName}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingDetails.email}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State*
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingDetails.state}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingDetails.zipCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 text-gray-700">Shipping Method</h3>
                    <div className="space-y-3">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                        onClick={() => setShippingMethod('standard')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${shippingMethod === 'standard' ? 'border-primary' : 'border-gray-300'}`}>
                            {shippingMethod === 'standard' && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Standard Shipping</span>
                              <span className="font-medium">{formatCurrency(1500)}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Delivery within 3-5 business days</p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                        onClick={() => setShippingMethod('express')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${shippingMethod === 'express' ? 'border-primary' : 'border-gray-300'}`}>
                            {shippingMethod === 'express' && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Express Shipping</span>
                              <span className="font-medium">{formatCurrency(3000)}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Delivery within 1-2 business days</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Step 2: Payment Method */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard size={20} className="mr-2 text-primary" />
                  Payment Method
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-300'}`}>
                          {paymentMethod === 'card' && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 ml-8 space-y-4">
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              placeholder="•••• •••• •••• ••••"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiry"
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              />
                            </div>
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                placeholder="•••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('transfer')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'transfer' ? 'border-primary' : 'border-gray-300'}`}>
                          {paymentMethod === 'transfer' && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                      </div>
                      
                      {paymentMethod === 'transfer' && (
                        <div className="mt-4 ml-8">
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm mb-2">Make a transfer to the following account:</p>
                            <p className="text-sm"><strong>Bank:</strong> First Bank of Nigeria</p>
                            <p className="text-sm"><strong>Account Name:</strong> TOPMOS FARMS LTD</p>
                            <p className="text-sm"><strong>Account Number:</strong> 1234567890</p>
                            <p className="text-sm mt-2">Please use your order number as the payment reference.</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary' : 'border-gray-300'}`}>
                          {paymentMethod === 'cod' && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-sm text-gray-500 mt-1">Pay when you receive your order</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4 space-y-4 space-y-reverse sm:space-y-0">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back to Shipping
                    </Button>
                    <Button type="submit">
                      Review Order
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Step 3: Order Review */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <ShoppingBag size={20} className="mr-2 text-primary" />
                  Order Review
                </h2>
                
                <div className="space-y-6">
                  {/* Shipping Information */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Shipping Information</h3>
                      <button 
                        onClick={() => setStep(1)}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">{shippingDetails.fullName}</p>
                      <p className="text-gray-600">{shippingDetails.email}</p>
                      <p className="text-gray-600">{shippingDetails.phone}</p>
                      <p className="text-gray-600">{shippingDetails.address}</p>
                      <p className="text-gray-600">
                        {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}
                      </p>
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-gray-600 flex items-center">
                          <Truck size={16} className="mr-2" />
                          {shippingMethod === 'express' ? 'Express Shipping (1-2 days)' : 'Standard Shipping (3-5 days)'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Payment Method</h3>
                      <button 
                        onClick={() => setStep(2)}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {paymentMethod === 'card' && (
                        <p className="text-gray-600 flex items-center">
                          <CreditCard size={16} className="mr-2" />
                          Credit/Debit Card
                        </p>
                      )}
                      {paymentMethod === 'transfer' && (
                        <p className="text-gray-600">Bank Transfer</p>
                      )}
                      {paymentMethod === 'cod' && (
                        <p className="text-gray-600">Cash on Delivery</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium mb-3">Order Items</h3>
                    <div className="divide-y divide-gray-200">
                      {items.map(item => (
                        <div key={item.id} className="py-3 flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-contain object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.weight}</p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm">{formatCurrency(item.price)} × {item.quantity}</p>
                              <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="pt-4">
                    <Button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2"
                      disabled={isProcessingOrder}
                    >
                      {isProcessingOrder ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <Check size={18} />
                          Place Order • {formatCurrency(totalAmount)}
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7.5% VAT)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3"></div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
              
              {/* Order items summary */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-medium text-sm mb-3">Order Items ({totalItems})</h3>
                <div className="space-y-3 max-h-48 overflow-auto pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} × {formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 bg-primary/5 p-4 rounded-md text-sm">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <Truck size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Free shipping on orders over ₦20,000</p>
                    <p className="text-gray-600 mt-1">
                      Only {formatCurrency(20000 - subtotal)} more to qualify!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Guest Order Success Modal */}
        {showGuestSuccess && guestOrderDetails && (
          <GuestOrderSuccess
            orderDetails={guestOrderDetails}
            onClose={() => {
              setShowGuestSuccess(false);
              navigate('/');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
