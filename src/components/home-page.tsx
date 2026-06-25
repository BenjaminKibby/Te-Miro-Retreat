"use client";

import Image from "next/image";
import {
  Bath,
  BedDouble,
  Bike,
  CalendarDays,
  Car,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Mountain,
  Phone,
  Send,
  Sparkles,
  Star,
  Tv,
  Users,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  tall?: boolean;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/images/exterior-tree-framed.jpeg",
    alt: "White rural retreat framed by trees and Waikato hills",
    category: "Exterior",
  },
  {
    src: "/images/kitchen-dining-wide.jpeg",
    alt: "Open plan dining room and modern kitchen with rural views",
    category: "Living",
    tall: true,
  },
  {
    src: "/images/sunroom-lounge-deck.jpeg",
    alt: "Sunlit sitting room opening to the deck",
    category: "Living",
  },
  {
    src: "/images/kitchen-island.jpeg",
    alt: "Large island kitchen with breakfast stools",
    category: "Kitchen",
  },
  {
    src: "/images/lounge-open-plan.jpeg",
    alt: "Open plan lounge flowing into dining space",
    category: "Living",
  },
  {
    src: "/images/media-lounge-sky-sport.jpeg",
    alt: "Spacious lounge with large television and Sky Sport",
    category: "Entertainment",
    tall: true,
  },
  {
    src: "/images/king-bedroom-rural-view.jpeg",
    alt: "King bedroom with countryside outlook",
    category: "Bedrooms",
  },
  {
    src: "/images/queen-bedroom-deck.jpeg",
    alt: "Sunny queen bedroom with direct deck access",
    category: "Bedrooms",
    tall: true,
  },
  {
    src: "/images/queen-bedroom-grey.jpeg",
    alt: "Queen bedroom with soft grey linen and deck outlook",
    category: "Bedrooms",
  },
  {
    src: "/images/bedroom-countryside-window.jpeg",
    alt: "Queen bedroom with countryside view through the window",
    category: "Bedrooms",
  },
  {
    src: "/images/twin-bedroom-deck.jpeg",
    alt: "King single bedroom with two beds and deck view",
    category: "Bedrooms",
  },
  {
    src: "/images/bathroom-shower.jpeg",
    alt: "Modern bathroom shower with clean white finish",
    category: "Bathrooms",
  },
  {
    src: "/images/bathroom-vanity-mirror.jpeg",
    alt: "Modern bathroom vanity with round mirror",
    category: "Bathrooms",
    tall: true,
  },
  {
    src: "/images/bathroom-shower-vanity.jpeg",
    alt: "Compact bathroom shower and vanity",
    category: "Bathrooms",
  },
  {
    src: "/images/laundry.jpeg",
    alt: "Full laundry with washer and dryer",
    category: "Laundry",
  },
  {
    src: "/images/rural-cows-hills.jpeg",
    alt: "Countryside views over rolling Waikato paddocks",
    category: "Rural views",
  },
  {
    src: "/images/sauna-hot-rocks.jpeg",
    alt: "Private sauna with timber benches",
    category: "Sauna",
    tall: true,
  },
];

const features = [
  ["Sleeps up to 10 guests", Users],
  ["5 spacious bedrooms", BedDouble],
  ["2 modern bathrooms", Bath],
  ["Rural countryside views", Mountain],
  ["Private sauna experience", Flame],
  ["Fast Wi-Fi", Wifi],
  ["Sky Sport entertainment", Tv],
  ["Family friendly", Heart],
  ["Mountain biking nearby", Bike],
  ["Close to Lake Karapiro", Waves],
];

const bookedRanges: { start: string; end: string }[] = [];

const locationItems = [
  ["Cambridge Town Centre", "12 min", "Boutiques, cafes and village charm"],
  ["Lake Karapiro", "18 min", "Rowing, water views and summer picnics"],
  ["Te Miro Mountain Bike Park", "20 min", "Forest trails and adventure days"],
  ["Avantidrome", "15 min", "World-class cycling venue"],
  ["Mystery Creek Events Centre", "28 min", "Major events and fieldays"],
  ["Hamilton Airport", "30 min", "Easy regional access"],
  ["Hobbiton", "35 min", "A signature Waikato day trip"],
  ["Waikato River Trails", "30 min", "Scenic cycling and walking"],
];

const reviews = [
  {
    name: "Sarah & David",
    stay: "Auckland",
    text: "A truly exceptional rural retreat. We spent our mornings taking in the sweeping countryside views and our evenings relaxing in the sauna. The home is beautifully presented, incredibly spacious, and perfectly suited for larger groups. It offered the perfect balance of luxury, comfort, and privacy.",
  },
  {
    name: "Emma & James",
    stay: "Wellington",
    text: "One of the most relaxing stays we've experienced. The home is immaculately maintained, stylishly furnished, and surrounded by stunning Waikato scenery. Every detail has been thoughtfully considered, making it ideal for families, couples, or groups looking to escape and unwind.",
  },
  {
    name: "Michael & Team",
    stay: "Christchurch",
    text: "We stayed while attending an event at Mystery Creek and couldn't have found a better location. The house exceeded our expectations, with generous living spaces, comfortable bedrooms, and breathtaking rural views. The sauna was a standout feature and the perfect way to relax after a busy day.",
  },
];

const faqs = [
  ["What time is check-in?", "Check-in is from 3:00pm. Earlier arrivals may be available by prior arrangement."],
  ["What time is check-out?", "Check-out is by 10:00am so the home can be reset beautifully for the next guests."],
  ["Is parking available?", "Yes. There is generous off-street parking suitable for multiple vehicles."],
  ["Is Wi-Fi included?", "Yes. Unlimited fast Wi-Fi is included throughout the property."],
  ["Are pets allowed?", "No pets are allowed at the property."],
  ["How does sauna use work?", "Guests receive simple sauna guidance before arrival, including safety, essential oils and recommended session times."],
  ["What attractions are nearby?", "Cambridge, Lake Karapiro, Te Miro Mountain Bike Park, Avantidrome, Hobbiton and Hamilton Airport are all within easy reach."],
  ["What is the cancellation policy?", "Cancellation terms are confirmed with your direct booking quote and may vary by season."],
];

const dateFormatter = new Intl.DateTimeFormat("en-NZ", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-NZ", {
  month: "long",
  year: "numeric",
});

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const contactEmail = "aspinretreat@gmail.com";
const contactPhone = "027296582";
const propertyAddress = "Aspin Road, Cambridge, Waikato, New Zealand";
const encodedPropertyAddress = encodeURIComponent(propertyAddress);

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T12:00:00`));
}

function dateRangesOverlap(arrival: string, departure: string) {
  return bookedRanges.some((range) => arrival < range.end && departure > range.start);
}

function toIsoDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function isBookedDate(date: string) {
  return bookedRanges.some((range) => date >= range.start && date < range.end);
}

function buildCalendarMonth(monthStart: Date) {
  const firstWeekday = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  const blanks = Array.from({ length: firstWeekday }, () => null);
  const days = Array.from({ length: daysInMonth }).map((_, index) => {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), index + 1);
    return {
      day: index + 1,
      iso: toIsoDate(date),
    };
  });

  return {
    label: monthFormatter.format(monthStart),
    days: [...blanks, ...days],
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  name: "Aspin Retreat",
  description:
    "Premium five-bedroom rural holiday home near Cambridge, Waikato with private sauna, countryside views and direct booking enquiries.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cambridge",
    addressRegion: "Waikato",
    addressCountry: "NZ",
  },
  amenityFeature: [
    "Private sauna",
    "Fast Wi-Fi",
    "Sky Sport",
    "Full laundry",
    "Large kitchen",
    "Countryside views",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  numberOfBedrooms: 5,
  occupancy: {
    "@type": "QuantitativeValue",
    maxValue: 10,
  },
  image: galleryImages.slice(0, 8).map((image) => image.src),
};

export function HomePage() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [arrivalDate, setArrivalDate] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(2026, 5, 1));
  const [bookingError, setBookingError] = useState("");
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 130]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.08]);

  const activeReview = reviews[reviewIndex];
  const todayIso = useMemo(() => toIsoDate(new Date()), []);
  const calendarMonth = useMemo(() => buildCalendarMonth(visibleMonth), [visibleMonth]);

  const closeLightbox = () => setActiveImage(null);
  const showNext = () =>
    setActiveImage((current) => (current === null ? 0 : (current + 1) % galleryImages.length));
  const showPrevious = () =>
    setActiveImage((current) =>
      current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length,
    );

  function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingError("");

    if (!arrivalDate || !departureDate) {
      setBookingError("Please choose an arrival and departure date on the calendar.");
      return;
    }

    if (dateRangesOverlap(arrivalDate, departureDate)) {
      setBookingError("Those dates are no longer available. Please choose another available stay.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = "Booking enquiry for Aspin Retreat";
    const body = `Kia ora,\n\nI would like to enquire about staying at Aspin Retreat.\n\nArrival: ${arrivalDate}\nDeparture: ${departureDate}\nGuests: ${data.get("guests")}\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\n\nMessage:\n${data.get("message")}`;

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function handleCalendarDateClick(date: string) {
    setBookingError("");

    if (date < todayIso || isBookedDate(date)) {
      return;
    }

    if (!arrivalDate || departureDate || date <= arrivalDate) {
      setArrivalDate(date);
      setDepartureDate(null);
      return;
    }

    if (dateRangesOverlap(arrivalDate, date)) {
      setBookingError("That stay crosses dates that are already booked. Please choose a different departure date.");
      return;
    }

    setDepartureDate(date);
  }

  function getCalendarDateState(date: string) {
    const past = date < todayIso;
    const booked = isBookedDate(date);
    const selected = date === arrivalDate || date === departureDate;
    const inSelectedRange =
      arrivalDate !== null && departureDate !== null && date > arrivalDate && date < departureDate;

    return {
      disabled: past || booked,
      booked,
      selected,
      inSelectedRange,
    };
  }

  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/15 bg-[#181512]/45 text-white backdrop-blur-xl">
        <nav className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="font-serif text-2xl font-semibold">
            Aspin Retreat
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {["Gallery", "Wellness", "Location", "Reviews", "Book"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#d9bb8b]">
                {item}
              </a>
            ))}
          </div>
          <a
            href="#book"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-[#181512] transition hover:bg-[#d9bb8b] lg:inline-flex"
          >
            Book Your Stay
          </a>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 lg:hidden"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-[#181512] text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-shell flex h-16 items-center justify-between">
              <span className="font-serif text-2xl font-semibold">Aspin Retreat</span>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30"
                aria-label="Close navigation"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="section-shell flex flex-col gap-5 py-12 font-serif text-4xl">
              {["Gallery", "Wellness", "Location", "Reviews", "Book"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section id="top" className="relative min-h-[100svh] bg-[#181512] text-white">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image
            src="/images/exterior-tree-framed.jpeg"
            alt="Luxury rural holiday home near Cambridge in Waikato"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#181512]/50 via-[#181512]/25 to-[#181512]/78" />
        <div className="relative z-10 flex min-h-[100svh] items-end">
          <div className="section-shell pb-10 pt-28 sm:pb-16 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <p className="eyebrow mb-4 text-[#f1d9ad]">Cambridge, Waikato</p>
              <h1 className="display text-6xl font-semibold sm:text-7xl lg:text-8xl">
                Aspin Retreat
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
                A private countryside home made for slow mornings, shared meals and unhurried Waikato escapes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#book"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f8efe1] px-7 text-sm font-bold text-[#181512] transition hover:bg-[#d9bb8b]"
                >
                  Book Your Stay
                </a>
                <a
                  href="#property"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 px-7 text-sm font-bold text-white transition hover:bg-white/12"
                >
                  Explore The Property
                </a>
              </div>
            </motion.div>
            <div className="mt-12 grid max-w-3xl grid-cols-3 gap-3 text-sm text-white/90">
              {["5 bedrooms", "Sleeps 10", "Private sauna"].map((item) => (
                <div key={item} className="border-l border-white/35 pl-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-12 sm:py-16">
        <div className="section-shell border-y border-[#e4d8c8] py-8">
          <div className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr] lg:items-center">
            <p className="eyebrow">Welcome home</p>
            <p className="font-serif text-3xl font-semibold leading-snug text-[#221c17] sm:text-4xl">
              Step into a private rural retreat prepared for relaxed stays, shared meals and quiet moments in the
              Waikato countryside.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f0] py-20 sm:py-28">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Why guests love staying here</p>
            <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">
              Country comfort with the freedom of a private rural home.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {features.map(([label, Icon], index) => (
              <motion.div
                key={label as string}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.035 }}
                className="rounded-lg border border-[#e4d8c8] bg-[#fffaf2] p-4 shadow-sm"
              >
                <Icon className="mb-5 text-[#9f6f4e]" size={24} strokeWidth={1.7} />
                <p className="text-sm font-semibold leading-5">{label as string}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#181512] py-20 text-white sm:py-28">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#d9bb8b]">Gallery</p>
              <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">
                Explore the Retreat
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
                A glimpse into the peaceful surroundings, stylish interiors, and breathtaking rural views that make
                every stay unforgettable.
              </p>
            </div>
          </div>
          <div className="masonry mt-12">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                onClick={() => setActiveImage(index)}
                className="masonry-item group relative block w-full overflow-hidden rounded-lg bg-white/5 text-left"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={image.tall ? 1350 : 820}
                  sizes="(min-width: 1024px) 33vw, (min-width: 680px) 50vw, 100vw"
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#181512]/65 px-3 py-1 text-xs font-bold backdrop-blur">
                  {image.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="property" className="bg-[#fffaf2] py-20 sm:py-28">
        <div className="section-shell">
          <div className="max-w-4xl">
            <p className="eyebrow">Property overview</p>
            <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">
              Escape to the tranquillity of the Waikato countryside.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5a4b3d]">
              Stay just minutes from the heart of Cambridge. Spend your days exploring local cafes, boutique
              shopping, cycling trails, and nearby attractions before returning to your private retreat to relax,
              reconnect, and take in the sweeping rural views.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [
                "Accommodation",
                ["Sleeps up to 10 guests", "1 King bedroom", "3 Queen bedrooms", "2 King Single beds", "2 Bathrooms", "Full laundry"],
              ],
              [
                "Living",
                ["Open plan living", "Large modern kitchen", "Indoor-outdoor flow", "Family dining space", "Large TV with Sky Sport"],
              ],
              [
                "Comfort",
                ["Unlimited Wi-Fi", "Heat transfer system", "Premium furnishings", "Quality bedding", "Spacious entertaining areas"],
              ],
            ].map(([title, items]) => (
              <div key={title as string} className="min-w-0 rounded-lg border border-[#e4d8c8] bg-white p-6 shadow-sm sm:p-8">
                <h3 className="font-serif text-3xl font-semibold leading-tight text-[#221c17]">{title as string}</h3>
                <ul className="mt-6 space-y-3 text-base leading-7 text-[#5a4b3d]">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Sparkles className="mt-1.5 shrink-0 text-[#c59b62]" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="wellness" className="relative bg-[#283224] py-20 text-white sm:py-28">
        <div className="absolute inset-0 opacity-35">
          <Image
            src="/images/sauna-hot-rocks.jpeg"
            alt="Private sauna at Aspin Retreat"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#283224] via-[#283224]/86 to-[#283224]/55" />
        <div className="section-shell relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="glass-panel rounded-lg p-6 text-[#221c17] sm:p-8">
            <Flame className="mb-6 text-[#9f6f4e]" size={32} />
            <p className="eyebrow">Sauna experience</p>
            <h2 className="display mt-3 text-5xl font-semibold">Private sauna</h2>
            <p className="mt-6 leading-8 text-[#5a4b3d]">
              Relax in your private hot rock sauna and enjoy a moment of complete tranquility. Whether you&apos;ve
              spent the day exploring Cambridge, Lake Karapiro, or the Te Miro trails, it&apos;s the perfect way to
              unwind before settling in for the evening.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Private sauna", "Essential oils", "Peaceful rural setting", "Post-adventure recovery"].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                <Star className="mb-5 text-[#d9bb8b]" size={20} fill="currentColor" />
                <p className="font-serif text-2xl font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="bg-[#fbf7f0] py-20 sm:py-28">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Location</p>
            <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">
              Nestled in the Waikato countryside, the retreat offers rural tranquility just 10 minutes from Cambridge and close to the region&apos;s top attractions.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-[#d9cdbd] bg-[#ece4d8] shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center bg-[#efe6d8] p-8 text-center text-[#5a4b3d]">
                <div>
                  <MapPin className="mx-auto mb-4 text-[#9f6f4e]" size={34} />
                  <p className="font-serif text-2xl font-semibold text-[#221c17]">Google map loading</p>
                  <p className="mt-2 text-sm leading-6">Near Cambridge, Waikato</p>
                </div>
              </div>
              <iframe
                title="Google map showing Aspin Road near Cambridge Waikato"
                src={`https://maps.google.com/maps?hl=en&q=${encodedPropertyAddress}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                className="absolute inset-0 z-10 h-full w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodedPropertyAddress}`}
                target="_blank"
                rel="noreferrer"
                className="absolute right-4 top-4 z-20 rounded-full bg-[#181512] px-4 py-2 text-xs font-bold text-white shadow-xl transition hover:bg-[#9f6f4e]"
              >
                Open Google Maps
              </a>
              <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 rounded-lg bg-[#fffaf2]/92 p-4 text-sm leading-6 text-[#4f4034] shadow-xl backdrop-blur">
                <strong className="block font-serif text-xl text-[#221c17]">Approximate location</strong>
                Cambridge, Waikato.
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {locationItems.map(([name, time, detail]) => (
                <div key={name} className="rounded-lg border border-[#e4d8c8] bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <MapPin className="text-[#9f6f4e]" size={21} />
                    <span className="rounded-full bg-[#f1e6d6] px-3 py-1 text-xs font-bold">{time}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6b5a4a]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f0] py-20 sm:py-28">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">About the Property</p>
            <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">
              Designed to bring people together.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#5a4b3d]">
              Whether you&apos;re planning a family gathering, a weekend escape, or accommodation for a local event,
              the retreat has been designed to bring people together. Spacious open-plan living, five comfortable
              bedrooms, a private sauna, and generous outdoor areas provide the perfect setting to relax, reconnect,
              and create lasting memories.
            </p>
            <p className="mt-5 text-lg leading-8 text-[#5a4b3d]">
              Thoughtfully renovated with modern comforts and surrounded by peaceful countryside, it&apos;s a place
              where you can slow down, unwind, and enjoy everything the Waikato has to offer.
            </p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
            <Image
              src="/images/exterior-hills-blue-sky.jpeg"
              alt="White holiday home with lawn and rural hills"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="book" className="bg-[#283224] py-20 text-white sm:py-28">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow text-[#d9bb8b]">Direct booking</p>
            <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">Reserve Your Escape Today</h2>
            <p className="mt-6 text-lg leading-8 text-white/76">
              Select your arrival and departure dates from the calendar, add your guest details, and we will come back
              with pricing and the next steps to secure your stay.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Calendar view", "Booked dates blocked", "Direct enquiry"].map((item) => (
                <div key={item} className="rounded-lg border border-white/14 bg-white/8 p-4 text-sm font-bold">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleBookingSubmit} className="rounded-lg bg-[#fffaf2] p-5 text-[#221c17] shadow-2xl sm:p-7">
            <div>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9f6f4e]">Choose dates</span>
                  <p className="mt-2 text-sm leading-6 text-[#6b5a4a]">
                    Select an arrival date, then select a departure date. Booked dates cannot be selected.
                  </p>
                </div>
                <div className="flex gap-3 text-xs font-bold text-[#6b5a4a]">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-[#181512]" />
                    Selected
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-[#d8cabc]" />
                    Booked
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-[#e4d8c8] bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9cdbd] transition hover:bg-[#f1e6d6]"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <h3 className="text-center font-serif text-3xl font-semibold">{calendarMonth.label}</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
                    }
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9cdbd] transition hover:bg-[#f1e6d6]"
                    aria-label="Next month"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-[#9f6f4e]">
                  {weekDays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {calendarMonth.days.map((day, index) => {
                    if (!day) {
                      return <span key={`blank-${calendarMonth.label}-${index}`} className="aspect-square" />;
                    }

                    const state = getCalendarDateState(day.iso);

                    return (
                      <button
                        key={day.iso}
                        type="button"
                        disabled={state.disabled}
                        onClick={() => handleCalendarDateClick(day.iso)}
                        className={`aspect-square rounded-md text-sm font-bold transition ${
                          state.selected
                            ? "bg-[#181512] text-white"
                            : state.inSelectedRange
                              ? "bg-[#f1e6d6] text-[#221c17]"
                              : state.booked
                                ? "cursor-not-allowed bg-[#d8cabc] text-[#8a7a69] line-through"
                                : state.disabled
                                  ? "cursor-not-allowed text-[#c4b7a8]"
                                  : "bg-[#fffaf2] text-[#221c17] hover:bg-[#c59b62] hover:text-white"
                        }`}
                        aria-label={`${formatDate(day.iso)}${state.booked ? " booked" : ""}`}
                      >
                        {day.day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-[#d9cdbd] bg-white px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9f6f4e]">Arrival</span>
                <p className="mt-2 font-semibold">{arrivalDate ? formatDate(arrivalDate) : "Select on calendar"}</p>
              </div>
              <div className="rounded-md border border-[#d9cdbd] bg-white px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9f6f4e]">Departure</span>
                <p className="mt-2 font-semibold">{departureDate ? formatDate(departureDate) : "Select on calendar"}</p>
              </div>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9f6f4e]">Guests</span>
                <select name="guests" defaultValue="6" className="mt-2 w-full rounded-md border border-[#d9cdbd] bg-white px-4 py-3">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1} {index === 0 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9f6f4e]">Name</span>
                <input name="name" required placeholder="Your name" className="mt-2 w-full rounded-md border border-[#d9cdbd] bg-white px-4 py-3" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9f6f4e]">Phone</span>
                <input name="phone" placeholder="+64" className="mt-2 w-full rounded-md border border-[#d9cdbd] bg-white px-4 py-3" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9f6f4e]">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what kind of stay you are planning."
                  className="mt-2 w-full resize-none rounded-md border border-[#d9cdbd] bg-white px-4 py-3"
                />
              </label>
            </div>
            {bookingError ? (
              <p className="mt-4 rounded-md border border-[#c59b62]/35 bg-[#f1e6d6] p-3 text-sm font-semibold text-[#5a3724]">
                {bookingError}
              </p>
            ) : null}
            <button className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#181512] px-7 text-sm font-bold text-white transition hover:bg-[#9f6f4e]">
              <Send size={17} />
              Send Booking Enquiry
            </button>
          </form>
        </div>
      </section>

      <section id="reviews" className="bg-[#fffaf2] py-20 sm:py-28">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">Reviews</p>
            <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">
              Guest Experiences
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#5a4b3d]">
              From family getaways and cycling weekends to corporate retreats and Mystery Creek events, our guests
              love the comfort, privacy, and stunning rural setting of Aspin Retreat.
            </p>
          </div>
          <div className="rounded-lg bg-[#181512] p-6 text-white shadow-2xl sm:p-9">
            <div className="mb-8 flex gap-1 text-[#d9bb8b]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={20} fill="currentColor" />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.name}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.28 }}
              >
                <p className="font-serif text-3xl leading-tight sm:text-4xl">&ldquo;{activeReview.text}&rdquo;</p>
                <div className="mt-8">
                  <p className="font-bold">{activeReview.name}</p>
                  <p className="text-sm text-white/62">{activeReview.stay}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex gap-3">
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
                onClick={() => setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length)}
                aria-label="Previous review"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
                onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}
                aria-label="Next review"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20 sm:py-28">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Frequently asked questions</p>
            <h2 className="display mt-3 text-5xl font-semibold sm:text-6xl">Everything useful before you book.</h2>
          </div>
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-lg border border-[#e4d8c8] bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-2xl font-semibold">
                  {question}
                  <span className="text-[#9f6f4e] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 leading-7 text-[#5a4b3d]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#181512] py-12 text-white">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_1fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Aspin Retreat</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/64">
              Luxury rural accommodation near Cambridge, Waikato, created for direct bookings and memorable private
              escapes.
            </p>
          </div>
          <div className="space-y-3 text-sm text-white/76">
            <a className="flex items-center gap-3 transition hover:text-[#d9bb8b]" href={`mailto:${contactEmail}`}>
              <Mail size={16} /> {contactEmail}
            </a>
            <a className="flex items-center gap-3 transition hover:text-[#d9bb8b]" href={`tel:${contactPhone}`}>
              <Phone size={16} /> {contactPhone}
            </a>
            <a className="flex items-center gap-3 transition hover:text-[#d9bb8b]" href="#location">
              <MapPin size={16} /> Cambridge, Waikato
            </a>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex gap-3">
              <a aria-label="Instagram" href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10">
                <Instagram size={17} />
              </a>
              <a aria-label="Google Maps" href={`https://www.google.com/maps/search/?api=1&query=${encodedPropertyAddress}`} target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10">
                <Car size={17} />
              </a>
              <a aria-label="Booking" href="#book" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10">
                <CalendarDays size={17} />
              </a>
            </div>
            <p className="text-sm text-white/48">Copyright 2026. Privacy Policy.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeImage !== null ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#090806]/95 p-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur"
              aria-label="Close gallery"
              onClick={closeLightbox}
            >
              <X size={21} />
            </button>
            <button
              className="absolute left-5 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-5 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
            >
              <ChevronRight size={22} />
            </button>
            <div className="relative mx-auto flex h-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
              <Image
                src={galleryImages[activeImage].src}
                alt={galleryImages[activeImage].alt}
                width={1800}
                height={1100}
                sizes="100vw"
                className="max-h-[86vh] w-auto rounded-lg object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 text-sm backdrop-blur">
                {galleryImages[activeImage].category} · {activeImage + 1} of {galleryImages.length}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
