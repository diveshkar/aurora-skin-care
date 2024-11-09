import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Title Section */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Welcome to Aurora Skin Care
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
