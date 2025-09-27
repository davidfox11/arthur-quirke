import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { X, Heart, Camera } from 'lucide-react';

interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  date: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1624272887610-dbf9bc1483f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwcGxheWluZyUyMG91dGRvb3JzfGVufDF8fHx8MTc1ODk4NjUzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Arthur playing outdoors',
    title: 'Adventure Time',
    date: 'Summer 2023',
    description: 'Arthur exploring the great outdoors with endless curiosity and joy.'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1502201661686-673f2fdb8da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJpcnRoZGF5JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU4OTg2NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Arthur birthday celebration',
    title: 'Birthday Magic',
    date: 'September 2023',
    description: 'Another year of wonderful memories and birthday wishes come true.'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1538118160270-1529bee869ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBtb21lbnRzJTIwY2hpbGRyZW58ZW58MXx8fHwxNzU4OTg2NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Family moments with Arthur',
    title: 'Family Love',
    date: 'Spring 2023',
    description: 'Precious family moments that warm our hearts and create lasting bonds.'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1610552254576-9500a3e99999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGxlYXJuaW5nJTIwc2Nob29sfGVufDF8fHx8MTc1ODk4NjU0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Arthur learning at school',
    title: 'Learning Journey',
    date: 'Fall 2023',
    description: 'Arthur\'s curiosity and love for learning shines through every day.'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1627540458907-47a427507e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHN3aW1taW5nJTIwcG9vbHxlbnwxfHx8fDE3NTg5ODY1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Arthur swimming',
    title: 'Water Adventures',
    date: 'Summer 2023',
    description: 'Conquering fears and making a splash in his swimming journey.'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1652729926136-c8415ecff12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHJpZGluZyUyMGJpY3ljbGV8ZW58MXx8fHwxNzU4OTg2NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Arthur riding bicycle',
    title: 'Freedom on Wheels',
    date: 'Winter 2020',
    description: 'The joy of independence and the thrill of riding without training wheels.'
  }
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

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
              ease: "easeInOut"
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
              Precious Moments
            </span>
          </motion.div>

          <h2 className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            Memory Gallery
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A beautiful collection of moments capturing Arthur's joy, growth, and adventures. 
            Each photo tells a story of love, laughter, and precious memories that warm our hearts.
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
                stiffness: 100
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
                    alt={photo.alt}
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
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedPhoto?.title || 'Photo Details'}
          </DialogTitle>
          {selectedPhoto && (
            <div className="relative">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <ImageWithFallback
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground">{selectedPhoto.title}</h3>
                  <span className="text-sm text-muted-foreground">{selectedPhoto.date}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}