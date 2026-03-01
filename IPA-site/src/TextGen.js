// import './App.css';
import { useState } from "react";
// const [text,setText] = useState("");

export default function TextGenerator({unlock, setWord, setInputText, setColor, setTextColor}) {
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
        setWord(data.word); 
    } catch (error) {
        console.error("Error generating text:", error);
        setText("Error generating text.");
    }
    unlock();
      setLoading(false);
      const ans = document.getElementById('answer');
      ans.innerHTML = "Feedback Here:<br>Your answer: ";
      setInputText('');
      setColor("#e6e6e6");
      setTextColor("black");
    //   const ans = document.getElementById('answer');
    //   ans.classList.remove('answer');
    //   ans.classList.add('AnswerHide');
  };

  return (
    <div>
        <div className="generator-container">
            <div className="output-box">
            {loading ? (
            <div className="loader" />
            ) : (
            <p className="output-text">{text || "Generate Word Now"}</p>
            )}
            </div>
            
            <div className="gen_buttons_wrapper">
            <select
            className="dropdown"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            >
            <option value={-1}>Pick Mode</option>
            <option value={0}>Easy</option>
            <option value={1}>Medium</option>
            <option value={2}>Hard</option>
            </select>
            <button 
                className='gen_buttons'
                onClick={generateText} 
                disabled={loading}
                >
                {loading ? "Generating..." : "Generate Text"}
            </button>
            </div>
        </div>
    </div>
  );
}  
