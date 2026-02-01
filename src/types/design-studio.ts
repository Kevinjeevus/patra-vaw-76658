// ID Card Design Studio Types

export type ElementType = 
  | 'company_logo'
  | 'profile_photo'
  | 'name'
  | 'designation'
  | 'employee_id'
  | 'department'
  | 'email'
  | 'phone'
  | 'qr_code'
  | 'custom_text'
  | 'shape'
  | 'divider';

export interface ElementStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  opacity?: number;
  textAlign?: 'left' | 'center' | 'right';
  padding?: number;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  style: ElementStyle;
  content?: string; // For custom text
  dataField?: string; // Maps to actual data
  locked?: boolean;
  visible?: boolean;
  zIndex: number;
}

export interface CanvasBackground {
  type: 'color' | 'gradient' | 'image' | 'pattern';
  value: string;
  secondaryValue?: string; // For gradients
  gradientDirection?: string;
  patternType?: string;
}

export interface CardDimensions {
  width: number;
  height: number;
  orientation: 'horizontal' | 'vertical';
}

export interface DesignTemplate {
  id: string;
  created_by: string;
  name: string;
  description?: string;
  thumbnail_url?: string;
  canvas_config: any;
  elements: CanvasElement[];
  background: CanvasBackground;
  card_dimensions: CardDimensions;
  is_published: boolean;
  is_public: boolean;
  use_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  creator_name?: string;
  creator_avatar?: string;
}

export const DEFAULT_ELEMENTS: Partial<Record<ElementType, Omit<CanvasElement, 'id' | 'zIndex'>>> = {
  company_logo: {
    type: 'company_logo',
    label: 'Company Logo',
    x: 20,
    y: 20,
    width: 60,
    height: 60,
    style: {
      borderRadius: 8,
    },
    dataField: 'company_logo_url',
  },
  profile_photo: {
    type: 'profile_photo',
    label: 'Profile Photo',
    x: 140,
    y: 60,
    width: 80,
    height: 80,
    style: {
      borderRadius: 40,
      borderWidth: 2,
      borderColor: '#3b82f6',
    },
    dataField: 'avatar_url',
  },
  name: {
    type: 'name',
    label: 'Full Name',
    x: 20,
    y: 150,
    width: 180,
    height: 30,
    style: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1e293b',
      textAlign: 'center',
    },
    dataField: 'display_name',
  },
  designation: {
    type: 'designation',
    label: 'Designation',
    x: 20,
    y: 180,
    width: 180,
    height: 24,
    style: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#64748b',
      textAlign: 'center',
    },
    dataField: 'job_title',
  },
  employee_id: {
    type: 'employee_id',
    label: 'Employee ID',
    x: 20,
    y: 210,
    width: 100,
    height: 20,
    style: {
      fontSize: 12,
      color: '#94a3b8',
      textAlign: 'left',
    },
    dataField: 'employee_display_id',
  },
  department: {
    type: 'department',
    label: 'Department',
    x: 20,
    y: 230,
    width: 120,
    height: 20,
    style: {
      fontSize: 12,
      color: '#64748b',
    },
    dataField: 'department',
  },
  email: {
    type: 'email',
    label: 'Email',
    x: 20,
    y: 250,
    width: 160,
    height: 18,
    style: {
      fontSize: 11,
      color: '#64748b',
    },
    dataField: 'email',
  },
  phone: {
    type: 'phone',
    label: 'Phone',
    x: 20,
    y: 270,
    width: 120,
    height: 18,
    style: {
      fontSize: 11,
      color: '#64748b',
    },
    dataField: 'phone',
  },
  qr_code: {
    type: 'qr_code',
    label: 'QR Code',
    x: 260,
    y: 140,
    width: 70,
    height: 70,
    style: {
      backgroundColor: '#ffffff',
      padding: 4,
    },
    dataField: 'vanity_url',
  },
  custom_text: {
    type: 'custom_text',
    label: 'Custom Text',
    x: 100,
    y: 100,
    width: 120,
    height: 24,
    style: {
      fontSize: 14,
      color: '#1e293b',
      textAlign: 'center',
    },
    content: 'Custom Text',
  },
  shape: {
    type: 'shape',
    label: 'Shape',
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    style: {
      backgroundColor: '#3b82f6',
      borderRadius: 8,
      opacity: 0.2,
    },
  },
  divider: {
    type: 'divider',
    label: 'Divider',
    x: 20,
    y: 145,
    width: 180,
    height: 2,
    style: {
      backgroundColor: '#e2e8f0',
    },
  },
};

export const ELEMENT_ICONS: Record<ElementType, string> = {
  company_logo: 'Building2',
  profile_photo: 'User',
  name: 'Type',
  designation: 'Briefcase',
  employee_id: 'Hash',
  department: 'Users',
  email: 'Mail',
  phone: 'Phone',
  qr_code: 'QrCode',
  custom_text: 'Text',
  shape: 'Square',
  divider: 'Minus',
};

export const FONT_FAMILIES = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Playfair Display', label: 'Playfair Display' },
];

export const DEFAULT_CARD_DIMENSIONS: CardDimensions = {
  width: 340,
  height: 214,
  orientation: 'horizontal',
};

export const VERTICAL_CARD_DIMENSIONS: CardDimensions = {
  width: 214,
  height: 340,
  orientation: 'vertical',
};
