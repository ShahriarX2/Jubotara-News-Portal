'use client';

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="skeleton-shimmer h-40 w-full rounded-lg" />
      <div className="skeleton-shimmer h-6 w-3/4 rounded" />
      <div className="skeleton-shimmer h-4 w-1/2 rounded" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
      <div className="md:col-span-4 lg:col-span-5 space-y-4">
        <div className="skeleton-shimmer h-12 w-full rounded" />
        <div className="skeleton-shimmer h-24 w-full rounded" />
        <div className="flex gap-2 pt-4">
          <div className="skeleton-shimmer h-8 w-20 rounded" />
          <div className="skeleton-shimmer h-8 w-20 rounded" />
        </div>
      </div>
      <div className="md:col-span-5 lg:col-span-5">
        <div className="skeleton-shimmer h-[250px] md:h-full w-full rounded-lg" />
      </div>
      <div className="md:col-span-3 lg:col-span-2">
        <div className="skeleton-shimmer h-full w-full rounded-lg" />
      </div>
    </div>
  );
}

export function TrendingSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-4 border-b pb-4">
          <div className="flex-1 space-y-2">
            <div className="skeleton-shimmer h-6 w-full rounded" />
            <div className="skeleton-shimmer h-4 w-3/4 rounded" />
          </div>
          <div className="skeleton-shimmer w-[120px] h-[100px] rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function CategoryBlockSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="skeleton-shimmer h-8 w-32 rounded" />
        <div className="skeleton-shimmer h-6 w-20 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="skeleton-shimmer h-60 w-full rounded-lg" />
          <div className="skeleton-shimmer h-6 w-full rounded" />
          <div className="skeleton-shimmer h-4 w-3/4 rounded" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton-shimmer w-24 h-16 rounded" />
              <div className="flex-1 space-y-2">
                <div className="skeleton-shimmer h-5 w-full rounded" />
                <div className="skeleton-shimmer h-4 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HorizontalCardSkeleton() {
  return (
    <div className="flex gap-4 py-2">
      <div className="skeleton-shimmer h-20 w-28 rounded" />
      <div className="flex-1 space-y-2">
        <div className="skeleton-shimmer h-5 w-full rounded" />
        <div className="skeleton-shimmer h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}

export function SpecialCategorySkeleton() {
  return (
    <div className="bg-white p-4 md:p-6 border border-gray-300">
      <div className="flex items-center justify-between border-b border-slate-300 pb-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="skeleton-shimmer w-1.5 h-8 rounded" />
          <div className="skeleton-shimmer h-8 w-32 rounded" />
        </div>
        <div className="skeleton-shimmer h-6 w-20 rounded" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-3">
          <div className="skeleton-shimmer h-64 w-full rounded-lg" />
          <div className="skeleton-shimmer h-6 w-full rounded" />
          <div className="skeleton-shimmer h-4 w-3/4 rounded" />
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border border-slate-300">
              <div className="flex-1 space-y-2">
                <div className="skeleton-shimmer h-5 w-full rounded" />
                <div className="skeleton-shimmer h-4 w-2/3 rounded" />
              </div>
              <div className="skeleton-shimmer w-20 h-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}