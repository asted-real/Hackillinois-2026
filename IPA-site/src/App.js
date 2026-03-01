// import logo from '.../logo.svg';
import './App.css';
import GenerateAnswer from './AnswerGen';
import TextGenerator from './TextGen';
import Keyboard from './Keyboard';
import VowelKeyboard from './Keyboard';
import { useState } from "react";
import logo from './wug.png';

function App() {
  const [inputText, setInputText] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [word, setWord] = useState("");
  return (
    <div className="App">
      <div className='logoCombo'>
        <img src={logo} width={40}/>
        <h1 className="phoneticate">Phonetiquette</h1>
      </div>
      <div className='Content'>
        <h4 className="desc">
          This is a tool to help practice transcribing English orthography to the symbols of the International Phonetic Alphabet 
          (IPA). More specifically, this tool is intended to be used in conjunction with Standard American English; the best use case 
          would be to help grow a sense of familiarity with the sounds of Standard American English. Sourced from the Carnegie-Mellon 
          University Pronouncing Dictionary, the possible words include names, places, and words present in the dictionary. There may be 
          more than one correct answer. Once 'Reveal Answer' is clicked or a correct answer is submitted, you must generate a new word to 
          continue.
        </h4>
        <TextGenerator unlock={() => setIsUnlocked(true)} setWord={setWord} />
        <div className='genWord'>
          <TextBox className="input" inputText={inputText} setInputText={setInputText} />
          <div className='buttons'>
            <CheckButton isUnlocked={isUnlocked} word ={word} ipa = {inputText}/>
            <RevealButton isUnlocked={isUnlocked}/>
          </div>
        </div> 
      </div>
      <GenerateAnswer word= {word} />
      <Keyboard inputText={inputText} setInputText={setInputText} />
    </div>
  );
}

function TextBox({ inputText, setInputText }) {
  return (
    <div className="input-wrapper">
      <label htmlFor="inp" className="input-label">
        Enter transcription using keyboard below:
      </label>

      <input
        type="text"
        id="inp"
        className="text-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type IPA here..."
      />
    </div>
  );
}

function CheckButton({isUnlocked, ipa, word}){
    const [loading, setLoading] = useState(false);
    const [correct, setCorrect] = useState("");
    // fix
    // clear input box when correct/when reveal/when generate
    // find spot for correctness message
    const checkCorrect= async () => {
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
            response: ipa, 
            english: word,
        }),
        });

        const data = await response.json();
        setCorrect(data.feedback);
        if(correct == "Correct!!") {
          reveal();
        }
    } catch (error) {
        console.error("Error generating text:", error);
        setCorrect("Error generating text.");
    }
      setLoading(false);
  };
  const reveal = () => {
      const ans = document.getElementById('answer');
      ans.classList.remove('AnswerHide');
      ans.classList.add('answer');
  };
  return(
    <button disabled={!isUnlocked} onClick = {isUnlocked?checkCorrect:null} className={isUnlocked?'text_buttons':"locked"}>
      Check Answer
    </button>
  );
}

function RevealButton({isUnlocked}){
  // if(isUnlocked) {
  //   RevealIPA();
  // }
  const reveal = () => {
      const ans = document.getElementById('answer');
      ans.classList.remove('AnswerHide');
      ans.classList.add('answer');
  };
  
  return(
    <button onClick = {isUnlocked?reveal:null} disabled={!isUnlocked} className={isUnlocked?'text_buttons':"locked"}>
      Reveal Answer
    </button>
  );
}

export default App;
