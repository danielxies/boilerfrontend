"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scoreboard } from "../../../components/dashboard/scoreboard"
import { RadarChart } from "../../../components/dashboard/radar-chart"
import { TranscriptAnalysis } from "../../../components/TranscriptAnalysis"
import { useRouter } from "next/navigation"
import { AudioPlayer } from "../../../components/AudioPlayer"

interface ScoreData {
  comment: string;
  confidence: number;
  score: number;
}

interface ScoreJson {
  data: {
    adaptability: ScoreData;
    attention_to_detail: ScoreData;
    collaboration: ScoreData;
    communication: ScoreData;
    ethical_judgment: ScoreData;
    innovation: ScoreData;
    problem_solving: ScoreData;
    technical_knowledge: ScoreData;
    time_management: ScoreData;
    overall_score: number;
    summary: string;
  };
}

interface InterviewData {
  status: string;
  exchanges: Array<{
    interviewer: string;
    interviewee: string;
    interviewer_feedback: string;
    score: number;
  }>;
  audio_file: string;
  score_json: ScoreJson;
}

export default function DashboardPage() {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null)
  const router = useRouter()

  // Transform the score data to the format expected by the components
  const transformScoreData = (scoreJson: ScoreJson) => {
    const { data } = scoreJson;
    
    // Calculate overall score as average if not provided
    const overall_score = data.overall_score ?? Math.round(
      (data.technical_knowledge.score +
      data.problem_solving.score +
      data.communication.score +
      data.adaptability.score +
      data.collaboration.score +
      data.innovation.score +
      data.attention_to_detail.score +
      data.time_management.score +
      data.ethical_judgment.score) / 9
    );

    return {
      overall_score,
      technical: data.technical_knowledge.score,
      technical_knowledge_comment: data.technical_knowledge.comment,
      problem_solving: data.problem_solving.score,
      problem_solving_comment: data.problem_solving.comment,
      communication: data.communication.score,
      communication_comment: data.communication.comment,
      adaptability: data.adaptability.score,
      adaptability_comment: data.adaptability.comment,
      collaboration: data.collaboration.score,
      collaboration_comment: data.collaboration.comment,
      innovation: data.innovation.score,
      innovation_comment: data.innovation.comment,
      Detail: data.attention_to_detail.score,
      attention_to_detail_comment: data.attention_to_detail.comment,
      Time: data.time_management.score,
      time_management_comment: data.time_management.comment,
      Ethics: data.ethical_judgment.score,
      ethical_judgment_comment: data.ethical_judgment.comment,
      summary: data.summary
    };
  };

  useEffect(() => {
    // Get the interview data from localStorage
    const storedData = localStorage.getItem('interviewData')
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setInterviewData(data)
      } catch (error) {
        console.error('Error parsing interview data:', error)
        router.push('/interview/error')
      }
    } else {
      router.push('/interview/error')
    }
  }, [router])

  if (!interviewData) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const transformedScores = transformScoreData(interviewData.score_json);

  return (
    <>
      <div className="hidden flex-col md:flex bg-[#1a1a1a] min-h-screen pt-24">
        <div className="flex-1 space-y-4 p-8">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-5xl font-bold tracking-tight text-white">Well Done. Let's see how you did.</h2>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="bg-[#1a1a1a] text-white border-[#2a2a2a] hover:bg-[#2a2a2a]"
                onClick={() => {
                  // Handle report download
                  // You can implement this based on your requirements
                }}
              >
                Download Report
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <Scoreboard scores={transformedScores} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-5 bg-[#1a1a1a] border-[#2a2a2a] rounded-lg h-fit h-[700px]">
                <CardContent className="pt-6">
                  <TranscriptAnalysis 
                    exchanges={interviewData.exchanges} 
                    audioFile={interviewData.audio_file}
                  />
                </CardContent>
              </Card>
              <RadarChart scores={transformedScores} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}