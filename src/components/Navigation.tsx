import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Menu,
  Heart,
  Image as ImageIcon,
  Calendar,
  Sparkles,
  Home,
} from "lucide-react";
import artIcon from "../assets/art1.png";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "timeline", "gallery"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "map", label: "Map", icon: ImageIcon },
    { id: "gallery", label: "Gallery", icon: Sparkles },
  ];

  return (
    <motion.nav
      style={{
        opacity,
        backdropFilter: `blur(${blur}px)`,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80" />
      <div className="relative max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src={artIcon} alt="Art" className="w-4 h-4" />
            </div>
            <span className="font-medium text-foreground">Arthur Quirke</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            <a
              href="https://photos.app.goo.gl/Q8sQ1aWJqW2fgy2V8"
              className="group relative inline-flex items-center space-x-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-lg hover:shadow-rose-500/30 text-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={artIcon} alt="Art" className="w-4 h-4" />
              <span>Arthur's Art</span>
            </a>
          </div>

          <div className="md:hidden">
            <div className="flex items-center space-x-1 bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/20 rounded-full p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <div className="relative flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
