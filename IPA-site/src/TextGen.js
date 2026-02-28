// import './App.css';
import { useState } from "react";

export default function TextGenerator() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy"); // NEW

  const generateText = async () => {
    setLoading(true);

    // Replace this with your API call
    setTimeout(() => {
      setText("This is your generated text output.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="generator-container">
        <div className="dropdown-wrapper">
            <label className="dropdown-label">Difficulty: </label>
            <select
            className="dropdown"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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