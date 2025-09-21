"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";

const rideDistribution = [
  { name: "Completed", value: 85 },
  { name: "Pending", value: 10 },
  { name: "Cancelled", value: 5 },
];

const COLORS = ["#15803d", "#3b82f6", "#f97316"]; // green, red, orange

export default function RideDistributionChart() {
  return (
    <Card className="p-6 backdrop-blur-xl bg-gray-500/10 dark:bg-zinc-800/70 border-0 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Ride Distribution</h2>
      <div className="h-72 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={rideDistribution}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={80}
              dataKey="value"
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              stroke="none"
            >
              {rideDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
