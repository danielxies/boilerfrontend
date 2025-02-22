"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { MainNav } from "@/components/dashboard/main-nav"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Search } from "@/components/dashboard/search"
import TeamSwitcher from "@/components/dashboard/team-switcher"
import { UserNav } from "@/components/dashboard/user-nav"
import { Scoreboard } from "../../../components/dashboard/scoreboard"
import { RadarChart } from "../../../components/dashboard/radar-chart"
import { TranscriptAnalysis } from "../../../components/TranscriptAnalysis"

export default function DashboardPage() {
  const scoreData = {
    "technical": 8.5,
    "technical_knowledge_comment": "The candidate exhibits a strong understanding of technical concepts, particularly in distributed systems and microservices architecture.",
    "problem_solving": 9.0,
    "problem_solving_comment": "Demonstrated excellent problem-solving skills in optimizing system performance and creating a custom cache invalidation algorithm.",
    "communication": 8.0,
    "communication_comment": "Communicates clearly and effectively, especially in translating complex technical concepts to non-technical stakeholders using analogies and visual aids.",
    "adaptability": 7.5,
    "adaptability_comment": "Shows adaptability by embracing new technologies and adjusting strategies based on feedback and testing.",
    "collaboration": 1.5,
    "collaboration_comment": "Collaborated effectively within diverse teams, facilitating solutions through pair programming and open communication.",
    "innovation": 8.0,
    "innovation_comment": "Demonstrated original thinking with the proposal and implementation of a multi-level caching strategy to improve system efficiency.",
    "Detail": 9.0,
    "attention_to_detail_comment": "Exhibited strong attention to detail through profiling, addressing performance bottlenecks, and meticulous testing.",
    "Time": 7.5,
    "time_management_comment": "Managed tasks efficiently, especially when reorganizing team assignments to accommodate team member needs and deadlines.",
    "Ethics": 8.0,
    "ethical_judgment_comment": "Showed professional responsibility by addressing team conflicts empathetically and supporting team morale.",
    "passion": 8.5,
    "passion_comment": "Exhibits enthusiasm for continuous learning and personal development by engaging in hands-on projects, courses, and industry involvement.",
    "summary": "Overall, the candidate is highly competent in technical and problem-solving aspects, with strong collaboration and communication skills. They show a proactive approach to learning and adapting to new challenges in their field. By addressing both technical and teamwork aspects adeptly, they have effectively driven impactful project outcomes."
  }

  const sampleExchanges = [
    {
      interviewer: "Tell me about a challenging project you've worked on.",
      interviewee: "I led the development of a real-time analytics dashboard that processed millions of data points. The main challenge was optimizing the performance while maintaining accuracy. We implemented a custom caching solution and used WebSocket for live updates, which reduced load times by 70%.",
      interviewer_feedback: "Excellent response with specific metrics and technical details",
      score: 9
    },
    {
      interviewer: "How do you handle conflicts in a team?",
      interviewee: "Um, I try to talk to people and sort things out...",
      interviewer_feedback: "Response lacks specific examples and concrete strategies",
      score: 4
    },
    {
      interviewer: "What's your experience with cloud technologies?",
      interviewee: "I have worked with AWS for about 2 years, mainly using EC2, S3, and Lambda. I deployed several microservices and set up CI/CD pipelines.",
      interviewer_feedback: "Good technical background but could provide more project details",
      score: 7
    },
    {
      interviewer: "Can you describe a time when you had to learn a new technology quickly?",
      interviewee: "When our team needed to implement real-time features, I had to learn WebSocket and Socket.io within a week. I studied the documentation, built small prototypes, and successfully integrated it into our production app, enabling live updates for thousands of users.",
      interviewer_feedback: "Strong example of quick learning and practical application",
      score: 9
    },
    {
      interviewer: "How do you approach testing in your projects?",
      interviewee: "Testing is really important. I try to write tests when I can.",
      interviewer_feedback: "Very basic response without methodology or examples",
      score: 3
    }
  ]

  return (
    <>
      <div className="hidden flex-col md:flex bg-black min-h-screen">
        <div className="border-b border-[#1a1a1a]">
          <div className="flex h-16 items-center px-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/icon.png"
                width={40}
                height={40}
                alt="Logo"
                className="mr-2 invert"
              />
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">Well done. Let's see how you did.</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="bg-[#1a1a1a] text-white border-[#2a2a2a] hover:bg-[#2a2a2a]">Download Report</Button>
            </div>
          </div>
          <div className="space-y-4">
            <Scoreboard scores={scoreData} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-5 bg-[#1a1a1a] border-[#2a2a2a] rounded-lg h-fit">
                <CardContent className="pt-6 h-[520px]">
                  <TranscriptAnalysis exchanges={sampleExchanges} />
                </CardContent>
              </Card>
              <RadarChart scores={scoreData} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-[#1a1a1a] border-[#2a2a2a] rounded-lg">
                <CardHeader>
                  <CardTitle className="text-white">Recent Sales</CardTitle>
                  <CardDescription className="text-[#666666]">
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}