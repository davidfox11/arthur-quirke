import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Timeline } from "./components/Timeline";
import { PhotoGallery } from "./components/PhotoGallery";
import { Footer } from "./components/Footer";
import React from "react";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Timeline />
      <PhotoGallery />
      <Footer />
    </div>
  );
}
