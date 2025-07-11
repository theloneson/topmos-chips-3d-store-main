
import { motion } from 'framer-motion';
import { Check, Users, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About TOPMOS FARMS
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From Farm to Snack: Our Journey of Creating Nigeria's Finest Plantain Chips
            </motion.p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                TOPMOS FARMS began with a simple mission: to create delicious, high-quality plantain chips that celebrate the rich agricultural heritage of Nigeria.
              </p>
              <p className="text-gray-600 mb-4">
                Founded in 2018, we started as a small family operation with just one farm and a passion for creating the perfect plantain chip. Today, we've grown to work with dozens of local farmers, supporting sustainable agriculture while bringing our premium products to customers throughout Nigeria and beyond.
              </p>
              <p className="text-gray-600">
                Each bag of our plantain chips represents our commitment to quality, tradition, and the communities that help bring our products from farm to shelf.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-1">
                <img 
                  src="/lovable-uploads/36be43fe-e0a3-4597-94c8-244ebd1f5b30.png"
                  alt="TOPMOS FARMS Plantain Chips" 
                  className="rounded-xl object-cover h-[400px] w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-primary">Since 2018</p>
                <p className="text-sm text-gray-600">Creating Premium Snacks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Check className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                We select only the finest plantains and use traditional methods combined with modern technology to ensure every chip meets our high standards.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                We work closely with local farmers, providing fair wages and supporting sustainable farming practices that benefit both people and the environment.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We're constantly exploring new flavors, packaging, and sustainable practices to bring you the best possible snacking experience.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80" 
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Oluwaseun Adeyemi</h3>
              <p className="text-primary font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                With over 15 years in agriculture, Oluwaseun leads our vision to bring premium snacks to consumers worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80" 
                  alt="COO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Amina Ibrahim</h3>
              <p className="text-primary font-medium mb-2">Chief Operating Officer</p>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Amina oversees our day-to-day operations, ensuring quality and efficiency from farm to package.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 w-48 h-48 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80" 
                  alt="Head of Production"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Chukwudi Okonkwo</h3>
              <p className="text-primary font-medium mb-2">Head of Production</p>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                With expertise in food processing, Chukwudi ensures our chips maintain their exceptional quality and taste.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-gray-600 mb-8">
              Whether you're a retailer interested in carrying our products or a customer looking for the perfect snack, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                Contact Us
              </a>
              <a href="/products" className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary/10 transition-colors">
                Explore Our Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
