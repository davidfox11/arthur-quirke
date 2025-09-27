"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Baby,
  MapPin,
  Heart,
  Sparkles,
  Clock,
  Home,
  Car,
  Rocket,
  Users,
  Gift,
  Plane,
  Sun,
  Send,
  Mountain,
  Waves,
  CakeSlice,
} from "lucide-react";
import timelineBirthImage from "../assets/born.jpg";
import goingHomeImage from "../assets/going-home.jpg";
import firstCorkImage from "../assets/first-cork.jpg";
import cousinBondingImage from "../assets/cousin.jpg";
import manUnitedImage from "../assets/manu.jpg";
import xmasImage from "../assets/xmas.jpg";
import portugalImage from "../assets/portugal.jpg";
import goodbyeImage from "../assets/bye.jpg";
import hikingImage from "../assets/wicklow.jpg";
import swimImage from "../assets/swim.jpg";
import birthdayImage from "../assets/bday.jpg";
import amsterdamImage from "../assets/amsterdam.jpg";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  detailedDescription: string;
  icon: React.ElementType;
  location?: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Arthur is Born",
    date: "9th September 2024",
    description: "The beginning of an extraordinary journey",
    detailedDescription:
      "On this beautiful September morning, Arthur entered the world, bringing immense joy and love to his family. From his very first breath, it was clear that Arthur was destined for wonderful things. His bright eyes and gentle spirit immediately captured the hearts of everyone who met him.",
    icon: Baby,
    location: "Merrion Square, Dublin",
    image: timelineBirthImage,
  },
  {
    id: "2",
    title: "Going Home",
    date: "11th September 2024",
    description: "Arthur goes home",
    detailedDescription:
      "After a few days getting used to the world, Arthur goes to his first home in Ballsbridge with Mom and Dad",
    icon: Home,
    location: "Ballsbridge, Dublin",
    image: goingHomeImage,
  },
  {
    id: "3",
    title: "First Visit to Cork",
    date: "5th October 2024",
    description: "Seeing the sites of Myrtleville and Glandore",
    detailedDescription:
      "Arthur took a trip down to Cork to visit his grandparents in Myrtleville and Glandore",
    icon: Car,
    location: "Cork",
    image: firstCorkImage,
  },
  {
    id: "4",
    title: "First Match as a United Fan",
    date: "4th November 2024",
    description: "Entering a life of hardship",
    detailedDescription:
      "Arthur was certainly less than impressed with his first match as a United fan",
    icon: Rocket,
    location: "Ballsbridge, Dublin",
    image: manUnitedImage,
  },
  {
    id: "5",
    title: "Cousin Bonding",
    date: "4th November 2024",
    description: "Hanging out",
    detailedDescription: "Arthur and cousin Alex having a blast together",
    icon: Users,
    location: "Ballsbridge, Dublin",
    image: cousinBondingImage,
  },
  {
    id: "6",
    title: "First Christmas",
    date: "25th December 2024",
    description: "Enjoying the magic of Christmas",
    detailedDescription:
      "Arthur came down to Cork with his parents to spend Christmas in Myrtleville. He had a blast at the Christmas swim where he got to see everyone jumping into the freezing sea.",
    icon: Gift,
    location: "Myrtleville, Cork",
    image: xmasImage,
  },
  {
    id: "7",
    title: "Visiting Amsterdam",
    date: "9th January 2025",
    description: "International jetsetter",
    detailedDescription:
      "Arthur boarded his first plane to visit his aunt Louise in Amsterdam",
    icon: Plane,
    location: "Amsterdam, Netherlands",
    image: amsterdamImage,
  },
  {
    id: "8",
    title: "Sun Holiday",
    date: "5th March 2025",
    description: "Sunny vibes",
    detailedDescription:
      "After a taste for travel, Arthur took his parents on a sunny trip to Portugal to take a well earned break from the toll of everyday life",
    icon: Sun,
    location: "Faro, Portugal",
    image: portugalImage,
  },
  {
    id: "9",
    title: "Saying Goodbyes",
    date: "7th May 2025",
    description: "It's been a blast",
    detailedDescription:
      "Arthur bid farewell to his aunt Lisa and uncle Conor as they left for a new adventure in Australia. Lisa and Arthur got to spend some great months bonding while she lived in Dublin",
    icon: Send,
    location: "Cork Airport",
    image: goodbyeImage,
  },
  {
    id: "10",
    title: "Going Hiking",
    date: "8th August 2025",
    description: "Passenger prince",
    detailedDescription:
      "Arthur took to the Wiclow mountains for a hike with his parents. His dad had a sore pair of shoulders at the end of the day!",
    icon: Mountain,
    location: "Wicklow Mountains",
    image: hikingImage,
  },
  {
    id: "11",
    title: "First Swim",
    date: "11th August 2025",
    description: "Testing the waters",
    detailedDescription:
      "After 'gentle' encouragement from his grandma, Arthur had his first outing in the sea at Myrtleville beach",
    icon: Waves,
    location: "Myrtleville, Cork",
    image: swimImage,
  },
  {
    id: "12",
    title: "First Birthday",
    date: "9th September 2025",
    description: "Celebrating in style",
    detailedDescription:
      "Arthur got a full week of celebrations with an amazing cake at Creche, followed by a trip to Portugal to celebrate his first trip around the sun in style",
    icon: CakeSlice,
    location: "Faro, Portugal",
    image: birthdayImage,
  },
];

const timelineColors = [
  {
    dot: "bg-gradient-to-br from-pink-400 to-pink-600",
    accent: "from-pink-400 to-pink-600",
    bg: "from-pink-50 to-pink-100",
    glow: "shadow-pink-200",
  },
  {
    dot: "bg-gradient-to-br from-blue-400 to-blue-600",
    accent: "from-blue-400 to-blue-600",
    bg: "from-blue-50 to-blue-100",
    glow: "shadow-blue-200",
  },
  {
    dot: "bg-gradient-to-br from-green-400 to-green-600",
    accent: "from-green-400 to-green-600",
    bg: "from-green-50 to-green-100",
    glow: "shadow-green-200",
  },
  {
    dot: "bg-gradient-to-br from-purple-400 to-purple-600",
    accent: "from-purple-400 to-purple-600",
    bg: "from-purple-50 to-purple-100",
    glow: "shadow-purple-200",
  },
  {
    dot: "bg-gradient-to-br from-orange-400 to-orange-600",
    accent: "from-orange-400 to-orange-600",
    bg: "from-orange-50 to-orange-100",
    glow: "shadow-orange-200",
  },
];

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  colorScheme: (typeof timelineColors)[0];
  IconComponent: any;
  onClick: () => void;
  isMobile?: boolean;
}

function TimelineNode({
  event,
  index,
  colorScheme,
  IconComponent,
  onClick,
  isMobile = false,
}: TimelineNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? -20 : 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <motion.div
        whileHover={{
          scale: isMobile ? 1.02 : 1.05,
          y: isMobile ? -4 : -8,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`
          relative bg-white/95 backdrop-blur-md border border-white/50 shadow-xl 
          rounded-2xl cursor-pointer group transition-all duration-500
          hover:shadow-2xl hover:border-white/70 w-full
          ${isMobile ? "p-4" : "p-6 max-w-md"}
        `}
      >
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <motion.div
              className={`w-12 h-12 ${colorScheme.dot} rounded-xl flex items-center justify-center ${colorScheme.glow} shadow-lg flex-shrink-0`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              {/* Title */}
              <h3 className="font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {event.description}
              </p>

              {/* Location */}
              {event.location && (
                <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full w-fit">
                  <MapPin className="w-3 h-3 mr-1" />
                  {event.location}
                </div>
              )}

              {/* Learn More Indicator */}
              <motion.div
                className="flex items-center text-xs text-blue-600 font-medium pt-1 opacity-70 group-active:opacity-100 transition-opacity"
                animate={{ y: [0, -1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Tap to learn more</span>
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <>
            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className={`w-14 h-14 ${colorScheme.dot} rounded-2xl flex items-center justify-center ${colorScheme.glow} shadow-lg`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <IconComponent className="w-7 h-7 text-white" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="text-center space-y-3">
              {/* Title */}
              <h3 className="font-bold text-gray-800 leading-tight text-lg group-hover:text-gray-900 transition-colors">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {event.description}
              </p>

              {/* Location */}
              {event.location && (
                <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full w-fit mx-auto">
                  <MapPin className="w-3 h-3 mr-1" />
                  {event.location}
                </div>
              )}

              {/* Learn More Indicator */}
              <motion.div
                className="flex items-center justify-center text-xs text-blue-600 font-medium pt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Click to learn more</span>
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </>
        )}

        {/* Hover glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${colorScheme.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
        />
      </motion.div>
    </motion.div>
  );
}

function TimelineItem({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const IconComponent = event.icon;
  const colorScheme = timelineColors[index % timelineColors.length];
  const isEven = index % 2 === 0;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          type: "spring",
          stiffness: 100,
        }}
        className="relative flex items-center w-full"
      >
        {/* Desktop Layout - Staggered Left/Right */}
        <div className="hidden lg:flex items-center w-full">
          {/* Left Side Content (Even indices: 0, 2, 4...) */}
          <div className="w-5/12 pr-12 flex justify-end">
            {isEven && (
              <TimelineNode
                event={event}
                index={index}
                colorScheme={colorScheme}
                IconComponent={IconComponent}
                onClick={() => setIsModalOpen(true)}
              />
            )}
          </div>

          {/* Center Timeline */}
          <div className="w-2/12 flex flex-col items-center">
            {/* Date Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
              className="mb-6 px-4 py-2 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-full shadow-lg"
            >
              <span className="text-sm font-bold text-gray-700">
                {event.date}
              </span>
            </motion.div>

            {/* Timeline Dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15 + 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className={`relative w-6 h-6 ${colorScheme.dot} rounded-full border-4 border-white shadow-xl z-10`}
            >
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className={`absolute inset-0 ${colorScheme.dot} rounded-full`}
              />
            </motion.div>

            {/* Timeline Line */}
            {index < timelineEvents.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                className={`mt-6 w-1 h-32 bg-gradient-to-b ${colorScheme.accent} origin-top rounded-full relative overflow-hidden`}
              >
                {/* Flowing animation */}
                <motion.div
                  animate={{ y: [-40, 140] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute w-2 h-8 bg-white/40 rounded-full -left-0.5 blur-sm"
                />
              </motion.div>
            )}
          </div>

          {/* Right Side Content (Odd indices: 1, 3, 5...) */}
          <div className="w-5/12 pl-12 flex justify-start">
            {!isEven && (
              <TimelineNode
                event={event}
                index={index}
                colorScheme={colorScheme}
                IconComponent={IconComponent}
                onClick={() => setIsModalOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile Layout - Single Column */}
        <div className="lg:hidden w-full flex items-start space-x-3">
          {/* Mobile Timeline */}
          <div className="flex flex-col items-center pt-4 flex-shrink-0">
            {/* Timeline Dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className={`relative w-4 h-4 ${colorScheme.dot} rounded-full border-2 border-white shadow-lg z-10`}
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className={`absolute inset-0 ${colorScheme.dot} rounded-full`}
              />
            </motion.div>

            {/* Timeline Line */}
            {index < timelineEvents.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                className={`w-0.5 h-16 bg-gradient-to-b ${colorScheme.accent} origin-top mt-3 rounded-full`}
              />
            )}
          </div>

          {/* Mobile Content */}
          <div className="flex-1 min-w-0">
            {/* Date */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
              className="mb-3 px-3 py-1 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-full w-fit shadow-sm"
            >
              <span className="text-xs font-bold text-gray-600">
                {event.date}
              </span>
            </motion.div>

            <TimelineNode
              event={event}
              index={index}
              colorScheme={colorScheme}
              IconComponent={IconComponent}
              onClick={() => setIsModalOpen(true)}
              isMobile
            />
          </div>
        </div>
      </motion.div>

      {/* Enhanced Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`w-12 h-12 ${colorScheme.dot} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl">{event.title}</DialogTitle>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-sm text-gray-600 font-medium">
                    {event.date}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          {event.image && (
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-lg">
              {event.detailedDescription}
            </p>

            {event.location && (
              <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">{event.location}</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      id="timeline"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      ref={containerRef}
    >
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-50/30 via-blue-50/20 to-cyan-50/30" />

        {/* Elegant floating elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
            className={`absolute w-20 h-20 bg-gradient-to-br ${
              timelineColors[i % timelineColors.length].bg
            } rounded-full blur-2xl opacity-30`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 shadow-lg"
          >
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-700">Life's Journey</span>
          </motion.div>

          <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Arthur's Timeline
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the beautiful moments that define Arthur's incredible
            journey through life.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16 lg:space-y-24">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Timeline End */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-24"
        >
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
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
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
