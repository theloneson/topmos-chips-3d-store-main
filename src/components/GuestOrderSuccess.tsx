import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, Gift, Star, Sparkles, X } from 'lucide-react';

interface GuestOrderSuccessProps {
  orderDetails: {
    orderId: string;
    customerName: string;
    email: string;
    totalAmount: number;
  };
  onClose: () => void;
}

const GuestOrderSuccess = ({ orderDetails, onClose }: GuestOrderSuccessProps) => {
  const { signup } = useAuth();
  const { toast } = useToast();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [password, setPassword] = useState('');
  const [showAccountCreation, setShowAccountCreation] = useState(false);

  const handleCreateAccount = async () => {
    if (!password || password.length < 6) {
      toast({
        title: "Password Required",
        description: "Please enter a password with at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingAccount(true);
    try {
      const success = await signup(orderDetails.customerName, orderDetails.email, password);
      if (success) {
        toast({
          title: "Account Created! 🎉",
          description: "Welcome to Topmos Farms! You now have access to order tracking and exclusive benefits.",
        });
        onClose();
      } else {
        toast({
          title: "Account Creation Failed",
          description: "An account with this email might already exist. Try logging in instead.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingAccount(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 p-1"
        >
          <X size={16} />
        </Button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed! 🎉</h2>
          <p className="text-gray-600">
            Thank you {orderDetails.customerName}! Your order #{orderDetails.orderId} has been placed successfully.
          </p>
        </div>

        {!showAccountCreation ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-primary/10 to-yellow-100 rounded-lg p-4 border border-primary/20">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                  <Sparkles className="text-primary" size={16} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Want to track your order & earn chips points? 🍌
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Create an account to unlock exclusive benefits:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-center">
                      <Gift className="text-primary mr-2" size={14} />
                      10% discount on your next order
                    </li>
                    <li className="flex items-center">
                      <Star className="text-primary mr-2" size={14} />
                      Chips points for every purchase
                    </li>
                    <li className="flex items-center">
                      <Check className="text-primary mr-2" size={14} />
                      Order tracking & history
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setShowAccountCreation(true)}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                size="lg"
              >
                Create Account in One Click! 🚀
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Complete Your Account Setup
              </h3>
              <p className="text-sm text-gray-600">
                We'll use your order email: {orderDetails.email}
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCreateAccount}
                disabled={isCreatingAccount}
                className="w-full"
                size="lg"
              >
                {isCreatingAccount ? "Creating Account..." : "Create My Account"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAccountCreation(false)}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </motion.div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            We'll send order updates to {orderDetails.email}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GuestOrderSuccess;