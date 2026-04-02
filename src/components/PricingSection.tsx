import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Per Session",
    price: "$45",
    period: "/ lesson",
    features: ["60-minute lesson", "Flexible scheduling", "Personalized feedback", "Practice guidance"],
    popular: false,
  },
  {
    name: "Weekly Plan",
    price: "$160",
    period: "/ month",
    features: ["4 lessons per month", "Progress tracking", "Priority scheduling", "Recital opportunities"],
    popular: true,
  },
  {
    name: "Monthly Plan",
    price: "$280",
    period: "/ month",
    features: ["8 lessons per month", "All Weekly benefits", "Theory workshops", "Ensemble access"],
    popular: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 gradient-lavender">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-primary font-body"
        >
          Pricing
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3"
        >
          Simple, Transparent Plans
        </motion.h2>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className={`rounded-3xl p-8 border relative ${
              p.popular
                ? "gradient-purple text-primary-foreground shadow-glow scale-105 border-transparent"
                : "bg-card border-border/50 shadow-soft"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card text-primary text-xs font-semibold px-4 py-1 rounded-full shadow-soft font-body">
                Most Popular
              </span>
            )}
            <h3 className={`font-heading text-xl font-semibold ${p.popular ? "" : "text-foreground"}`}>{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className={`text-4xl font-heading font-bold ${p.popular ? "" : "text-foreground"}`}>{p.price}</span>
              <span className={`text-sm ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"} font-body`}>
                {p.period}
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-body">
                  <Check className={`h-4 w-4 shrink-0 ${p.popular ? "text-primary-foreground" : "text-primary"}`} />
                  <span className={p.popular ? "text-primary-foreground/90" : "text-muted-foreground"}>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={`mt-8 w-full rounded-full font-body ${
                p.popular
                  ? "bg-card text-primary hover:bg-card/90"
                  : "gradient-purple text-primary-foreground border-0 hover:opacity-90"
              } transition-all`}
            >
              <a href="#contact">Get Started</a>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
