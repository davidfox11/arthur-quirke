import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { X, Heart, Camera, ChevronLeft, ChevronRight } from "lucide-react";

import momImage from "../assets/mom.jpg";
import dadImage from "../assets/dad.jpg";
import grandmaImage from "../assets/grandma-noreen.jpg";
import davidImage from "../assets/uncle-david.jpg";
import jennyImage from "../assets/aunt-jenny.jpg";
import louImage from "../assets/aunt-lou.jpg";
import lisaImage from "../assets/aunt-lisa.jpg";
interface Photo {
  id: string;
  src: string;
  title: string;
  date: string;
}

const photos: Photo[] = [
  {
    id: "1",
    src: momImage,
    title: "Mom",
    date: "October 2024",
  },
  {
    id: "2",
    src: dadImage,
    title: "Dad",
    date: "December 2024",
  },
  {
    id: "3",
    src: grandmaImage,
    title: "Grandma Noreen",
    date: "December 2024",
  },
  {
    id: "4",
    src: davidImage,
    title: "Uncle David",
    date: "December 2024",
  },
  {
    id: "5",
    src: jennyImage,
    title: "Aunt Jenny",
    date: "Summer 2023",
  },
  {
    id: "6",
    src: louImage,
    title: "Aunt Louise",
    date: "January 2025",
  },
  {
    id: "7",
    src: lisaImage,
    title: "Aunt Lisa",
    date: "May 2025",
  },
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleNavigation = useCallback(
    (direction: "next" | "prev") => {
      if (!selectedPhoto) return;
      const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
      let nextIndex;
      if (direction === "next") {
        nextIndex = (currentIndex + 1) % photos.length;
      } else {
        nextIndex = (currentIndex - 1 + photos.length) % photos.length;
      }
      setSelectedPhoto(photos[nextIndex]);
    },
    [selectedPhoto]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNavigation("next");
      } else if (event.key === "ArrowLeft") {
        handleNavigation("prev");
      }
    };

    if (selectedPhoto) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, handleNavigation]);

  return (
    <section id="gallery" className="relative py-20 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/15 via-indigo-100/10 to-slate-100/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-50/8 via-indigo-50/8 to-slate-50/5" />

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
            className="absolute w-20 h-20 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 2) * 40}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6"
          >
            <Camera className="w-5 h-5 text-blue-400" />
            <span className="font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Arthur's Family & Friends
            </span>
          </motion.div>

          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            This is a collection of all the wonderful people in Arthur's life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -20, 0],
                          x: [0, 10, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${30 + i * 15}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <h3 className="mb-2 font-semibold">{photo.title}</h3>
                    <p className="text-sm opacity-90">{photo.date}</p>
                  </div>
                </div>

                {/* Heart icon */}
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedPhoto?.title || "Photo Details"}
          </DialogTitle>
          {selectedPhoto && (
            <div className="relative">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-30 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {/* Navigation Arrows */}
              <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-4">
                <button
                  onClick={() => handleNavigation("prev")}
                  className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleNavigation("next")}
                  className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <ImageWithFallback
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pb-24">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-lg">
                    {selectedPhoto.title}
                  </h3>
                  <span className="text-sm text-white/80">
                    {selectedPhoto.date}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
