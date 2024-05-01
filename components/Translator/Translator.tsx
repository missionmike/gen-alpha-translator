"use client";

import React, { useCallback, useRef, useState } from "react";

import { random } from "lodash";
import { translations } from "./data";

export const Translator = () => {
  const textRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const translateText = useCallback(() => {
    // Translate the input text as naturally as possible, using the translations object
    // and prefixing words with proper articles (a, an, the) where necessary.
    // Some translations object entries are actually phrases and may include multiple words.
    // If a translation is not found, return the original word.
    const phrases = Object.keys(translations).sort(
      (a, b) => b.length - a.length
    );
    const pattern = phrases
      .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const regex = new RegExp(`\\b(${pattern})\\b`, "gi");

    const initialPass = inputText.replace(regex, (match) => {
      const lowerCaseMatch = match.toLowerCase();
      const translation =
        translations[lowerCaseMatch]?.translations[random(0, 1)] ?? match;
      return translation;
    });

    setOutputText(initialPass);
  }, [inputText]);

  return (
    <section className="w-1/2">
      <div>
        <h1 className="p-4 text-center text-xl">
          Gen Z/Alpha Translator with the Most Rizz
        </h1>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          rows={6}
          cols={50}
          className="text-black p-4 resize-none w-full rounded-lg"
        />
      </div>
      <div className="text-center">
        <button
          onClick={translateText}
          className="bg-blue-500 text-white w-full p-4 rounded-lg mt-4"
        >
          Translate
        </button>
        {outputText ? (
          <div
            className="w-full bg-gray-50 rounded-lg p-4 mt-6 typewriter"
            ref={textRef}
          >
            <p>{outputText}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};
