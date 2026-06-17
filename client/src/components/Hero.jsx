import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, CalendarCheck, Gauge, Sparkles } from 'lucide-react';

const CarModelPlaceholder = lazy(() => import('./CarModelPlaceholder.jsx'));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 }
};

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-night pt-28">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,5,7,0.98)_0%,rgba(10,10,13,0.94)_42%,rgba(27,22,18,0.84)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ember/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-night to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.62, ease: 'easeOut' }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-champagne/25 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-champagne"
          >
            <Sparkles className="h-4 w-4" />
            Elite performance booking
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl"
          >
            Command the road in modern American muscle.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-6 max-w-2xl text-lg leading-8 text-chrome/78 sm:text-xl"
          >
            Discover premium performance cars, reserve your next drive, and step into a
            cinematic booking experience built for speed, detail, and confidence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/booking"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-champagne px-7 text-base font-bold text-night shadow-glow transition hover:-translate-y-1 hover:bg-white"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Now
            </Link>
            <Link
              to="/cars"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-7 text-base font-bold text-white transition hover:-translate-y-1 hover:border-champagne/70 hover:text-champagne"
            >
              <Gauge className="h-5 w-5" />
              Explore Cars
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-3"
          >
            {[
              ['707+', 'HP ready'],
              ['24/7', 'Concierge'],
              ['4.9', 'Driver rating']
            ].map(([value, label]) => (
              <div key={label} className="border-l border-white/12 pl-4">
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="mt-1 text-xs uppercase text-white/48">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <Suspense
            fallback={
              <div className="h-[430px] min-h-[320px] w-full animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04] lg:h-[560px]" />
            }
          >
            <CarModelPlaceholder />
          </Suspense>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex flex-col items-center gap-2 text-xs font-semibold uppercase text-white/48">
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/14"
          >
            <ArrowDown className="h-4 w-4 text-champagne" />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
