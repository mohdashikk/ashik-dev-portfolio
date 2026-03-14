import React, { useEffect, useRef, useState } from 'react';

const SnakeBackground = () => {
  const canvasRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [scoreState, setScoreState] = useState(0);
  const [isAutoPlayState, setIsAutoPlayState] = useState(true);
  const isGameOverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Configuration
    const gridSize = 20;
    const tickRate = 110; // slightly slower for better visibility
    let lastTick = 0;

    let snake = [{ x: 5, y: 5 }];
    let food = { x: 15, y: 15 };
    let obstacles = [];
    let direction = { x: 1, y: 0 };
    let isAutoPlay = true;
    let nextUserDir = { x: 1, y: 0 };
    let moveQueue = [];
    let score = 0;

    // Sync state for UI
    setIsAutoPlayState(isAutoPlay);
    setScoreState(score);

    const handleKeyDown = (e) => {
      const keys = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };

      if (keys[e.key]) {
        if (e.key.startsWith('Arrow')) e.preventDefault();
        
        const newDir = keys[e.key];
        // Queue the move to handle rapid inputs safely
        if (moveQueue.length < 3) {
          const lastQueued = moveQueue.length > 0 ? moveQueue[moveQueue.length - 1] : direction;
          if (newDir.x !== -lastQueued.x || newDir.y !== -lastQueued.y) {
            moveQueue.push(newDir);
          }
        }

        if (isAutoPlay) {
          isAutoPlay = false;
          setIsAutoPlayState(false);
          score = 0; // Reset score when user starts playing
          setScoreState(0);
          // When starting, immediately move in the new direction
          moveQueue = [newDir];
          direction = newDir;
        }
        if (isGameOverRef.current) return; // Prevent input if game over
      }
    };

    const updateObstacles = () => {
      if (!canvas) return;
      // Use the canvas's own bounding rect for the most accurate local coordinate mapping
      const canvasRect = canvas.getBoundingClientRect();
      
      const elements = document.querySelectorAll('[data-snake-obstacle="true"]');
      const newObstacles = [];
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        
        // Forgiving padding to avoid "pixel-perfect" deaths
        // Description gets more buffer (-5px) for a fairer feel
        const isDescription = el.classList.contains('hero-bottom-desc');
        const padX = isDescription ? -8 : -3;
        const padY = isDescription ? -8 : -3;

        newObstacles.push({
          x: Math.floor((rect.left - canvasRect.left - padX) / gridSize),
          y: Math.floor((rect.top - canvasRect.top - padY) / gridSize),
          w: Math.ceil((rect.width + padX * 2) / gridSize),
          h: Math.ceil((rect.height + padY * 2) / gridSize),
        });
      });
      obstacles = newObstacles;
    };

    const isBlocked = (x, y) => {
      if (!canvas) return true;
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      
      // Bounds check (Parent boundaries)
      if (x < 0 || x >= cols || y < 0 || y >= rows) {
        return true;
      }
      // Obstacle check
      for (const obs of obstacles) {
        if (x >= obs.x && x < obs.x + obs.w && y >= obs.y && y < obs.y + obs.h) {
          return true;
        }
      }
      // Body check (ignore the tail as it will move)
      const checkLength = isAutoPlay ? snake.length : snake.length - 1;
      for (let i = 0; i < checkLength; i++) {
        if (snake[i].x === x && snake[i].y === y) return true;
      }
      return false;
    };

    const spawnFood = () => {
      if (!canvas) return;
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      let newFood;
      let attempts = 0;
      
      while (attempts < 200) {
        newFood = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
        
        // Ensure food is in a clear area and not on snake
        if (!isBlocked(newFood.x, newFood.y)) {
          food = newFood;
          return;
        }
        attempts++;
      }
      food = newFood;
    };

    const findPath = () => {
      const head = snake[0];
      const directions = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
      ];
      directions.sort(() => Math.random() - 0.5);

      // BFS to find a path to food
      const queue = [{ x: head.x, y: head.y, path: [] }];
      const visited = new Set();
      visited.add(`${head.x},${head.y}`);
      
      let bestDir = null;

      while (queue.length > 0) {
        const { x, y, path } = queue.shift();
        
        if (x === food.x && y === food.y) {
          bestDir = path[0];
          break;
        }
        
        if (path.length > 60) continue; // limit search depth for performance

        for (const dir of directions) {
          const nx = x + dir.x;
          const ny = y + dir.y;
          const key = `${nx},${ny}`;
          
          if (!visited.has(key) && !isBlocked(nx, ny)) {
            visited.add(key);
            queue.push({ x: nx, y: ny, path: [...path, dir] });
          }
        }
      }

      if (bestDir) return bestDir;

      // If BFS fails, try a greedy safe move
      let safeDir = null;
      let minDist = Infinity;
      for (const dir of directions) {
        if (snake.length > 1 && dir.x === -direction.x && dir.y === -direction.y) continue;
        const nx = head.x + dir.x;
        const ny = head.y + dir.y;
        if (!isBlocked(nx, ny)) {
          const dist = Math.abs(nx - food.x) + Math.abs(ny - food.y);
          if (dist < minDist) {
            minDist = dist;
            safeDir = dir;
          }
        }
      }
      
      return safeDir || direction;
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      // INTERNAL width must match DISPLAY width (100vw) to prevent stretching
      // INTERNAL height matches its container (Hero section)
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = rect.height;
      updateObstacles();
      spawnFood();
    };

    const draw = (timestamp) => {
      if (!lastTick) lastTick = timestamp;
      const elapsed = timestamp - lastTick;

      if (elapsed > tickRate && !isGameOverRef.current) {
        lastTick = timestamp;
        
        // Process move queue
        if (!isAutoPlay && moveQueue.length > 0) {
          const nextMove = moveQueue.shift();
          // Safety guard against 180 turns if user somehow queued one
          if (nextMove.x !== -direction.x || nextMove.y !== -direction.y) {
            direction = nextMove;
          }
        }

        const nextDir = isAutoPlay ? findPath() : direction;
        const head = snake[0];
        const newHead = { x: head.x + nextDir.x, y: head.y + nextDir.y };

        if (!isBlocked(newHead.x, newHead.y)) {
            direction = nextDir;
            snake.unshift(newHead);
            
            if (newHead.x === food.x && newHead.y === food.y) {
              if (!isAutoPlay) {
                score += 10;
                setScoreState(score);
              }
              spawnFood();
            } else {
              snake.pop();
            }
        } else {
            // Collision!
            if (isAutoPlay) {
              spawnFood();
              if (!canvas) return;
              const cols = Math.floor(canvas.width / gridSize);
              const rows = Math.floor(canvas.height / gridSize);
              
              let resetSpot = null;
              for(let i=0; i<100; i++) {
                let tx = Math.floor(Math.random() * cols);
                let ty = Math.floor(Math.random() * rows);
                if(!isBlocked(tx, ty)) {
                  resetSpot = {x: tx, y: ty};
                  break;
                }
              }
              if(resetSpot) {
                const diffX = resetSpot.x - snake[0].x;
                const diffY = resetSpot.y - snake[0].y;
                snake = snake.map(seg => ({
                  x: seg.x + diffX,
                  y: seg.y + diffY
                }));
                if (snake.some(seg => isBlocked(seg.x, seg.y))) {
                  snake = [resetSpot];
                }
              }
            } else {
              // Manual Mode Game Over: show modal
              isGameOverRef.current = true;
              setShowModal(true);
            }
        }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Food
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
      
      // Draw Snake
      ctx.shadowBlur = 10;
      ctx.shadowColor = isAutoPlay ? 'rgba(199, 120, 221, 0.5)' : 'rgba(0, 255, 255, 0.5)';
      snake.forEach((seg, i) => {
        const alpha = 0.3 + (0.5 * (1 - i / snake.length));
        ctx.fillStyle = isAutoPlay 
          ? `rgba(199, 120, 221, ${alpha})` // Purple for AI
          : `rgba(0, 255, 255, ${alpha})`; // Cyan for User
        
        ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize, gridSize);

        // Draw eyes and nose on the head (i === 0)
        if (i === 0) {
          ctx.fillStyle = '#000'; // Black features
          const x = seg.x * gridSize;
          const y = seg.y * gridSize;
          const eyeSize = 3;
          const noseSize = 2;

          if (direction.x === 1) { // Right
            ctx.fillRect(x + gridSize - 6, y + 4, eyeSize, eyeSize); // Eye 1
            ctx.fillRect(x + gridSize - 6, y + gridSize - 7, eyeSize, eyeSize); // Eye 2
            ctx.fillRect(x + gridSize - 2, y + gridSize / 2 - 1, noseSize, noseSize); // Nose
          } else if (direction.x === -1) { // Left
            ctx.fillRect(x + 3, y + 4, eyeSize, eyeSize);
            ctx.fillRect(x + 3, y + gridSize - 7, eyeSize, eyeSize);
            ctx.fillRect(x, y + gridSize / 2 - 1, noseSize, noseSize);
          } else if (direction.y === -1) { // Up
            ctx.fillRect(x + 4, y + 3, eyeSize, eyeSize);
            ctx.fillRect(x + gridSize - 7, y + 3, eyeSize, eyeSize);
            ctx.fillRect(x + gridSize / 2 - 1, y, noseSize, noseSize);
          } else if (direction.y === 1) { // Down
            ctx.fillRect(x + 4, y + gridSize - 6, eyeSize, eyeSize);
            ctx.fillRect(x + gridSize - 7, y + gridSize - 6, eyeSize, eyeSize);
            ctx.fillRect(x + gridSize / 2 - 1, y + gridSize - 2, noseSize, noseSize);
          }
        }
      });
      
      ctx.shadowBlur = 0;
      
      // Optional indicator for manual mode
      if (!isAutoPlay) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText(`SCORE: ${score}`, 20, 30);
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.fillText('PLAY MODE: ARROW KEYS', 20, 50);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas.parentElement);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', handleKeyDown);
    
    // Smooth updates
    const obstacleInterval = setInterval(updateObstacles, 200);
    
    resizeCanvas();
    animationFrameId = requestAnimationFrame(draw);

    const handleReset = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      
      // Find a safe random spot
      let resetSpot = { x: Math.floor(cols/2), y: Math.floor(rows/2) }; // fallback
      for(let i=0; i<100; i++) {
        let tx = Math.floor(Math.random() * (cols - 2)) + 1;
        let ty = Math.floor(Math.random() * (rows - 2)) + 1;
        if(!isBlocked(tx, ty)) {
          resetSpot = {x: tx, y: ty};
          break;
        }
      }

      // Reset to exactly one box size (one segment)
      direction = { x: 1, y: 0 };
      snake = [resetSpot];

      score = 0;
      setScoreState(0);
      isAutoPlay = false;
      setIsAutoPlayState(false);
      isGameOverRef.current = false;
      setShowModal(false);
      moveQueue = []; // Clear queue on reset
      spawnFood();
    };

    const handleClose = () => {
      isAutoPlay = true;
      setIsAutoPlayState(true);
      isGameOverRef.current = false;
      setShowModal(false);
      moveQueue = [];
      // Reset snake size to one box when returning to AI mode
      if (snake.length > 0) {
        snake = [snake[0]];
      }
    };

    window.addEventListener('reset-game', handleReset);
    window.addEventListener('close-game', handleClose);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('reset-game', handleReset);
      window.removeEventListener('close-game', handleClose);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      clearInterval(obstacleInterval);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="snake-background"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
          opacity: 0.8
        }}
      />
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{
            background: 'rgba(15, 15, 15, 0.95)',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid rgba(199, 120, 221, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(199, 120, 221, 0.1)',
            textAlign: 'center',
            minWidth: '320px',
            animation: 'modalScale 0.3s ease-out'
          }}>
            <h2 style={{ 
              color: '#C778DD', 
              fontSize: '32px', 
              marginBottom: '10px',
              textShadow: '0 0 10px rgba(199, 120, 221, 0.5)'
            }}>GAME OVER</h2>
            <p style={{ color: '#fff', fontSize: '18px', marginBottom: '30px', opacity: 0.8 }}>
              Final Score: <span style={{ color: '#C778DD', fontWeight: 'bold' }}>{scoreState}</span>
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('reset-game'))}
                style={{
                  background: 'linear-gradient(45deg, #C778DD, #9151A9)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  fontSize: '16px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(199, 120, 221, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                RESET
              </button>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('close-game'))}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 30px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.2s, border-color 0.2s',
                  fontSize: '16px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
          <style>{`
            @keyframes modalScale {
              from { transform: scale(0.9); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default SnakeBackground;
