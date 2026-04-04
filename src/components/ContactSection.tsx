import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 gradient-lavender">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest text-primary font-body"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-3"
          >
            Get in Touch
          </motion.h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Quick contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-muted-foreground font-body leading-relaxed">
              Ready to begin? Reach out via WhatsApp or phone for the quickest response, or fill out the form and we'll reply within 24 hours.
            </p>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-soft border border-border/50 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center shadow-soft">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">WhatsApp Booking</p>
                <p className="text-sm text-muted-foreground font-body">Tap to chat with us</p>
              </div>
            </a>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-soft border border-border/50 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center shadow-soft">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">Call Us</p>
                <p className="text-sm text-muted-foreground font-body">0118 374701</p>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 space-y-5"
          >
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="rounded-xl border-border bg-background font-body"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="rounded-xl border-border bg-background font-body"
            />
            <Textarea
              placeholder="Tell us about your musical goals..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={4}
              className="rounded-xl border-border bg-background font-body resize-none"
            />
            <Button
              type="submit"
              className="w-full gradient-purple text-primary-foreground border-0 rounded-full py-6 font-body text-base hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
