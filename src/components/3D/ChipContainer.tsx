
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';

// Product showcase component that replaces the 3D jar
const ChipContainer = () => {
  const [mounted, setMounted] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  // Featured products to showcase
  const featuredProducts = products.filter(product => product.featured);
  
  useEffect(() => {
    setMounted(true);
    
    // Auto-rotate through products
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => 
        prev >= featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  if (!mounted) {
    return <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl"></div>
      
      {/* Product showcase with rotation effect */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
            animate={{ 
              opacity: currentProductIndex === index ? 1 : 0,
              scale: currentProductIndex === index ? 1 : 0.8,
              rotateY: currentProductIndex === index ? 0 : 45,
              zIndex: currentProductIndex === index ? 10 : 0
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="max-h-[320px] w-auto object-contain rounded-lg shadow-lg"
              />
              <motion.div 
                className="mt-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentProductIndex === index ? 1 : 0, 
                  y: currentProductIndex === index ? 0 : 20 
                }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-sm text-primary">{product.weight} | Premium Quality</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
        
        {/* Indicator dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProductIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentProductIndex === index ? 'bg-primary w-6' : 'bg-gray-400'
              }`}
              aria-label={`View product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChipContainer;
