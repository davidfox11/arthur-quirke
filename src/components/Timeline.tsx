import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Sparkles, Baby, Trophy, Clock } from "lucide-react";
import heroBackgroundImage from "../assets/images/hero.jpg";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  details: string;
  type: "birth" | "milestone" | "achievement" | "memory";
  location?: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "September 9, 2015",
    title: "Arthur is Born!",
    description: "The most wonderful day - Arthur enters the world",
    details:
      "Arthur was born at 3:42 AM, weighing 7 lbs 2 oz. From the moment he arrived, he filled our hearts with endless joy and wonder. His first cry was music to our ears, and his tiny fingers wrapped around ours with such strength.",
    type: "birth",
    location: "City Hospital",
    image: heroBackgroundImage,
  },
  {
    id: "2",
    date: "October 15, 2015",
    title: "First Smile",
    description: "Arthur's first genuine smile melted everyone's heart",
    details:
      "At just 5 weeks old, Arthur gave us his first real smile. It wasn't just gas - it was a genuine, heart-melting smile that lit up his entire face. This was the moment we knew he was truly connecting with the world around him.",
    type: "milestone",
    image: heroBackgroundImage,
  },
  {
    id: "3",
    date: "March 22, 2016",
    title: "First Steps",
    description: "Arthur takes his first independent steps",
    details:
      "After months of cruising along furniture and taking tentative steps while holding our hands, Arthur finally took three wobbly but determined steps on his own. He looked so proud of himself, clapping and giggling with delight.",
    type: "milestone",
    location: "Living Room",
    image: heroBackgroundImage,
  },
  {
    id: "4",
    date: "September 9, 2018",
    title: "First Day of Preschool",
    description: "Arthur starts his educational journey",
    details:
      "Arthur was both excited and nervous for his first day of preschool. He picked out his favorite backpack and insisted on bringing his stuffed elephant for comfort. By pickup time, he had made two new friends and was already asking when he could go back.",
    type: "achievement",
    location: "Sunshine Preschool",
    image: heroBackgroundImage,
  },
  {
    id: "5",
    date: "July 14, 2019",
    title: "Learns to Swim",
    description: "Arthur conquers his fear of water",
    details:
      "After weeks of swimming lessons, Arthur finally swam across the pool without any assistance. His instructor cheered, and Arthur emerged from the water beaming with pride. This was a huge confidence boost for him.",
    type: "achievement",
    location: "Community Pool",
    image: heroBackgroundImage,
  },
  {
    id: "6",
    date: "December 25, 2020",
    title: "First Bike Ride",
    description: "Arthur masters riding without training wheels",
    details:
      "Christmas morning brought a special surprise - Arthur's first real bike. After a few wobbly attempts and one small tumble, he was off riding around the neighborhood with the biggest smile on his face.",
    type: "milestone",
    location: "Neighborhood Streets",
    image: heroBackgroundImage,
  },
];

const typeStyles = {
  birth:
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg shadow-blue-500/25",
  milestone:
    "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-500/25",
  achievement:
    "bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-0 shadow-lg shadow-indigo-500/25",
  memory:
    "bg-gradient-to-r from-slate-500 to-blue-500 text-white border-0 shadow-lg shadow-slate-500/25",
};

const typeIcons = {
  birth: Baby,
  milestone: Calendar,
  achievement: Trophy,
  memory: Sparkles,
};

const timelineColors = [
  {
    bg: "from-blue-400/15 to-indigo-400/15",
    accent: "from-blue-500 to-indigo-500",
    dot: "bg-blue-500",
  },
  {
    bg: "from-indigo-400/15 to-blue-400/15",
    accent: "from-indigo-500 to-blue-500",
    dot: "bg-indigo-500",
  },
  {
    bg: "from-slate-400/15 to-blue-400/15",
    accent: "from-slate-500 to-blue-500",
    dot: "bg-slate-500",
  },
  {
    bg: "from-blue-300/15 to-indigo-300/15",
    accent: "from-blue-400 to-indigo-400",
    dot: "bg-blue-400",
  },
  {
    bg: "from-indigo-300/15 to-slate-400/15",
    accent: "from-indigo-400 to-slate-400",
    dot: "bg-indigo-400",
  },
  {
    bg: "from-blue-500/15 to-slate-400/15",
    accent: "from-blue-600 to-slate-500",
    dot: "bg-blue-600",
  },
];

function TimelineItem({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const IconComponent = typeIcons[event.type];
  const colorScheme = timelineColors[index % timelineColors.length];

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          type: "spring",
          stiffness: 120,
        }}
        className="relative w-full"
      >
        {/* Mobile-First Content Card */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="relative bg-white/95 backdrop-blur-md border border-white/30 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group"
          >
            {/* Event Image - Now Featured at Top */}
            {event.image && (
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Timeline dot positioned on image */}
                <div className="absolute top-4 left-4">
                  <motion.div
                    className={`w-12 h-12 ${colorScheme.dot} rounded-full flex items-center justify-center shadow-xl relative z-10`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className={`absolute inset-0 ${colorScheme.dot} rounded-full`}
                    />
                    <IconComponent className="w-6 h-6 text-white relative z-10" />
                  </motion.div>
                </div>

                {/* Event type badge on image */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className={`${
                      typeStyles[event.type]
                    } px-3 py-1 bg-white/90 backdrop-blur-sm`}
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Date */}
              <motion.div
                className="text-sm font-medium text-primary/70 bg-primary/5 px-3 py-2 rounded-full w-fit"
                whileHover={{ scale: 1.05 }}
              >
                {event.date}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground leading-tight">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/80 leading-relaxed">
                {event.description}
              </p>

              {/* Location */}
              {event.location && (
                <div className="flex items-center text-sm text-foreground/70 bg-primary/5 px-3 py-2 rounded-lg w-fit">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              )}

              {/* Read More Indicator */}
              <div className="flex items-center text-sm text-primary font-medium pt-2">
                <span>Tap to read more</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </div>
            </div>

            {/* Hover/Touch effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>

        {/* Timeline Connection Line for Mobile */}
        {index < timelineEvents.length - 1 && (
          <div className="flex justify-center my-8">
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={
                isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              className={`w-1 h-16 bg-gradient-to-b ${colorScheme.accent} rounded-full origin-top relative`}
            >
              {/* Flowing animation effect */}
              <motion.div
                animate={{ y: [-20, 80] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-2 h-4 bg-white/30 rounded-full -left-0.5 blur-sm"
              />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-primary" />
              {event.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {event.date}
              </div>
              {event.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              )}
            </div>
            <Badge className={`${typeStyles[event.type]} border w-fit`}>
              {event.type}
            </Badge>

            {/* Event Image in Modal */}
            {event.image && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <p className="leading-relaxed">{event.details}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Timeline() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Dynamic Background - Optimized for Mobile */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-slate-100/15"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-50/15 via-indigo-50/15 to-slate-50/10" />

        {/* Simplified animated background elements for mobile performance */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
            className={`absolute w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br ${
              timelineColors[i % timelineColors.length].bg
            } rounded-full blur-xl opacity-20`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6"
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="font-medium text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Life's Journey
            </span>
          </motion.div>

          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            Arthur's Life Timeline
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto text-base sm:text-lg leading-relaxed px-4 sm:px-0">
            Follow Arthur's extraordinary journey through life's precious
            moments. Tap each milestone to discover the beautiful stories behind
            them.
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12 md:space-y-16 max-w-2xl mx-auto">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* End of timeline decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-20"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
