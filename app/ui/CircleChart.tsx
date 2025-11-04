"use client";
import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircleChartProps {
  size?: number;
  value?: number;
}

const CircleChart: React.FC<CircleChartProps> = ({ size = 60, value = 65 }) => {
  const fontSize = size * 0.25;

  return (
    <div className = "mt-2" style={{ width: size, height: size }}>
      <CircularProgressbarWithChildren
        value={value}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: `url(#circleGradient)`,
          trailColor: "#eee",
        })}
      >
        <div style={{ fontSize, fontWeight: 700 }}>متن </div>

        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id="circleGradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircleChart;
