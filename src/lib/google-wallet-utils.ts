// Google Wallet Pass Generator Utility
// This utility helps create a Google Wallet pass for business cards

export interface WalletPassData {
    fullName: string;
    jobTitle: string;
    company: string;
    email: string;
    phone: string;
    avatarUrl: string;
    vanityUrl: string;
    qrCodeData: string;
}

/**
 * Generates a Google Wallet pass URL for a business card
 * Note: This creates a generic pass. For production, you'd need to:
 * 1. Set up a Google Cloud Project
 * 2. Enable the Google Wallet API
 * 3. Create a pass class
 * 4. Use the official Google Wallet API to create signed JWTs
 */
export const generateGoogleWalletPass = async (passData: WalletPassData): Promise<string> => {
    // For now, we'll create a vCard that can be saved
    // In production, you would use the Google Wallet API with proper authentication

    const vCardData = generateVCard(passData);
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);

    return url;
};

/**
 * Generates a vCard (VCF) format for the contact
 */
export const generateVCard = (passData: WalletPassData): string => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${passData.fullName}
N:${passData.fullName.split(' ').reverse().join(';')};;;
${passData.jobTitle ? `TITLE:${passData.jobTitle}` : ''}
${passData.company ? `ORG:${passData.company}` : ''}
${passData.email ? `EMAIL:${passData.email}` : ''}
${passData.phone ? `TEL:${passData.phone}` : ''}
${passData.avatarUrl ? `PHOTO;VALUE=URL:${passData.avatarUrl}` : ''}
URL:https://patra.me/${passData.vanityUrl}
NOTE:Digital Business Card from Patra
END:VCARD`;

    return vCard.split('\n').filter(line => line.trim()).join('\r\n');
};

/**
 * Downloads the vCard file
 */
export const downloadVCard = (passData: WalletPassData) => {
    const vCardData = generateVCard(passData);
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${passData.fullName.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Creates a Google Wallet "Add to Wallet" button link
 * This is a simplified version. For production, you need:
 * 1. Google Cloud Project with Wallet API enabled
 * 2. Service account credentials
 * 3. Pass class created in Google Wallet console
 * 4. Signed JWT token
 */
export const createGoogleWalletLink = (passData: WalletPassData): string => {
    // This is a placeholder. In production, you would:
    // 1. Create a JWT with pass data
    // 2. Sign it with your service account
    // 3. Return the Google Wallet save URL

    // For now, we'll return a link that downloads the vCard
    // which can be imported into Google Contacts (which syncs with Google Wallet)
    return '#'; // Placeholder - will trigger vCard download instead
};

/**
 * Initiates the "Add to Google Wallet" flow
 * For now, this downloads a vCard file
 */
export const addToGoogleWallet = (passData: WalletPassData) => {
    // In production, this would open the Google Wallet save URL
    // For now, we download a vCard that can be imported to Google Contacts
    downloadVCard(passData);

    return {
        success: true,
        message: 'Contact card downloaded. Import this file to Google Contacts to add to Google Wallet.',
    };
};
