"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { random } from "lodash";
import { translations } from "./data";

export const Translator = () => {
  const textRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const translateText = useCallback(() => {
    const phrases = Object.keys(translations).sort(
      (a, b) => b.length - a.length
    );
    const pattern = phrases
      .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const regex = new RegExp(`\\b(${pattern})\\b`, "gi");

    const translation = inputText.replace(regex, (match) => {
      const lowerCaseMatch = match.toLowerCase();
      const translation =
        translations[lowerCaseMatch]?.translations[random(0, 1)] ?? match;
      return translation;
    });

    setOutputText(translation);
  }, [inputText]);

  return (
    <section className="w-full sm:w-1/2 p-6 sm:p-0">
      <div>
        <h1 className="p-4 text-center text-xl text-white">
          gen z/alpha translator with the most rizz
        </h1>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate, no cap..."
          rows={6}
          cols={50}
          className="text-black p-4 resize-none w-full rounded-lg"
        />
      </div>
      <div className="text-center">
        <button
          onClick={translateText}
          className="bg-purple-500 text-white w-full p-4 rounded-lg mt-4"
        >
          Translate
        </button>
        {outputText ? (
          <div className="w-full bg-gray-50 rounded-lg p-4 mt-6" ref={textRef}>
            <p>{outputText}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};
