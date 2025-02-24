import React from 'react';

export const RoadLine = ({ position }) => {
  return (
    <div
      className="absolute w-[10px] h-[100px] bg-gradient-to-b from-yellow-400 to-yellow-500"
      style={{
        left: '190px',
        top: `${position}px`,
        boxShadow: '0 0 10px rgba(234,179,8,0.5)'
      }}
    />
  );
};