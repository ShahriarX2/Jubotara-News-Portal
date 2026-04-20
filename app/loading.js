import Container from "@/components/common/Container";
import {
  HeroSkeleton,
  TrendingSkeleton,
  CategoryBlockSkeleton,
  SpecialCategorySkeleton,
} from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen pb-12 space-y-4">
      <Container>
        <div className="py-2 flex items-center justify-center">
          <div className="skeleton-shimmer h-8 w-full max-w-7xl rounded" />
        </div>
      </Container>

      <HeroSkeleton />

      <Container>
        <TrendingSkeleton />
      </Container>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="skeleton-shimmer h-40 w-full rounded-lg" />
              <div className="skeleton-shimmer h-5 w-3/4 rounded" />
              <div className="skeleton-shimmer h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </Container>

      <SpecialCategorySkeleton />

      <Container>
        <div className="skeleton-shimmer h-32 w-full rounded" />
      </Container>

      <SpecialCategorySkeleton />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBlockSkeleton />
          <CategoryBlockSkeleton />
        </div>
      </Container>

      <Container>
        <div className="skeleton-shimmer h-32 w-full rounded" />
      </Container>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CategoryBlockSkeleton />
          <CategoryBlockSkeleton />
          <CategoryBlockSkeleton />
        </div>
      </Container>
    </div>
  );
}