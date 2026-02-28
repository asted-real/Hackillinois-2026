// import './App.css';
import { useState } from "react";

export default function TextGenerator() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(0); // NEW

  const generateText = async () => {
    setLoading(true);
    // set difficulty based on dropdown
    // call word_gen(difficulty) from app.py(flask file), which returns a word
    // set text to that word
    try {
        const response = await fetch("http://localhost:5000/word_gen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            difficulty: Number(difficulty),
        }),
        });

        const data = await response.json();
        setText(data.word);
    } catch (error) {
        console.error("Error generating text:", error);
        setText("Error generating text.");
    }
      setLoading(false);
  };

  return (
    <div className="generator-container">
        <div className="dropdown-wrapper">
            <label className="dropdown-label">Difficulty: </label>
            <select
            className="dropdown"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            >
            <option value={0}>Easy</option>
            <option value={1}>Medium</option>
            <option value={2}>Hard</option>
            </select>
        </div>
      <button 
        className='text_buttons'
        onClick={generateText}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Text"}
      </button>

      <div className="output-box">
        {loading ? (
          <div className="loader" />
        ) : (
          <p className="output-text">{text || "Your generated text will appear here."}</p>
        )}
      </div>
    </div>
  );
}  