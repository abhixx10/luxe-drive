import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LockKeyhole, Mail } from 'lucide-react';

import AuthLayout from '../components/AuthLayout.jsx';
import FormInput from '../components/FormInput.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { validateLogin } from '../utils/validation.js';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/booking';

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateLogin(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await login(form);
      toast.success('Welcome back to LuxDrive');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Member access"
      title="Return to your private performance garage."
      subtitle="Log in to continue bookings, review saved cars, and manage your premium driving experience."
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-2xl sm:p-8"
      >
        <div className="mb-7">
          <h2 className="font-display text-3xl font-semibold text-white">Login</h2>
          <p className="mt-2 text-sm text-white/56">Enter your credentials to continue.</p>
        </div>

        <div className="grid gap-5">
          <FormInput
            label="Email"
            icon={Mail}
            value={form.email}
            onChange={updateField('email')}
            error={errors.email}
            autoComplete="email"
            placeholder="you@example.com"
          />
          <FormInput
            label="Password"
            icon={LockKeyhole}
            type={isPasswordVisible ? 'text' : 'password'}
            value={form.password}
            onChange={updateField('password')}
            error={errors.password}
            autoComplete="current-password"
            placeholder="Your password"
            isPasswordVisible={isPasswordVisible}
            onTogglePassword={() => setIsPasswordVisible((value) => !value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-7 h-14 w-full rounded-full bg-champagne text-base font-black text-night transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="mt-6 text-center text-sm text-white/60">
          New to LuxDrive?{' '}
          <Link to="/signup" className="font-bold text-champagne hover:text-white">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
