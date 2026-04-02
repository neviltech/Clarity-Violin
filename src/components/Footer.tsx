import { Music } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-10">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-primary-foreground font-heading text-lg font-semibold">
        <Music className="h-5 w-5" />
        Violin Academy
      </div>
      <p className="mt-3 text-primary-foreground/50 text-sm font-body">
        © {new Date().getFullYear()} Violin Academy. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
