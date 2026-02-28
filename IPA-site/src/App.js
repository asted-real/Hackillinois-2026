import logo from './logo.svg';
import './App.css';
import TextGenerator from './TextGen';
import Keyboard from './Keyboard';
import VowelKeyboard from './Keyboard';
import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  return (
    <div className="App">
      <div className='Content'>
        <h1 className="phoneticate">Phonetiquette</h1>
        <h4 className="desc">
          This is a tool to help practice translating English orthography to the symbols of the International Phonetic Alphabet (IPA).
        </h4>

        <div className='genWord'>
          <p>Select a mode and transcribe the word below:</p>
          <TextGenerator />
          <TextBox inputText={inputText} setInputText={setInputText} />
          <CheckButton />
          <RevealButton />
        </div> 
      </div>
      <Keyboard inputText={inputText} setInputText={setInputText} />
    </div>
  );
}

function TextBox({ inputText, setInputText }) {
  return (
    <div>
      <label>
        Enter transcription:
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </label>
    </div>
  );
}

function CheckButton(){
  return(
    <button>
      Check Answer
    </button>
  );
}

function RevealButton(){
  return(
    <button>
      Reveal Answer
    </button>
  );
}

export default App;
