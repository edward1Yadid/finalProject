import React, { useEffect } from 'react';
import './Product.css'; 

const HeartAnimation = ({ containerId }) => {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${Math.random() * 20}vw`;
      heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
      heart.style.opacity = Math.random();
      heart.style.transform = `scale(${Math.random() * 0.1 + 0.1})`;

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    };

    const intervalId = setInterval(createHeart, 300);
    return () => clearInterval(intervalId);
  }, [containerId]);

  return <div id={containerId} className="heart-container"></div>;
};

export default HeartAnimation;
