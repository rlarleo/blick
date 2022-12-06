import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(300);
  const [canvasHeight, setCanvasHeight] = useState<number>(300);
  const [gameOver, setGameOver] = useState<boolean>(false);
  let x = 150;
  let y = 150;
  const r = 10;
  let dx = 2;
  let dy = 4;
  const paddlex = 150;
  const paddleh = 10;
  const paddlew = 75;
  let anim = 0;

  function clear() {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }

  function ball() {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#03158a';
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    }
  }

  function rect() {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.rect(paddlex, canvasHeight - paddleh, paddlew, paddleh);
      context.closePath();
      context.fill();
    }
  }

  function draw() {
    if (!gameOver) {
      console.log(anim);
      clear();
      ball();
      rect();

      x += dx;
      y += dy;

      if (x >= canvasWidth - r || x <= 0 + r) {
        dx = -dx;
      }
      if (y <= 0 + r) {
        dy = -dy;
      } else if (y >= canvasHeight - r) {
        if (x > paddlex && x < paddlex + paddlew) {
          dy = -dy;
        } else {
          setGameOver(true);
          window.cancelAnimationFrame(anim);
        }
      }
      anim = window.requestAnimationFrame(draw);
    }
  }

  useEffect(() => {
    anim = window.requestAnimationFrame(draw);
  }, []);

  return <canvas ref={canvasRef} width={300} height={300} className="canvas" />;
};

export default App;
