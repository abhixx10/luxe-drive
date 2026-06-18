import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const cars = [
  ['Dodge Challenger SRT Hellcat', '717 HP', 'Widebody coupe'],
  ['Chevrolet Corvette Stingray', '495 HP', 'Mid-engine coupe'],
  ['Ford Mustang Dark Horse', '500 HP', 'Track-ready fastback'],
  ['BMW M4 Competition', '503 HP', 'Precision grand tourer'],
  ['Mercedes-AMG GT', '577 HP', 'Hand-built V8'],
  ['Audi RS e-tron GT', '637 HP', 'Electric performance']
];

const Cars = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase() || '';
  const filteredCars = cars.filter(([name]) => name.toLowerCase().includes(search));

  return (
    <main className="min-h-screen bg-night px-5 pb-20 pt-32 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-bold uppercase text-champagne">The fleet</p>
          <h1 className="mt-3 font-display text-5xl font-semibold">Curated performance cars.</h1>
          <p className="mt-4 text-lg text-chrome/72">
            Browse the starter inventory foundation, ready for live vehicle data and media.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCars.map(([name, power, type]) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38 }}
              className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-onyx p-6"
            >
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-champagne/24 via-ember/12 to-transparent" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <h2 className="font-display text-3xl font-semibold">{name}</h2>
                  <p className="mt-2 text-chrome/68">{type}</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-champagne">{power}</span>
                  <button className="rounded-full border border-white/12 px-5 py-3 text-sm font-bold text-white transition hover:border-champagne hover:text-champagne">
                    View
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Cars;
