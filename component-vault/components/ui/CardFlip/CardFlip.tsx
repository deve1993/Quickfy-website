import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { CardFlipProps } from './CardFlip.types';

export const CardFlip: React.FC<CardFlipProps> = ({ front, back, className }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className={cn('relative w-full h-64 cursor-pointer', className)}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Flip card to see ${isFlipped ? 'front' : 'back'} side`}
    >
      <motion.div className="absolute inset-0" initial={false} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6 }} style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 backface-hidden">{front}</div>
        <div className="absolute inset-0 bg-blue-600 text-white rounded-xl shadow-lg p-6 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>{back}</div>
      </motion.div>
    </div>
  );
};
