// import logo from '.../logo.svg';
import './App.css';
import TextGenerator from './TextGen';
import Keyboard from './Keyboard';
import VowelKeyboard from './Keyboard';
import { useState } from "react";
import logo from './wug.png';

function App() {
  const [inputText, setInputText] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  return (
    <div className="App">
      <div className='logoCombo'>
        <img src={logo} width={40}/>
      {/* <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"> */}
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
        <TextGenerator unlock={() => setIsUnlocked(true)} />
        <div className='genWord'>
          <TextBox className="input" inputText={inputText} setInputText={setInputText} />
          <div className='buttons'>
            <CheckButton isUnlocked={isUnlocked}/>
            <RevealButton isUnlocked={isUnlocked}/>
          </div>
        </div> 
      </div>
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

function CheckButton({isUnlocked}){
  return(
    <button disabled={!isUnlocked} className={isUnlocked?'text_buttons':"locked"}>
      Check Answer
    </button>
  );
}

function RevealButton({isUnlocked}){
  // if(isUnlocked) {
  //   RevealIPA();
  // }
  return(
    <button disabled={!isUnlocked} className={isUnlocked?'text_buttons':"locked"}>
      Reveal Answer
    </button>
  );
}
// function RevealIPA() {
//     return(

//     )
// }

export default App;
