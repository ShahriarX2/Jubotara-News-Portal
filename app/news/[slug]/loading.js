import Container from "@/components/common/Container";
import { Skeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#eff3f6] pb-16 md:pb-0">
      <main className="py-2">
        <Container className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Main Article Skeleton */}
          <article className="lg:col-span-9 bg-white p-3 md:p-6 border border-slate-300">
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="skeleton-shimmer h-8 w-24 rounded" />

              {/* Title */}
              <div className="skeleton-shimmer h-10 w-full rounded" />
              <div className="skeleton-shimmer h-10 w-3/4 rounded" />

              {/* Author & Date Row */}
              <div className="flex items-center justify-between border-y border-gray-100 py-3">
                <div className="flex items-center gap-3">
                  <div className="skeleton-shimmer h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <div className="skeleton-shimmer h-5 w-32 rounded" />
                    <div className="skeleton-shimmer h-4 w-48 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="skeleton-shimmer h-10 w-10 rounded" />
                  <div className="skeleton-shimmer h-10 w-10 rounded" />
                  <div className="skeleton-shimmer h-10 w-10 rounded" />
                </div>
              </div>

              {/* Featured Image */}
              <div className="skeleton-shimmer h-[300px] md:h-[500px] w-full rounded-lg" />

              {/* Article Content Skeleton */}
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="skeleton-shimmer h-4 w-full rounded" />
                ))}
                <div className="skeleton-shimmer h-4 w-2/3 rounded" />
              </div>

              {/* Tags */}
              <div className="flex gap-2 pt-4">
                <div className="skeleton-shimmer h-8 w-20 rounded-full" />
                <div className="skeleton-shimmer h-8 w-24 rounded-full" />
                <div className="skeleton-shimmer h-8 w-16 rounded-full" />
              </div>
            </div>

            {/* Social Links Section */}
            <div className="mt-10 pt-10 border-t border-slate-300">
              <div className="skeleton-shimmer h-8 w-64 rounded mb-6" />
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="skeleton-shimmer h-24 w-full md:w-1/2 rounded-xl" />
                <div className="skeleton-shimmer h-24 w-full md:w-1/2 rounded-xl" />
              </div>
            </div>
          </article>

          {/* Sidebar Skeleton */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="skeleton-shimmer h-32 w-full rounded" />
            <div className="bg-white p-3 md:p-6 border border-slate-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="skeleton-shimmer w-2 h-6 rounded" />
                <div className="skeleton-shimmer h-8 w-32 rounded" />
              </div>
              <div className="space-y-4">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="skeleton-shimmer h-16 w-20 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton-shimmer h-4 w-full rounded" />
                      <div className="skeleton-shimmer h-3 w-3/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </Container>
      </main>

      {/* Related News Section */}
      <div className="mt-4">
        <Container>
          <div className="bg-white p-4 md:p-6 border border-slate-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="skeleton-shimmer w-2 h-8 rounded" />
              <div className="skeleton-shimmer h-8 w-32 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="skeleton-shimmer h-40 w-full rounded-lg" />
                  <div className="skeleton-shimmer h-5 w-full rounded" />
                  <div className="skeleton-shimmer h-4 w-2/3 rounded" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}