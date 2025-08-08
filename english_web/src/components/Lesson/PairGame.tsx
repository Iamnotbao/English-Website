import React, { useState } from "react";
import styles from "./PairGame.module.css"; // CSS Module

type Pair = {
  word: string;
  meaning: string;
};

const wordPairs: Pair[] = [
  { word: "Apple", meaning: "A fruit" },
  { word: "Run", meaning: "To move quickly on foot" },
  { word: "Book", meaning: "A collection of pages" },
  { word: "Happy", meaning: "Feeling good" },
];

export default function PairGame() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matched, setMatched] = useState<Pair[]>([]);
  const [score, setScore] = useState(0);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  const handleMeaningClick = (meaning: string) => {
    if (!selectedWord) return;
    const pair = wordPairs.find(
      (p) => p.word === selectedWord && p.meaning === meaning
    );
    if (pair) {
      setMatched([...matched, pair]);
      setScore(score + 1);
    }
    setSelectedWord(null);
  };

  return (
    <div className={styles.container}>
      <h2>Vocabulary Match Game</h2>
      <p>Score: {score}</p>

      <div className={styles.grid}>
        <div>
          <h3>Words</h3>
          {wordPairs.map((pair) => (
            <button
              key={pair.word}
              className={
                matched.includes(pair) ? styles.disabled : styles.wordBtn
              }
              disabled={matched.includes(pair)}
              onClick={() => handleWordClick(pair.word)}
            >
              {pair.word}
            </button>
          ))}
        </div>

        <div>
          <h3>Meanings</h3>
          {wordPairs.map((pair) => (
            <button
              key={pair.meaning}
              className={
                matched.includes(pair) ? styles.disabled : styles.meaningBtn
              }
              disabled={matched.includes(pair)}
              onClick={() => handleMeaningClick(pair.meaning)}
            >
              {pair.meaning}
            </button>
          ))}
        </div>
      </div>

      {score === wordPairs.length && <p>🎉 You matched all words!</p>}
    </div>
  );
}
