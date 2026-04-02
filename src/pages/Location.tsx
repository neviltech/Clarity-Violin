import { motion } from "framer-motion";
import { MapPin, Clock, Bus } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";

const Location = () => (
  <PageWrapper>
    <section className="pt-32 pb-16 gradient-lavender">
      <div className="container mx-auto px-4 text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
          Find Us
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3">
          Visit Us
        </motion.h1>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Our Location</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed font-body">
                Violin Academy is located in the heart of Bondo Town, Siaya County, Kenya. Our studio is easily accessible by public transport and provides a calm, inspiring environment for music learning.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground font-body">Bondo Town, Siaya County, Kenya</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">Hours</p>
                  <p className="text-sm text-muted-foreground font-body">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center shrink-0">
                  <Bus className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">Getting Here</p>
                  <p className="text-sm text-muted-foreground font-body">Accessible via matatu from Kisumu and surrounding areas. Located near Bondo town centre.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-card border border-border/50">
            <iframe
              title="Violin Academy Location - Bondo, Siaya, Kenya"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.62!2d34.2683!3d-0.0869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182cd1c2c1e4fa4b%3A0x17e8f1c3c1b3b1a1!2sBondo%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default Location;
