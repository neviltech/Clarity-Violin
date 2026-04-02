import { motion } from "framer-motion";
import { Heart, Award, Music2, MapPin } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import instructorImg from "@/assets/about-instructor.jpg";

const highlights = [
  { icon: Heart, label: "Passion-Driven", desc: "Teaching rooted in genuine love for music" },
  { icon: Award, label: "15+ Years Experience", desc: "Professional performance & pedagogy" },
  { icon: Music2, label: "All Levels Welcome", desc: "From first notes to concert stage" },
  { icon: MapPin, label: "Proudly Kenyan", desc: "Based in Bondo, Siaya County" },
];

const About = () => (
  <PageWrapper>
    {/* Header */}
    <section className="pt-32 pb-16 gradient-lavender">
      <div className="container mx-auto px-4 text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
          About Us
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3">
          Our Story
        </motion.h1>
      </div>
    </section>

    {/* Content */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={instructorImg} alt="Violin instructor" loading="lazy" width={800} height={1024} className="rounded-3xl shadow-card w-full object-cover max-h-[500px]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Where Passion Meets Patience</h2>
            <p className="text-muted-foreground leading-relaxed font-body">
              Violin Academy was founded with a simple belief: music transforms lives. Based in Bondo, Siaya County, Kenya, we bring professional violin education to our community with warmth, dedication, and excellence.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body">
              Our instructor brings over 15 years of performance and teaching experience, guiding each student with patience and a deep love for the violin. Whether you're a child picking up a bow for the first time or an adult rediscovering your musical passion, we create a supportive space where you can grow at your own pace.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body">
              We believe that every person deserves access to quality music education. Our academy is committed to nurturing talent, building confidence, and fostering a lifelong connection to the art of violin.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Highlights */}
    <section className="py-20 gradient-lavender">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {highlights.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center shadow-soft">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{item.label}</h3>
              <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default About;
