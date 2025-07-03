import type { ButtonProps } from '../../types';

function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled = false,
  loading = false
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-gotham backdrop-blur-sm';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-800 text-neutral focus:ring-primary-500',
    secondary: 'bg-secondary hover:bg-secondary-800 text-neutral focus:ring-secondary-500',
    danger: 'bg-red-600/90 hover:bg-red-700 text-neutral focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && disabledClasses,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      type="button"
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button; 