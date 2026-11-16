import React from 'react';
import { sampleUser, profileSteps } from '../../data/mockData.js';

function ProfileView({ currentUser, onNavigate }) {
  const user = currentUser || sampleUser;
  const avatarText = user.avatar || user.avatarInitial || 'SM';
  const roleText = user.role === 'alumni' ? 'Alumni Member' : user.role === 'faculty' ? 'Faculty / Coordinator' : 'Student Member';
  const roleBadgeClass = user.role === 'alumni' ? 'badge-alumni' : user.role === 'faculty' ? 'badge-official' : 'badge-student';

  const completedSteps = profileSteps.filter((s) => s.completed || s.done).length;
  const progressPercent = Math.round((completedSteps / profileSteps.length) * 100);

  return (
    <div className="profile-page-container">
      {/* Profile Header Banner */}
      <div className="card profile-hero-card">
        <div className="profile-cover-gradient" />
        <div className="profile-hero-content">
          <div className="profile-avatar-large">
            {avatarText}
          </div>
          <div className="profile-hero-details">
            <div className="profile-name-row">
              <h1 className="profile-full-name">{user.name}</h1>
              <span className={`badge ${roleBadgeClass}`}>
                {currentUser ? (user.role?.toUpperCase() + ' (AUTHENTICATED)') : 'SAMPLE ACCOUNT (DEMO)'}
              </span>
            </div>
            <p className="profile-headline">
              {user.position || roleText} • {user.department || 'Department of Information Technology'}
            </p>
            <div className="profile-meta-chips">
              <span className="meta-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {user.location || user.campus || 'Delhi, India'}
              </span>
              <span className="meta-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {user.batch || 'Batch 2024-2026'}
              </span>
              <span className="meta-chip">Email: {user.email || 'student@jimsindia.org'}</span>
              {user.enrollmentId && <span className="meta-chip">ID: {user.enrollmentId}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* Left Column: Academic & Technical Details */}
        <div className="profile-main-col">
          <div className="card profile-section-card">
            <h2 className="card-title">About & Academic Bio (Demo Record)</h2>
            <p className="profile-bio-text">
              Undergraduate student focusing on web applications, algorithms, and practical software engineering. Actively participating in JIMS campus coding club initiatives and looking for industry internship opportunities in React, modern JavaScript, and web development.
            </p>
          </div>

          <div className="card profile-section-card">
            <h2 className="card-title">Technical Skills & Competencies</h2>
            <div className="skills-cloud">
              {['React.js', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Git & GitHub', 'Node.js Basics', 'SQL & Databases', 'Problem Solving', 'Team Collaboration'].map((skill, i) => (
                <span key={i} className="skill-pill-large">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="card profile-section-card">
            <h2 className="card-title">Education & Campus Credentials</h2>
            <div className="education-timeline">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h3 className="timeline-title">Bachelor of Computer Applications (BCA)</h3>
                  <div className="timeline-institute">JIMS (Jagan Institute of Management Studies)</div>
                  <div className="timeline-year">2024 - 2027 (Sample Enrollment)</div>
                  <p className="timeline-desc">
                    Affiliated to Guru Gobind Singh Indraprastha University (GGSIPU). Focus on core computer science subjects, database management, and object-oriented programming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Status & Contact info */}
        <div className="profile-side-col">
          <div className="card profile-status-card">
            <h3 className="card-title">Profile Verification (Demo)</h3>
            <div className="verification-item verified">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>JIMS Roll Number (Demo Verified)</span>
            </div>
            <div className="verification-item verified">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Institutional Email (Demo Verified)</span>
            </div>

            <div className="divider-line" />

            <div className="profile-quick-stats">
              <div className="p-stat">
                <div className="p-stat-val">{sampleUser.connectionsCount}</div>
                <div className="p-stat-lbl">Sample Connections</div>
              </div>
              <div className="p-stat">
                <div className="p-stat-val">{sampleUser.appliedCount}</div>
                <div className="p-stat-lbl">Mock Applications</div>
              </div>
              <div className="p-stat">
                <div className="p-stat-val">{progressPercent}%</div>
                <div className="p-stat-lbl">Sample Readiness</div>
              </div>
            </div>
          </div>

          <div className="card profile-notice-card">
            <h3 className="card-title">Prototype Demonstration Note</h3>
            <p className="notice-text">
              All details on this page are sample demonstration values illustrating how individual member profiles and campus verification badges will appear in JIMS Network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
