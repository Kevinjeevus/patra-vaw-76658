# Final UI Improvements - Implementation Guide

## Tasks Remaining

### 1. Audio Player with Circular Progress ⏳
### 2. Gallery Layout: 1-2 Images Per Row ⏳  
### 3. Mobile Header Dropdown Background ⏳

---

## Task 1: Audio Player with Circular Progress

### Create AudioPlayer Component

**File**: `src/components/AudioPlayer.tsx` (NEW FILE)

```tsx
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
```

### Update card-preview-new.tsx

**File**: `src/components/card-preview-new.tsx`

**Add import** (around line 1-30):
```tsx
import { AudioPlayer } from './AudioPlayer';
import { Play, Pause } from 'lucide-react'; // Add to existing lucide imports
```

**Replace the audio section** (around line 291-320):
```tsx
{/* Name and basic info */}
<div className="mb-6">
  <div className="flex items-center gap-2">
    <h2 className="text-2xl font-bold text-card-foreground">{displayName}</h2>
    
    {/* Audio Pronunciation Player with Circular Progress */}
    {cardData.audioPronunciation && (
      <AudioPlayer audioUrl={cardData.audioPronunciation} />
    )}
  </div>

  {cardData.jobTitle && (
    <p className="text-base text-muted-foreground mb-2 mt-1">
      {displayTitle}
      {cardData.company && <span className="font-medium"> at {displayCompany}</span>}
    </p>
  )}

  <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
    {cardData.pronoun && (
      <span className="text-foreground/70">{cardData.pronoun}</span>
    )}
  </div>
</div>
```

---

## Task 2: Gallery Layout - 1-2 Images Per Row

**File**: `src/components/card-sections.tsx`

**Find the gallery images grid** (around line 354):

**Change FROM**:
```tsx
{cardData.photos && cardData.photos.length > 0 && (
  <div className="grid grid-cols-2 gap-2">
```

**Change TO**:
```tsx
{cardData.photos && cardData.photos.length > 0 && (
  <div className={`grid gap-2 ${cardData.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
```

This will display:
- **1 image**: Full width (1 column)
- **2+ images**: 2 columns

---

## Task 3: Mobile Header Dropdown Background

### Find the Mobile Header Component

**Search in these files**:
1. `src/components/Header.tsx`
2. `src/pages/EditorNew.tsx` (mobile header section)
3. `src/pages/PublicProfile.tsx` (mobile header)

**Search for patterns**:
```bash
# In terminal
grep -r "mobile" src/components/*.tsx | grep -i "menu\|dropdown\|header"
grep -r "fixed.*top" src/components/*.tsx
grep -r "isMobile" src/pages/*.tsx
```

### Common Locations to Check:

#### Option 1: EditorNew.tsx Mobile Header
Look for mobile menu/dropdown around the top of the file where mobile navigation is defined.

**Add `bg-white dark:bg-background`** to the dropdown container.

Example:
```tsx
// BEFORE
<div className="fixed top-16 left-0 right-0 z-40 p-4">

// AFTER  
<div className="fixed top-16 left-0 right-0 z-40 p-4 bg-white dark:bg-background">
```

#### Option 2: Separate Header Component
If there's a `Header.tsx` or `MobileNav.tsx` component:

```tsx
// Look for dropdown/menu container
<div className="absolute top-full left-0 right-0 ...">

// Add bg-white
<div className="absolute top-full left-0 right-0 bg-white dark:bg-background shadow-lg ...">
```

#### Option 3: PublicProfile.tsx Mobile Header
Check the mobile header section (usually conditional with `isMobile`):

```tsx
{isMobile && (
  <div className="..."> // Add bg-white here
```

---

## Summary of Changes

### Files to Create:
1. ✅ `src/components/AudioPlayer.tsx` - NEW circular progress audio player

### Files to Modify:
1. ⏳ `src/components/card-preview-new.tsx` - Import and use AudioPlayer
2. ✅ `src/components/card-sections.tsx` - Gallery grid layout (1-2 columns)
3. ⏳ Mobile header component (need to locate)

---

## Testing Checklist

- [ ] Audio player shows play button initially
- [ ] Clicking play button starts audio and shows pause icon
- [ ] Circular progress animates around button as audio plays
- [ ] Clicking pause stops audio
- [ ] Progress resets when audio ends
- [ ] Gallery with 1 image shows full width
- [ ] Gallery with 2+ images shows 2 columns
- [ ] Mobile header dropdown has solid white background
- [ ] Dark mode: Mobile header dropdown has proper dark background

---

## Quick Implementation Steps

1. **Create AudioPlayer.tsx** with the code above
2. **Update card-preview-new.tsx**:
   - Add AudioPlayer import
   - Replace audio button section with AudioPlayer component
3. **Update card-sections.tsx**:
   - Change gallery grid to conditional columns
4. **Find and fix mobile header**:
   - Search for mobile dropdown/menu
   - Add `bg-white dark:bg-background` class

---

## If You Need Help Finding Mobile Header

Run these commands in terminal:
```bash
# Find files with mobile menu/dropdown
grep -rn "mobile" src/ --include="*.tsx" | grep -i "menu\|dropdown"

# Find fixed positioned elements (likely header/dropdown)
grep -rn "fixed" src/ --include="*.tsx" | grep "top-"

# Find isMobile usage
grep -rn "isMobile" src/ --include="*.tsx"
```

Then check those files for dropdown containers and add the background class.
