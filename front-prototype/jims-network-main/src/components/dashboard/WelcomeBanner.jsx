import React from 'react';

function WelcomeBanner({ onNavigate, stats, apiStatus, currentUser }) {
  const { totalMembers = 6, totalInternships = 4, totalConnections = 38 } = stats || {};

  return (
    <section className="welcome-banner">
      <div className="welcome-content">
        <div className="welcome-tag">
          {apiStatus === 'online'
            ? 'JIMS Network • Phase 1 System Showcase (REST API Active :5000)'
            : 'JIMS Network • Phase 1 Functional Prototype & System Design'}
        </div>
        <h1 className="welcome-title">
          {currentUser ? `Welcome back, ${currentUser.name}!` : 'Welcome to JIMS Network'}
        </h1>
        <p className="welcome-description">
          A collaborative campus platform to connect with classmates, network with alumni mentors, and explore curated internship openings.
        </p>

        <div className="welcome-stats">
          <div className="welcome-stat-item">
            <span className="stat-number">{totalMembers} Members</span>
            <span className="stat-label">Campus Directory</span>
          </div>
          <div className="welcome-stat-divider" />
          <div className="welcome-stat-item">
            <span className="stat-number">{totalInternships} Openings</span>
            <span className="stat-label">Active Internships</span>
          </div>
          <div className="welcome-stat-divider" />
          <div className="welcome-stat-item">
            <span className="stat-number">{totalConnections}</span>
            <span className="stat-label">Campus Connections</span>
          </div>
        </div>

        <div className="welcome-actions">
          {!currentUser ? (
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('Sign In')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In / Register
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('Community Feed')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Post
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate('Directory')}
          >
            Browse Directory
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate('Jobs & Internships')}
          >
            View Internships
          </button>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
