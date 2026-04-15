import React from "react";

interface MerdAiLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

export const MerdAiLogo: React.FC<MerdAiLogoProps> = ({ size = 36, color = "currentColor", className = "" }) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const orbitRadius = size * 0.3;
  const circleRadius = size * 0.11;
  const squareSize = size * 0.18;
  const angles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4];
  const circles = angles.map((angle) => ({
    cx: centerX + orbitRadius * Math.cos(angle - Math.PI / 2),
    cy: centerY + orbitRadius * Math.sin(angle - Math.PI / 2),
    r: circleRadius,
  }));
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MERD AI Logo"
      fill={color}
    >
      <rect
        x={centerX - squareSize / 2}
        y={centerY - squareSize / 2}
        width={squareSize}
        height={squareSize}
        rx={squareSize * 0.1}
        fill={color}
      />
      {circles.map((circle, index) => (
        <circle key={index} cx={circle.cx} cy={circle.cy} r={circle.r} fill={color} />
      ))}
      {circles.map((circle, index) => (
        <line
          key={`line-${index}`}
          x1={centerX + (squareSize / 2) * Math.cos(angles[index] - Math.PI / 2)}
          y1={centerY + (squareSize / 2) * Math.sin(angles[index] - Math.PI / 2)}
          x2={circle.cx}
          y2={circle.cy}
          stroke={color}
          strokeWidth={size * 0.04}
          opacity="0.6"
        />
      ))}
    </svg>
  );
};
