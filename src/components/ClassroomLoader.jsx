const RowLoader = () => {
  return (
    <div className="pb-2 flex justify-between items-center gap-12 w-full">
      <div>
        <div className="h-2 rounded-full bg-gray-400 w-28 mb-3"></div>
        <div className="h-2 rounded-full bg-gray-400 w-96"></div>
      </div>
      <div>
        <div className="p-1 flex gap-2">
          <div className="w-28 h-10 bg-gray-400 rounded-md"></div>
          <div className="w-28 h-10 bg-gray-400 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export const ClassroomLoader = () => {
  return (
    <div role="status" className="animate-pulse mt-4">
      <div className="h-3 rounded-full bg-gray-400 w-32 mb-6"></div>
      <div className="w-full flex justify-center mb-12">
        <div className="p-1 flex gap-2 border-2 border-gray-400 rounded-lg">
          <div className="w-40 h-10 bg-gray-400 rounded-md"></div>
          <div className="w-40 h-10 bg-gray-400 rounded-md"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <RowLoader />
        <RowLoader />
        <RowLoader />
        <RowLoader />
        <RowLoader />
        <RowLoader />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
