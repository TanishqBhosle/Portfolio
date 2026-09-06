import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  wordMode = false,
}) => {
  if (wordMode) {
    const words = text.split(' ');
    return (
      <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.05,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  const characters = Array.from(text);
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: '0%' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.02,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
