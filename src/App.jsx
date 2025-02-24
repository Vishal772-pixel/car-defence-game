import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Car } from './components/Car';
import { EnemyCar } from './components/EnemyCar';
import { RoadLine } from './components/RoadLine';
import { Score } from './components/Score';
import { StartScreen } from './components/StartScreen';
import { MobileControls } from './components/MobileControls';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState({ x: 175, y: 500 });
  const [enemyCars, setEnemyCars] = useState([]);
  const [roadLines, setRoadLines] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const gameAreaRef = useRef(null);
  const baseSpeed = 5;
  const [currentSpeed, setCurrentSpeed] = useState(baseSpeed);
  const animationFrameRef = useRef();
  const keysRef = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Level and speed management
  useEffect(() => {
    const newLevel = Math.floor(score / 500) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      setCurrentSpeed(baseSpeed + (newLevel - 1) * 0.5);
    }
  }, [score, level, baseSpeed]);

  const handleKeyDown = useCallback((e) => {
    if (Object.keys(keysRef.current).includes(e.key)) {
      e.preventDefault();
      keysRef.current[e.key] = true;
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    if (Object.keys(keysRef.current).includes(e.key)) {
      e.preventDefault();
      keysRef.current[e.key] = false;
    }
  }, []);

  const handleMobileControl = useCallback((direction, isPressed) => {
    keysRef.current[`Arrow${direction}`] = isPressed;
  }, []);

  const isColliding = useCallback((rect1, rect2) => {
    return !(
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    );
  }, []);

  const checkCollision = useCallback(() => {
    if (!gameAreaRef.current) return false;
    
    const playerElement = gameAreaRef.current.querySelector('.player-car');
    const enemyElements = gameAreaRef.current.querySelectorAll('.enemy-car');
    
    if (!playerElement) return false;
    
    const playerRect = playerElement.getBoundingClientRect();
    
    for (const enemy of enemyElements) {
      const enemyRect = enemy.getBoundingClientRect();
      if (isColliding(playerRect, enemyRect)) {
        return true;
      }
    }
    
    return false;
  }, [isColliding]);

  const gameLoop = useCallback(() => {
    if (!gameStarted) return;

    setPlayerPosition(prev => {
      const newPos = { ...prev };
      if (keysRef.current.ArrowUp) newPos.y -= currentSpeed;
      if (keysRef.current.ArrowDown) newPos.y += currentSpeed;
      if (keysRef.current.ArrowLeft) newPos.x -= currentSpeed;
      if (keysRef.current.ArrowRight) newPos.x += currentSpeed;

      newPos.x = Math.max(0, Math.min(newPos.x, 350));
      newPos.y = Math.max(100, Math.min(newPos.y, 550));
      return newPos;
    });

    setEnemyCars(prev => 
      prev.map(car => ({
        ...car,
        y: car.y >= 750 ? -300 : car.y + currentSpeed
      }))
    );

    setRoadLines(prev =>
      prev.map(line => ({
        ...line,
        y: line.y >= 650 ? -90 : line.y + currentSpeed
      }))
    );

    setScore(prev => prev + 1);

    if (checkCollision()) {
      setGameStarted(false);
      return;
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, currentSpeed, checkCollision]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(0);
    setLevel(1);
    setCurrentSpeed(baseSpeed);
    setPlayerPosition({ x: 175, y: 500 });
    
    const numberOfEnemyCars = 5; // Increased number of enemy cars
    setEnemyCars(
      Array.from({ length: numberOfEnemyCars }, (_, i) => ({
        id: i,
        x: Math.floor(Math.random() * 350),
        y: ((i + 1) * 250) * -1 // Adjusted spacing
      }))
    );

    setRoadLines(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        y: i * 150
      }))
    );
  }, [baseSpeed]);

  useEffect(() => {
    if (gameStarted) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameLoop]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp, isMobile]);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/stars.png')] opacity-50 animate-twinkle"></div>
      <Score score={score} level={level} />
      {!gameStarted && <StartScreen onStart={startGame} finalScore={score} />}
      <div 
        ref={gameAreaRef}
        className="h-screen w-[400px] max-w-full bg-gradient-to-b from-gray-800 to-gray-900 mx-auto relative overflow-hidden border-r-[7px] border-l-[7px] border-dashed border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)]"
      >
        {gameStarted && (
          <>
            {roadLines.map(line => (
              <RoadLine key={line.id} position={line.y} />
            ))}
            <Car position={playerPosition} />
            {enemyCars.map(car => (
              <EnemyCar key={car.id} position={{ x: car.x, y: car.y }} />
            ))}
          </>
        )}
      </div>
      {isMobile && gameStarted && (
        <MobileControls onControlChange={handleMobileControl} />
      )}
    </div>
  );
}

export default App;