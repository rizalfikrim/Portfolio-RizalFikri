interface TechBadgeProps {
  name: string;
  color?: string;
  size?: 'sm' | 'md';
}

export const TechBadge = ({ name, color, size = 'md' }: TechBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span
      className={`inline-block ${sizeClasses[size]} bg-primary/10 text-primary border border-primary/20 rounded-full font-mono`}
      style={color ? { backgroundColor: `${color}20`, borderColor: `${color}40`, color } : undefined}
    >
      {name}
    </span>
  );
};