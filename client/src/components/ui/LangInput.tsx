import React, { useState, useRef, useEffect } from "react";

// Fetch Transliteration Suggestions
export const getTransliterateSuggestions = async (word: string) => {
  const url = `https://inputtools.google.com/request?text=${word}&itc=or-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data && data[0] === "SUCCESS"
      ? data[1][0][1].map((s: string) => [s, word]) // [["Odia", "English"]]
      : [[word, word]];
  } catch (e) {
    console.error("Transliteration error", e);
    return [[word, word]];
  }
};

interface LangInputProps {
  name: string;
  value: string;
  onChange: (text: string) => void;
  className?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const LangInput: React.FC<LangInputProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "Enter text",
  isRequired = false,
}) => {
  const [suggestions, setSuggestions] = useState<[string, string][]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastSelected, setLastSelected] = useState<string>("");

  // Extract English part when editing
  const englishValue = value.includes(" - ") ? value.split(" - ")[1] : value;

  useEffect(() => {
    if (englishValue && lastSelected !== englishValue) {
      getTransliterateSuggestions(englishValue).then(setSuggestions);
    }
  }, [englishValue, lastSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setLastSelected(""); // Reset last selected suggestion
  };

  const handleSuggestionClick = (odia: string, english: string) => {
    onChange(`${odia} - ${english}`);
    setLastSelected(english);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={englishValue} // Show only English part
        onChange={handleChange}
        className={`px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-amber-500 ${className}`}
        placeholder={placeholder}
        required={isRequired}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-md">
          {suggestions
            .filter(([_, eng]) => eng !== lastSelected)
            .map(([odia, english], idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(odia, english)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {english} - {odia}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default LangInput;
