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
  | 'address'
  | 'blood_group'
  | 'joining_date'
  | 'expiry_date'
  | 'qr_code'
  | 'barcode'
  | 'signature'
  | 'custom_text'
  | 'shape'
  | 'divider'
  | 'line'
  | 'icon'
  | 'badge'
  | 'image';

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
  letterSpacing?: number;
  lineHeight?: number;
  textShadow?: string;
  textStroke?: string;
  gradientText?: boolean;
  gradientTextColors?: string;
  dropShadow?: string;
  rotation?: number;
  flipX?: boolean;
  flipY?: boolean;
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
  content?: string;
  dataField?: string;
  qrContentType?: 'url' | 'employee_id';
  locked?: boolean;
  visible?: boolean;
  zIndex: number;
  aiStylizationEnabled?: boolean;
  aiPrompt?: string;
  groupId?: string;
  imageUrl?: string;
}

export interface CanvasBackground {
  type: 'color' | 'gradient' | 'image' | 'pattern';
  value: string;
  secondaryValue?: string;
  gradientDirection?: string;
  patternType?: string;
  opacity?: number;
  blur?: number;
  overlayColor?: string;
}

export interface CardDimensions {
  width: number;
  height: number;
  orientation: 'horizontal' | 'vertical';
  unit?: 'px' | 'mm' | 'cm';
}

export type CardSizePreset = {
  name: string;
  width: number;
  height: number;
  description: string;
};

export const CARD_SIZE_PRESETS: CardSizePreset[] = [
  { name: 'CR80 (Standard ID)', width: 340, height: 214, description: '85.6 × 53.98 mm' },
  { name: 'CR80 Vertical', width: 214, height: 340, description: '53.98 × 85.6 mm' },
  { name: 'A7', width: 298, height: 420, description: '74 × 105 mm' },
  { name: 'A7 Landscape', width: 420, height: 298, description: '105 × 74 mm' },
  { name: 'Business Card', width: 350, height: 200, description: '3.5 × 2 in' },
  { name: 'Credit Card', width: 340, height: 214, description: '85.6 × 53.98 mm' },
  { name: 'Custom', width: 340, height: 214, description: 'Set custom dimensions' },
];

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
  creator_name?: string;
  creator_avatar?: string;
  category?: string;
}

export interface UndoRedoState {
  past: DesignSnapshot[];
  present: DesignSnapshot;
  future: DesignSnapshot[];
}

export interface DesignSnapshot {
  elements: CanvasElement[];
  background: CanvasBackground;
}

export const DEFAULT_ELEMENTS: Partial<Record<ElementType, Omit<CanvasElement, 'id' | 'zIndex'>>> = {
  company_logo: {
    type: 'company_logo',
    label: 'Company Logo',
    x: 20, y: 20, width: 60, height: 60,
    style: { borderRadius: 8 },
    dataField: 'company_logo_url',
  },
  profile_photo: {
    type: 'profile_photo',
    label: 'Profile Photo',
    x: 140, y: 60, width: 80, height: 80,
    style: { borderRadius: 40, borderWidth: 2, borderColor: '#3b82f6' },
    dataField: 'avatar_url',
  },
  name: {
    type: 'name',
    label: 'Full Name',
    x: 20, y: 150, width: 180, height: 30,
    style: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' },
    dataField: 'display_name',
  },
  designation: {
    type: 'designation',
    label: 'Designation',
    x: 20, y: 180, width: 180, height: 24,
    style: { fontSize: 14, fontWeight: 'normal', color: '#64748b', textAlign: 'center' },
    dataField: 'job_title',
  },
  employee_id: {
    type: 'employee_id',
    label: 'Employee ID',
    x: 20, y: 210, width: 100, height: 20,
    style: { fontSize: 12, color: '#94a3b8', textAlign: 'left' },
    dataField: 'employee_display_id',
  },
  department: {
    type: 'department',
    label: 'Department',
    x: 20, y: 230, width: 120, height: 20,
    style: { fontSize: 12, color: '#64748b' },
    dataField: 'department',
  },
  email: {
    type: 'email',
    label: 'Email',
    x: 20, y: 250, width: 160, height: 18,
    style: { fontSize: 11, color: '#64748b' },
    dataField: 'email',
  },
  phone: {
    type: 'phone',
    label: 'Phone',
    x: 20, y: 270, width: 120, height: 18,
    style: { fontSize: 11, color: '#64748b' },
    dataField: 'phone',
  },
  address: {
    type: 'address',
    label: 'Address',
    x: 20, y: 250, width: 180, height: 24,
    style: { fontSize: 10, color: '#64748b', textAlign: 'left' },
    dataField: 'address',
  },
  blood_group: {
    type: 'blood_group',
    label: 'Blood Group',
    x: 260, y: 20, width: 60, height: 20,
    style: { fontSize: 12, fontWeight: 'bold', color: '#ef4444', textAlign: 'center', backgroundColor: '#fef2f2', borderRadius: 4, padding: 2 },
    dataField: 'blood_group',
  },
  joining_date: {
    type: 'joining_date',
    label: 'Joining Date',
    x: 20, y: 280, width: 100, height: 18,
    style: { fontSize: 10, color: '#94a3b8' },
    dataField: 'joining_date',
  },
  expiry_date: {
    type: 'expiry_date',
    label: 'Expiry Date',
    x: 130, y: 280, width: 100, height: 18,
    style: { fontSize: 10, color: '#ef4444' },
    dataField: 'expiry_date',
  },
  qr_code: {
    type: 'qr_code',
    label: 'QR Code',
    x: 260, y: 140, width: 70, height: 70,
    style: { backgroundColor: '#ffffff', padding: 4 },
    dataField: 'vanity_url',
  },
  barcode: {
    type: 'barcode',
    label: 'Barcode',
    x: 20, y: 290, width: 160, height: 40,
    style: { backgroundColor: '#ffffff', padding: 4 },
    dataField: 'employee_display_id',
  },
  signature: {
    type: 'signature',
    label: 'Signature',
    x: 200, y: 260, width: 100, height: 40,
    style: { borderRadius: 4 },
    dataField: 'signature_url',
  },
  custom_text: {
    type: 'custom_text',
    label: 'Custom Text',
    x: 100, y: 100, width: 120, height: 24,
    style: { fontSize: 14, color: '#1e293b', textAlign: 'center' },
    content: 'Custom Text',
  },
  shape: {
    type: 'shape',
    label: 'Shape',
    x: 50, y: 50, width: 100, height: 50,
    style: { backgroundColor: '#3b82f6', borderRadius: 8, opacity: 0.2 },
  },
  divider: {
    type: 'divider',
    label: 'Divider',
    x: 20, y: 145, width: 180, height: 2,
    style: { backgroundColor: '#e2e8f0' },
  },
  line: {
    type: 'line',
    label: 'Line',
    x: 20, y: 145, width: 180, height: 1,
    style: { backgroundColor: '#cbd5e1' },
  },
  icon: {
    type: 'icon',
    label: 'Icon',
    x: 50, y: 50, width: 32, height: 32,
    style: { color: '#3b82f6' },
    content: 'star',
  },
  badge: {
    type: 'badge',
    label: 'Badge',
    x: 250, y: 10, width: 60, height: 24,
    style: { backgroundColor: '#10b981', color: '#ffffff', borderRadius: 12, fontSize: 10, fontWeight: 'bold', textAlign: 'center', padding: 4 },
    content: 'VERIFIED',
  },
  image: {
    type: 'image',
    label: 'Image',
    x: 50, y: 50, width: 100, height: 80,
    style: { borderRadius: 4 },
    imageUrl: '',
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
  address: 'MapPin',
  blood_group: 'Heart',
  joining_date: 'Calendar',
  expiry_date: 'CalendarX',
  qr_code: 'QrCode',
  barcode: 'Barcode',
  signature: 'PenTool',
  custom_text: 'Text',
  shape: 'Square',
  divider: 'Minus',
  line: 'Minus',
  icon: 'Star',
  badge: 'Shield',
  image: 'Image',
};

export const FONT_FAMILIES = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Oswald', label: 'Oswald' },
  { value: 'Raleway', label: 'Raleway' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro' },
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Merriweather', label: 'Merriweather' },
  { value: 'PT Serif', label: 'PT Serif' },
  { value: 'Ubuntu', label: 'Ubuntu' },
  { value: 'Rubik', label: 'Rubik' },
  { value: 'Work Sans', label: 'Work Sans' },
  { value: 'Fira Sans', label: 'Fira Sans' },
  { value: 'Quicksand', label: 'Quicksand' },
  { value: 'Barlow', label: 'Barlow' },
  { value: 'DM Sans', label: 'DM Sans' },
];

export const DEFAULT_CARD_DIMENSIONS: CardDimensions = {
  width: 340,
  height: 214,
  orientation: 'horizontal',
  unit: 'px',
};

export const VERTICAL_CARD_DIMENSIONS: CardDimensions = {
  width: 214,
  height: 340,
  orientation: 'vertical',
  unit: 'px',
};

export const TEMPLATE_CATEGORIES = [
  'Corporate',
  'School',
  'Hospital',
  'Event',
  'Government',
  'Security Badge',
  'Custom',
] as const;
