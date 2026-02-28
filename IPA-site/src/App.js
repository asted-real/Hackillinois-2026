// import logo from '.../logo.svg';
import './App.css';
import TextGenerator from './TextGen';
import Keyboard from './Keyboard';
import VowelKeyboard from './Keyboard';
import { useState } from "react";
import logo from './wug.png';

function App() {
  const [inputText, setInputText] = useState("");
  return (
    <div className="App">
      <div className='logoCombo'>
        <img src={logo} width={40}/>
      {/* <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"> */}
        <h1 className="phoneticate">Phonetiquette</h1>
      </div>
      <div className='Content'>
        <h4 className="desc">
          This is a tool to help practice translating English orthography to the symbols of the International Phonetic Alphabet (IPA).
        </h4>
        <p>Select a mode and transcribe the word below:</p>
        <TextGenerator />
        <div className='genWord'>
          <TextBox inputText={inputText} setInputText={setInputText} />
          <div className='buttons'>
            <CheckButton />
          <RevealButton />
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

function CheckButton(){
  return(
    <button className='text_buttons'>
      Check Answer
    </button>
  );
}

function RevealButton(){
  return(
    <button className='text_buttons'>
      Reveal Answer
    </button>
  );
}

export default App;
