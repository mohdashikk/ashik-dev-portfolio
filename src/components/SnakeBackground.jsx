import React, { useEffect, useRef } from 'react';

const SnakeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Configuration
    const gridSize = 20;
    const tickRate = 110; // slightly slower for better visibility
    let lastTick = 0;

    // State
    let snake = [{ x: 5, y: 5 }];
    let food = { x: 15, y: 15 };
    let obstacles = [];
    let direction = { x: 1, y: 0 };
    let isAutoPlay = true;
    let nextUserDir = { x: 1, y: 0 };
    let score = 0;

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
        if (snake.length > 1) {
          if (newDir.x === -direction.x && newDir.y === -direction.y) return;
        }
        
        nextUserDir = newDir;
        if (isAutoPlay) {
          isAutoPlay = false;
          score = 0; // Reset score when user starts playing
          direction = newDir;
        }
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
        
        // Use a padding of 1 grid cell for a solid buffer
        const padX = gridSize;
        const padY = gridSize;

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
      // Body check
      for (let i = 0; i < snake.length; i++) {
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
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      updateObstacles();
      spawnFood();
    };

    const draw = (timestamp) => {
      if (!lastTick) lastTick = timestamp;
      const elapsed = timestamp - lastTick;

      if (elapsed > tickRate) {
        lastTick = timestamp;
        
        const nextDir = isAutoPlay ? findPath() : nextUserDir;
        const head = snake[0];
        const newHead = { x: head.x + nextDir.x, y: head.y + nextDir.y };

        if (!isBlocked(newHead.x, newHead.y)) {
            direction = nextDir;
            snake.unshift(newHead);
            
            if (newHead.x === food.x && newHead.y === food.y) {
              if (!isAutoPlay) score += 10;
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
              // Manual Mode Game Over: reset to AutoPlay
              isAutoPlay = true;
              score = 0;
              spawnFood();
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

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      clearInterval(obstacleInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="snake-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
        opacity: 0.8
      }}
    />
  );
};

export default SnakeBackground;
