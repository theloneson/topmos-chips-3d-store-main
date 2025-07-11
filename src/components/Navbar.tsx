
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/data/products';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/955b8875-b320-4950-94dc-f0705508918b.png" 
              alt="TOPMOS FARMS" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-lg text-primary">TOPMOS FARMS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Hello, {user?.name}</span>
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="text-xs text-gray-500 hidden lg:block">
                  Optional signup
                </div>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <User size={18} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="relative">
                    Sign Up
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1 rounded text-black font-bold">
                      🍌
                    </span>
                  </Button>
                </Link>
              </div>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ShoppingBag size={18} />
                <span>{totalItems > 0 ? formatCurrency(totalPrice) : 'Cart'}</span>
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 border-t border-gray-200 shadow-lg">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-foreground hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-foreground hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            
            <div className="border-t border-gray-200 pt-3 space-y-3">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-sm">Hello, {user?.name}</p>
                  <Button variant="ghost" onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} className="w-full justify-start">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
              
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <span className="flex items-center">
                    <ShoppingBag size={18} className="mr-2" />
                    Cart
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full py-1 px-2 flex items-center">
                      {totalItems} items | {formatCurrency(totalPrice)}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
