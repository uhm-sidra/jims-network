import React from 'react';

function Navbar({ searchQuery, setSearchQuery, onToggleSidebar, activeTab, onNavigate }) {
  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="search-container">
          <span className="search-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search students, alumni, posts, or internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Global search across JIMS Network"
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <div className="portal-badge" title="Running in Prototype Mock Mode">
          <span className="portal-dot" />
          <span className="portal-text">JIMS Network (Prototype)</span>
        </div>

        <button
          className={`nav-profile-pill ${activeTab === 'My Profile' ? 'nav-profile-active' : ''}`}
          onClick={() => onNavigate && onNavigate('My Profile')}
          title="View Sample Profile Details"
        >
          <div className="nav-avatar">SM</div>
          <div className="nav-user-info">
            <span className="nav-user-title">Sample Member</span>
            <span className="nav-user-tag">Student (Demo)</span>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
