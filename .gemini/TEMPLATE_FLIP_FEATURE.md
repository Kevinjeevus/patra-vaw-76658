# Template Flip Feature Implementation

## Overview
Implemented flip functionality in the Studio X Template Selector preview and added default back side elements for templates without back side configurations.

## Changes Made

### 1. **StudioXTemplateSelector.tsx** - Preview Flip Functionality

#### Added State Management
- Added `previewSide` state to track which side (front/back) is being previewed
- State resets to 'front' when preview dialog is closed

#### Enhanced Preview Dialog
- **Front/Back Toggle Buttons**: Added button group to switch between front and back views
- **Flip Icon Button**: Added a flip icon button (FlipHorizontal) for quick toggling
- **Dynamic Preview**: Preview now shows the appropriate side based on `previewSide` state

#### Default Back Side Elements
When a template doesn't have back side elements configured, the system automatically displays and applies these default elements:

1. **Company Logo**
   - Position: Top-left (20, 20)
   - Size: 60x60
   - Rounded corners (borderRadius: 8)
   - Data field: `company_logo_url`

2. **QR Code**
   - Position: Center (135, 72)
   - Size: 70x70
   - White background with padding
   - Data field: `vanity_url`

3. **Patra Text**
   - Position: Below QR code (120, 160)
   - Size: 100x24
   - Font: 16px, semibold
   - Content: "patra"
   - Color: #1e293b (dark gray)

### 2. **Template Selection Logic**

#### Enhanced `handleSelectTemplate` Function
- Checks if template has back side elements
- If no back elements exist:
  - Creates default back elements (logo, QR, patra)
  - Creates enhanced template with default back configuration
  - Applies enhanced template
- If back elements exist:
  - Applies template as-is

#### Visual Feedback
- Shows "(Default back side)" indicator when viewing auto-generated back side
- Indicator appears in preview dialog when back side is shown and has no custom elements

## User Experience

### Preview Flow
1. User clicks on a template to preview
2. Preview dialog opens showing the front side by default
3. User can:
   - Click "Front" or "Back" buttons to switch views
   - Click the flip icon to toggle between sides
   - See default back side if template doesn't have one configured

### Template Application
1. When user applies a template without back side elements:
   - System automatically adds logo, QR code, and "patra" text to back side
   - User gets a complete two-sided card design
2. When user applies a template with back side elements:
   - Template is applied exactly as designed

## Benefits

1. **Better Preview Experience**: Users can see both sides before applying
2. **Consistent Back Sides**: Templates without back designs get sensible defaults
3. **Professional Appearance**: All cards have both front and back sides designed
4. **User-Friendly**: Clear visual indicators and easy flip controls

## Technical Details

- **Component**: `StudioXTemplateSelector.tsx`
- **Location**: `src/components/design-studio/`
- **Dependencies**: 
  - `FlipHorizontal` icon from lucide-react
  - Existing UI components (Button, Dialog)
- **State Management**: React useState hooks
- **Type Safety**: Full TypeScript typing with DesignTemplate interface
