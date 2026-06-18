import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LockKeyhole, Mail, UserRound } from 'lucide-react';

import AuthLayout from '../components/AuthLayout.jsx';
import FormInput from '../components/FormInput.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { validateSignup } from '../utils/validation.js';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateSignup(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await signup(form);
      toast.success('Account created. Welcome to LuxDrive');
      navigate('/booking', { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Join the garage"
      title="Create your performance booking profile."
      subtitle="Build a secure account for faster reservations, saved preferences, and private car access."
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-2xl sm:p-8"
      >
        <div className="mb-7">
          <h2 className="font-display text-3xl font-semibold text-white">Signup</h2>
          <p className="mt-2 text-sm text-white/56">Start your premium driving profile.</p>
        </div>

        <div className="grid gap-5">
          <FormInput
            label="Name"
            icon={UserRound}
            value={form.name}
            onChange={updateField('name')}
            error={errors.name}
            autoComplete="name"
            placeholder="Alex Morgan"
          />
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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            isPasswordVisible={isPasswordVisible}
            onTogglePassword={() => setIsPasswordVisible((value) => !value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-7 h-14 w-full rounded-full bg-champagne text-base font-black text-night transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-champagne hover:text-white">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
