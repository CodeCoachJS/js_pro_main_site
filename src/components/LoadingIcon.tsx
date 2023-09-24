import { type NextComponentType } from "next";

const LoadingIcon: NextComponentType = () => {
  return (
    <div className="flex h-screen justify-center">
      <div className="relative h-24 w-24 animate-spin rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="bg-card-bg bg-card-bg absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-white"></div>
      </div>
    </div>
  );
};

export default LoadingIcon;
