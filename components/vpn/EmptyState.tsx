'use client';

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border bg-card/40',
        compact ? 'gap-2 p-4' : 'gap-3 p-6',
        className,
      )}
    >
      <div
        className={cn(
          'rounded-full bg-muted flex items-center justify-center',
          compact ? 'w-9 h-9' : 'w-12 h-12',
        )}
      >
        <Icon className={cn('text-muted-foreground', compact ? 'w-4 h-4' : 'w-6 h-6')} />
      </div>
      <div className="flex flex-col gap-1">
        <p className={cn('font-semibold text-foreground', compact ? 'text-sm' : 'text-base')}>{title}</p>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground text-balance">{description}</p>
        )}
      </div>
      {action && <div className="mt-1 w-full flex justify-center">{action}</div>}
    </div>
  );
}
