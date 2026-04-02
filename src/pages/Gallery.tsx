import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Student practicing violin" },
  { src: gallery2, alt: "Group class in progress" },
  { src: gallery3, alt: "Violin close-up detail" },
  { src: gallery4, alt: "One-on-one lesson" },
  { src: gallery5, alt: "Student recital performance" },
  { src: gallery6, alt: "Violin and sheet music" },
];

const Gallery = () => (
  <PageWrapper>
    <section className="pt-32 pb-16 gradient-lavender">
      <div className="container mx-auto px-4 text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
          Gallery
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3">
          Moments in Music
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-muted-foreground text-lg font-body max-w-2xl mx-auto">
          A glimpse into life at Violin Academy
        </motion.p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group rounded-2xl overflow-hidden shadow-soft border border-border/30"
            >
              <div className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default Gallery;
