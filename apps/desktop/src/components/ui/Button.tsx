import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  icon,
  variant = 'primary',
  className = '',
  onClick,
}: ButtonProps) => {
  const baseStyles =
    'flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all';
  const variantStyles =
    variant === 'primary'
      ? 'w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
      : 'bg-blue-500 hover:bg-blue-600';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
