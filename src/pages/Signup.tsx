
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus, Gift, Star, Percent } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(name, email, password);
      
      if (success) {
        toast({
          title: "Account Created",
          description: "You have successfully created an account",
        });
        navigate('/');
      } else {
        toast({
          title: "Sign Up Failed",
          description: "An error occurred while creating your account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Benefits Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-yellow-50 border-b border-primary/20 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-2">Unlock Exclusive Member Benefits! 🍌</h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center text-gray-700">
                <Percent className="text-primary mr-1" size={16} />
                10% welcome discount
              </div>
              <div className="flex items-center text-gray-700">
                <Star className="text-primary mr-1" size={16} />
                Chips points for every purchase
              </div>
              <div className="flex items-center text-gray-700">
                <Gift className="text-primary mr-1" size={16} />
                Order tracking & history
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md p-8 sm:p-10 bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/955b8875-b320-4950-94dc-f0705508918b.png" 
                alt="TOPMOS FARMS" 
                className="h-16 w-auto mx-auto"
              />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join Topmos Farms to start earning rewards</p>
          </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms} 
              onCheckedChange={(checked) => setAgreeToTerms(checked === true)} 
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600"
            >
              I agree to the{' '}
              <Link to="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
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
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <UserPlus size={18} className="mr-2" />
                <span>Sign Up</span>
              </div>
            )}
          </Button>
        </form>
        
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <Link to="/" className="hover:text-primary">
                Continue shopping without account →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
