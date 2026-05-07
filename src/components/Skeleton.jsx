export function SkeletonCard() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-4 bg-earthy-light rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-earthy-light rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-earthy-light rounded w-1/3"></div>
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-earthy-light rounded"></div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-4 bg-earthy-light rounded w-1/3 mb-6"></div>
      <div className="h-64 bg-earthy-light rounded"></div>
    </div>
  )
}

export function SkeletonText() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 bg-earthy-light rounded w-full"></div>
      <div className="h-4 bg-earthy-light rounded w-5/6"></div>
      <div className="h-4 bg-earthy-light rounded w-4/5"></div>
    </div>
  )
}
