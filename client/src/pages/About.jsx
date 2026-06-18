import { motion } from 'framer-motion';

const About = () => {
  return (
    <main className="min-h-screen bg-night px-5 pb-20 pt-32 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-sm font-bold uppercase text-champagne">About LuxDrive</p>
          <h1 className="mt-3 font-display text-5xl font-semibold">Built for drivers who notice.</h1>
        </motion.div>

        <div className="space-y-6 text-lg leading-8 text-chrome/74">
          <p>
            LuxDrive combines premium inventory, secure member access, and high-touch booking into a
            single MERN stack experience.
          </p>
          <p>
            The foundation is ready for vehicle management, rich media, payment flows, admin tools,
            and a full Dodge Challenger 3D model inside the hero stage.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
