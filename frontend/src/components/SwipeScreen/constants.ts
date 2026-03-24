import type { CSSProperties } from "react";
import type { Profile, MatchProfile, DateEntry } from "./types";
import { FONT_FAMILY } from "../ConnectAccounts/styles";

export const MOCK_PROFILES: Profile[] = [
  {
    name: "Ava",
    age: 26,
    photo: "/profile_photos/1.png",
    bio: "Gallery hopper and pasta maker. I'll judge you lovingly by your Letterboxd ratings.",
    tags: ["Art", "Cooking", "A24 Films", "Wine"],
    distance: "2 miles away",
  },
  {
    name: "Mia",
    age: 25,
    photo: "/profile_photos/2.png",
    bio: "Runs a book club nobody asked for. Always training for a half marathon I'll never sign up for.",
    tags: ["Running", "Fiction", "Coffee", "Pilates"],
    distance: "4 miles away",
  },
  {
    name: "Luna",
    age: 27,
    photo: "/profile_photos/3.png",
    bio: "Jazz on vinyl, mezcal on ice. I photograph strangers on the subway and call it art.",
    tags: ["Jazz", "Photography", "Mezcal", "Film"],
    distance: "1 mile away",
  },
  {
    name: "Priya",
    age: 28,
    photo: "/profile_photos/4.png",
    bio: "Product designer who overthinks everything except brunch spots. My dog has more followers than me.",
    tags: ["Design", "Dogs", "Brunch", "Yoga"],
    distance: "3 miles away",
  },
  {
    name: "Sofia",
    age: 25,
    photo: "/profile_photos/5.png",
    bio: "Salsa dancer and spicy food enthusiast. Looking for someone who can keep up on both fronts.",
    tags: ["Dancing", "Latin Music", "Cooking", "Travel"],
    distance: "5 miles away",
  },
  {
    name: "Chloe",
    age: 26,
    photo: "/profile_photos/6.png",
    bio: "Writer by day, stand-up open mic-er by night. I will absolutely roast you on the first date.",
    tags: ["Comedy", "Writing", "Theater", "Karaoke"],
    distance: "2 miles away",
  },
  {
    name: "Naomi",
    age: 27,
    photo: "/profile_photos/7.png",
    bio: "Vintage shopping is my cardio. I have strong opinions about font pairings and cold brew ratios.",
    tags: ["Fashion", "Typography", "Coffee", "Thrifting"],
    distance: "6 miles away",
  },
  {
    name: "Zara",
    age: 25,
    photo: "/profile_photos/8.png",
    bio: "Climbing walls and binge-watching sci-fi. If you can quote Arrival we're already halfway there.",
    tags: ["Rock Climbing", "Sci-Fi", "Hiking", "Board Games"],
    distance: "3 miles away",
  },
  {
    name: "Ella",
    age: 28,
    photo: "/profile_photos/9.png",
    bio: "Ceramics class regular and farmer's market loyalist. My sourdough starter has a name.",
    tags: ["Ceramics", "Baking", "Gardening", "Indie Music"],
    distance: "4 miles away",
  },
  {
    name: "Iris",
    age: 26,
    photo: "/profile_photos/10.png",
    bio: "Tattoo collector and museum nerd. I'll make you a playlist before I learn your last name.",
    tags: ["Tattoos", "Museums", "Music", "Poetry"],
    distance: "1 mile away",
  },
  {
    name: "Camille",
    age: 27,
    photo: "/profile_photos/11.png",
    bio: "French expat who swapped croissants for bagels. Still healing from that decision honestly.",
    tags: ["French Cinema", "Baking", "Architecture", "Cycling"],
    distance: "5 miles away",
  },
  {
    name: "Jade",
    age: 25,
    photo: "/profile_photos/12.png",
    bio: "DJ on weekends, data analyst on weekdays. My playlists have better structure than my sleep schedule.",
    tags: ["DJing", "Electronic Music", "Data", "Nightlife"],
    distance: "2 miles away",
  },
];

export const MATCHES: MatchProfile[] = [
  {
    name: "Luna", age: 27, photo: "/profile_photos/3.png", compatibility: "94%",
    sharedTags: ["Jazz", "Film", "Vinyl"],
    suggestion: { place: "Blue Note Jazz Club", address: "131 W 3rd St, Greenwich Village", date: "Fri, Feb 20 \u00b7 8:00 PM", reason: "You both love jazz and live music \u2014 Blue Note is a perfect first vibe check." },
    publicProfile: { vibe: "A nocturnal creative who lives for jazz and quiet observation.", tags: ["jazz", "photography", "mezcal", "film noir", "vinyl", "subway portraits"], schedule: "night owl" },
    privateProfile: { summary: "A photographer with a deep love for jazz and analog culture. Her Letterboxd is full of moody European films and she gravitates toward artists who blend genres.", traits: ["visual storyteller", "analog purist", "jazz devotee", "night owl", "contemplative"], interests: ["Miles Davis", "Chet Baker", "Wong Kar-wai", "In the Mood for Love", "Stalker", "Paris Texas", "Kodak Portra", "Mezcal"], deepCuts: ["Photographs strangers on the L train", "Rated 'In the Mood for Love' 5 stars three times", "Has a vinyl-only listening rule on Sundays"], dataSources: ["spotify", "letterboxd", "instagram"] },
    crossref: {
      shared: [
        { title: "Film Appreciation", description: "Both have a deep love for auteur cinema and rate films obsessively on Letterboxd." },
        { title: "Vinyl Culture", description: "Both collect vinyl records and prefer analog listening experiences." },
        { title: "Night Owl Schedule", description: "Both are most active and creative during late-night hours." },
      ],
      complementary: [
        { title: "Visual vs. Musical", description: "Luna expresses herself through photography while you lean toward music \u2014 a natural creative pairing." },
        { title: "Mezcal Meets Coffee", description: "Her mezcal expertise complements your coffee obsession for interesting drink conversations." },
      ],
      tensionPoints: [
        { title: "Social Energy", description: "Luna prefers quiet observation while you tend toward more social settings." },
        { title: "Analog Purism", description: "Her strict vinyl-only rules may clash with your digital-first approach to music." },
      ],
      citations: [
        "Luna: 'vinyl-only listening rule on Sundays'",
        "Luna: Rated 'In the Mood for Love' 5 stars three times on Letterboxd",
        "You and Luna both keep night owl schedules",
      ],
    },
  },
  {
    name: "Priya", age: 28, photo: "/profile_photos/4.png", compatibility: "89%",
    sharedTags: ["Design", "Brunch", "Dogs"],
    suggestion: { place: "MoMA", address: "11 W 53rd St, Midtown", date: "Sat, Feb 21 \u00b7 2:00 PM", reason: "She's into design, you're into art \u2014 MoMA on a Saturday afternoon is a no-brainer." },
    publicProfile: { vibe: "A modern soul with a passion for building and a taste for the finer things.", tags: ["web dev", "hip hop", "film enthusiast", "coding interviews", "music lover", "fitness", "machine learning"], schedule: "mixed" },
    privateProfile: { summary: "A design-focused full-stack developer who lives on Letterboxd. Rates every film she watches, gravitates toward visually stunning cinema, and builds side projects with meticulous UI. Keeps a curated plant collection on her desk.", traits: ["design thinker", "film obsessive", "full-stack developer", "community organizer", "plant mom"], interests: ["Next.js", "TypeScript", "Figma", "Interstellar", "Whiplash", "Parasite", "Wes Anderson", "Studio Ghibli"], deepCuts: ["Rated every Wes Anderson film on Letterboxd", "Has a Figma file with 200+ UI inspiration screenshots", "Hosts a monthly movie night for her friend group", "Named her monstera 'Monty'"], dataSources: ["github", "spotify", "letterboxd"] },
    crossref: {
      shared: [
        { title: "Machine Learning Interest", description: "You and Priya both geek out over ML \u2014 she's applied it to real products while you've been exploring it through personal projects." },
        { title: "Web Development Focus", description: "You're both deep in web dev \u2014 Priya leans front-end with Next.js while you cover the full stack." },
        { title: "Github Activity", description: "You're both active on GitHub with public repos and open-source contributions." },
        { title: "Python Proficiency", description: "Python is a shared language \u2014 you use it for backend work, Priya uses it for data and scripting." },
      ],
      complementary: [
        { title: "Front-end vs. Full-stack", description: "Priya leans towards front-end design while you're a full-stack developer \u2014 a natural balance for creative collaboration." },
        { title: "Security Meets Scale", description: "Your cybersecurity background complements Priya's product-focused development style." },
        { title: "Film Connoisseur", description: "Priya's film obsession could open up a whole new world of watch parties and film festival dates." },
        { title: "Tech for Good", description: "Priya applies tech to real-world problems \u2014 aligned with your work on AI-powered health tools." },
      ],
      tensionPoints: [
        { title: "Schedule Differences", description: "You're a night owl while Priya keeps a more mixed schedule \u2014 late-night coding sessions might not always align." },
        { title: "Stack Preferences", description: "You gravitate toward Python and PHP while Priya prefers TypeScript and Next.js \u2014 healthy debate territory." },
      ],
      citations: [
        "You: 'AI enthusiast building StarStruck', Priya: 'full-stack developer and film critic'",
        "You and Priya both have ML-related repositories on GitHub",
        "Priya rated 'Interstellar' and 'Whiplash' 5 stars \u2014 potential movie night material",
      ],
    },
  },
  {
    name: "Chloe", age: 26, photo: "/profile_photos/6.png", compatibility: "87%",
    sharedTags: ["Comedy", "Writing", "Karaoke"],
    suggestion: { place: "Comedy Cellar", address: "117 MacDougal St, West Village", date: "Tue, Feb 25 \u00b7 9:30 PM", reason: "You both appreciate comedy \u2014 catch a show and see who laughs harder." },
    publicProfile: { vibe: "Sharp-tongued writer who finds humor in everything.", tags: ["comedy", "writing", "theater", "karaoke", "stand-up", "improv"], schedule: "night owl" },
    privateProfile: { summary: "A writer and comedian who spends most nights at open mics. Her taste in film leans toward dark comedies and she has a surprisingly deep Spotify history of 90s alt-rock.", traits: ["quick wit", "performer", "night owl", "empathetic writer", "karaoke queen"], interests: ["Fleabag", "Atlanta", "Bo Burnham", "Nora Ephron", "Radiohead", "Fiona Apple", "The Lobster", "Sorry to Bother You"], deepCuts: ["Has a draft folder with 47 unfinished essays", "Performs stand-up every Tuesday at Comedy Cellar", "Rated 'Fleabag' episodes individually on Letterboxd"], dataSources: ["spotify", "letterboxd", "instagram"] },
    crossref: {
      shared: [
        { title: "Dark Comedy Fans", description: "Both gravitate toward absurdist and dark humor in film and TV." },
        { title: "Live Performance Love", description: "Both enjoy live shows \u2014 comedy for Chloe, music for you." },
        { title: "Karaoke Enthusiasts", description: "Both have karaoke listed as a go-to social activity." },
      ],
      complementary: [
        { title: "Writer Meets Reader", description: "Chloe writes essays and comedy bits; you're a voracious reader \u2014 natural audience for each other." },
        { title: "Alt-Rock Discovery", description: "Her deep 90s alt-rock Spotify history could introduce you to new music." },
      ],
      tensionPoints: [
        { title: "Roasting Tolerance", description: "Chloe will roast you on the first date \u2014 not everyone's love language." },
        { title: "Night Owl Extremes", description: "Her open-mic schedule means very late nights, even by night owl standards." },
      ],
      citations: [
        "Chloe: 'I will absolutely roast you on the first date'",
        "Chloe: Performs stand-up every Tuesday at Comedy Cellar",
        "You and Chloe both list karaoke as a go-to social activity",
      ],
    },
  },
  {
    name: "Iris", age: 26, photo: "/profile_photos/10.png", compatibility: "82%",
    sharedTags: ["Museums", "Music", "Poetry"],
    suggestion: { place: "Metrograph Cinema", address: "7 Ludlow St, Lower East Side", date: "Sun, Mar 1 \u00b7 4:00 PM", reason: "Film buffs unite \u2014 Metrograph always has something interesting playing." },
    publicProfile: { vibe: "Ink-stained museum wanderer with impeccable playlists.", tags: ["tattoos", "museums", "poetry", "music curation", "zines", "film"], schedule: "flexible" },
    privateProfile: { summary: "A creative who splits time between gallery visits and curating playlists. She reads poetry collections and makes zines about her neighborhood. Deeply into ambient and experimental music.", traits: ["curator", "poet", "visual thinker", "tattoo collector", "community builder"], interests: ["Bj\u00f6rk", "FKA Twigs", "Aphex Twin", "Rothko", "Ocean Vuong", "Moonlight", "Portrait of a Lady on Fire", "Zine culture"], deepCuts: ["Made a 200-track playlist called 'for walking home alone'", "Has a tattoo of a Rothko painting", "Rated 'Moonlight' 5 stars twice"], dataSources: ["spotify", "letterboxd", "instagram"] },
    crossref: {
      shared: [
        { title: "Museum Culture", description: "Both spend weekends at galleries and museums as a default activity." },
        { title: "Music Curation", description: "Both invest serious time building playlists and discovering new artists." },
        { title: "Poetry Appreciation", description: "Both engage with poetry \u2014 Iris through zines, you through reading." },
      ],
      complementary: [
        { title: "Visual Art Depth", description: "Iris has tattoos of Rothko paintings \u2014 her visual art knowledge runs deeper and could broaden your perspective." },
        { title: "Ambient Explorer", description: "Her experimental music taste (Bj\u00f6rk, Aphex Twin) could expand your listening horizons." },
      ],
      tensionPoints: [
        { title: "Introvert Energy", description: "Iris's solitary creative pursuits (zine-making, solo gallery visits) may clash with more social preferences." },
        { title: "Niche Taste Gap", description: "Her deeply experimental taste may feel inaccessible at times." },
      ],
      citations: [
        "Iris: Made a 200-track playlist called 'for walking home alone'",
        "Iris: Has a tattoo of a Rothko painting",
        "You and Iris both frequent museums and galleries regularly",
      ],
    },
  },
  {
    name: "Ella", age: 28, photo: "/profile_photos/9.png", compatibility: "78%",
    sharedTags: ["Baking", "Indie Music", "Gardening"],
    suggestion: { place: "Brooklyn Botanic Garden", address: "990 Washington Ave, Brooklyn", date: "Sat, Mar 8 \u00b7 11:00 AM", reason: "You both love nature and calm vibes \u2014 a garden stroll is the perfect low-key first date." },
    publicProfile: { vibe: "Gentle soul who finds joy in slow mornings and growing things.", tags: ["ceramics", "baking", "gardening", "indie music", "farmers market", "sourdough"], schedule: "early bird" },
    privateProfile: { summary: "A homebody creative who bakes sourdough, tends a rooftop garden, and listens to indie folk while doing ceramics. Her film taste is warm and nostalgic \u2014 lots of Ghibli and coming-of-age stories.", traits: ["nurturing", "patient creator", "nature lover", "morning person", "cozy minimalist"], interests: ["Bon Iver", "Phoebe Bridgers", "Big Thief", "Studio Ghibli", "Lady Bird", "Aftersun", "Ceramics", "Sourdough"], deepCuts: ["Named her sourdough starter 'Leonard'", "Has a rooftop garden with 14 plant species", "Cried at 'Aftersun' three separate times"], dataSources: ["spotify", "letterboxd"] },
    crossref: {
      shared: [
        { title: "Indie Music Taste", description: "Both listen to Bon Iver, Phoebe Bridgers, and adjacent indie folk artists." },
        { title: "Baking Interest", description: "Both enjoy baking as a creative and relaxing activity." },
        { title: "Nature Connection", description: "Both value time outdoors and in green spaces." },
      ],
      complementary: [
        { title: "Morning vs. Night", description: "Ella is an early bird who could balance out your night owl tendencies with morning energy." },
        { title: "Tactile Creativity", description: "Her ceramics and gardening hobbies add a hands-on creative dimension you might enjoy exploring." },
      ],
      tensionPoints: [
        { title: "Schedule Mismatch", description: "Ella is a morning person while you lean toward late nights \u2014 coordinating time together may require compromise." },
        { title: "Homebody vs. Explorer", description: "Ella prefers staying in while you may want to go out more often." },
      ],
      citations: [
        "Ella: Named her sourdough starter 'Leonard'",
        "Ella: schedule_pattern: 'early_bird'",
        "You and Ella both listen to Bon Iver and Phoebe Bridgers on Spotify",
      ],
    },
  },
];

export const DATES: DateEntry[] = [
  { name: "Luna", photo: "/profile_photos/3.png", place: "Blue Note Jazz Club", date: "Fri, Apr 4 \u00b7 8:00 PM", status: "confirmed", matchRef: MATCHES[0] },
  { name: "Priya", photo: "/profile_photos/4.png", place: "MoMA", date: "Sat, Apr 5 \u00b7 2:00 PM", status: "confirmed", matchRef: MATCHES[1] },
  { name: "Chloe", photo: "/profile_photos/6.png", place: "Comedy Cellar", date: "Tue, Apr 8 \u00b7 9:30 PM", status: "pending", matchRef: MATCHES[2] },
  { name: "Iris", photo: "/profile_photos/10.png", place: "Metrograph Cinema", date: "Sun, Apr 13 \u00b7 4:00 PM", status: "pending", matchRef: MATCHES[3] },
];

export const ANALYSIS_MSGS = [
  "Cross-referencing music taste\u2026",
  "Comparing film preferences\u2026",
  "Finding shared interests\u2026",
  "Scouting date spots in NYC\u2026",
  "Picking the perfect time\u2026",
];

export const page: CSSProperties = {
  minHeight: "100vh",
  background: "#381F7D",
  fontFamily: FONT_FAMILY,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

export const frame: CSSProperties = {
  width: 390,
  maxWidth: "100vw",
  height: "100dvh",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

export function actionBtn(color: string): CSSProperties {
  return {
    width: 56,
    height: 56,
    borderRadius: 28,
    background: `${color}15`,
    border: `2px solid ${color}40`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.15s ease, background 0.15s ease",
    padding: 0,
  };
}
