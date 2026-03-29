import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium mb-1.5 text-[var(--foreground)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--card)] text-[var(--foreground)] border-2 transition-all duration-200 placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-[var(--destructive)] focus:border-[var(--destructive)]'
              : 'border-[var(--border)] focus:border-[var(--primary)] hover:border-[var(--primary)]/50'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-[var(--destructive)] font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
