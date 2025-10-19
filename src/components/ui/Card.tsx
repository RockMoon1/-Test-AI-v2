import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: string;
}

export default function Card({ children, className = '', hover = false, gradient }: CardProps) {
  const baseStyles = 'bg-white rounded-xl shadow-md overflow-hidden';
  const hoverStyles = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  const gradientStyles = gradient ? `bg-gradient-to-br ${gradient}` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
