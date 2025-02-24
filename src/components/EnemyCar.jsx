import React from 'react';

export const EnemyCar = ({ position }) => {
  return (
    <div
      className="enemy-car absolute w-[50px] h-[100px] rounded-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <img
        src="./car.png"
        alt="Enemy Car"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};
