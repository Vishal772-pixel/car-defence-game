import React from 'react';

export const Car = ({ position }) => {
  return (
    <div
      className="player-car absolute w-[50px] h-[120px] rounded-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <img
        src="./public/assets/car2.jpg"
        alt="Enemy Car"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};
