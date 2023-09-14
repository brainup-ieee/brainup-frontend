export const SkeltonLoader = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="w-full h-60 bg-[#FFE0A4] rounded-xl px-4 flex flex-col justify-center">
        <div className="h-3 rounded-full dark:bg-gray-400 w-28 mb-4"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-[calc(100%-2rem)] mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-full mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-[calc(100%-3rem)] mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-[calc(100%-1rem)] mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-[calc(100%-1rem)] mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-[calc(100%-2rem)] mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-[calc(100%-5rem)] mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-[calc(100%-2rem)] mb-2"></div>
        <div className="h-2 rounded-full dark:bg-gray-400 w-24 mb-2"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
