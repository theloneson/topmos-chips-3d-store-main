
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ChipContainer from "@/components/3D/ChipContainer";
import { ShoppingBag, Check, ChevronRight } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  // Animation controls
  const featuredControls = useAnimation();
  const [featuredRef, featuredInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const aboutControls = useAnimation();
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const ctaControls = useAnimation();
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  useEffect(() => {
    if (featuredInView) featuredControls.start("visible");
    if (aboutInView) aboutControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
  }, [featuredControls, featuredInView, aboutControls, aboutInView, ctaControls, ctaInView]);
  
  const featuredProducts = products.filter(product => product.featured).slice(0, 3);
  
  const faqItems = [
    {
      question: "How do you ensure the quality of your plantain chips?",
      answer: "We carefully select the best plantains, ensuring they are at the perfect ripeness. Our chips are then made in small batches to maintain quality control, and we use the highest grade vegetable oil for frying to achieve that perfect crunch."
    },
    {
      question: "Are there any preservatives in your plantain chips?",
      answer: "No, our plantain chips are 100% natural with no artificial preservatives or additives. We use only plantains, vegetable oil, and a touch of salt for the perfect flavor."
    },
    {
      question: "How long do your plantain chips stay fresh?",
      answer: "When stored in a cool, dry place in an airtight container, our plantain chips can stay fresh for up to 3 months. Once opened, we recommend consuming them within 2 weeks for the best taste and texture."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship nationwide within Nigeria. We're working on expanding our shipping options to include international destinations in the near future."
    },
    {
      question: "Are your plantain chips gluten-free?",
      answer: "Yes, our plantain chips are naturally gluten-free, making them a perfect snack for those with gluten sensitivity or celiac disease."
    }
  ];
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Guest Checkout Feature Banner */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <ShoppingBag className="text-primary" size={24} />
              <span className="text-lg font-semibold text-primary">Shop Instantly – No Account Required!</span>
            </div>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Start shopping right away! Create an account later to unlock exclusive benefits like chips points 🍌, order tracking, and member discounts.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="section-padding bg-white" ref={featuredRef}>
        <div className="container mx-auto">
          <motion.div 
            className="mb-8 sm:mb-12 text-center"
            initial="hidden"
            animate={featuredControls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <span className="text-primary font-medium">Our Products</span>
            <h2 className="heading-responsive mt-2">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Discover our most popular plantain chips, made with love from the finest ingredients.
              Each bite delivers the perfect crunch and flavor you crave.
            </p>
          </motion.div>
          
          <div className="grid-responsive-3">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial="hidden"
                animate={featuredControls}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.6,
                      delay: index * 0.2
                    }
                  }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-8 sm:mt-12"
            initial="hidden"
            animate={featuredControls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.6,
                  delay: 0.6
                }
              }
            }}
          >
            <Link to="/products">
              <Button variant="outline" size="lg" className="px-6 sm:px-8 transition-transform hover:scale-105">
                View All Products
                <ShoppingBag size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        className="section-padding bg-gradient-to-r from-orange-50 to-orange-100" 
        ref={aboutRef}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* 3D Model */}
            <motion.div
              initial="hidden"
              animate={aboutControls}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.8 }
                }
              }}
              className="order-2 md:order-1"
            >
              <div className="relative h-[300px] sm:h-[400px] w-full">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                  <ChipContainer />
                </div>
              </div>
            </motion.div>
            
            {/* About content */}
            <motion.div 
              initial="hidden"
              animate={aboutControls}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, delay: 0.2 }
                }
              }}
              className="order-1 md:order-2"
            >
              <span className="text-primary font-medium">About Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">TOPMOS FARMS</h2>
              <p className="text-gray-700 mt-6">
                At TOPMOS FARMS, we're passionate about creating delicious, crunchy plantain chips that capture the authentic taste of Nigerian cuisine.
              </p>
              <p className="text-gray-700 mt-4">
                Our story began with a simple love for quality snacks made from natural ingredients. Today, we're proud to offer a variety of plantain chips to satisfy every craving.
              </p>
              
              <div className="mt-8 space-y-3">
                {[
                  "Made from carefully selected plantains",
                  "No artificial preservatives or flavors",
                  "Variety of sizes to suit every need",
                  "Perfect balance of crunch and flavor",
                  "Made with love in Nigeria"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-primary mr-2 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/about">
                  <Button className="px-6 sm:px-8">
                    Learn More About Us
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection 
        title="Common Questions" 
        subtitle="Answers to the most frequently asked questions about our products"
        items={faqItems}
      />
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* CTA Section */}
      <section 
        className="section-padding bg-primary text-white" 
        ref={ctaRef}
      >
        <div className="container mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={ctaControls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8 }
              }
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Ready to Taste the Crunch?</h2>
            <p className="text-white/90 text-base sm:text-lg mt-6 px-4 md:px-8">
              Order our delicious plantain chips today and experience the perfect snack for any occasion.
              From movie nights to quick lunches, TOPMOS FARMS has you covered.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-6 sm:px-8 w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-6 sm:px-8 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
