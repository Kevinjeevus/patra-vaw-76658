import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
    audioUrl: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(audioUrl);

        const audio = audioRef.current;

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
        };
    }, [audioUrl]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const circumference = 2 * Math.PI * 10; // radius = 10
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <button
            onClick={togglePlay}
            className="relative p-0.5 rounded-full hover:bg-accent transition-colors"
            title={isPlaying ? "Pause pronunciation" : "Play pronunciation"}
        >
            {/* Circular Progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 24 24">
                {/* Background circle */}
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted opacity-20"
                />
                {/* Progress circle */}
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="text-primary transition-all duration-300"
                    strokeLinecap="round"
                />
            </svg>

            {/* Play/Pause Icon */}
            <div className="relative z-10 p-1">
                {isPlaying ? (
                    <Pause className="w-3 h-3 text-primary fill-primary" />
                ) : (
                    <Play className="w-3 h-3 text-primary fill-primary" />
                )}
            </div>
        </button>
    );
};
