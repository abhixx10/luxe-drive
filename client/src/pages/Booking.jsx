import { motion } from 'framer-motion';
import { CalendarDays, MapPin, ShieldCheck } from 'lucide-react';

import { useAuth } from '../context/AuthContext.jsx';

const Booking = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-night px-5 pb-20 pt-32 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <p className="text-sm font-bold uppercase text-champagne">Private booking</p>
          <h1 className="mt-3 font-display text-5xl font-semibold">
            Welcome back, {user?.name || 'driver'}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-chrome/72">
            This protected route is ready for booking workflows, availability calendars, and payment
            integration.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            [CalendarDays, 'Select date', 'Plan the perfect pickup window.'],
            [MapPin, 'Choose route', 'Set the city, garage, or delivery location.'],
            [ShieldCheck, 'Confirm details', 'Secure the reservation with your account.']
          ].map(([Icon, title, copy]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-onyx p-6">
              <Icon className="h-7 w-7 text-champagne" />
              <h2 className="mt-5 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-chrome/68">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Booking;
