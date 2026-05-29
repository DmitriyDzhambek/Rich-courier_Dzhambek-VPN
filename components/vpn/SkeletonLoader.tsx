'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <Skeleton className="h-24 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-20 w-full rounded-2xl" />
      <Skeleton className="h-20 w-full rounded-2xl" />
    </div>
  );
}

export function StatusCardSkeleton() {
  return (
    <div className="space-y-3 px-4 mt-4">
      <Skeleton className="h-32 w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}
