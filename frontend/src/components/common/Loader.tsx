/**
 * Definition of the Loader Component
 * Goes off after DOMContentLoaded
 * Currently mimicking with 2 seconds delay
 * @returns
 */
const Loader = () => {
  return (
    <div className="w-full">
      <div className="relative w-[60%] mx-auto h-3 bg-gray-200 rounded-lg overflow-hidden max-width-[500px] mt-4">
        <div className="h-full animate-loading bg-gradient-to-r from-primary-blue to-secondary-blue"></div>
      </div>
      <p className="text-xs sm:text-base my-2 text-center">
        Loading Game Resources...
      </p>
    </div>
  );
};

export default Loader;
