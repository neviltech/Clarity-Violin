import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Classes", to: "/classes" },
  { label: "Gallery", to: "/gallery" },
  { label: "Location", to: "/location" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
          <Music className="h-6 w-6 text-primary" />
          Violin Academy
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="gradient-purple border-0 text-primary-foreground rounded-full px-6 hover:opacity-90 transition-opacity">
            <Link to="/contact">Book Now</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="gradient-purple border-0 text-primary-foreground rounded-full mt-2 w-full hover:opacity-90 transition-opacity">
            <Link to="/contact" onClick={() => setOpen(false)}>Book Now</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
