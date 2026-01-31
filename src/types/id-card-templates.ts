// ID Card Template System - Types and Configurations

export interface IDCardTemplate {
  id: string;
  name: string;
  description: string;
  category: 'corporate' | 'event' | 'creative' | 'minimal';
  thumbnail?: string;
  isPremium?: boolean;
  
  // Template styling
  style: {
    layout: 'vertical' | 'horizontal';
    hasPattern: boolean;
    patternType?: 'geometric' | 'grid' | 'dots' | 'waves';
    frontBackDifferent: boolean;
  };
  
  // Default customization values
  defaultColors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  
  features: string[];
}

export interface IDCardCustomization {
  templateId: string;
  
  // Brand colors synced from company branding
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  
  // Layout options
  layout: {
    showPattern: boolean;
    showCompanyLogo: boolean;
    showQRCode: boolean;
    photoSize: 'small' | 'medium' | 'large';
    photoShape: 'circle' | 'square' | 'rounded';
  };
  
  // Typography
  typography: {
    fontFamily: 'inter' | 'poppins' | 'playfair' | 'roboto' | 'montserrat';
    nameFontSize: 'small' | 'medium' | 'large';
    titleFontWeight: 'normal' | 'bold' | 'black';
  };
  
  // Additional options
  options: {
    showBadge: boolean;
    badgeText: string;
    showVerifiedIcon: boolean;
    cardMaterial: 'matte' | 'glossy' | 'metallic';
  };
}

// Predefined ID Card Templates
export const ID_CARD_TEMPLATES: IDCardTemplate[] = [
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Clean professional design with company branding',
    category: 'corporate',
    style: {
      layout: 'vertical',
      hasPattern: false,
      frontBackDifferent: true,
    },
    defaultColors: {
      primary: '#1e293b',
      secondary: '#64748b',
      background: '#ffffff',
      text: '#1e293b',
      accent: '#3b82f6',
    },
    features: ['Clean Layout', 'Company Logo', 'QR Code Back'],
  },
  {
    id: 'geometric-modern',
    name: 'Geometric Modern',
    description: 'Bold geometric patterns with vibrant colors',
    category: 'creative',
    style: {
      layout: 'vertical',
      hasPattern: true,
      patternType: 'geometric',
      frontBackDifferent: true,
    },
    defaultColors: {
      primary: '#0ea5e9',
      secondary: '#22d3d1',
      background: '#0f172a',
      text: '#ffffff',
      accent: '#22d3d1',
    },
    features: ['Geometric Pattern', 'Bold Typography', 'Modern Look'],
    isPremium: true,
  },
  {
    id: 'event-badge',
    name: 'Event Badge',
    description: 'Conference and event style with role designation',
    category: 'event',
    style: {
      layout: 'vertical',
      hasPattern: false,
      frontBackDifferent: false,
    },
    defaultColors: {
      primary: '#18181b',
      secondary: '#71717a',
      background: '#fafafa',
      text: '#18181b',
      accent: '#18181b',
    },
    features: ['Role Badge', 'Event Style', 'Lanyard Ready'],
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Ultra-clean design focusing on essential info',
    category: 'minimal',
    style: {
      layout: 'vertical',
      hasPattern: false,
      frontBackDifferent: true,
    },
    defaultColors: {
      primary: '#f5f5f4',
      secondary: '#a8a29e',
      background: '#fafaf9',
      text: '#1c1917',
      accent: '#292524',
    },
    features: ['Minimal Design', 'Essential Info', 'Elegant Look'],
  },
  {
    id: 'neon-dark',
    name: 'Neon Dark',
    description: 'Dark theme with neon accents',
    category: 'creative',
    style: {
      layout: 'vertical',
      hasPattern: true,
      patternType: 'grid',
      frontBackDifferent: true,
    },
    defaultColors: {
      primary: '#18181b',
      secondary: '#27272a',
      background: '#09090b',
      text: '#fafafa',
      accent: '#a855f7',
    },
    features: ['Dark Theme', 'Neon Accents', 'Tech Style'],
    isPremium: true,
  },
  {
    id: 'bold-creative',
    name: 'Bold Creative',
    description: 'Eye-catching design with bold colors and patterns',
    category: 'creative',
    style: {
      layout: 'vertical',
      hasPattern: true,
      patternType: 'geometric',
      frontBackDifferent: true,
    },
    defaultColors: {
      primary: '#2563eb',
      secondary: '#dbeafe',
      background: '#1d4ed8',
      text: '#ffffff',
      accent: '#facc15',
    },
    features: ['Bold Colors', 'Creative Patterns', 'Stand Out'],
    isPremium: true,
  },
];

// Default customization settings
export const DEFAULT_CUSTOMIZATION: IDCardCustomization = {
  templateId: 'corporate-classic',
  colors: {
    primary: '#1e293b',
    secondary: '#64748b',
    background: '#ffffff',
    text: '#1e293b',
    accent: '#3b82f6',
  },
  layout: {
    showPattern: true,
    showCompanyLogo: true,
    showQRCode: true,
    photoSize: 'medium',
    photoShape: 'rounded',
  },
  typography: {
    fontFamily: 'inter',
    nameFontSize: 'medium',
    titleFontWeight: 'bold',
  },
  options: {
    showBadge: false,
    badgeText: '',
    showVerifiedIcon: true,
    cardMaterial: 'matte',
  },
};

// Helper to generate brand-synced customization
export const syncWithBrandColors = (
  customization: IDCardCustomization,
  brandColors: { primary?: string; secondary?: string; accent?: string }
): IDCardCustomization => {
  return {
    ...customization,
    colors: {
      ...customization.colors,
      primary: brandColors.primary || customization.colors.primary,
      secondary: brandColors.secondary || customization.colors.secondary,
      accent: brandColors.accent || customization.colors.accent,
    },
  };
};

// Get template by ID
export const getTemplateById = (id: string): IDCardTemplate | undefined => {
  return ID_CARD_TEMPLATES.find(t => t.id === id);
};
