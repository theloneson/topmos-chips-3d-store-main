
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, formatCurrency } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden h-64">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isHovering ? 'opacity-80' : 'opacity-0'}`} />
          
          {/* Quick view button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <Button variant="secondary" size="sm" className="rounded-full px-4">
              <Eye size={16} className="mr-2" />
              Quick View
            </Button>
          </div>
          
          {/* Product type badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.type === 'ripe' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {product.type === 'ripe' ? 'Ripe' : 'Unripe'}
            </span>
          </div>
          
          {/* Product weight badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
              {product.weight}
            </span>
          </div>
        </Link>
      </div>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block mb-1">
          <h3 className="font-semibold text-lg hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          <Button size="sm" onClick={handleAddToCart} className="flex items-center space-x-1">
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
