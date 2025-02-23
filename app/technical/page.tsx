"use client";

import React from "react";
import { useRouter } from "next/navigation";
import QuestionContainer from "@/components/custom/QuestionContainer";
import questionsData from "@/data/questions.json";

interface Question {
    title: string;
    number: number;
    difficulty: "Easy" | "Medium" | "Hard";
    slug: string;
}

const Page: React.FC = () => {
    const router = useRouter();
    // Generate the questions array from the JSON data
    const questions: Question[] = Object.keys(questionsData).map((slug) => ({
        title: questionsData[slug as keyof typeof questionsData].title,
        number: questionsData[slug as keyof typeof questionsData].number,
        difficulty: questionsData[slug as keyof typeof questionsData].difficulty as "Easy" | "Medium" | "Hard",
        slug: slug
    }));

    return (
        <div className="min-h-screen bg-[#1a1a1a] pt-16">
            <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white mb-8">
                    questions
                </div>
                <div className="w-1/2">
                    {questions.map((q) => (
                        <QuestionContainer 
                            key={q.number} 
                            Title={q.title} 
                            Number={q.number} 
                            Difficulty={q.difficulty} 
                            slug={q.slug}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;