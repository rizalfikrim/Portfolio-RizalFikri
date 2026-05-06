import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GlowButton = ({
  children,
  variant = 'primary',
  onClick,
  href,
  size = 'md',
  className = ''
}: GlowButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-bg shadow-lg glow-primary',
    secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-bg',
    ghost: 'text-primary hover:bg-primary/10'
  };

  const buttonClasses = `
    font-display font-bold rounded-lg transition-all duration-300
    hover:scale-105 active:scale-95
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};