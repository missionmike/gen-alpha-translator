"use client";

import React, { useState, useEffect, useCallback } from "react";
import { random } from "lodash";

// const translations: { [key: string]: string[] } = {
//   skibidi: ["subpar", "crappy"],
//   toilet: ["garbage", "bad"],
//   rizz: ["style", "charm", "game"],
//   "fanum tax": ["sharing", "feasting"],
//   gyat: ["excitement", "enthusiasm"],
//   "ratio’d": ["controversial", "provocative"],
//   "cap and no cap": ["exaggerating", "truthful"],
//   goated: ["greatest", "unbeatable"],
//   "big yikes": ["awkward", "embarrassing"],
//   "sigma male": ["self-reliant", "loner"],
//   "it’s giving": ["expressive", "vibing"],
// };

const translations: {
  [key: string]: { matches: string[]; translations: string[] };
} = {
  skibidi: {
    matches: ["skibidi", "skibi"],
    translations: ["subpar", "crappy"],
  },
  toilet: { matches: ["toilet", "loo"], translations: ["garbage", "bad"] },
  rizz: { matches: ["rizz"], translations: ["style", "charm", "game"] },
  "fanum tax": {
    matches: ["fanum tax"],
    translations: ["sharing", "feasting"],
  },
  gyat: {
    matches: ["gyat", "gyatt"],
    translations: ["excitement", "enthusiasm"],
  },
  ratiod: {
    matches: ["ratiod", "ratioed"],
    translations: ["controversial", "provocative"],
  },
  cap: {
    matches: ["cap"],
    translations: ["exaggerated", "unreal"],
  },
  "no cap": {
    matches: ["no cap"],
    translations: ["truthful", "real"],
  },
  goated: {
    matches: ["goated"],
    translations: ["greatest", "unbeatable"],
  },
  "big yikes": {
    matches: ["big yikes"],
    translations: ["awkward", "embarrassing"],
  },
  sigma: {
    matches: ["sigma"],
    translations: ["self-reliant", "loner"],
  },
  "it's giving": {
    matches: ["its giving", "its givin"],
    translations: ["seems like", "reminds me of"],
  },
};

export const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Write a function that translates the input text
  const translateText = useCallback(() => {
    let translatedText = inputText;
    for (const [key, value] of Object.entries(translations)) {
      for (const match of value.matches) {
        const regex = new RegExp(match, "gi");
        translatedText = translatedText.replace(
          regex,
          value.translations[random(0, value.translations.length - 1)]
        );
      }
    }
    setOutputText(translatedText);
  }, [inputText]);

  useEffect(() => {
    translateText();
  }, [inputText, translateText]);

  return (
    <div>
      <h1>Generation Alpha Translator</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
        rows={6}
        cols={50}
        className="text-black"
      />
      <h2>Translated Text:</h2>
      <div>{outputText}</div>
    </div>
  );
};
