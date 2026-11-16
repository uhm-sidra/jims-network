import React from 'react';

function Navbar({
  searchQuery,
  setSearchQuery,
  onToggleSidebar,
  activeTab,
  onNavigate,
  apiStatus = 'prototype',
  currentUser,
  onLogout,
}) {
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
        <div
          className="portal-badge"
          title={apiStatus === 'online' ? 'System Design: REST API Connected (Express / Node.js :5000)' : 'System Design: Running with interactive Phase 1 mock store'}
        >
          <span className="portal-dot" style={{ backgroundColor: apiStatus === 'online' ? '#10b981' : '#3b82f6' }} />
          <span className="portal-text">
            {apiStatus === 'online' ? 'REST API Connected' : 'Phase 1 Showcase'}
          </span>
        </div>

        {currentUser ? (
          <div className="nav-auth-profile-group">
            <button
              className={`nav-profile-pill ${activeTab === 'My Profile' ? 'nav-profile-active' : ''}`}
              onClick={() => onNavigate && onNavigate('My Profile')}
              title={`Logged in as ${currentUser.name} (${currentUser.role})`}
            >
              <div className="nav-avatar">{currentUser.avatar || 'SM'}</div>
              <div className="nav-user-info">
                <span className="nav-user-title">{currentUser.name}</span>
                <span className="nav-user-tag">
                  {currentUser.role === 'alumni'
                    ? 'Alumni'
                    : currentUser.role === 'faculty'
                    ? 'Faculty'
                    : 'Student'}
                </span>
              </div>
            </button>

            <button
              className="nav-logout-btn"
              onClick={onLogout}
              title="Sign Out of JIMS Network"
              aria-label="Sign Out"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="logout-text">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="nav-auth-buttons">
            <button
              className="btn-nav-signin"
              onClick={() => onNavigate && onNavigate('Sign In')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </button>
            <button
              className="btn-nav-signup"
              onClick={() => onNavigate && onNavigate('Sign Up')}
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
