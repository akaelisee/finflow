type Props = {
  rows?: number;
};

export function Loading({ rows = 5 }: Props) {
  return (
    <div className="w-full animate-pulse">
      {/* En-tête */}
      <div className="mb-5">
        <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-60 bg-gray-200 rounded" />
      </div>

      {/* 3 KPI en haut */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4">
            <div className="h-3 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-1/2 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* Lignes */}
      <div className="flex flex-col gap-1.5">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="h-11 bg-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  );
}