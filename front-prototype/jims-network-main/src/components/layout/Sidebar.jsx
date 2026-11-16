import React from 'react';

function Sidebar({ activeTab, setActiveTab, isOpen, onClose, currentUser, onLogout }) {
  const navItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      id: 'Community Feed',
      label: 'Community Feed',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      id: 'Directory',
      label: 'Directory',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'Jobs & Internships',
      label: 'Jobs & Internships',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: 'My Profile',
      label: 'My Profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside className={`navy-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">JIMS Network</span>
              <span className="brand-subtitle">Campus Prototype</span>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-label">MAIN NAVIGATION</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onClose) onClose();
                    }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {isActive && <span className="nav-active-pill" />}
                  </button>
                </li>
              );
            })}

            {/* Authentication Item in Navigation */}
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'Sign In' || activeTab === 'Sign Up' ? 'nav-link-active' : ''}`}
                onClick={() => {
                  setActiveTab(currentUser ? 'My Profile' : 'Sign In');
                  if (onClose) onClose();
                }}
              >
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </span>
                <span className="nav-label">{currentUser ? 'Account & Session' : 'Sign In / Register'}</span>
                {(activeTab === 'Sign In' || activeTab === 'Sign Up') && <span className="nav-active-pill" />}
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          {currentUser ? (
            <div className="sidebar-user-block">
              <button
                className={`user-profile-badge ${activeTab === 'My Profile' ? 'user-badge-active' : ''}`}
                onClick={() => {
                  setActiveTab('My Profile');
                  if (onClose) onClose();
                }}
                title="View your verified profile"
              >
                <div className="user-avatar-sm">{currentUser.avatar || 'US'}</div>
                <div className="user-details">
                  <div className="user-name">{currentUser.name}</div>
                  <div className="user-role">
                    {currentUser.role === 'alumni'
                      ? 'Alumni Mentor'
                      : currentUser.role === 'faculty'
                      ? 'Faculty / T&P'
                      : 'Student (MCA)'}
                  </div>
                </div>
              </button>
              <button
                className="sidebar-signout-btn"
                onClick={onLogout}
                title="Sign out of current account"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="sidebar-guest-block">
              <button
                className="btn-sidebar-auth"
                onClick={() => {
                  setActiveTab('Sign In');
                  if (onClose) onClose();
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Sign In to JIMS Network
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
