import { useState } from 'react';
import './FlipCard.css';

interface FlipCardProps {
  title: string;
  description: string;
  icon?: string;
  backgroundColor?: string;
}

export default function FlipCard({title, description, icon, backgroundColor = 'bg-blue-500'}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flip-card-container" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)} >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Cara frontal */}
        <div className={`flip-card-front ${backgroundColor} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center`}>
          {icon && (
            <div className="text-5xl mb-4">
              {icon}
            </div>
          )}
          <h3 className="text-2xl font-bold text-white text-center">
            {title}
          </h3>
        </div>

        {/* Cara trasera */}
        <div className="flip-card-back bg-gray-800 rounded-lg shadow-lg p-6 flex items-center justify-center">
          <p className="text-white text-center text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
