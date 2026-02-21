import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const Button = ({ 
  children, 
  variant = 'primary',
  fullWidth = false,
  icon,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-semibold text-[0.95rem] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gold text-bg hover:bg-gold/90 shadow-lg hover:shadow-xl',
    secondary: 'bg-surface text-text hover:bg-[#242424] border border-border',
    outline: 'bg-transparent border border-gold/60 text-gold hover:bg-gold hover:text-bg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
