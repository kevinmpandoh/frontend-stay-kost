const KostCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800 p-4 space-y-4">
      <div className="h-32 bg-gray-300 rounded-lg" />
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-4 bg-gray-300 rounded w-1/4" />
    </div>
  );
};

export default KostCardSkeleton;
