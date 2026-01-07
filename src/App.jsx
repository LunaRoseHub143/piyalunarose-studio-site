import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Instagram } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import DecisionGate from './components/DecisionGate';

// Pages
import Home from './pages/Home';
import Labs from './pages/Labs';
import Library from './pages/Library';
import LibraryEditor from './pages/LibraryEditor';
import Notes from './pages/Notes';
import Login from './pages/Login';

// Auth
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-stone-800 selection:bg-indigo-100 selection:text-indigo-900">

      {/* Background Decor - Global but subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0 !opacity-[0.8] !mix-blend-multiply !bg-cover !bg-[position:center_70%] !bg-no-repeat grayscale-[0.3] !contrast-[1.05] !brightness-[0.95]"
          style={{
            backgroundImage: 'url(/hero-sketch-v2.jpg)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,1) 90%)',
            maskImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,1) 90%)'
          }}
        />
        <div className="absolute inset-0 !bg-[#0f121e]/[0.15]" />
      </div>

      <Navbar scrolled={scrolled} setShowGate={setShowGate} />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home setShowGate={setShowGate} />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/library" element={<Library />} />
          <Route
            path="/library/new"
            element={
              <ProtectedRoute>
                <LibraryEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library/edit/:id"
            element={
              <ProtectedRoute>
                <LibraryEditor />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<Login />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <DecisionGate isOpen={showGate} onClose={() => setShowGate(false)} />

      {/* Global Footer */}
      <footer className="py-24 px-6 border-t border-stone-100 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-5">
            <Logo className="w-12 h-12" />
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p className="text-stone-400 text-sm font-light tracking-[0.2em] uppercase">
                © {new Date().getFullYear()} Piya LunaRose Studio
              </p>
              <p className="text-stone-300 text-[10px] font-light tracking-wide italic leading-relaxed max-w-xs">
                PiyaLunaRose Studio is a subsidiary of LunaRose Healing Hub LLC, registered in CT, USA since Oct 2025.
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <a
              href="https://www.instagram.com/piyalunarose_studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
