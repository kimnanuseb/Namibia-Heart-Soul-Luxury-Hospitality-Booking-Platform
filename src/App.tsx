import * as React from "react";
import { Property } from "./types";
import { BookingBar } from "./components/BookingBar";
import { PropertyCard } from "./components/PropertyCard";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Menu, X, Phone, Mail, Globe, Instagram, Facebook, Twitter } from "lucide-react";

export default function App() {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch properties:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (filters: { destination: string; date: any; guests: string }) => {
    setLoading(true);
    // Simulate a network delay for the "search" feel
    setTimeout(() => {
      const filtered = properties.filter((p) => {
        const matchesDestination = 
          filters.destination === "all" || 
          p.location.toLowerCase().includes(filters.destination.toLowerCase());
        return matchesDestination;
      });
      setFilteredProperties(filtered);
      setLoading(false);
      
      // Scroll to results
      const resultsSection = document.getElementById("results-grid");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-brand-olive rounded-full flex items-center justify-center text-white font-serif text-xl font-bold">
                N
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-brand-wood">
                NAMIBIA <span className="text-brand-gold italic">Heart & Soul</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('results-grid')} className="text-sm font-medium hover:text-brand-gold transition-colors cursor-pointer">Destinations</button>
              <button onClick={() => scrollToSection('experiences')} className="text-sm font-medium hover:text-brand-gold transition-colors cursor-pointer">Experiences</button>
              <button onClick={() => scrollToSection('sustainability')} className="text-sm font-medium hover:text-brand-gold transition-colors cursor-pointer">Sustainability</button>
              <button onClick={() => scrollToSection('footer')} className="text-sm font-medium hover:text-brand-gold transition-colors cursor-pointer">About Us</button>
              <Button 
                onClick={() => scrollToSection('results-grid')}
                className="bg-brand-olive hover:bg-brand-wood text-white rounded-full px-6"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4"
          >
            <button onClick={() => scrollToSection('results-grid')} className="block w-full text-left text-lg font-medium">Destinations</button>
            <button onClick={() => scrollToSection('experiences')} className="block w-full text-left text-lg font-medium">Experiences</button>
            <button onClick={() => scrollToSection('sustainability')} className="block w-full text-left text-lg font-medium">Sustainability</button>
            <button onClick={() => scrollToSection('footer')} className="block w-full text-left text-lg font-medium">About Us</button>
            <Button onClick={() => scrollToSection('results-grid')} className="w-full bg-brand-olive text-white rounded-full">Book Now</Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=10" 
            alt="Namibian Landscape"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/90 uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            Welcome to the Soul of Africa
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-8 leading-tight"
          >
            Discover Namibia <br />
            <span className="italic text-brand-gold">With Heart and Soul</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Experience sustainably operated lodges, hotels and camps across the vast landscapes of Namibia.
          </motion.p>
        </div>
      </section>

      {/* Booking Bar */}
      <BookingBar onSearch={handleSearch} />

      {/* Property Grid */}
      <main id="results-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-olive uppercase tracking-widest text-xs font-bold mb-2 block">Our Collection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-wood">Destinations to Dream of...</h2>
            <p className="text-gray-500 mt-4">
              From the lush Zambezi to the ancient Namib Desert, explore our hand-picked collection of sustainable lodges.
            </p>
          </div>
          <Button 
            variant="link" 
            onClick={() => setFilteredProperties(properties)}
            className="text-brand-olive font-bold p-0 h-auto uppercase tracking-wider text-xs"
          >
            View All Properties →
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <h3 className="text-2xl font-serif text-brand-wood mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your search filters.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilteredProperties(properties)}
                  className="mt-6 border-brand-olive text-brand-olive rounded-xl"
                >
                  Show All Properties
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Experiences Section */}
      <section id="experiences" className="bg-brand-wood text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/800/1000?random=11" 
                alt="Experience"
                className="rounded-3xl w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 bg-brand-gold p-8 rounded-2xl hidden md:block">
                <p className="text-brand-wood font-serif text-2xl italic">"A journey that touches the soul."</p>
              </div>
            </motion.div>
            <div>
              <span id="sustainability" className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Unforgettable Moments</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">Authentic Namibian <br /> Experiences</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                We believe in tourism that gives back. Every stay with us contributes to conservation and community development in Namibia. From guided desert walks to cultural encounters, discover the true essence of our land.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-brand-gold font-serif text-3xl mb-2">50+</h4>
                  <p className="text-white/50 text-sm uppercase tracking-wider">Sustainable Lodges</p>
                </div>
                <div>
                  <h4 className="text-brand-gold font-serif text-3xl mb-2">7,400km²</h4>
                  <p className="text-white/50 text-sm uppercase tracking-wider">Conservation Land</p>
                </div>
              </div>
              <Button className="bg-brand-gold hover:bg-white text-brand-wood rounded-full px-8 h-12 font-bold transition-all">
                Learn About Our Impact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-brand-sand border-t border-brand-wood/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-olive rounded-full flex items-center justify-center text-white font-serif text-lg font-bold">
                  N
                </div>
                <span className="text-lg font-serif font-bold tracking-tight text-brand-wood">
                  NAMIBIA <span className="text-brand-gold italic">Heart & Soul</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Namibia's leading sustainable hospitality group. Experience the magic of Africa with a conscience.
              </p>
              <div className="flex gap-4">
                <Instagram size={20} className="text-brand-olive cursor-pointer hover:text-brand-gold" />
                <Facebook size={20} className="text-brand-olive cursor-pointer hover:text-brand-gold" />
                <Twitter size={20} className="text-brand-olive cursor-pointer hover:text-brand-gold" />
              </div>
            </div>

            <div>
              <h4 className="font-serif text-xl mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button onClick={() => scrollToSection('results-grid')} className="hover:text-brand-olive cursor-pointer">Our Lodges</button></li>
                <li><button onClick={() => scrollToSection('results-grid')} className="hover:text-brand-olive cursor-pointer">Special Offers</button></li>
                <li><button onClick={() => scrollToSection('footer')} className="hover:text-brand-olive cursor-pointer">Travel Info</button></li>
                <li><button onClick={() => scrollToSection('footer')} className="hover:text-brand-olive cursor-pointer">Contact Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center gap-3"><Phone size={16} /> +264 00 000 0000</li>
                <li className="flex items-center gap-3"><Mail size={16} /> hello@example-lodges.com</li>
                <li className="flex items-center gap-3"><Globe size={16} /> Windhoek, Namibia</li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl mb-6">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-4">Subscribe for travel inspiration and exclusive offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-olive"
                />
                <Button className="bg-brand-olive text-white rounded-lg">Join</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-wood/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 uppercase tracking-widest">
            <p>© 2026 Namibia Heart & Soul. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
