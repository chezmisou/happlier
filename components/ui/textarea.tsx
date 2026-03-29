import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          id={id}
          rows={5}
          className={`w-full px-4 py-3 rounded-xl text-sm resize-none bg-[var(--card)] text-[var(--foreground)] border-2 transition-all duration-200 placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed ${
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

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
