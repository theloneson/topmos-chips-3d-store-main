import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Share2, Minus, Plus, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { Product, products, formatCurrency } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("description");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Reset quantity when product changes
      setQuantity(1);
      
      // Find related products (same type, different ID)
      const related = products
        .filter(p => p.type === foundProduct.type && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/products" className="text-gray-500 hover:text-primary flex items-center text-sm">
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </Link>
        </div>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Image Display */}
          <div className="mb-6 lg:mb-0">
            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl overflow-hidden p-6 h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Product image with loading effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isImageLoaded ? 1 : 0, scale: isImageLoaded ? 1 : 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-h-full w-auto object-contain drop-shadow-xl"
                  onLoad={() => setIsImageLoaded(true)}
                />
                
                {/* Product type badge */}
                <div className="absolute bottom-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-white text-sm font-medium shadow-sm ${
                    product.type === 'ripe' 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                  }`}>
                    {product.type === 'ripe' ? 'Ripe' : 'Unripe'} Plantain
                  </span>
                </div>
              </motion.div>
              
              {/* Loading Indicator */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {/* Product thumbnails (could add multiple angles in the future) */}
            <div className="flex justify-center mt-4 gap-2">
              <div className="w-20 h-20 border-2 border-primary rounded-lg overflow-hidden cursor-pointer shadow-md">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            {/* Product title and badges */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.type === 'ripe' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                } mr-2`}>
                  {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                  {product.weight}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="flex items-center mt-4">
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(product.price)}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 py-4 mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Quantity selection */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className="sm:flex-1 bg-primary hover:bg-primary/90 shadow-md"
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart size={18} />
              </Button>
              
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 size={18} />
              </Button>
            </div>
            
            {/* Product key features */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                {[
                  "100% natural ingredients",
                  "No preservatives added",
                  "Perfect crunchiness",
                  "Premium quality plantains",
                  "Sealed for freshness"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check size={18} className="text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Product details tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Product Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Product Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{product.weight}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium capitalize">{product.type} Plantain</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium capitalize">{product.size}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600">Ingredients</span>
                    <span className="font-medium">Plantain, Vegetable Oil, Salt</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <p className="text-gray-700 mb-4">
                  We ship our products nationwide with care to ensure they arrive in perfect condition.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-medium min-w-[120px]">Delivery Time:</span>
                    <span>2-3 business days within Lagos, 3-5 business days nationwide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium min-w-[120px]">Shipping Fee:</span>
                    <span>Varies based on location and order size</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium min-w-[120px]">Packaging:</span>
                    <span>All products are carefully packed to prevent damage during transit</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
