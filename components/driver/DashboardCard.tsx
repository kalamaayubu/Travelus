"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function DashboardCard({
  title,
  value,
  icon,
  gradient,
}: {
  title: string
  value: string
  icon: React.ReactNode
  gradient: string
}) {
  return (
    <Card className={`p-6 rounded-lg border-0 bg-gradient-to-br ${gradient}`}>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </span>
          {icon}
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
