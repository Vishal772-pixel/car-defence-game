import React from 'react';

export const Score = ({ score, level }) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 flex gap-4">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-[120px] h-[50px] text-center text-xl text-white font-bold shadow-lg rounded-lg z-10 flex items-center justify-center border border-purple-400">
        Score: {score}
      </div>
      <div className="bg-gradient-to-r from-yellow-600 to-red-600 w-[120px] h-[50px] text-center text-xl text-white font-bold shadow-lg rounded-lg z-10 flex items-center justify-center border border-yellow-400">
        Level: {level}
      </div>
    </div>
  );
};