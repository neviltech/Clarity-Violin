import { motion } from "framer-motion";
import { Smile, UserCheck, CalendarClock, Sparkles } from "lucide-react";

const reasons = [
  { icon: Smile, title: "Patient Teaching Style", desc: "We move at your pace — no pressure, no rush. Every student feels comfortable and supported." },
  { icon: UserCheck, title: "Personalized Approach", desc: "Custom lesson plans tailored to your goals, interests, and learning style." },
  { icon: CalendarClock, title: "Flexible Scheduling", desc: "Choose lesson times that fit your life. In-person and online options available." },
  { icon: Sparkles, title: "Inspiring Environment", desc: "A warm, creative space that fuels your motivation and musical growth." },
];

const WhyUsSection = () => (
  <section id="why-us" className="py-24 gradient-lavender">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-primary font-body"
        >
          Why Choose Us
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3"
        >
          The Violin Academy Difference
        </motion.h2>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex gap-5 items-start"
          >
            <div className="shrink-0 w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center shadow-soft">
              <r.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed font-body">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
