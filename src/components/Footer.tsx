import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/15 via-indigo-100/10 to-slate-100/8" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-50/8 via-indigo-50/8 to-slate-50/5" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-3 text-foreground/80"
          >
            <span className="text-lg">Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                className="absolute inset-0 w-6 h-6 text-red-400 fill-current"
              >
                <Heart className="w-6 h-6" />
              </motion.div>
            </motion.div>
            <span className="text-lg">for Arthur</span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-foreground/60 text-lg"
          >
            Celebrating every moment of an amazing journey
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center pt-8"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}