import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../Animation';

const Footer = () => {
  return (
    <motion.footer className="bg-dark text-white py-4" variants={fadeIn} initial="hidden" animate="visible">
      <div className="container text-center">
        <p>© 2024 Matrimony App. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
