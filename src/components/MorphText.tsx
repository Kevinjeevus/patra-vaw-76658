import React, { useState, useEffect } from 'react';

interface MorphTextProps {
  words: string[];
  baseText: string;
  className?: string;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export const MorphText: React.FC<MorphTextProps> = ({ words, baseText, className = '' }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const [isMorphing, setIsMorphing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMorphing(true);
      morphToNext();
    }, 4000); // Slower animation interval

    return () => clearInterval(interval);
  }, [currentWordIndex]);

  const morphToNext = () => {
    const currentWord = words[currentWordIndex];
    const nextWordIndex = (currentWordIndex + 1) % words.length;
    const nextWord = words[nextWordIndex];
    const maxLength = Math.max(currentWord.length, nextWord.length);
    let frame = 0;
    const frameDuration = 50; // Slower frame duration
    const morphFrames = 30; // More frames for smoother, slower animation

    const morphInterval = setInterval(() => {
      if (frame >= morphFrames) {
        clearInterval(morphInterval);
        setDisplayText(nextWord);
        setCurrentWordIndex(nextWordIndex);
        setIsMorphing(false);
        return;
      }

      let morphedText = '';
      for (let i = 0; i < maxLength; i++) {
        const progress = frame / morphFrames;
        
        if (i < nextWord.length && progress > 0.5) {
          // Reveal next word
          if (Math.random() > (1 - progress)) {
            morphedText += nextWord[i];
          } else {
            morphedText += characters[Math.floor(Math.random() * characters.length)];
          }
        } else if (i < currentWord.length && progress < 0.5) {
          // Encrypt current word
          if (Math.random() > progress * 2) {
            morphedText += currentWord[i];
          } else {
            morphedText += characters[Math.floor(Math.random() * characters.length)];
          }
        } else {
          morphedText += characters[Math.floor(Math.random() * characters.length)];
        }
      }

      setDisplayText(morphedText);
      frame++;
    }, frameDuration);
  };

  return (
    <>
      {baseText}
      <span className={`${className} ${isMorphing ? 'text-green-500' : ''} transition-colors duration-300`}>{displayText}</span>
    </>
  );
};
