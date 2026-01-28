import React from 'react'

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        {/* Panel bên trái: khuyến mãi */}
        <div className="login-left">
          <div className="login-left-header">
            <span className="login-logo-icon">✈</span>
            <span className="login-logo-text">VOYAGE GLOBAL</span>
          </div>

          <div className="login-left-content">
            <div className="login-offer">
              <span className="login-offer-number">50</span>
              <span className="login-offer-percent">% OFF</span>
            </div>
            <p className="login-offer-subtitle">for new user</p>

            <div className="login-plane-path" />

            <div className="login-coupon">
              <span className="login-coupon-label">COUPON CODE</span>
              <button className="login-coupon-code">NEWUSER</button>
            </div>
          </div>

          <div className="login-left-footer">
            <span className="login-footer-icon">🏛</span>
            <span className="login-footer-icon">🏙</span>
            <span className="login-footer-icon">🏨</span>
          </div>
        </div>

        {/* Panel bên phải: form đăng nhập */}
        <div className="login-right">
          <div className="login-right-header">
            <h2 className="login-title">Login</h2>
            <p className="login-subtitle">
              Welcome! Login to get amazing discounts and offers only for you.
            </p>
          </div>

          <form className="login-form">
            {/* User name */}
            <div className="login-form-group">
              <label className="login-label">User Name</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="login-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">🔒</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="login-input"
                />
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="login-row-between login-remember-row">
              <label className="login-remember">
                <input type="checkbox" /> <span>Remember me</span>
              </label>
              <button type="button" className="login-link-button">
                Forgot your password?
              </button>
            </div>

            {/* Nút Login + Cancel */}
            <div className="login-actions">
              <button type="submit" className="login-btn-primary">
                LOGIN
              </button>
              <button type="button" className="login-btn-secondary">
                CANCEL
              </button>
            </div>

            {/* New user */}
            <div className="login-newuser">
              <span>New User?</span>
              <button type="button" className="login-link-button">
                Signup
              </button>
            </div>

            {/* Social login */}
            <div className="login-social-section">
              <div className="login-social-title">SOCIAL LOGIN</div>

              <button type="button" className="login-social-btn">
                <span className="login-social-icon">G</span>
                <span>Continue with Google</span>
              </button>

              <button type="button" className="login-social-btn">
                <span className="login-social-icon">f</span>
                <span>Facebook</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

