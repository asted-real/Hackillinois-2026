import { useState } from "react";
import './Keyboard.css';

export default function Keyboard({ inputText, setInputText }) {

  // This function updates the textbox
    const handleKeyClick = (symbol) => {
        setInputText((prev) => prev + symbol);
    };

  return (
    <div className="keyboards">
      <VowelKeyboard onKeyClick={handleKeyClick} />
      <ConsanantKeyboard onKeyClick={handleKeyClick} />
    </div>
  );
}

function KeyboardEvent({ keyboard = 1, onKeyClick }) {
  if (keyboard === 1) {
    return <VowelKeyboard onKeyClick={onKeyClick} />;
  } else {
    return <ConsanantKeyboard onKeyClick={onKeyClick} />;
  }
}

function VowelKeyboard({ onKeyClick }) {
  const ipa_vowels = [
    "i","ɪ","ɛ","æ","ʌ","ə","ɑ","ɔ","u","ʊ","ɝ","ɚ"
  ];

  return (
      <div className="grid-container-vowel">
        {ipa_vowels.map((symbol, index) => (
          <Key
            key={index}
            symbol={symbol}
            onKeyClick={onKeyClick}
          />
        ))}
      </div>
  );
}

function ConsanantKeyboard({ onKeyClick }) {
  const ipa_cons = [
    "p","b","m","t","d","n","k","ɡ","ŋ","f","v","s","z",
    "θ","ð","ʃ","ʒ","tʃ","dʒ","l","ɹ","j","w","h"
  ];

  return (
    <div className="grid-container-cons" style={{
      gridTemplateColumns: `repeat(8, 1fr)`
    }}>
      {ipa_cons.map((symbol, index) => (
        <Key
          key={index}
          symbol={symbol}
          onKeyClick={onKeyClick}
        />
      ))}
    </div>
  );
}

function Key({ symbol, onKeyClick }) {
  return (
    <button
      onClick={() => onKeyClick(symbol)}
      className="grid-button"
    >
      {symbol}
    </button>
  );
}