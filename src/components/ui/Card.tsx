import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hover = true 
}) => {
  const hoverStyles = hover 
    ? 'hover:shadow-lg hover:-translate-y-1' 
    : '';
  
  return (
    <motion.div
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${hoverStyles} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;