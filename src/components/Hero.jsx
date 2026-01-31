import React, { useState, useEffect } from "react";
import "./Hero.css";
import Navbar from "./Navbar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import bikesData from "../data/bikes";
import SliderControl from "./SliderControl";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const formatINR = (p) => `₹ ${Number(p).toLocaleString('en-IN')}`;
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);

  const nextBike = () => {
    setCurrent((prev) => (prev + 1) % bikesData.length);
  };

  const prevBike = () => {
    setCurrent((prev) => (prev - 1 + bikesData.length) % bikesData.length);
  };

  // Autoplay with progress
  useEffect(() => {
    if (hovering || showDetails || showBuy) return; // pause when interacting
    const interval = setInterval(() => {
      setProgress((p) => {
        const np = p + 0.02; // ~5s per slide
        if (np >= 1) {
          setCurrent((prev) => (prev + 1) % bikesData.length);
          return 0;
        }
        return np;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [hovering, showDetails, showBuy]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prevBike();
      if (e.key === "ArrowRight") nextBike();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <motion.div
      className="hero"
      animate={{
        background: `
          radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%),
          linear-gradient(to right, ${bikesData[current].color}, ${bikesData[current].color})
        `,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Navbar />
      <div className="hero-content">
        <div className="hero-text">
  <AnimatePresence mode="wait">
    <motion.div
      key={current}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <h1>{bikesData[current].name}</h1>
      <p className="tagline">{bikesData[current].tagline}</p>
      <p className="description">{bikesData[current].description}</p>
    </motion.div>
  </AnimatePresence>
</div>


        <div className="hero-bike">
          <div className="bike-wrapper">
            <img src="/images/circle.png" alt="Circle" className="circle" />

            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={bikesData[current].image}
                alt={`Harley ${current + 1}`}
                className="bike"
                style={bikesData[current].style} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.02, rotate: -0.5, x: 8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* Removed in-hero arrows to avoid duplicate controls */}
        </div>

        <div className="hero-cta">
          <button className="btn buy" onClick={() => setShowBuy(true)}>Buy Now</button>
          <span className="badge-soon">Coming Soon</span>
          <button className="btn details" onClick={() => setShowDetails(true)}>View Details</button>
        </div>

        {/* Bottom slider control */}
        <SliderControl
          items={bikesData}
          current={current}
          onChange={setCurrent}
          onPrev={prevBike}
          onNext={nextBike}
          progress={progress}
        />

        {/* Details Modal */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                className="modal"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>{bikesData[current].name}</h3>
                  <button className="close" onClick={() => setShowDetails(false)}>×</button>
                </div>
                <div className="modal-body">
                  <img src={bikesData[current].image} alt={bikesData[current].name} />
                  <div className="specs">
                    <p><strong>Tagline:</strong> {bikesData[current].tagline}</p>
                    <p><strong>Price:</strong> {formatINR(bikesData[current].price)}</p>
                    <p><strong>Engine:</strong> {bikesData[current].specs.engine}</p>
                    <p><strong>Torque:</strong> {bikesData[current].specs.torque}</p>
                    <p><strong>Weight:</strong> {bikesData[current].specs.weight}</p>
                    <p className="desc">{bikesData[current].description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buy Now Modal */}
        <AnimatePresence>
          {showBuy && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBuy(false)}
            >
              <motion.div
                className="modal"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>Buy Now</h3>
                  <button className="close" onClick={() => setShowBuy(false)}>×</button>
                </div>
                <div className="modal-body buy-body">
                  <p className="coming-soon">Coming Soon</p>
                  <p>
                    {bikesData[current].name} will be available shortly.
                    Expected price: <strong>{formatINR(bikesData[current].price)}</strong>
                  </p>
                  <button className="btn buy" disabled>Notify Me</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Hero;
