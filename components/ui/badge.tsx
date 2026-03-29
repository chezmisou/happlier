import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-violet-50 text-violet-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  destructive: 'bg-red-50 text-red-700',
  outline: 'border border-gray-200 text-gray-500',
};

export function Badge({
  variant = 'default',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
