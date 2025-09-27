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
    name: "London",
    country: "United Kingdom",
    coordinates: [-0.1278, 51.5074],
    visitDate: "July 2023",
    description:
      "Arthur's first international adventure! The bustling capital city amazed him with its rich history, iconic landmarks, and double-decker buses.",
    highlights: ["Big Ben", "London Eye", "Tower Bridge", "Hyde Park"],
    type: "city",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    memories:
      "Arthur was fascinated by the changing of the guard at Buckingham Palace and spent hours watching the Thames from Tower Bridge.",
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "Paris",
    country: "France",
    coordinates: [2.3522, 48.8566],
    visitDate: "August 2023",
    description:
      "The City of Light captured Arthur's imagination with its beautiful architecture, delicious pastries, and the magnificent Eiffel Tower.",
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Seine River",
      "Champs-Élysées",
    ],
    type: "city",
    image:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
    memories:
      'Arthur\'s eyes lit up when he first saw the Eiffel Tower sparkling at night. He learned to say "bonjour" and "merci".',
    color: "#ef4444",
  },
  {
    id: "3",
    name: "Swiss Alps",
    country: "Switzerland",
    coordinates: [8.2275, 46.8182],
    visitDate: "December 2023",
    description:
      "Arthur's first time seeing snow-capped mountains! The pristine alpine landscape created magical winter memories.",
    highlights: [
      "Snow activities",
      "Mountain railways",
      "Alpine villages",
      "Hot chocolate",
    ],
    type: "mountain",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    memories:
      "Building his first snowman and taking his first cable car ride up the mountains were highlights.",
    color: "#8b5cf6",
  },
  {
    id: "4",
    name: "Barcelona",
    country: "Spain",
    coordinates: [2.1734, 41.3851],
    visitDate: "March 2024",
    description:
      "The vibrant Catalan city dazzled Arthur with its unique architecture, beautiful beaches, and lively street culture.",
    highlights: ["Sagrada Familia", "Park Güell", "Beach time", "Las Ramblas"],
    type: "city",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
    memories:
      "Arthur was mesmerized by Gaudí's colorful mosaics and spent hours collecting seashells on Mediterranean beaches.",
    color: "#f97316",
  },
  {
    id: "5",
    name: "Scottish Highlands",
    country: "Scotland",
    coordinates: [-4.0, 57.0],
    visitDate: "May 2024",
    description:
      "Ancient castles, mystical lochs, and rolling green hills introduced Arthur to Scotland's breathtaking natural beauty.",
    highlights: [
      "Loch Ness",
      "Edinburgh Castle",
      "Highland games",
      "Bagpipe music",
    ],
    type: "nature",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
    memories:
      "Arthur loved searching for the Loch Ness Monster and was thrilled to hear bagpipe music echoing through the valleys.",
    color: "#10b981",
  },
  {
    id: "6",
    name: "Rome",
    country: "Italy",
    coordinates: [12.4964, 41.9028],
    visitDate: "September 2024",
    description:
      "The Eternal City transported Arthur back in time with its ancient ruins, stunning art, and authentic Italian culture.",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Gelato shops"],
    type: "historical",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197047daf1?w=800&h=600&fit=crop",
    memories:
      "Throwing a coin in the Trevi Fountain and making a wish was magical. His favorite discovery was the many flavors of gelato!",
    color: "#f59e0b",
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

        {/* Location label on hover */}
        <motion.g
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: -15 }}
          transition={{ duration: 0.2 }}
        >
          <rect
            x={-25}
            y={-35}
            width={50}
            height={20}
            rx={8}
            fill="rgba(0, 0, 0, 0.8)"
            className="drop-shadow-lg"
          />
          <text
            textAnchor="middle"
            y={-22}
            className="fill-white text-xs font-medium"
            style={{ fontSize: "10px" }}
          >
            {location.name}
          </text>
        </motion.g>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 shadow-lg"
          >
            <Plane className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-700">World Explorer</span>
          </motion.div>

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

        {/* Travel Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl mb-8 text-center text-gray-800">
            Journey Timeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedLocation(location)}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 cursor-pointer group"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: location.color }}
                  >
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {location.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {location.visitDate}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {location.description}
                </p>
                <div className="flex items-center mt-3 space-x-2">
                  <img src={artIcon} alt="Art" className="w-4 h-4" />
                  <span className="text-xs text-gray-500 capitalize">
                    {location.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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
                    className="w-full h-64 object-cover"
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
