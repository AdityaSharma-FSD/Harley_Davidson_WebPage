import React from "react";
import { motion } from "framer-motion";
import { FiInstagram, FiYoutube, FiTwitter } from "react-icons/fi";
import bikes from "../data/bikes";
import "./Footer.css";

const Footer = () => {
  const featured = bikes.slice(0, 4);
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-inner">
        <div className="col brand">
          <img src="/images/logo.png" alt="Harley-Davidson" className="brand-logo" />
          <p>
            Harley‑Davidson builds legendary motorcycles that blend power,
            craftsmanship, and heritage. Explore our latest models and ride bold.
          </p>
          <div className="socials">
            <a href="#" aria-label="Instagram"><FiInstagram size={20} /></a>
            <a href="#" aria-label="YouTube"><FiYoutube size={20} /></a>
            <a href="#" aria-label="X"><FiTwitter size={20} /></a>
          </div>
        </div>

        <div className="col links">
          <h4>Explore</h4>
          <ul>
            <li>Motorcycles</li>
            <li>Find a Dealer</li>
            <li>Test Ride</li>
            <li>Events</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div className="col models">
          <h4>Featured Models</h4>
          <ul>
            {featured.map((b) => (
              <li key={b.id}>
                <img src={b.image} alt={b.name} />
                <span>{b.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Harley‑Davidson. All rights reserved.</p>
        <p>Trademarks shown are property of their respective owners.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;