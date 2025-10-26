// components/common/skeletons/TrendingServicesSkeleton.tsx
export function TrendingServicesSkeleton() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-sm font-medium mb-4 w-32 h-6 mx-auto animate-pulse">
            <div className="w-4 h-4 bg-orange-200 rounded"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-lg w-96 max-w-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-80 max-w-full mx-auto animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
