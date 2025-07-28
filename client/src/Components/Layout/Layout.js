import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5
  };

  return (
    <div
      className="layout-container"
      style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        height: '100vh'
      }}
    >
      <div className="sidebar-container bg-light p-3 shadow" style={{ height: '100vh' }}>
        <Sidebar />
      </div>

      <div className="content-container" style={{ overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={children.key}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Layout;
