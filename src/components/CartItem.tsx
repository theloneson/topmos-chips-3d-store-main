
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/data/products';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight: string;
}

const CartItem = ({ id, name, price, image, quantity, weight }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    setIsRemoving(true);
    // Small delay to allow animation to play
    setTimeout(() => {
      removeItem(id);
    }, 300);
  };
  
  return (
    <div 
      className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 border-b border-gray-200 py-4 transition-all duration-300 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100'
      }`}
    >
      {/* Product image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0">
        <Link to={`/products/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover rounded-md" 
          />
        </Link>
      </div>
      
      {/* Product info */}
      <div className="flex-1 text-center sm:text-left">
        <Link to={`/products/${id}`} className="hover:text-primary transition-colors">
          <h3 className="font-medium">{name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1">Weight: {weight}</p>
        <p className="font-medium text-primary mt-2">{formatCurrency(price)}</p>
      </div>
      
      {/* Quantity control */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus size={14} />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus size={14} />
        </Button>
      </div>
      
      {/* Subtotal */}
      <div className="text-center sm:text-right min-w-[80px] sm:min-w-[100px] mt-2 sm:mt-0">
        <p className="font-medium">{formatCurrency(price * quantity)}</p>
      </div>
      
      {/* Remove button */}
      <div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={handleRemove}>
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
