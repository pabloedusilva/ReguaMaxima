import { InputHTMLAttributes, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@/components/icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  optional?: boolean;
}

export const Input = ({ 
  label, 
  error, 
  optional, 
  className = '',
  type,
  ...props 
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <label className="grid gap-1.5">
      <span className="text-text text-[0.9rem]">
        {label}{' '}
        {!optional && (
          <em className="text-gold not-italic text-[0.85em]">*</em>
        )}
        {optional && (
          <small className="text-muted text-[0.65rem] font-medium tracking-wide">
            (opcional)
          </small>
        )}
      </span>
      <div className="relative">
        <input
          type={inputType}
          className={`w-full bg-[#131313] border ${
            error 
              ? 'border-[#d84e4e] shadow-[0_0_0_1px_rgba(216,78,78,0.35)]' 
              : 'border-border'
          } text-text px-3 py-2.5 rounded-xl font-sans transition-all duration-200 focus:outline-none focus:border-gold/60 focus:shadow-[0_0_0_1px_rgba(201,149,59,0.35)] ${isPassword ? 'pr-11' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-gold transition-colors duration-200 p-1"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </label>
  );
};
