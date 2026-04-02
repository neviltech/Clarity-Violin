import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Baby, Users, Clock, Music2, Target, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";

const programs = [
  {
    icon: BookOpen,
    title: "Beginner Lessons",
    desc: "Perfect for those picking up the violin for the first time. Learn proper posture, bow hold, basic techniques, sight-reading fundamentals, and play your first melodies with confidence.",
    details: ["No prior experience needed", "Ages 10+", "60-minute sessions", "Instrument guidance provided"],
  },
  {
    icon: TrendingUp,
    title: "Intermediate Coaching",
    desc: "Take your playing to the next level. Expand your repertoire, develop vibrato and shifting skills, and work on expression, dynamics, and performance confidence.",
    details: ["1–3 years experience", "Theory integration", "Performance preparation", "Personalized repertoire"],
  },
  {
    icon: Baby,
    title: "Kids Classes",
    desc: "Fun, engaging, and age-appropriate instruction designed to nurture a lifelong love of music. Using games, songs, and creative exercises to build skills naturally.",
    details: ["Ages 5–12", "Suzuki-inspired methods", "Small group or private", "Parent involvement welcomed"],
  },
  {
    icon: Users,
    title: "Group Sessions",
    desc: "Learn together, play together. Group sessions build ensemble skills, rhythm awareness, and a sense of musical community. Great for families, friends, and school groups.",
    details: ["2–6 students", "Ensemble repertoire", "Team building through music", "Affordable group rates"],
  },
];

const Classes = () => (
  <PageWrapper>
    <section className="pt-32 pb-16 gradient-lavender">
      <div className="container mx-auto px-4 text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
          Our Programs
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3">
          Classes & Programs
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-muted-foreground text-lg font-body max-w-2xl mx-auto">
          Structured learning paths for every age and skill level
        </motion.p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-12">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50 hover:shadow-card hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center shadow-soft">
                    <p.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-2xl font-bold text-foreground">{p.title}</h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed font-body">{p.desc}</p>
                  <div className="mt-5 grid sm:grid-cols-2 gap-2">
                    {p.details.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
          <p className="text-muted-foreground font-body mb-6">Ready to start your musical journey?</p>
          <Button asChild size="lg" className="gradient-purple border-0 text-primary-foreground rounded-full px-10 py-6 text-lg shadow-glow hover:opacity-90 transition-opacity">
            <Link to="/contact">Book a Class</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </PageWrapper>
);

export default Classes;
