import { motion } from "framer-motion";
import { Heart, Award, Music2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const AboutSection = () => (
  <section id="about" className="py-24 gradient-lavender">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        variants={fadeUp}
        className="text-sm font-semibold uppercase tracking-widest text-primary font-body"
      >
        About Us
      </motion.span>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        variants={fadeUp}
        className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3"
      >
        Where Passion Meets Patience
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={fadeUp}
        className="mt-6 text-muted-foreground text-lg leading-relaxed font-body"
      >
        At Clarity Violin, we believe music transforms lives. Founded by Clarice Wachegu, who has been playing since age 12,
        our academy guides each student with patience, warmth, and a deep love for the violin.
        Whether you're picking up a bow for the first time or refining your repertoire, we create a supportive space
        where you can grow at your own pace.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 grid sm:grid-cols-3 gap-8"
      >
        {[
          { icon: Heart, label: "Passion-Driven", desc: "Teaching rooted in genuine love for music" },
          { icon: Award, label: "15+ Years Experience", desc: "Professional performance & pedagogy" },
          { icon: Music2, label: "All Levels Welcome", desc: "From first notes to concert stage" },
        ].map((item, i) => (
          <motion.div key={item.label} custom={i + 3} variants={fadeUp} className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center shadow-soft">
              <item.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">{item.label}</h3>
            <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
