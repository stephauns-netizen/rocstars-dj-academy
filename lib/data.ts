// ============================================================
//  Content data layer — single source of truth for the site.
//  Swap any placeholder for real content here; pages re-render.
// ============================================================

export const SITE = {
  name: 'RocStars DJ Academy',
  tagline: "Master the Art of DJing — Powered by Serato",
  location: '#19 Eastern Main Road, Arouca, Trinidad & Tobago',
  email: 'Roc.stars8@gmail.com',
  phone: '+1 (868) 000-0000',
  whatsapp: 'https://wa.me/18680000000',
  socials: {
    instagram: '#',
    tiktok: '#',
    youtube: '#',
    whatsapp: 'https://wa.me/18680000000',
  },
  logo: '/logo.png',
};

// ============================================================
//  IMAGES — real RocStars photos served from /public/images
//  (instructor slots still use AI renders until real headshots
//   + bios are finalised — see INSTRUCTORS below)
// ============================================================
export const IMAGES = {
  // Real photos
  heroBooth: '/images/hero-night-set.jpg', // cinematic blue-lit night set
  equipment: '/images/dj-mixing-focus.jpg', // hands on the gear, focused mix
  festival: '/images/dj-outdoor-set.jpg', // outdoor Pioneer set, tropical
  about: '/images/dj-night-portrait.jpg', // portrait shot — fits the About 4:5 frame
  iconCutout: '/images/dj-icon-cutout.jpg', // ICON-tee cutout (reserved for future use)

  // Gallery photos
  galleryBooth: '/images/rocstars-booth.jpg', // KW DJ Wilo at the branded RocStars booth
  galleryCarnival: '/images/dj-carnival.jpg',
  galleryBoat: '/images/dj-boat-crew.jpg',
  galleryTurntables: '/images/dj-turntables.jpg',

  // Instructor renders — placeholders until real names/photos are set
  instructorMJ:
    'https://d8j0ntlcm91z4.cloudfront.net/user_3DB0PgahDSDamK07Br1W0UHkhnT/hf_20260517_151620_6f9b1154-1503-4abe-8560-bae5c27fc157.png',
  instructorNya:
    'https://d8j0ntlcm91z4.cloudfront.net/user_3DB0PgahDSDamK07Br1W0UHkhnT/hf_20260517_151801_05c2ffaf-56aa-4188-893b-1e64fb1ffc4f.png',
  instructorDevon:
    'https://d8j0ntlcm91z4.cloudfront.net/user_3DB0PgahDSDamK07Br1W0UHkhnT/hf_20260517_151804_206fa27c-b868-4e0f-a4bd-a685293ff0c0.png',
};

// Image slot identifier (a key of IMAGES).
export type MediaKey = keyof typeof IMAGES;

// The photos available to pick from in the admin media manager.
// Add new entries here whenever new files land in /public/images.
export const AVAILABLE_IMAGES: { path: string; label: string }[] = [
  { path: '/images/hero-night-set.jpg', label: 'Night set — cinematic blue/green' },
  { path: '/images/dj-mixing-focus.jpg', label: 'Mixing — hands on the gear' },
  { path: '/images/dj-outdoor-set.jpg', label: 'Outdoor set — palms' },
  { path: '/images/rocstars-booth.jpg', label: 'RocStars branded booth (DJ Wilo)' },
  { path: '/images/dj-night-portrait.jpg', label: 'Night portrait — vertical' },
  { path: '/images/dj-carnival.jpg', label: 'Carnival wall — smiling' },
  { path: '/images/dj-boat-crew.jpg', label: 'Boat ride with crew' },
  { path: '/images/dj-turntables.jpg', label: 'On the turntables — indoor' },
  { path: '/images/dj-icon-cutout.jpg', label: 'ICON tee — white-background cutout' },
];

// ============================================================
//  COURSES
// ============================================================
export type Course = {
  slug: 'beginner' | 'intermediate' | 'expert';
  levelLabel: string;
  badge: string;
  title: string;
  blurb: string;
  curriculum: string[];
  durationWeeks: number;
  perWeek: number;
  schedule: string;
  priceTTD: number;
  seatsLabel: string;
  popular?: boolean;
};

export const COURSES: Course[] = [
  {
    slug: 'beginner',
    levelLabel: 'Level 01 · Beginner',
    badge: 'No experience needed',
    title: 'Beginner DJ Course',
    blurb:
      'Perfect for complete beginners. Build the foundation — understand the music, the gear, and the software — and walk out able to mix two tracks live with confidence.',
    curriculum: [
      'Introduction to DJing & the booth setup',
      'Serato DJ Pro install & first session',
      'Understanding BPM & song structure',
      'Basic beat matching',
      'EQ basics & clean transitions',
      'Cue points & music organisation',
      'DJ equipment overview',
    ],
    durationWeeks: 6,
    perWeek: 2,
    schedule: 'Sat & Tue',
    priceTTD: 2500,
    seatsLabel: '12 seats left',
  },
  {
    slug: 'intermediate',
    levelLabel: 'Level 02 · Intermediate',
    badge: 'Showcase set included',
    title: 'Intermediate DJ Course',
    blurb:
      "Take your sound past the basics. Build sets that flow, read the room, and use Serato's advanced tools the way working DJs do every weekend.",
    curriculum: [
      'Advanced transitions & mashups',
      'Harmonic mixing in key',
      'Looping, hot cues & samples',
      'Effects, energy curves & build-ups',
      'Creative mixing & tempo blending',
      'Faster, tighter beat matching by ear',
      'Reading the crowd & set design',
      'Serato advanced tools & workflow',
    ],
    durationWeeks: 8,
    perWeek: 2,
    schedule: 'Mon & Thu',
    priceTTD: 3000,
    seatsLabel: 'Most popular',
    popular: true,
  },
  {
    slug: 'expert',
    levelLabel: 'Level 03 · Expert',
    badge: 'Performance training',
    title: 'Expert / Performance',
    blurb:
      'The final level. Develop a signature style, sharpen scratching, and build the confidence and workflow to perform at club level — anywhere in the country.',
    curriculum: [
      'Scratching techniques & routines',
      'Performance tricks & signature moves',
      'Club-level mixing & set planning',
      'Live performance preparation',
      'DJ branding fundamentals',
      'Crowd psychology & vibe control',
      'Performance confidence on stage',
      'Pro workflows & advanced Serato',
      'Building a signature style',
    ],
    durationWeeks: 8,
    perWeek: 2,
    schedule: 'Wed & Sat',
    priceTTD: 3500,
    seatsLabel: 'New cohort Aug',
  },
];

// ============================================================
//  INSTRUCTORS
// ============================================================
export type Instructor = {
  name: string;
  role: string;
  badge: string;
  bio: string;
  image: string;
  imageKey: MediaKey; // which IMAGES slot drives this photo (admin-editable)
};

export const INSTRUCTORS: Instructor[] = [
  {
    name: 'Marcus "MJ" Joseph',
    role: 'Resident · Aria Lounge',
    badge: 'Head of Faculty',
    bio: '11 years on the decks. Specialises in club performance and crowd reads. Trained 80+ students who now hold residencies across T&T.',
    image: IMAGES.instructorMJ,
    imageKey: 'instructorMJ',
  },
  {
    name: 'Anaya "DJ Nya" Pierre',
    role: 'Hennessy Artistry Alum',
    badge: 'Carnival Specialist',
    bio: '7 years across the Carnival circuit. Specialist in soca, dancehall, and high-energy set design. Hennessy Artistry alum.',
    image: IMAGES.instructorNya,
    imageKey: 'instructorNya',
  },
  {
    name: 'Devon "Selectah D" Charles',
    role: 'Sunsplash · Ultra Brasil',
    badge: 'Festival Headliner',
    bio: '14 years headlining festivals across the Caribbean and South America. Leads the advanced performance and stagecraft modules.',
    image: IMAGES.instructorDevon,
    imageKey: 'instructorDevon',
  },
];

// ============================================================
//  TESTIMONIALS
// ============================================================
export const TESTIMONIALS = [
  {
    quote:
      'Walked in scared of the decks. Three months later I had a paid bar gig. The instructors push you, but they also make sure you can do the work before they put you on the floor.',
    name: 'Reese A.',
    role: "Beginner DJ I · '25 Grad",
    initial: 'R',
  },
  {
    quote:
      "RocStars is the only place in T&T that takes DJing seriously as a craft. Music theory, structure, crowd psychology — they teach the parts everyone else skips.",
    name: 'Khaleel R.',
    role: "Club Performance · '25 Cohort",
    initial: 'K',
  },
  {
    quote:
      'My son was glued to his phone. Now he\'s glued to his decks. The discipline this programme builds is unreal — and the showcase nights are something to be proud of.',
    name: 'Mrs. Hosein',
    role: "Parent · Beginner I '25",
    initial: 'H',
  },
  {
    quote:
      "The instructors play out every weekend. That's the whole reason this works. The advice you get is what's working in the booth this Saturday, not five years ago.",
    name: 'Lyric M.',
    role: "Serato Mastery · '25",
    initial: 'L',
  },
];

// ============================================================
//  STATS
// ============================================================
export const STATS = [
  { num: '247', label: 'Students Trained' },
  { num: '12', label: 'Resident Instructors' },
  { num: '18', label: 'Partner Venues' },
  { num: '94%', label: 'Job Placement' },
];

// ============================================================
//  EVENTS
// ============================================================
export const EVENTS = [
  {
    day: '17',
    month: 'Aug',
    title: 'Open House & Studio Tour',
    blurb: 'Walk the studio. Meet the faculty. Try a deck. Free, RSVP required.',
    cta: 'RSVP',
  },
  {
    day: '24',
    month: 'Aug',
    title: 'Beginner DJ — Cohort 12 Starts',
    blurb: 'Limited to 12 seats. 6-week programme. Saturdays & Tuesdays.',
    cta: 'Enrol',
  },
  {
    day: '07',
    month: 'Sep',
    title: 'Intermediate Showcase @ Aria Lounge',
    blurb: 'Cohort 11 graduating set. Open to public. Free entry before 11pm.',
    cta: 'Add to Cal',
  },
  {
    day: '21',
    month: 'Sep',
    title: 'Serato Weekend Intensive',
    blurb: 'Two days. One software. Walk out with full Serato fluency.',
    cta: 'Enrol',
  },
];

// ============================================================
//  FAQ
// ============================================================
export const FAQ = [
  {
    q: 'Do I need to own DJ equipment to start?',
    a: "No. Every class is taught in our studio on professional Pioneer CDJ-3000s and DJM-900NXS2 mixers — the exact gear used in working clubs. All you need is a laptop with Serato DJ Pro installed (we'll walk you through the setup on Day 1). When you're ready to invest in your own rig, we'll help you pick the right gear for your stage.",
  },
  {
    q: 'What DJ software do you teach?',
    a: 'We teach exclusively on Serato DJ Pro — the industry-standard software used by the world\'s top DJs. Every cohort follows a Serato-aligned curriculum: setup, library management, hot cues, looping, FX, sample triggering, and the advanced tools that working professionals lean on every weekend.',
  },
  {
    q: 'How long until I can DJ a real party?',
    a: "Most Beginner cohorts complete their first confident 30-minute set within four weeks. The full Beginner course (6 weeks) takes you to a clean, mixed set you can play at a house party or small event. By the end of the Intermediate course, you're ready to apply for residencies. By Expert level, you're club-floor ready.",
  },
  {
    q: "What's the difference between Beginner and Intermediate?",
    a: 'Beginner focuses on the fundamentals — beatmatching, EQ, transitions, song structure, Serato setup. Intermediate assumes you\'ve got the basics down and goes deep on the things that make a set feel right: harmonic mixing, looping, FX, energy curves, crowd reading, and advanced Serato workflows. We recommend completing Beginner before Intermediate unless you can already mix two tracks live.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Yes. All three courses offer a two- or three-instalment payment plan — first payment locks your seat, second is due at the start of week three. Talk to an advisor when you enrol and we\'ll set it up. No interest, no fees.',
  },
  {
    q: 'Do you offer private or one-on-one lessons?',
    a: "Yes — private intensives are available for students who want to accelerate or who can't fit a cohort schedule. Private sessions are billed hourly and follow the same curriculum as the group programmes. We also offer corporate / group bookings for birthdays, brand activations, and team workshops.",
  },
  {
    q: 'Where is the studio located?',
    a: 'Our home studio is in Port-of-Spain, Trinidad. Address is shared after enrolment confirmation. We also run periodic pop-up cohorts in South Trinidad and Tobago when demand justifies — sign up to the mailing list to be the first to hear.',
  },
];

// ============================================================
//  PATHWAY
// ============================================================
export const PATHWAY = [
  {
    step: 'STEP 01',
    level: 'Beginner',
    goal: 'Build the foundation. Understand the music, the gear, and Serato. By week six you can mix two tracks live with confidence.',
    endState: 'Beatmatch · EQ · transition cleanly · organise your library · run a 30-min set',
  },
  {
    step: 'STEP 02',
    level: 'Intermediate',
    goal: "Take your sound past the basics. Build sets that flow, mix in key, and use Serato's advanced tools the way working DJs do.",
    endState: 'Harmonic mixing · loops · FX · creative blends · read a room · 60-min set',
  },
  {
    step: 'STEP 03',
    level: 'Expert',
    goal: 'Develop a signature style, sharpen scratching, and build the confidence and workflow to perform at club level — anywhere in the country.',
    endState: 'Scratch · perform live · brand yourself · run a full club night · book paid gigs',
  },
];

// ============================================================
//  WHY US (4 pillars)
// ============================================================
export const WHY = [
  {
    num: '01',
    title: 'Real decks.\nReal hours.',
    body: 'Pioneer CDJ-3000s, DJM-900NXS2 mixers, Technics 1210s. The exact rig you\'ll find in every working club. No toy controllers.',
  },
  {
    num: '02',
    title: 'Industry-active\nfaculty.',
    body: 'Every instructor is a working DJ. Aria Lounge, Zen, 51 Degrees, Carnival mainstages — our faculty plays the rooms you want to play.',
  },
  {
    num: '03',
    title: 'Stage time\nbuilt in.',
    body: 'Every programme ends with a showcase set at a partner venue. Real crowd. Real lights. Recorded for your portfolio.',
  },
  {
    num: '04',
    title: 'Career\npathway.',
    body: 'Beginner → Resident DJ → Brand DJ. Graduates get first call on the gigs and brand deals our network sends our way.',
  },
];

// ============================================================
//  GALLERY TILES
// ============================================================
// Each tile references an IMAGES slot by key, so the admin media manager can
// swap the photo without touching code. `key` must be a MediaKey.
export const GALLERY_SLOTS: { key: MediaKey; cap: string; size?: 'wide' }[] = [
  { key: 'galleryBooth', cap: 'Live at the Booth', size: 'wide' },
  { key: 'galleryCarnival', cap: 'Carnival Energy' },
  { key: 'galleryBoat', cap: 'Boat Ride Vibes' },
  { key: 'galleryTurntables', cap: 'On the Decks' },
  { key: 'festival', cap: 'Outdoor Sets' },
];

// Drives the admin media picker: every editable image slot on the site,
// grouped for a clean UI. `key` maps to IMAGES; the label is human-friendly.
export const MEDIA_SLOTS: { key: MediaKey; label: string; group: string }[] = [
  { key: 'heroBooth', label: 'Hero background (homepage top)', group: 'Main sections' },
  { key: 'equipment', label: 'Studio / equipment photo', group: 'Main sections' },
  { key: 'about', label: 'About section photo', group: 'Main sections' },
  { key: 'festival', label: 'Enrol banner + "Outdoor Sets" gallery tile', group: 'Main sections' },
  { key: 'galleryBooth', label: 'Gallery — wide tile ("Live at the Booth")', group: 'Gallery' },
  { key: 'galleryCarnival', label: 'Gallery — "Carnival Energy"', group: 'Gallery' },
  { key: 'galleryBoat', label: 'Gallery — "Boat Ride Vibes"', group: 'Gallery' },
  { key: 'galleryTurntables', label: 'Gallery — "On the Decks"', group: 'Gallery' },
  { key: 'instructorMJ', label: `Instructor 1 — ${INSTRUCTORS[0].name}`, group: 'Instructor cards' },
  { key: 'instructorNya', label: `Instructor 2 — ${INSTRUCTORS[1].name}`, group: 'Instructor cards' },
  { key: 'instructorDevon', label: `Instructor 3 — ${INSTRUCTORS[2].name}`, group: 'Instructor cards' },
];

// ============================================================
//  TICKER KEYWORDS
// ============================================================
export const TICKER = [
  { t: 'Beatmatching' },
  { t: 'Serato Pro', accent: true },
  { t: 'Pioneer CDJ-3000' },
  { t: 'Live Mashups' },
  { t: 'Carnival Sets', accent: true },
  { t: 'Crowd Reading' },
  { t: 'Music Theory' },
  { t: 'Stage Presence', accent: true },
  { t: 'Studio Hours' },
];
