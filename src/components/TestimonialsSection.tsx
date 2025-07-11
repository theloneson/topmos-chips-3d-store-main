
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adebayo Johnson",
    role: "Food Enthusiast",
    text: "These plantain chips are simply the best I've ever tasted! The crunch is perfect, and they're not too oily. I always keep a pack in my bag for those midday cravings.",
    rating: 5
  },
  {
    id: 2,
    name: "Chioma Okafor",
    role: "Chef",
    text: "As a professional chef, I appreciate quality ingredients and perfect preparation. TOPMOS FARMS delivers on both counts with their exceptional plantain chips. My customers love them!",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Eze",
    role: "Regular Customer",
    text: "I've tried many plantain chips brands, but none compare to the flavor and crunch of TOPMOS FARMS. Their commitment to quality really shows in every bite.",
    rating: 4
  },
  {
    id: 4,
    name: "Sarah Ibrahim",
    role: "Health Coach",
    text: "I recommend TOPMOS FARMS plantain chips to my clients as a healthier snack alternative. They're natural, delicious, and satisfy those crunchy cravings without the guilt.",
    rating: 5
  },
  {
    id: 5,
    name: "David Okonkwo",
    role: "Marketing Director",
    text: "We ordered TOPMOS FARMS plantain chips for our company event, and they were a hit! Great customer service and prompt delivery. Will definitely order again!",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isMobile = useIsMobile();
  
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  const next = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  // Auto-slide functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (inView) {
      interval = setInterval(() => {
        next();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inView, currentIndex]);
  
  // Variants for testimonial animations
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };
  
  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };
  
  const activeTestimonial = testimonials[currentIndex];
  
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-orange-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied customers have to say about our plantain chips.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 min-h-[300px] relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {renderStars(activeTestimonial.rating)}
                </div>
                
                <p className="text-gray-700 text-lg italic mb-6">"{activeTestimonial.text}"</p>
                
                <div>
                  <h4 className="font-bold text-lg">{activeTestimonial.name}</h4>
                  <p className="text-gray-500">{activeTestimonial.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Left/Right buttons */}
            {!isMobile && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={prev}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={next}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
