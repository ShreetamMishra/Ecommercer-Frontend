import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="bg-primary rounded-full w-3 h-3 animate-bounce delay-100"></div>
        <div className="bg-primary rounded-full w-3 h-3 animate-bounce delay-200"></div>
        <div className="bg-primary rounded-full w-3 h-3 animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;