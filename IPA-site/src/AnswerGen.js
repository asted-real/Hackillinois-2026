import { useState, useEffect } from "react";

export default function GenerateAnswer({word, setAnswer, answer, setAnswerText}) {
  const [loading, setLoading] = useState(false);
//   const [answer, setAnswer] = useState([]);
    useEffect(() => {
    if (!word) return;

    const generateTextAnswer = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/correct_answer", {
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

      setLoading(false);
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