import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PageWrapper from "@/components/PageWrapper";

const Contact = () => {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = encodeURIComponent(
      `Hi, my name is ${form.name}. ${form.message}`
    );
    window.open(`https://wa.me/254118374701?text=${whatsappMessage}`, "_blank");
    toast.success("Opening WhatsApp...");
    setForm({ name: "", message: "" });
  };

  return (
    <PageWrapper>
      <section className="pt-32 pb-16 gradient-lavender">
        <div className="container mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold uppercase tracking-widest text-primary font-body">
            Contact
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3">
            Get in Touch
          </motion.h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Quick Contact Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4 mb-8">
            <a
              href="https://wa.me/254118374701"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-soft border border-border/50 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center shadow-soft">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">WhatsApp Us</p>
                <p className="text-sm text-muted-foreground font-body">Tap to chat on WhatsApp</p>
              </div>
            </a>

            <a
              href="tel:0118374701"
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

          {/* Form that sends via WhatsApp */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
            <p className="text-sm text-muted-foreground font-body mb-6">Or send us a message directly via WhatsApp:</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground font-body mb-1.5 block">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-xl border-border bg-background font-body"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground font-body mb-1.5 block">Message</label>
                <Textarea
                  placeholder="Tell us about your interest in violin lessons..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="rounded-xl border-border bg-background font-body resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full gradient-purple text-primary-foreground border-0 rounded-full py-6 font-body text-base hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4 mr-2" />
                Send via WhatsApp
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
