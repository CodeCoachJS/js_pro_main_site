import { type NextComponentType } from "next";

const LoadingIcon: NextComponentType = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-24 w-24 animate-spin rounded-full bg-gradient-to-r from-red-400 via-green-400 via-indigo-500 via-orange-300 to-blue-400 to-purple-500 to-yellow-300">
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-gray-200"></div>
      </div>
    </div>
  );
};

export default LoadingIcon;
