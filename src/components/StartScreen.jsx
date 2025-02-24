import React from 'react';

export const StartScreen = ({ onStart, finalScore }) => {
  return (
    <div 
      onClick={onStart}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white z-10 
                 text-center border-2 border-blue-400 p-8 w-[90%] md:w-1/2 cursor-pointer 
                 shadow-[0_0_30px_rgba(37,99,235,0.5)] rounded-xl backdrop-blur-sm"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-400">
        SPEED RACER
      </h1>
      <div className="space-y-4">
        {finalScore > 0 ? (
          <>
            <div className="text-2xl font-bold text-red-300">Game Over!</div>
            <div className="text-xl">
              Final Score: <span className="text-yellow-300">{finalScore}</span>
            </div>
            <div className="mt-4 text-blue-200">Tap to restart</div>
          </>
        ) : (
          <>
            <div className="text-xl text-blue-200">Ready to race?</div>
            <div className="text-lg text-gray-300">
              Avoid other cars and survive as long as possible!
            </div>
            <div className="mt-4 text-sm text-gray-400">
              {window.innerWidth <= 768 ? 
                "Use on-screen controls to play" : 
                "Use arrow keys to control your car"}
            </div>
            <div className="mt-6 text-yellow-300 animate-pulse">
              Tap to Start!
            </div>
          </>
        )}
      </div>
    </div>
  );
};