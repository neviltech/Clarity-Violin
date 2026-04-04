import { Link } from "react-router-dom";
import { Music } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground font-heading text-lg font-semibold">
          <Music className="h-5 w-5" />
          Clarity Violin
        </Link>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: "About", to: "/about" },
            { label: "Classes", to: "/classes" },
            { label: "Gallery", to: "/gallery" },
            { label: "Location", to: "/location" },
            { label: "Contact", to: "/contact" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground/90 transition-colors font-body">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-primary-foreground/40 text-sm font-body">
        © {new Date().getFullYear()} Violin Academy · Bondo, Siaya, Kenya. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
