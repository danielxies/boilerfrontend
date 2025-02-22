import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MergedStatsProps {
  data: {
    subscriptions: {
      count: number
      percentage: number
    }
    sales: {
      count: number
      percentage: number
    }
    activeNow: {
      count: number
      change: number
    }
  }
}

export function MergedStats({ data }: MergedStatsProps) {
  return (
    <Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">
          Combined Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#666666]">Subscriptions</p>
          <p className="text-2xl font-bold text-white">+{data.subscriptions.count}</p>
          <p className="text-xs text-[#666666]">
            +{data.subscriptions.percentage}% from last month
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#666666]">Sales</p>
          <p className="text-2xl font-bold text-white">+{data.sales.count}</p>
          <p className="text-xs text-[#666666]">
            +{data.sales.percentage}% from last month
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#666666]">Active Now</p>
          <p className="text-2xl font-bold text-white">+{data.activeNow.count}</p>
          <p className="text-xs text-[#666666]">
            +{data.activeNow.change} since last hour
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 