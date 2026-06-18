import Hero from '../components/Hero.jsx';

const featuredCars = [
  {
    name: 'Dodge Challenger SRT',
    spec: 'Supercharged V8',
    accent: 'from-ember/35'
  },
  {
    name: 'Corvette Stingray',
    spec: 'Mid-engine precision',
    accent: 'from-mint/30'
  },
  {
    name: 'Mustang Dark Horse',
    spec: 'Track tuned',
    accent: 'from-champagne/30'
  }
];

const Home = () => {
  return (
    <>
      <Hero />
      <section className="bg-night px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase text-champagne">Featured garage</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-white">
                Performance without compromise.
              </h2>
            </div>
            <p className="max-w-xl text-chrome/70">
              A focused preview of the fleet experience, ready for inventory data, rich media,
              and booking availability.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredCars.map((car) => (
              <article
                key={car.name}
                className="group relative min-h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-onyx p-6 transition hover:-translate-y-1 hover:border-champagne/40"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${car.accent} via-transparent to-transparent opacity-75`}
                />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <h3 className="font-display text-3xl font-semibold text-white">{car.name}</h3>
                    <p className="mt-2 text-chrome/68">{car.spec}</p>
                  </div>
                  <div className="h-16 rounded-full border border-white/10 bg-white/[0.04] transition group-hover:border-champagne/40" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
