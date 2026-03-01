import { useEffect } from "react";

export default function GenerateAnswer({word, setAnswer, setAnswerText, answer}) {
  useEffect(() => {
    if (!word) return;

    const generateTextAnswer = async () => {
      try {
        const response = await fetch("https://hackillinois-2026-production.up.railway.app/correct_answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            word: word,
          }),
        });

        const data = await response.json();
        setAnswer(data.answer_list);
        setAnswerText(data.answer_list.join(' '));
      } catch (error) {
        console.error("Error generating answer:", error);
      }
    };

    generateTextAnswer();
  }, [word, setAnswer, setAnswerText]); // Added missing dependencies

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  return null;
}