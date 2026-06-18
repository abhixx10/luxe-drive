import { motion } from 'framer-motion';

const Media = () => {
  return (
    <main className="min-h-screen bg-night px-5 pb-20 pt-32 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-bold uppercase text-champagne">Media</p>
          <h1 className="mt-3 font-display text-5xl font-semibold">Cinematic car stories.</h1>
          <p className="mt-4 text-lg text-chrome/72">
            A dedicated surface for launch films, galleries, drive recaps, and owner content.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="min-h-[420px] rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,106,0.22),rgba(217,74,56,0.08),rgba(255,255,255,0.03))]" />
          <div className="grid gap-5">
            <div className="min-h-48 rounded-[1.5rem] border border-white/10 bg-white/[0.05]" />
            <div className="min-h-48 rounded-[1.5rem] border border-white/10 bg-white/[0.05]" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Media;
