"use client";

import { Card } from "@/components/ui/card";

const bookings = [
  { passenger: "John Mwangi", seats: 2, amount: 600, status: "Paid" },
  { passenger: "Aisha Hassan", seats: 1, amount: 300, status: "Pending" },
  { passenger: "Kevin Otieno", seats: 3, amount: 900, status: "Cancelled" },
];

export default function RecentBookingsTable() {
  return (
    <Card className="p-6 backdrop-blur-xl bg-gray-500/10 dark:bg-zinc-800/70 border-0 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-00 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-800/50">
              <th className="pb-2">Passenger</th>
              <th className="pb-2">Seats</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                <td className="py-3 font-medium">{b.passenger}</td>
                <td>{b.seats}</td>
                <td>KES {b.amount}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-sm text-xs ${
                      b.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : b.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
