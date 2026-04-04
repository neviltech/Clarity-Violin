import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Baby, Users, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-violin.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import PageWrapper from "@/components/PageWrapper";

const programs = [
  { icon: BookOpen, title: "Beginner Lessons", desc: "Learn fundamentals — posture, bow technique, and your first melodies." },
  { icon: TrendingUp, title: "Intermediate Coaching", desc: "Expand your skills with vibrato, shifting, and challenging repertoire." },
  { icon: Baby, title: "Kids Classes", desc: "Fun, age-appropriate instruction nurturing a lifelong love of music." },
  { icon: Users, title: "Group Sessions", desc: "Play together and enjoy the social side of music." },
];

const Index = () => (
  <PageWrapper>
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Violinist performing" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 gradient-hero-overlay" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
        >
          Clarity Violin — Learn, Play, Master 🎻
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-primary-foreground/80 font-body max-w-2xl mx-auto"
        >
          Professional violin training in Bondo, Siaya — for beginners to advanced students
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <Button asChild size="lg" className="gradient-purple border-0 text-primary-foreground rounded-full px-10 py-6 text-lg shadow-glow hover:opacity-90 transition-opacity">
            <Link to="/classes">Explore Classes</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
        </div>
      </motion.div>
    </section>

    {/* Intro */}
    <section className="py-24 gradient-lavender">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
          Welcome
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3">
          Where Passion Meets Patience
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-6 text-muted-foreground text-lg leading-relaxed font-body">
          Based in Bondo, Siaya County, Violin Academy offers professional violin education rooted in passion, patience, and a deep love for music. Whether you're picking up a bow for the first time or refining your craft, we create a supportive space for every learner.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8">
          <Button asChild variant="outline" className="rounded-full px-8 font-body">
            <Link to="/about">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Programs Preview */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
            Our Programs
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3">
            Classes for Every Stage
          </motion.h2>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="group bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-card hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center group-hover:gradient-purple transition-all duration-300">
                <p.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mt-5">{p.title}</h3>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed font-body">{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="rounded-full px-8 font-body">
            <Link to="/classes">View All Classes <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Gallery Preview */}
    <section className="py-24 gradient-lavender">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
            Gallery
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3">
            Moments in Music
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[gallery1, gallery2, gallery3].map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden shadow-soft">
              <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" width={1024} height={768} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="rounded-full px-8 font-body">
            <Link to="/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="gradient-purple rounded-3xl p-12 md:p-20 text-center shadow-glow">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">Start Your Musical Journey Today</h2>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto font-body">Every great musician started with a single note. Let us help you find yours.</p>
          <Button asChild size="lg" className="mt-8 bg-card text-primary hover:bg-card/90 rounded-full px-10 py-6 text-lg font-body shadow-soft transition-all">
            <Link to="/contact">Contact & Book Now</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </PageWrapper>
);

export default Index;
