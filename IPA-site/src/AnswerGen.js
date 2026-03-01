import { useState, useEffect } from "react";

export default function GenerateAnswer({word, setAnswer, answer, setAnswerText}) {
//   const [answer, setAnswer] = useState([]);
    useEffect(() => {
    if (!word) return;

    const generateTextAnswer = async () => {

      try {
        const response = await fetch("https://hackillinois-2026.onrender.com/correct_answer", {
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
  }, [word]);
    useEffect(() => {
    console.log(answer);
    }, [answer]);

  return (
    null
  );
}  