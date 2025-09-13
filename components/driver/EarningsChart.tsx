"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const earningsData = [
  { day: "Mon", Earnings: 12000 },
  { day: "Tue", Earnings: 8000 },
  { day: "Wed", Earnings: 15000 },
  { day: "Thu", Earnings: 17000 },
  { day: "Fri", Earnings: 9000 },
  { day: "Sat", Earnings: 20000 },
  { day: "Sun", Earnings: 25000 },
];

export default function EarningsChart() {
  return (
    <Card className="p-6 backdrop-blur-xl bg-gray-500/10 dark:bg-zinc-800/70 border-0 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Weekly Earnings</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="day" />
            <YAxis />

            {/* Custom Dark Mode Tooltip */}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-sm bg-zinc-800/95 text-white px-3 py-2 border border-zinc-700">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-semibold">
                        {payload[0].name}: {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Line
              type="monotone"
              dataKey="Earnings"
              stroke="#15803d"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
