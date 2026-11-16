import React, { useState } from 'react';
import { api } from '../../services/api.js';

function AuthSection({ initialMode = 'login', onAuthSuccess, onNavigate, isModal = false, onClose }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // 'student' | 'alumni' | 'faculty'
    department: 'MCA',
    batch: 'Batch 2024-2026',
    enrollmentId: '',
    company: '',
    position: '',
    designation: '',
    location: 'Delhi, India',
  });

  // Quick Demo Accounts
  const demoAccounts = [
    {
      role: 'student',
      label: 'Student Demo',
      email: 'priya.verma@student.jims.edu',
      password: 'password123',
      badge: 'MCA Student',
      color: '#2563eb',
    },
    {
      role: 'alumni',
      label: 'Alumni Demo',
      email: 'aarav.sharma@alumni.jims.edu',
      password: 'password123',
      badge: 'SDE @ Infosys',
      color: '#7c3aed',
    },
    {
      role: 'faculty',
      label: 'Faculty Demo',
      email: 'coordinator.tp@jimsindia.org',
      password: 'password123',
      badge: 'T&P Coordinator',
      color: '#10b981',
    },
  ];

  const handleQuickDemoLogin = (account) => {
    setLoginEmail(account.email);
    setLoginPassword(account.password);
    setError('');
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword) {
      setError('Please provide both email address and password');
      return;
    }

    setLoading(true);
    try {
      const res = await api.login(loginEmail.trim(), loginPassword);
      setSuccessMsg(`Welcome back, ${res.user?.name || 'Member'}!`);
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(res.user);
        if (onClose) onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!signupData.name.trim() || !signupData.email.trim() || !signupData.password) {
      setError('Please fill in all required fields (Name, Email, Password)');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Determine position string based on role
    let computedPosition = signupData.position;
    if (signupData.role === 'student') {
      computedPosition = `${signupData.department} Student`;
    } else if (signupData.role === 'alumni') {
      computedPosition = signupData.position
        ? `${signupData.position}${signupData.company ? ' at ' + signupData.company : ''}`
        : 'Alumni Member';
    } else if (signupData.role === 'faculty') {
      computedPosition = signupData.designation || 'Faculty Member';
    }

    const payload = {
      name: signupData.name.trim(),
      email: signupData.email.trim().toLowerCase(),
      password: signupData.password,
      role: signupData.role,
      department: signupData.department,
      batch: signupData.batch,
      position: computedPosition,
      location: signupData.location,
      enrollmentId: signupData.enrollmentId,
      company: signupData.company,
    };

    setLoading(true);
    try {
      const res = await api.register(payload);
      setSuccessMsg(`Account created successfully! Welcome to JIMS Network, ${res.user?.name}.`);
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(res.user);
        if (onClose) onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const p = signupData.password;
    if (!p) return null;
    if (p.length < 6) return { text: 'Too short (min 6)', color: '#ef4444', percent: 25 };
    if (p.length < 8) return { text: 'Fair', color: '#f59e0b', percent: 50 };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { text: 'Strong', color: '#10b981', percent: 100 };
    return { text: 'Good', color: '#3b82f6', percent: 75 };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className={`auth-wrapper ${isModal ? 'auth-modal-wrapper' : 'auth-page-wrapper'}`}>
      <div className="auth-card">
        {/* Modal close button */}
        {isModal && onClose && (
          <button className="auth-modal-close" onClick={onClose} aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Brand Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <h1 className="auth-title">
            {mode === 'login' ? 'Sign In to JIMS Network' : 'Join JIMS Alumni Network'}
          </h1>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Connect with alumni mentors, participate in campus discussions, and explore career opportunities.'
              : 'Create your institutional profile to connect with classmates, alumni, and campus placement cells.'}
          </p>
        </div>

        {/* Mode Selector Tabs (Sign In / Sign Up) */}
        <div className="auth-mode-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
              setSuccessMsg('');
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setError('');
              setSuccessMsg('');
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Create Account
          </button>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="auth-alert auth-alert-error" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert auth-alert-success" role="status">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        {/* =========================================================================
            1. LOGIN FORM
           ========================================================================= */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            {/* Quick Demo Credentials */}
            <div className="quick-demo-box">
              <div className="quick-demo-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Quick Demo Accounts (1-Click Fill)</span>
              </div>
              <div className="quick-demo-chips">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    className="demo-chip-btn"
                    onClick={() => handleQuickDemoLogin(acc)}
                    title={`Fill demo credentials for ${acc.label}`}
                  >
                    <span className="demo-chip-role" style={{ backgroundColor: acc.color }}>
                      {acc.label}
                    </span>
                    <span className="demo-chip-badge">{acc.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Campus or Registered Email
              </label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="e.g. priya.verma@student.jims.edu"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <span className="form-hint-note">Default: password123</span>
              </div>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="spinner-inline">Signing In...</span>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Sign In to JIMS Network
                </>
              )}
            </button>

            <div className="auth-switch-row">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            2. SIGNUP FORM
           ========================================================================= */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="auth-form">
            {/* Role Selector Pill */}
            <div className="form-group">
              <label className="form-label">I am joining JIMS Network as:</label>
              <div className="role-selector-grid">
                {[
                  { id: 'student', label: 'Current Student', icon: '🎓', hint: 'MCA, BCA, B.Tech' },
                  { id: 'alumni', label: 'Graduated Alumni', icon: '💼', hint: 'Industry Mentors' },
                  { id: 'faculty', label: 'Faculty / Staff', icon: '🏛️', hint: 'T&P & Professors' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`role-select-card ${signupData.role === r.id ? 'active' : ''}`}
                    onClick={() => setSignupData({ ...signupData, role: r.id })}
                  >
                    <span className="role-card-icon">{r.icon}</span>
                    <span className="role-card-label">{r.label}</span>
                    <span className="role-card-hint">{r.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="signup-name" className="form-label">
                  Full Name <span className="req-star">*</span>
                </label>
                <input
                  id="signup-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Sanskriti"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">
                  Email Address <span className="req-star">*</span>
                </label>
                <input
                  id="signup-email"
                  type="email"
                  className="form-input"
                  placeholder="e.g. sanskriti@jimsindia.org"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password with Strength */}
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="signup-password" className="form-label">
                  Create Password <span className="req-star">*</span>
                </label>
                {passwordStrength && (
                  <span className="password-strength-tag" style={{ color: passwordStrength.color }}>
                    Strength: {passwordStrength.text}
                  </span>
                )}
              </div>
              <div className="input-with-icon">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Minimum 6 characters"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordStrength && (
                <div className="password-strength-bar">
                  <div
                    className="password-strength-fill"
                    style={{ width: `${passwordStrength.percent}%`, backgroundColor: passwordStrength.color }}
                  />
                </div>
              )}
            </div>

            {/* Department and Batch */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="signup-dept" className="form-label">
                  Department
                </label>
                <select
                  id="signup-dept"
                  className="form-select"
                  value={signupData.department}
                  onChange={(e) => setSignupData({ ...signupData, department: e.target.value })}
                >
                  <option value="MCA">MCA (Master of Computer Applications)</option>
                  <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                  <option value="B.Tech CSE">B.Tech Computer Science</option>
                  <option value="BBA">BBA (Bachelor of Business Admin)</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="signup-batch" className="form-label">
                  {signupData.role === 'alumni' ? 'Graduation Batch' : 'Academic Batch'}
                </label>
                <input
                  id="signup-batch"
                  type="text"
                  className="form-input"
                  placeholder={signupData.role === 'alumni' ? 'e.g. Batch 2021' : 'e.g. Batch 2024-2026'}
                  value={signupData.batch}
                  onChange={(e) => setSignupData({ ...signupData, batch: e.target.value })}
                />
              </div>
            </div>

            {/* Dynamic Role-Specific Fields */}
            {signupData.role === 'student' && (
              <div className="form-group">
                <label htmlFor="signup-enrollment" className="form-label">
                  Enrollment / Student ID (Optional)
                </label>
                <input
                  id="signup-enrollment"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 00550404426"
                  value={signupData.enrollmentId}
                  onChange={(e) => setSignupData({ ...signupData, enrollmentId: e.target.value })}
                />
              </div>
            )}

            {signupData.role === 'alumni' && (
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="signup-company" className="form-label">
                    Current Company / Employer
                  </label>
                  <input
                    id="signup-company"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Microsoft, Infosys, Google"
                    value={signupData.company}
                    onChange={(e) => setSignupData({ ...signupData, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-position" className="form-label">
                    Designation / Job Role
                  </label>
                  <input
                    id="signup-position"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Software Engineer"
                    value={signupData.position}
                    onChange={(e) => setSignupData({ ...signupData, position: e.target.value })}
                  />
                </div>
              </div>
            )}

            {signupData.role === 'faculty' && (
              <div className="form-group">
                <label htmlFor="signup-designation" className="form-label">
                  Designation / Departmental Role
                </label>
                <input
                  id="signup-designation"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Professor & T&P Coordinator"
                  value={signupData.designation}
                  onChange={(e) => setSignupData({ ...signupData, designation: e.target.value })}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="signup-location" className="form-label">
                City / Location
              </label>
              <input
                id="signup-location"
                type="text"
                className="form-input"
                placeholder="e.g. Delhi, India"
                value={signupData.location}
                onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="spinner-inline">Creating Profile...</span>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  Complete Registration
                </>
              )}
            </button>

            <div className="auth-switch-row">
              <span>Already registered on JIMS Network?</span>
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthSection;
