import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <span className="logo-icon">A</span>
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin ? 'Sign in to access your account' : 'Join Alitech for exclusive deals'}</p>
          </div>

          <form className="auth-form" onSubmit={e => e.preventDefault()}>
            {!isLogin && (
              <div className="auth-field">
                <User size={18} className="auth-field-icon" />
                <input type="text" placeholder="Full Name" required />
              </div>
            )}
            <div className="auth-field">
              <Mail size={18} className="auth-field-icon" />
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="auth-field">
              <Lock size={18} className="auth-field-icon" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" required />
              <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isLogin && (
              <div className="auth-extras">
                <label className="auth-remember"><input type="checkbox" /> Remember me</label>
                <a href="#" className="auth-forgot">Forgot password?</a>
              </div>
            )}
            <button type="submit" className="btn btn-primary auth-submit">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Sign In'}</button>
          </p>
        </div>
      </div>
    </div>
  );
}
