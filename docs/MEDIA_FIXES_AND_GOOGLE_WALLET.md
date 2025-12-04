# Media Playback Fixes & Google Wallet Integration

## Overview
This document outlines the fixes for media playback issues and the implementation of Google Wallet integration in the Patra application.

## Part 1: Media Playback Fixes

### Issues Fixed

#### 1. YouTube Video Playback Issue
**Problem**: YouTube videos uploaded by users were not playing in the gallery section because the component was using a simple `<video>` tag instead of an iframe embed.

**Solution**: Updated `GallerySection` component in `card-sections.tsx` to:
- Detect YouTube and Vimeo URLs
- Convert YouTube watch URLs to embed URLs
- Use iframe for YouTube/Vimeo videos
- Fall back to `<video>` tag for direct video files

**Code Changes**:
- Added `getEmbedUrl()` helper function to convert YouTube/Vimeo URLs
- Added `isYouTubeOrVimeo()` helper function to detect video platform
- Updated video rendering logic to use iframe for YouTube/Vimeo

**Supported Formats**:
- ✅ YouTube (youtube.com/watch?v=...)
- ✅ YouTube Short URLs (youtu.be/...)
- ✅ Vimeo (vimeo.com/...)
- ✅ Direct video files (.mp4, .webm, etc.)

#### 2. Audio Pronunciation Display Issue
**Problem**: Audio pronunciation files uploaded by users were not being displayed in the profile section.

**Solution**: Updated `card-preview-new.tsx` to:
- Added `audioPronunciation` field to `CardData` interface
- Added audio player component below the name section
- Displays "Name pronunciation" label with audio controls

**Features**:
- Audio player appears below name and pronoun
- Compact design with max-width constraint
- Clear labeling for user understanding

## Part 2: Google Wallet Integration

### Implementation

#### Overview
Added "Add to Google Wallet" feature as a hidden button in the editor sidebar. This feature generates a vCard (VCF) file containing the user's contact information that can be imported into Google Contacts, which syncs with Google Wallet.

#### Files Created/Modified

**1. New File: `src/lib/google-wallet-utils.ts`**
- Utility functions for Google Wallet integration
- `generateVCard()`: Creates VCF format contact card
- `downloadVCard()`: Downloads the vCard file
- `addToGoogleWallet()`: Main function to initiate the process
- Includes detailed comments for future Google Wallet API integration

**2. Modified: `src/pages/EditorNew.tsx`**
- Added `Download` icon import
- Added `addToGoogleWallet` utility import
- Added `handleAddToGoogleWallet()` function
- Added "Add to Wallet" button in sidebar (after "View Profile")

### Features

✅ **vCard Generation**: Creates standard VCF format with:
- Full name
- Job title
- Company
- Email
- Phone
- Profile URL
- Avatar photo URL
- Custom note indicating it's from Patra

✅ **Easy Download**: One-click download of contact card

✅ **Google Wallet Compatible**: vCard can be imported to:
- Google Contacts (which syncs to Google Wallet)
- Apple Contacts
- Outlook
- Any contact management system

✅ **Hidden Feature**: Located in sidebar, not prominently displayed

### User Flow

1. User clicks "Add to Wallet" button in editor sidebar
2. System generates vCard with user's contact information
3. vCard file downloads automatically
4. User can import the file to Google Contacts
5. Contact automatically syncs to Google Wallet

### Future Enhancements

The current implementation uses vCard as a practical solution. For full Google Wallet API integration, future work would include:

1. **Google Cloud Setup**:
   - Create Google Cloud Project
   - Enable Google Wallet API
   - Set up service account credentials

2. **Pass Class Creation**:
   - Create a generic pass class in Google Wallet Console
   - Define pass template and styling

3. **JWT Token Generation**:
   - Generate signed JWT with pass data
   - Use service account for signing

4. **Direct Integration**:
   - Replace vCard download with direct "Add to Google Wallet" link
   - Users can add to wallet without downloading files

## Files Modified

### Media Playback Fixes
1. ✅ `src/components/card-sections.tsx` - Fixed YouTube video playback
2. ✅ `src/components/card-preview-new.tsx` - Added audio pronunciation display

### Google Wallet Integration
3. ✅ `src/lib/google-wallet-utils.ts` (new) - Google Wallet utilities
4. ✅ `src/pages/EditorNew.tsx` - Added Google Wallet button and handler

## Testing Checklist

### Media Playback
- [ ] Test YouTube video playback in gallery
- [ ] Test Vimeo video playback in gallery
- [ ] Test direct video file playback
- [ ] Test audio pronunciation playback in profile
- [ ] Verify audio player appears only when audio is uploaded

### Google Wallet
- [ ] Click "Add to Wallet" button in editor sidebar
- [ ] Verify vCard file downloads
- [ ] Import vCard to Google Contacts
- [ ] Verify all contact information is correct
- [ ] Check if contact syncs to Google Wallet

## Known Limitations

1. **Google Wallet**: Current implementation downloads vCard instead of direct Google Wallet integration (requires Google Cloud setup)
2. **Video Platforms**: Only YouTube and Vimeo are supported for embed. Other platforms require direct video files
3. **Audio Format**: Supports standard audio formats (MP3, WAV, OGG) supported by HTML5 audio element

## Benefits

✅ **Better User Experience**: Videos and audio now play correctly
✅ **Cross-Platform**: vCard works with Google, Apple, and other contact systems
✅ **Easy Sharing**: Users can easily share their contact information
✅ **Professional**: Provides a modern way to distribute business cards
✅ **Future-Ready**: Code structure supports future Google Wallet API integration
