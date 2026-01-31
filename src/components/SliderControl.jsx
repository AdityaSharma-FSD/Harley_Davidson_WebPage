import React from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SliderControl = ({ items = [], current = 0, onChange, onPrev, onNext, progress = 0 }) => {
  return (
    <div className="slider-control" role="region" aria-label="Bike slider navigation">
      <button className="slider-nav-btn left" onClick={onPrev} aria-label="Previous bike">
        <FiChevronLeft size={18} />
      </button>
      <div className="slider-dots" role="tablist">
        {items.map((b, i) => (
          <motion.button
            key={b.id}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => onChange?.(i)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Go to ${b.name}`}
            role="tab"
            aria-selected={i === current}
          >
            <img src={b.image} alt={b.name} className="dot-thumb" />
            {i === current && (
              <span
                className="dot-progress"
                style={{
                  background: `conic-gradient(#ff6600 ${Math.round(progress * 360)}deg, rgba(255,255,255,0.25) 0deg)`,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
      <button className="slider-nav-btn right" onClick={onNext} aria-label="Next bike">
        <FiChevronRight size={18} />
      </button>
      <div className="slider-progress" aria-hidden="true">
        <div className="bar" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </div>
  );
};

export default SliderControl;