"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Calendar, Plane } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";
import artIcon from "../assets/art1.png";

import amsterdamImage from "../assets/amsterdam.jpg";
import portugalImage from "../assets/portugal.jpg";
import wicklowImage from "../assets/wicklow.jpg";
import corkImage from "../assets/xmas.jpg";

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  visitDate: string;
  description: string;
  highlights: string[];
  type: "city" | "nature" | "beach" | "mountain" | "historical";
  image: string;
  memories: string;
  color: string;
}

const locations: Location[] = [
  {
    id: "1",
    name: "Dublin",
    country: "Ireland",
    coordinates: [-6.2603, 53.3498],
    visitDate: "September 2024",
    description:
      "Arthur's story begins! The vibrant city where he was born and spent his early days.",
    highlights: ["Merrion Square", "First Home", "Family Time"],
    type: "city",
    image: wicklowImage,
    memories:
      "From his first moments in Merrion Square to settling into his first home, Dublin is where it all started.",
    color: "#10b981",
  },
  {
    id: "2",
    name: "Cork",
    country: "Ireland",
    coordinates: [-8.4729, 51.8969],
    visitDate: "October 2024",
    description:
      "Arthur's first trip to visit family, exploring the beautiful coastline and charming towns.",
    highlights: ["Myrtleville", "Glandore", "First Christmas", "First Swim"],
    type: "nature",
    image: corkImage,
    memories:
      "Many happy memories were made visiting grandparents, including a very memorable first dip in the sea!",
    color: "#3b82f6",
  },
  {
    id: "3",
    name: "Amsterdam",
    country: "Netherlands",
    coordinates: [4.895168, 52.370216],
    visitDate: "January 2025",
    description:
      "Arthur's first international adventure, jetting off to the picturesque city of canals.",
    highlights: ["First Flight", "Visiting Aunt Louise", "Canal Views"],
    type: "city",
    image: amsterdamImage,
    memories:
      "The excitement of his first plane ride to visit his aunt Louise was a milestone to remember.",
    color: "#f97316",
  },
  {
    id: "4",
    name: "Faro",
    country: "Portugal",
    coordinates: [-7.9304, 37.0194],
    visitDate: "March 2025",
    description:
      "A sunny getaway and the perfect place to celebrate a first birthday in style.",
    highlights: ["Sun Holiday", "First Birthday Party", "Beach Time"],
    type: "beach",
    image: portugalImage,
    memories:
      "Arthur celebrated his first trip around the sun with family on the beautiful beaches of Portugal.",
    color: "#ef4444",
  },
];

const typeColors = {
  city: {
    bg: "from-blue-400 to-blue-600",
    glow: "shadow-blue-200",
    border: "border-blue-300",
  },
  nature: {
    bg: "from-green-400 to-green-600",
    glow: "shadow-green-200",
    border: "border-green-300",
  },
  beach: {
    bg: "from-cyan-400 to-cyan-600",
    glow: "shadow-cyan-200",
    border: "border-cyan-300",
  },
  mountain: {
    bg: "from-purple-400 to-purple-600",
    glow: "shadow-purple-200",
    border: "border-purple-300",
  },
  historical: {
    bg: "from-orange-400 to-orange-600",
    glow: "shadow-orange-200",
    border: "border-orange-300",
  },
};

// World map topology URL (Natural Earth data)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface LocationMarkerProps {
  location: Location;
  onClick: () => void;
  index: number;
}

function LocationMarker({ location, onClick, index }: LocationMarkerProps) {
  return (
    <Marker key={location.id} coordinates={location.coordinates}>
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.2,
          type: "spring",
          stiffness: 150,
        }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="cursor-pointer"
      >
        {/* Pulsing ring animation */}
        <motion.circle
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.4,
            ease: "easeOut",
          }}
          r={8}
          fill={location.color}
          opacity={0.4}
        />

        {/* Main pin circle */}
        <circle
          r={6}
          fill={location.color}
          stroke="#ffffff"
          strokeWidth={2}
          className="drop-shadow-lg"
        />

        {/* Icon */}
        <foreignObject x={-5} y={-5} width={10} height={10}>
          <div className="flex items-center justify-center w-full h-full">
            <img src={artIcon} alt="Art" className="w-3 h-3" />
          </div>
        </foreignObject>
      </motion.g>
    </Marker>
  );
}

export function Map() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="map"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-blue-50/60 to-cyan-50/40" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-50/30 via-blue-50/20 to-teal-50/30" />

        {/* Floating elements */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: i * 5,
              ease: "easeInOut",
            }}
            className="absolute w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-xl opacity-30"
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + (i % 2) * 40}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Arthur's Adventures
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore the incredible places Arthur has visited around the world.
            Each pin tells a story of discovery, wonder, and unforgettable
            memories.
          </p>
        </motion.div>

        {/* World Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 1, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative w-full aspect-[2/1] rounded-3xl shadow-2xl overflow-hidden border border-white/50 bg-gradient-to-br from-blue-50 to-indigo-100">
            {isInView && (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  center: [10, 50], // Center on Europe
                  scale: 180,
                }}
                className="w-full h-full"
              >
                <ZoomableGroup zoom={1} center={[10, 50]}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#10b981"
                          stroke="#047857"
                          strokeWidth={0.5}
                          style={{
                            default: {
                              fill: "#10b981",
                              stroke: "#047857",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                            hover: {
                              fill: "#059669",
                              stroke: "#047857",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                            pressed: {
                              fill: "#047857",
                              stroke: "#047857",
                              strokeWidth: 0.5,
                              outline: "none",
                            },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {/* Travel route lines */}
                  {locations.slice(0, -1).map((location, index) => {
                    const nextLocation = locations[index + 1];
                    return (
                      <motion.g key={`route-${index}`}>
                        <Line
                          from={location.coordinates}
                          to={nextLocation.coordinates}
                          stroke="rgba(59, 130, 246, 0.6)"
                          strokeWidth={2}
                          strokeDasharray="5,5"
                          strokeLinecap="round"
                          style={{
                            animation: `dash 20s linear infinite`,
                          }}
                        />
                      </motion.g>
                    );
                  })}

                  {/* Location markers */}
                  {locations.map((location, index) => (
                    <LocationMarker
                      key={location.id}
                      location={location}
                      onClick={() => setSelectedLocation(location)}
                      index={index}
                    />
                  ))}
                </ZoomableGroup>
              </ComposableMap>
            )}
          </div>

          {/* Map Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border">
              Click on any pin to explore Arthur's adventures
            </span>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
        >
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-blue-600">
              {locations.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Places Visited</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-green-600">
              {new Set(locations.map((l) => l.country)).size}
            </div>
            <div className="text-sm text-gray-600 mt-1">Countries</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-purple-600">1</div>
            <div className="text-sm text-gray-600 mt-1">Continent</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-2xl font-bold text-orange-600">∞</div>
            <div className="text-sm text-gray-600 mt-1">Memories</div>
          </div>
        </motion.div>
      </div>

      {/* Location Modal */}
      <Dialog
        open={!!selectedLocation}
        onOpenChange={() => setSelectedLocation(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedLocation && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      typeColors[selectedLocation.type].bg
                    } rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <img src={artIcon} alt="Art" className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">
                      {selectedLocation.name}
                    </DialogTitle>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-gray-600">
                        {selectedLocation.country}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {selectedLocation.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Visit Date */}
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">
                    Visited in {selectedLocation.visitDate}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800">About the Visit</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedLocation.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Memories */}
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800">Special Memories</h4>
                  <p className="text-gray-700 leading-relaxed italic bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    "{selectedLocation.memories}"
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </section>
  );
}
