import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StickyBottomBar } from './components/layout/StickyBottomBar';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Partnership } from './pages/Partnership';
import { Press } from './pages/Press';
import { Legal } from './pages/Legal';

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#00ff41] selection:text-black">
      <Navbar />
      
      {/* AnimatePresence enables page transition animations */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
        </Routes>
      </AnimatePresence>

      <StickyBottomBar />
      <Footer />
    </div>
  );
};

export default App;
