import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroBackgroundImageLg from "../assets/hero-lg.jpg";
import heroBackgroundImageSm from "../assets/hero-sm.png";
import { useIsMobile } from "./ui/use-mobile";

export function Hero() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const heroBackgroundImage = isMobile
    ? heroBackgroundImageSm
    : heroBackgroundImageLg;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Portrait Background with Artistic Effects */}
      <div className="absolute inset-0">
        {/* Portrait Image with Sketch Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBackgroundImage})`,
          }}
        />

        {/* Bottom fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-2xl">
              Welcome to Arthur's World
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mx-auto mb-6" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 max-w-xl mx-auto text-white/90 leading-relaxed text-base sm:text-lg drop-shadow-lg px-2"
          >
            This is a gift for Arthur from his godfather to celebrate his life
            and all the amazing memories that he is sure to collect along the
            way! Please feel free to reach out if you have any nice Arthur
            content you would like to add.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <motion.button
              onClick={() =>
                document
                  .getElementById("timeline")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative inline-flex items-center space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/30 hover:shadow-2xl hover:shadow-white/20 text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Check out the highlights</span>
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-white/60 to-transparent rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className={`absolute w-2 h-2 bg-gradient-to-r from-white/40 to-blue-200/60 rounded-full opacity-80`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 8}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
