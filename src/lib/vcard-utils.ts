/**
 * Utility functions for generating and downloading vCard files
 */

interface VCardData {
  name: string;
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  photo?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

/**
 * Generates a vCard (VCF) file content from card data
 */
export const generateVCard = (data: VCardData): string => {
  const vcard: string[] = [];
  
  // vCard header
  vcard.push('BEGIN:VCARD');
  vcard.push('VERSION:3.0');
  
  // Name (required)
  const nameParts = data.name.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');
  vcard.push(`N:${lastName};${firstName};;;`);
  vcard.push(`FN:${data.name}`);
  
  // Title and Organization
  if (data.title) {
    vcard.push(`TITLE:${data.title}`);
  }
  
  if (data.company) {
    vcard.push(`ORG:${data.company}`);
  }
  
  // Contact information
  if (data.phone) {
    vcard.push(`TEL;TYPE=CELL:${data.phone}`);
  }
  
  if (data.email) {
    vcard.push(`EMAIL:${data.email}`);
  }
  
  if (data.website) {
    vcard.push(`URL:${data.website}`);
  }
  
  // Address
  if (data.address) {
    vcard.push(`ADR;TYPE=WORK:;;${data.address};;;;`);
  }
  
  // Photo (if available)
  if (data.photo) {
    // For remote URLs, we'll just add the URL
    vcard.push(`PHOTO;VALUE=URL:${data.photo}`);
  }
  
  // Social links as notes or URLs
  if (data.socialLinks && data.socialLinks.length > 0) {
    data.socialLinks.forEach(link => {
      vcard.push(`X-SOCIALPROFILE;TYPE=${link.platform}:${link.url}`);
    });
  }
  
  // vCard footer
  vcard.push('END:VCARD');
  
  return vcard.join('\r\n');
};

/**
 * Triggers a download of the vCard file
 */
export const downloadVCard = (data: VCardData, filename?: string): void => {
  const vcardContent = generateVCard(data);
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${data.name.replace(/\s+/g, '_')}.vcf`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  window.URL.revokeObjectURL(url);
};
