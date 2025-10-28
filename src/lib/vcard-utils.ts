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
  // Validate required fields
  if (!data.name || data.name.trim() === '') {
    throw new Error('Name is required for vCard generation');
  }

  const vcard: string[] = [];
  
  // vCard header
  vcard.push('BEGIN:VCARD');
  vcard.push('VERSION:3.0');
  
  // Name (required)
  const nameParts = data.name.trim().split(' ').filter(part => part.length > 0);
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ') || data.name.trim();
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
  
  // Social links as custom properties
  if (data.socialLinks && data.socialLinks.length > 0) {
    data.socialLinks.forEach(link => {
      if (link.platform && link.url) {
        vcard.push(`X-SOCIALPROFILE;TYPE=${link.platform}:${link.url}`);
      }
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
  try {
    const vcardContent = generateVCard(data);
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `${data.name.replace(/\s+/g, '_')}.vcf`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading vCard:', error);
    throw error;
  }
};

/**
 * Parses user data from your Patra profile format to VCardData
 * This is a helper function to convert your profile data structure
 */
export const parseProfileToVCard = (profile: any): VCardData => {
  return {
    name: profile.name || profile.fullName || '',
    title: profile.title || profile.position || '',
    company: profile.company || profile.organization || '',
    phone: profile.phone || profile.mobile || '',
    email: profile.email || '',
    website: profile.website || profile.profileUrl || '',
    address: profile.address || '',
    photo: profile.photo || profile.avatar || profile.image || '',
    socialLinks: profile.socialLinks || profile.socials || []
  };
};


