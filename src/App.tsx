import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Map } from './components/Map';
import { PhotoGallery } from './components/PhotoGallery';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Timeline />
      <Map />
      <PhotoGallery />
      <Footer />
    </div>
  );
}