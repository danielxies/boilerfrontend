"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScoreComponent } from "@/components/ScoreComponent";
import { TranscriptAnalysis } from "../../../components/TranscriptAnalysis";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

// Sample data for transcript analysis
const sampleExchanges = [
  {
    interviewer: "Tell me about a challenging project you've worked on.",
    interviewee: "I led the development of a real-time analytics dashboard that processed millions of data points. The main challenge was optimizing the performance while maintaining accuracy. We implemented a custom caching solution and used WebSocket for live updates, which reduced load times by 70%.",
    interviewer_feedback: "Good technical depth and quantifiable results",
    score: 9
  },
  {
    interviewer: "How do you handle conflicts in a team?",
    interviewee: "Um, I try to talk to people and sort things out...",
    interviewer_feedback: "Too vague, needs specific examples",
    score: 4
  },
  {
    interviewer: "What's your experience with cloud technologies?",
    interviewee: "I have worked with AWS for about 2 years, mainly using EC2, S3, and Lambda. I deployed several microservices and set up CI/CD pipelines.",
    interviewer_feedback: "Solid but could elaborate more on specific projects",
    score: 7
  },
  {
    interviewer: "Can you describe a time when you had to learn a new technology quickly?",
    interviewee: "When our team needed to implement real-time features, I had to learn WebSocket and Socket.io within a week. I studied the documentation, built small prototypes, and successfully integrated it into our production app, enabling live updates for thousands of users.",
    interviewer_feedback: "Excellent example with clear impact",
    score: 9
  },
  {
    interviewer: "How do you approach testing in your projects?",
    interviewee: "Testing is really important. I try to write tests when I can.",
    interviewer_feedback: "Need more specific testing strategies",
    score: 3
  },
  {
    interviewer: "Tell me about a time you had to optimize application performance.",
    interviewee: "I identified and fixed several performance bottlenecks in our React application. This included implementing memo and useCallback hooks, lazy loading components, and optimizing Redux state management. These changes improved our app's load time by 40%.",
    interviewer_feedback: "Great technical detail and measurable results",
    score: 9
  },
  {
    interviewer: "How do you stay updated with new technologies?",
    interviewee: "I follow tech blogs, participate in online communities, and build side projects to experiment with new tools. Recently, I've been exploring Rust and WebAssembly to understand their potential benefits for our web applications.",
    interviewer_feedback: "Shows proactive learning and curiosity",
    score: 8
  },
  {
    interviewer: "Describe a project where you had to work under a tight deadline.",
    interviewee: "Well, there were a few times when things were rushed...",
    interviewer_feedback: "Needs specific example and resolution",
    score: 4
  },
  {
    interviewer: "What's your experience with database design?",
    interviewee: "I designed and optimized databases for several projects. In one case, I improved query performance by 60% by adding appropriate indexes and normalizing the schema. I'm comfortable with both SQL and NoSQL databases, having used PostgreSQL and MongoDB extensively.",
    interviewer_feedback: "Strong technical knowledge with practical examples",
    score: 9
  },
  {
    interviewer: "How do you handle code reviews?",
    interviewee: "I believe in constructive feedback and maintaining high code quality. When reviewing, I focus on both functionality and maintainability. I also appreciate receiving feedback as it helps me grow as a developer.",
    interviewer_feedback: "Good perspective on collaboration",
    score: 7
  }
];

export default function ResultsPage() {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] p-8">
      {/* Icon */}
      <div className="absolute top-4 left-4 z-50">
        <Image 
          src="/icon.png" 
          alt="Apollo Project Icon" 
          width={31} 
          height={31} 
          onClick={goHome}
          className="cursor-pointer invert brightness-200"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12 mt-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-5xl font-bold text-white">You did <GradientText>Great!</GradientText> Let&apos;s break it down.</h1>
          <InteractiveHoverButton className="bg-white text-black border-white [&_.rounded-full]:bg-black [&_span]:group-hover:text-white [&_.absolute]:text-white">
            Download
          </InteractiveHoverButton>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3 w-[10%]">
            <ScoreComponent
              clarityScore={66}
              depthScore={12}
              confidenceScore={74}
            />
          </div>
          
          <div className="md:col-span-9">
            <TranscriptAnalysis
              exchanges={sampleExchanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 