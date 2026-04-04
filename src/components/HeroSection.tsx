import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-violin.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <img
      src={heroImg}
      alt="Violinist performing on stage"
      width={1920}
      height={1080}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 gradient-hero-overlay" />

    {/* Content */}
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
      >
        Clarity Violin — Master the Art of Music 🎻
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 text-lg md:text-xl text-primary-foreground/80 font-body max-w-2xl mx-auto"
      >
        Professional violin lessons for beginners to advanced students
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10"
      >
        <Button
          asChild
          size="lg"
          className="gradient-purple border-0 text-primary-foreground rounded-full px-10 py-6 text-lg shadow-glow hover:opacity-90 transition-opacity"
        >
          <a href="#contact">Book Your First Lesson</a>
        </Button>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
