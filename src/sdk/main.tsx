import React from 'react';
import ReactDOM from 'react-dom/client';
import { DigitalCard, CardData } from '@/components/card/DigitalCard';
import styles from '../index.css?inline';

class PatraCard extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  static get observedAttributes() {
    return ['username', 'width', 'height', 'theme'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  async fetchCardData(username: string): Promise<CardData | null> {
    const SUPABASE_URL = "https://ffpqhgiucoqjmkyeevqq.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcHFoZ2l1Y29xam1reWVldnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjY3NjcsImV4cCI6MjA3NDMwMjc2N30.9Vb7U2X0nT1dG8PP0x9LtGy3iPEkYeVMhEyvB6ZqQ6Q";

    try {
      const url = `${SUPABASE_URL}/functions/v1/get-card?vanity_url=${username}`;
      console.log('[Patra SDK] Fetching:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      console.log('[Patra SDK] Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Patra SDK] Fetch failed:', response.status, errorText);
        return null;
      }

      const data = await response.json();
      console.log('[Patra SDK] Data received:', data);
      
      const content = data.card_data || data;
      
      return {
          fullName: content.fullName || content.name || 'User',
          jobTitle: content.jobTitle || '',
          company: content.company || '',
          email: content.email || '',
          phone: content.phone || '',
          avatarUrl: content.avatarUrl || '',
          vanityUrl: username,
          cardConfig: content.cardConfig,
          bannerType: content.bannerType,
          bannerValue: content.bannerValue
      };
    } catch (err) {
      console.error('[Patra SDK] Error:', err);
      return null;
    }
  }

  async render() {
    if (!this.shadowRoot) return;

    const username = this.getAttribute('username');
    if (!username) return;

    const width = parseInt(this.getAttribute('width') || '400');
    const height = parseInt(this.getAttribute('height') || '250');

    // Create mount point if not exists
    if (!this.mountPoint) {
      this.mountPoint = document.createElement('div');
      this.mountPoint.className = 'patra-card-widget';
      
      // Inject Styles
      const styleTag = document.createElement('style');
      styleTag.textContent = styles;
      this.shadowRoot.appendChild(styleTag);
      this.shadowRoot.appendChild(this.mountPoint);
    }

    // Initialize React Root
    if (!this.root) {
      this.root = ReactDOM.createRoot(this.mountPoint);
    }

    // Show loading state
    this.root.render(
      <div className="flex items-center justify-center" style={{ width, height, color: '#666' }}>
        <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );

    // Fetch Data
    const cardData = await this.fetchCardData(username);

    if (cardData) {
      this.root.render(
        <div className="patra-iso-root">
           <DigitalCard
            cardData={cardData}
            username={username}
            width={width}
            height={height}
          />
        </div>
      );
    } else {
      this.root.render(
        <div className="flex items-center justify-center text-red-500" style={{ width, height }}>
          Card not found
        </div>
      );
    }
  }
}

// Register Web Component
if (!customElements.get('patra-card')) {
  customElements.define('patra-card', PatraCard);
}

// Also export a global function for manual rendering
(window as any).Patra = {
  renderCard: (username: string, containerId: string) => {
    const container = document.getElementById(containerId);
    if (container) {
      const el = document.createElement('patra-card');
      el.setAttribute('username', username);
      container.appendChild(el);
    }
  }
};
