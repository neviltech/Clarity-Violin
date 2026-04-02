import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CtaSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="gradient-purple rounded-3xl p-12 md:p-20 text-center shadow-glow"
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">
          Start Your Musical Journey Today
        </h2>
        <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto font-body">
          Every great musician started with a single note. Let us help you find yours — your first lesson is just a click away.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-card text-primary hover:bg-card/90 rounded-full px-10 py-6 text-lg font-body shadow-soft transition-all"
        >
          <a href="#contact">Contact & Book Now</a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
