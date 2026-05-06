import { motion } from 'framer-motion';

interface SectionTitleProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionTitle = ({ badge, title, subtitle, align = 'center' }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="inline-block px-4 py-2 bg-surface border border-primary/30 rounded-full text-primary font-mono text-sm mb-4"
      >
        {badge}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-text-muted max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};