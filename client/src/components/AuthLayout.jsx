import { motion } from 'framer-motion';

const AuthLayout = ({ eyebrow, title, subtitle, children }) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-night px-5 pt-28 text-white sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,182,106,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,74,56,0.13),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-xl"
        >
          <p className="text-sm font-bold uppercase text-champagne">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-chrome/76">{subtitle}</p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-sm text-white/56">
            <span className="border-l border-champagne/40 pl-3">Secure JWT access</span>
            <span className="border-l border-champagne/40 pl-3">Private bookings</span>
            <span className="border-l border-champagne/40 pl-3">Curated garage</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
};

export default AuthLayout;
