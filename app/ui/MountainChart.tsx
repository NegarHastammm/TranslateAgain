"use client";
import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface MountainChartProps {
  startColor?: string; 
  endColor?: string;   
}

const MountainChart: React.FC<MountainChartProps> = ({
  startColor = "#3b82f6",
  endColor = "#f97316",
}) => {
  const data = [
    { value: 30 },
    { value: 45 },
    { value: 28 },
    { value: 60 },
    { value: 50 },
    { value: 75 },
    { value: 55 },
    { value: 90 },
  ];

  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="mountainGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={startColor} stopOpacity={1} />
            <stop offset="100%" stopColor={endColor} stopOpacity={1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="value"
          stroke={startColor}
          fill="url(#mountainGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MountainChart;
