
import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Compass,
  Globe2,
  MapPin,
  Search,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import { destinations, experiences } from './data/destinations.js';
import Navbar from './components/Navbar.jsx';
import DestinationCard from './components/DestinationCard.jsx';

const categories = [
  'All places',
  'Beach',
  'Mountains',
  'Culture',
  'Nature',
];

function DestinationModal({ destination, onClose }) {
  if (!destination) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="destination-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close destination details"
        >
          ×
        </button>

        <img
          src={destination.image}
          alt={`${destination.name} landscape`}
        />

        <div className="modal-copy">
          <p className="eyebrow">
            {destination.country} · {destination.category}
          </p>

          <h2 id="modal-title">A little more {destination.name}</h2>
          <p>{destination.description}</p>

          <div className="modal-facts">
            <span>
              <CalendarDays size={16} />
              {destination.duration}
            </span>
            <span>
              <Wallet size={16} />
              From {destination.cost}*
            </span>
          </div>

          <p className="demo-note">
            *Illustrative demo estimate per traveller. Not a live quote.
          </p>

          <button
            className="button button-dark"
            onClick={() => {
              onClose();
              document
                .getElementById('trip-search')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start planning <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

function SearchPanel({ onSearch }) {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2 travelers');

  function submit(e) {
    e.preventDefault();
    onSearch(query);

    document
      .getElementById('destinations')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <form className="search-panel" id="trip-search" onSubmit={submit}>
      <label className="search-field destination-field">
        <span className="field-icon"><MapPin size={19} /></span>
        <span className="field-copy">
          <span>WHERE TO?</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your somewhere"
            aria-label="Search destination"
          />
        </span>
      </label>

      <label className="search-field">
        <span className="field-icon"><CalendarDays size={19} /></span>
        <span className="field-copy">
          <span>WHEN?</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Travel start date"
          />
        </span>
      </label>

      <label className="search-field travelers-field">
        <span className="field-icon"><Users size={19} /></span>
        <span className="field-copy">
          <span>WHO'S GOING?</span>
          <select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            aria-label="Number of travelers"
          >
            <option>1 traveler</option>
            <option>2 travelers</option>
            <option>3 travelers</option>
            <option>4 travelers</option>
            <option>5+ travelers</option>
          </select>
        </span>
        <ChevronDown size={15} />
      </label>

      <button className="search-submit" type="submit">
        <Search size={20} />
        <span>Explore</span>
      </button>
    </form>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All places');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);

  const filteredDestinations = useMemo(
    () =>
      destinations.filter((destination) => {
        const matchesCategory =
          activeCategory === 'All places' ||
          destination.category === activeCategory;

        const term = searchQuery.trim().toLowerCase();

        const searchableText = [
          destination.name,
          destination.country,
          destination.region,
          destination.category,
        ].join(' ').toLowerCase();

        return matchesCategory &&
          (!term || searchableText.includes(term));
      }),
    [activeCategory, searchQuery],
  );

  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />

          <div className="hero-content page-shell">
            <div className="hero-kicker">
              <span className="kicker-line" />
              THE WORLD, A LITTLE CLOSER
            </div>

            <h1>Somewhere<br />is calling <em>you.</em></h1>

            <p className="hero-description">
              The best journeys start with a feeling.
              <br className="desktop-break" />
              Let’s turn yours into a plan.
            </p>

            <a className="button button-gold" href="#destinations">
              Find your somewhere <ArrowUpRight size={17} />
            </a>

            <div className="hero-footnote">
              <span className="hero-footnote-line" />
              MADE FOR THE WAY YOU WANT TO WANDER
            </div>
          </div>

          <div className="hero-side-note">
            20° N — 77° E
            <span>THE WORLD IS YOURS TO EXPLORE</span>
          </div>

          <a href="#destinations" className="scroll-cue">
            <span>SCROLL TO DISCOVER</span><ArrowDown size={15} />
          </a>

          <div className="hero-count">
            <strong>01</strong><span>/ 06</span><i />
          </div>
        </section>

        <section className="intro-section page-shell" id="how-it-works">
          <div className="intro-overline">
            <Sparkles size={15} /> A MORE PERSONAL WAY TO TRAVEL
          </div>

          <div className="intro-grid">
            <h2>Less scrolling.<br /><em>More stories.</em></h2>

            <div className="intro-copy">
              <p>
                From the places you’ve always dreamed of to the detours
                you haven’t imagined yet, TripVerse helps you bring every
                part of your journey together.
              </p>
              <a className="text-link" href="#destinations">
                Meet your next destination <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="promise-row">
            <div>
              <span className="promise-number">01</span>
              <Globe2 />
              <h3>Find your place</h3>
              <p>Discover destinations that fit your kind of adventure.</p>
            </div>

            <div>
              <span className="promise-number">02</span>
              <CalendarDays />
              <h3>Shape your days</h3>
              <p>Start turning ideas into a journey that feels like yours.</p>
            </div>

            <div>
              <span className="promise-number">03</span>
              <Compass />
              <h3>Go your own way</h3>
              <p>Keep the plan flexible. Leave room for the unexpected.</p>
            </div>
          </div>
        </section>

        <section className="destinations-section" id="destinations">
          <div className="page-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span className="tiny-gold-dot" />
                  THE WORLD IS WIDE OPEN
                </p>
                <h2>Places worth <em>the journey.</em></h2>
                <p className="section-subtitle">
                  A little inspiration for wherever you want to go next.
                </p>
              </div>
              <span className="section-index">01 — DESTINATIONS</span>
            </div>

            <div className="explore-toolbar">
              <div className="filter-tabs" role="group" aria-label="Filter destinations">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      activeCategory === category
                        ? 'filter-tab active'
                        : 'filter-tab'
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="inline-search">
                <Search size={16} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search places"
                  aria-label="Search destinations"
                />
              </label>
            </div>

            {filteredDestinations.length ? (
              <div className="destination-grid">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onExplore={setSelectedDestination}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Compass size={30} />
                <h3>No places found just yet</h3>
                <p>Try another destination name or category.</p>
                <button
                  className="text-link"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All places');
                  }}
                >
                  Show all destinations <ArrowRight size={16} />
                </button>
              </div>
            )}

            <p className="estimate-disclaimer">
              *All prices are illustrative demo estimates in INR per
              traveller, not live travel quotes. Actual costs vary by
              season, transport, and personal choices.
            </p>

            <div className="section-bottom-link">
              <span>YOUR NEXT CHAPTER IS OUT THERE.</span>
              <a href="#trip-search">
                Start with a search <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="experiences-section page-shell" id="experiences">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="tiny-gold-dot" />
                GO BEYOND THE CHECKLIST
              </p>
              <h2>Collect moments, <em>not just miles.</em></h2>
              <p className="section-subtitle">
                A few ways to feel a place, not just see it.
              </p>
            </div>
            <span className="section-index">02 — EXPERIENCES</span>
          </div>

          <div className="experience-grid">
            {experiences.map((experience, index) => (
              <article
                className={`experience-card experience-${index + 1}`}
                key={experience.title}
              >
                <img
                  src={experience.image}
                  alt={`${experience.place} experience`}
                  loading="lazy"
                />
                <div className="experience-overlay" />
                <div className="experience-copy">
                  <span>{experience.type}</span>
                  <h3>{experience.title}</h3>
                  <p><MapPin size={14} />{experience.place}</p>
                </div>
                <span className="experience-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-cta">
          <div className="closing-backdrop" />
          <div className="closing-content">
            <p className="eyebrow">YOUR STORY STARTS SOMEWHERE</p>
            <h2>The world won’t<br />explore <em>itself.</em></h2>
            <p>Pick a place. Follow a feeling. We’ll help with the plan.</p>
            <a href="#trip-search" className="button button-gold">
              Let’s plan your trip <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top page-shell">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark"><Compass size={23} /></span>
            <span>
              trip<span className="brand-light">verse</span>
              <small>MAKE ROOM FOR WONDER</small>
            </span>
          </a>

          <p>
            Discover places. Design your journey.
            <br />Travel your way.
          </p>

          <a href="#destinations" className="footer-back">
            BACK TO DISCOVERY ↑
          </a>
        </div>

        <div className="footer-bottom page-shell">
          <span>© 2026 TripVerse · Portfolio project</span>
          <span>Thoughtfully planned. Freely explored.</span>
          <span className="demo-footer"><Check size={13} /> DEMO EXPERIENCE</span>
        </div>
      </footer>

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </>
  );
}
