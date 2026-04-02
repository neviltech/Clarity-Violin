import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Beginner Student",
    text: "I was terrified to start violin at 30, but the patience and encouragement I received here made all the difference. Six months in, I'm playing songs I love!",
  },
  {
    name: "David & Lina",
    role: "Parents",
    text: "Our daughter looks forward to every lesson. The kids' program is engaging, structured, and so much fun. Her confidence has blossomed.",
  },
  {
    name: "James T.",
    role: "Intermediate Student",
    text: "The personalized coaching helped me break through a plateau I'd been stuck on for years. The progress I've made is beyond what I imagined.",
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-primary font-body"
        >
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3"
        >
          What Our Students Say
        </motion.h2>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 relative"
          >
            <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed font-body italic">"{t.text}"</p>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="font-heading font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground font-body">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
