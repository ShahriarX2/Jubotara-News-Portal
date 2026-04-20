import Container from "@/components/common/Container";
import { Skeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#eff3f6]">
      <main className="px-2 py-6">
        <Container>
          <div className="flex flex-col gap-2 md:gap-6 lg:flex-row">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Category Title */}
              <div className="mb-4">
                <div className="skeleton-shimmer h-10 w-48 mb-4 rounded" />
                <div className="skeleton-shimmer h-1 w-full rounded" />
              </div>

              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="w-full">
                  {/* Featured News */}
                  <div className="mb-2 border-b border-gray-300 pb-2 md:mb-4 md:pb-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="md:w-1/2 space-y-4">
                        <div className="skeleton-shimmer h-12 w-full rounded" />
                        <div className="skeleton-shimmer h-24 w-full rounded" />
                      </div>
                      <div className="skeleton-shimmer md:w-1/2 h-[250px] md:h-[300px] rounded-md" />
                    </div>
                  </div>

                  {/* News Grid */}
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="flex gap-3 rounded-lg border border-gray-300 p-3 shadow-sm"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="skeleton-shimmer h-5 w-full rounded" />
                          <div className="skeleton-shimmer h-4 w-2/3 rounded" />
                        </div>
                        <div className="skeleton-shimmer h-24 w-24 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="skeleton-shimmer h-10 w-20 rounded" />
                    <div className="skeleton-shimmer h-10 w-10 rounded" />
                    <div className="skeleton-shimmer h-10 w-10 rounded" />
                    <div className="skeleton-shimmer h-10 w-10 rounded" />
                    <div className="skeleton-shimmer h-10 w-10 rounded" />
                    <div className="skeleton-shimmer h-10 w-20 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-6">
                <div className="skeleton-shimmer h-8 w-32 mb-4 rounded" />
                <div className="flex flex-col gap-4">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex gap-3 border-b border-gray-200 pb-4">
                      <div className="flex-1 space-y-2">
                        <div className="skeleton-shimmer h-5 w-full rounded" />
                        <div className="skeleton-shimmer h-4 w-2/3 rounded" />
                      </div>
                      <div className="skeleton-shimmer h-16 w-16 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}