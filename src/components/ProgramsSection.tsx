import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Baby, Users } from "lucide-react";

const programs = [
  { icon: BookOpen, title: "Beginner Lessons", desc: "Learn fundamentals — posture, bow technique, sight-reading, and your first melodies." },
  { icon: TrendingUp, title: "Intermediate Coaching", desc: "Expand your skills with vibrato, shifting, and more challenging repertoire." },
  { icon: Baby, title: "Kids Classes", desc: "Fun, age-appropriate instruction that nurtures a lifelong love of music." },
  { icon: Users, title: "Group Sessions", desc: "Play together, learn ensemble skills, and enjoy the social side of music." },
];

const ProgramsSection = () => (
  <section id="programs" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-primary font-body"
        >
          Our Programs
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3"
        >
          Classes for Every Stage
        </motion.h2>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-card hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center group-hover:gradient-purple transition-all duration-300">
              <p.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mt-5">{p.title}</h3>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed font-body">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramsSection;
