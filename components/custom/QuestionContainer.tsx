'use client';

import React from "react";
import { useRouter } from "next/navigation";

interface QuestionContainerProps {
    Title: string;
    Number: number;
    Difficulty: "Easy" | "Medium" | "Hard";
    slug: string;
}

const getDifficultyColor = (difficulty: "Easy" | "Medium" | "Hard"): string => {
    switch (difficulty) {
        case "Easy":
            return "#00b8a3"; // Green
        case "Medium":
            return "#fec11d"; // Yellow
        case "Hard":
            return "#ff375f"; // Red
        default:
            return "#ffffff"; // Default white if none
    }
};

const QuestionContainer: React.FC<QuestionContainerProps> = ({ Title, Number, Difficulty, slug }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/technical/questions/${slug}`);
    };

    return (
        <div 
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#373430",
                padding: "8px 18px",
                borderRadius: "9px",
                marginBottom: "12px",
                color: "white",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                transform: "scale(1)",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
            }}
            onClick={handleClick}
        >
            <span style={{ fontWeight: "bold" }}>{Number}. {Title}</span>
            <span style={{
                color: getDifficultyColor(Difficulty),
                fontWeight: "bold",
                fontSize: "0.9rem",
            }}>
                {Difficulty}
            </span>
        </div>
    );
}

export default QuestionContainer; 