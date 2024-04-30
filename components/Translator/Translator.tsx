"use client";

import "./Translator.css";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { random } from "lodash";
import { translations } from "./data";

export const Translator = () => {
  const textRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  useEffect(() => {
    if (!textRef.current) return;

    textRef.current.classList.remove("typewriter");
    void textRef.current.offsetWidth; // trigger a reflow
    textRef.current.classList.add("typewriter");
  }, [outputText]);

  const translateText = useCallback(() => {
    // Translate the input text as naturally as possible, using the translations object
    // and prefixing words with proper articles (a, an, the) where necessary.
    // Some translations object entries are actually phrases and may include multiple words.
    // If a translation is not found, return the original word.
    const translatedWords = inputText.split(" ").map((word) => {
      const lowerCaseWord = word.toLowerCase();
      const translation =
        Object.entries(translations).find(([key, value]) =>
          value.matches.includes(lowerCaseWord)
        )?.[1].translations[random(0, 1)] ?? word;
      return translation;
    });
    const initialPass = translatedWords.join(" ");

    // Scan the translations object for matches of multiple words and replace them with the translation.
    // If a translation is not found, return the original phrase.
    const translatedPhrase = Object.entries(translations).reduce(
      (phrase, [key, value]) => {
        const lowerCasePhrase = phrase.toLowerCase();
        const translation = value.translations[random(0, 1)];
        return lowerCasePhrase.includes(key)
          ? lowerCasePhrase.replace(key, translation)
          : phrase;
      },
      initialPass
    );

    setOutputText(translatedPhrase);
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
