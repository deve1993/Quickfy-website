import React from 'react';

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

export function BrowserFrame({
  children,
  url = 'quickfy.com/dashboard',
  className = ''
}: BrowserFrameProps) {
  return (
    <div className={`browser-frame ${className}`}>
      {/* Browser Header */}
      <div className="browser-header">
        {/* Traffic Lights (macOS style) */}
        <div className="browser-controls">
          <div className="browser-dot browser-dot-red"></div>
          <div className="browser-dot browser-dot-yellow"></div>
          <div className="browser-dot browser-dot-green"></div>
        </div>

        {/* Address Bar */}
        <div className="browser-address-bar">
          <div className="browser-url">
            <svg className="browser-lock-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 5H9V3.5C9 2.12 7.88 1 6.5 1C5.12 1 4 2.12 4 3.5V5H3C2.45 5 2 5.45 2 6V10C2 10.55 2.45 11 3 11H10C10.55 11 11 10.55 11 10V6C11 5.45 10.55 5 10 5ZM6.5 2C7.33 2 8 2.67 8 3.5V5H5V3.5C5 2.67 5.67 2 6.5 2Z" fill="currentColor"/>
            </svg>
            <span className="browser-url-text">{url}</span>
          </div>
        </div>

        {/* Menu Icon */}
        <div className="browser-menu">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Browser Content */}
      <div className="browser-content">
        {children}
      </div>
    </div>
  );
}
