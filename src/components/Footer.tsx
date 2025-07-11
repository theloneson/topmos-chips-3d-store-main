
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-primary/10 to-primary/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/955b8875-b320-4950-94dc-f0705508918b.png" 
                alt="TOPMOS FARMS" 
                className="w-12 h-12 object-contain mr-3"
              />
              <h3 className="font-bold text-xl text-primary">TOPMOS FARMS</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Delicious, crunchy plantain chips made with love and the finest ingredients.
              From our farm to your snack time.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-primary" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-primary" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  Ripe Plantain Chips
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  Unripe Plantain Chips
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Farm Road, Lagos,<br />Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-2" />
                <a href="tel:+2348033478145" className="text-gray-600 hover:text-primary">
                  +234 803 347 8145
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-2" />
                <a href="tel:+2348185146991" className="text-gray-600 hover:text-primary">
                  +234 818 514 6991
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-2" />
                <a href="mailto:info@topmosfarms.com" className="text-gray-600 hover:text-primary">
                  info@topmosfarms.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600 text-sm">
            &copy; {currentYear} TOPMOS FARMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
