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

function VowelKeyboard({ onKeyClick }) {
  const ipa_vowels = ['i','ɪ','ʊ', 'u', 'e', 'ə', 'ɜ', 'ɔ', 'æ', 'ʌ', 'ɑ', 'ɒ']; 


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
  const ipa_cons = ['p', 'b','t', 'd', 'tʃ', 'dʒ', 'k', 'ɡ', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'm', 'n', 'ŋ', 'h', 'l', 'ɹ', 'w', 'j'];

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