"use client"

import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts"

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent">
    {children}
  </span>
);

interface RadarChartProps {
  scores: {
    technical: number
    problem_solving: number
    communication: number
    adaptability: number
    collaboration: number
    innovation: number
    Detail: number
    Time: number
    Ethics: number
  }
}

export function RadarChart({ scores }: RadarChartProps) {
  const data = [
    { subject: 'Technical', score: scores.technical },
    { subject: 'Problem Solving', score: scores.problem_solving },
    { subject: 'Communication', score: scores.communication },
    { subject: 'Adaptability', score: scores.adaptability },
    { subject: 'Collaboration', score: scores.collaboration },
    { subject: 'Innovation', score: scores.innovation },
    { subject: 'Detail', score: scores.Detail },
    { subject: 'Time', score: scores.Time },
    { subject: 'Ethics', score: scores.Ethics },
  ]

  const toolsData = [
    { tool: 'HireVue', effectiveness: 85 },
    { tool: 'LeetCode', effectiveness: 92 },
    { tool: 'Brilliant', effectiveness: 78 },
    { tool: 'Pramp', effectiveness: 88 },
    { tool: 'AlgoExpert', effectiveness: 82 },
  ]

  return (
    <div className="col-span-2 space-y-4">
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl text-center">
            <GradientText>Skills Breakdown</GradientText>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] pt-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart data={data} margin={{ top: 20, right: 30, bottom: 5, left: 30 }}>
              <PolarGrid stroke="#333333" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#666666', fontSize: 11 }}
              />
              <PolarRadiusAxis
                domain={[0, 10]}
                tick={false}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fill: "hsl(var(--chart-1))",
                  fillOpacity: 1,
                }}
              />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            <GradientText>Recommended Prep Tools</GradientText>
          </CardTitle>
          <CardDescription className="text-[#666666]">
            Tools to help improve your performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={toolsData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 50,
                bottom: 5,
              }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: '#666666' }}
              />
              <YAxis
                dataKey="tool"
                type="category"
                tick={{ fill: '#666666' }}
                width={100}
              />
              <Bar
                dataKey="effectiveness"
                fill="hsl(var(--chart-1))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none text-white">
            Top Pick: LeetCode <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-[#666666]">
            Based on your performance in technical and problem-solving areas
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 