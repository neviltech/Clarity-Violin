import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PageWrapper from "@/components/PageWrapper";

const Contact = () => {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message received! We'll be in touch soon.");
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 bg-accent/50 rounded-xl p-4 mb-8">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground font-body">Contact details coming soon. Use the form below to reach us.</p>
            </div>

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
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
