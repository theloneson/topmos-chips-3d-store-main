
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Check, ChevronDown } from "lucide-react";

type ProductType = "all" | "ripe" | "unripe";
type ProductSize = "all" | "small" | "medium" | "large" | "jumbo";
type SortOption = "name" | "price_asc" | "price_desc";

const Products = () => {
  const [selectedType, setSelectedType] = useState<ProductType>("all");
  const [selectedSize, setSelectedSize] = useState<ProductSize>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply type filter
    if (selectedType !== "all") {
      result = result.filter(product => product.type === selectedType);
    }
    
    // Apply size filter
    if (selectedSize !== "all") {
      result = result.filter(product => product.size === selectedSize);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedType, selectedSize, sortBy]);
  
  const clearFilters = () => {
    setSelectedType("all");
    setSelectedSize("all");
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Products Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Our Products</h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our range of delicious plantain chips, available in various sizes and flavors.
            From sweet ripe plantains to savory unripe options, we have something for everyone.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Filters and Sorting - Mobile */}
        <div className="md:hidden mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <span className="flex items-center">
              <Filter size={16} className="mr-2" />
              Filter & Sort
            </span>
            <ChevronDown size={16} className={`transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isFilterMenuOpen && (
            <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              {/* Type Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "ripe", "unripe"].map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type as ProductType)}
                      className="capitalize"
                    >
                      {type === "all" ? "All Types" : type}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Size Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "small", "medium", "large", "jumbo"].map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size as ProductSize)}
                      className="capitalize"
                    >
                      {size === "all" ? "All Sizes" : size}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h3 className="font-medium mb-2">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={sortBy === "name" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("name")}
                  >
                    Name
                  </Button>
                  <Button
                    variant={sortBy === "price_asc" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("price_asc")}
                  >
                    Price: Low to High
                  </Button>
                  <Button
                    variant={sortBy === "price_desc" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("price_desc")}
                  >
                    Price: High to Low
                  </Button>
                </div>
              </div>
              
              {/* Clear Filters */}
              {(selectedType !== "all" || selectedSize !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters and Sorting - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              
              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Type</h3>
                <div className="space-y-2">
                  {["all", "ripe", "unripe"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type as ProductType)}
                      className="flex items-center w-full px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded-full border ${
                        selectedType === type 
                          ? 'bg-primary border-primary' 
                          : 'border-gray-300'
                      } mr-3`}>
                        {selectedType === type && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <span className="capitalize">
                        {type === "all" ? "All Types" : type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="space-y-2">
                  {["all", "small", "medium", "large", "jumbo"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as ProductSize)}
                      className="flex items-center w-full px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded-full border ${
                        selectedSize === size 
                          ? 'bg-primary border-primary' 
                          : 'border-gray-300'
                      } mr-3`}>
                        {selectedSize === size && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <span className="capitalize">
                        {size === "all" ? "All Sizes" : size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { value: "name", label: "Name" },
                    { value: "price_asc", label: "Price: Low to High" },
                    { value: "price_desc", label: "Price: High to Low" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as SortOption)}
                      className="flex items-center w-full px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded-full border ${
                        sortBy === option.value 
                          ? 'bg-primary border-primary' 
                          : 'border-gray-300'
                      } mr-3`}>
                        {sortBy === option.value && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              {(selectedType !== "all" || selectedSize !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-6 w-full"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </h2>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-500">Try changing your filters to see more products.</p>
                <Button className="mt-4" onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
