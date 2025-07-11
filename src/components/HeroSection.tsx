
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronRight, CheckCircle } from 'lucide-react';
import ChipContainer from '@/components/3D/ChipContainer';

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 filter blur-3xl z-0" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/20 filter blur-3xl z-0" />
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-yellow-400/20 filter blur-xl z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" ref={containerRef}>
          {/* Hero Text Content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="order-2 md:order-1"
          >
            <motion.div variants={childVariants}>
              <span className="inline-block bg-primary/10 text-primary font-medium rounded-full px-4 py-1 text-sm mb-6">
                Premium Plantain Chips
              </span>
            </motion.div>
            
            <motion.h1 
              variants={childVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900"
            >
              Crunchy <span className="text-primary">Plantain</span> Chips for Every Occasion
            </motion.h1>
            
            <motion.p 
              variants={childVariants}
              className="text-lg text-gray-600 mb-8 max-w-lg"
            >
              TOPMOS FARMS brings you the tastiest plantain chips, made from carefully selected plantains,
              thinly sliced and perfectly fried to give you that satisfying crunch with every bite.
            </motion.p>
            
            <motion.div variants={childVariants} className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-md">
                  <ShoppingBag size={18} className="mr-2" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="shadow-sm">
                  Learn More
                  <ChevronRight size={18} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={childVariants}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {[
                { title: "Natural", value: "100%" },
                { title: "Varieties", value: "5" },
                { title: "Quality", value: "#1" }
              ].map((item, idx) => (
                <div className="text-center" key={idx}>
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2 shadow-md">
                    <span className="text-primary text-2xl font-bold">{item.value}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.title}</p>
                </div>
              ))}
            </motion.div>
            
            {/* Product features */}
            <motion.div 
              variants={childVariants}
              className="mt-8 space-y-2"
            >
              {[
                "No artificial preservatives", 
                "Carefully selected plantains", 
                "Rich in flavor"
              ].map((feature, idx) => (
                <div className="flex items-center" key={idx}>
                  <CheckCircle size={16} className="text-primary mr-2 shrink-0" />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Product Image Display */}
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full filter blur-2xl transform rotate-12 scale-110 z-0" />
              <ChipContainer />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
