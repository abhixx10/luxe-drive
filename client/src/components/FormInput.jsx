import { Eye, EyeOff } from 'lucide-react';

const FormInput = ({
  error,
  icon: Icon,
  isPasswordVisible,
  label,
  onTogglePassword,
  type = 'text',
  ...props
}) => {
  const isPassword = typeof onTogglePassword === 'function';

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/74">{label}</span>
      <span
        className={`flex h-14 items-center gap-3 rounded-2xl border bg-white/[0.055] px-4 transition ${
          error ? 'border-ember/70' : 'border-white/10 focus-within:border-champagne/70'
        }`}
      >
        {Icon && <Icon className="h-5 w-5 text-champagne" />}
        <input
          type={type}
          className="h-14 min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/36"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            title={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </span>
      {error && <span className="mt-2 block text-sm text-ember">{error}</span>}
    </label>
  );
};

export default FormInput;
