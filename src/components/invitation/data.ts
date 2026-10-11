export interface WeddingEvent {
  id: string;
  title: string;
  tagline: string;
  time: string;
  dateLabel: string;
  venue: string;
  address: string;
  mapUrl?: string;
  attireTitle?: string;
  attireDetails?: {
    ladies?: string;
    gents?: string;
    all?: string;
  };
  bgImage?: string;
  bgVideo?: string;
  theme?: "dark" | "light";
  titleColor?: string;
  textColor?: string;
  accentColor?: string;
  topPadding?: string;
}

export const invitation = {
  couple: {
    hashtag: "#BKomeOne∞",
    monogram: "KB",
    dateRange: "17th & 18th December 2026",
    resort: "Discover Resorts, Karjat",
    mapUrl: "https://maps.google.com/?q=Discover+Resorts+Karjat",
  },

  venue: {
    title: "The Wedding Venue",
    subtitle: "A Peaceful Foothill Retreat for Our Celebrations",
    name: "Discover Resorts",
    city: "Karjat, Maharashtra",
    address: "Damothe Village, Neral - Kalamb Road, Karjat, Maharashtra 410101",
    mapUrl: "https://maps.google.com/?q=Discover+Resorts+Karjat",
    embedUrl: "https://maps.google.com/maps?q=Discover+Resorts+Karjat&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },

  religiousHeading: {
    symbols: "卐",
    ganesh: "|| Shree Ganeshaya Namah ||",
    krishna: "|| Jai Shree Krishna ||",
    jalaram: "|| Jai Jalaram ||",
  },

  bride: {
    name: "Bhoomi Rokhana",
    short: "Bhoomi",
    parents: "Smt. Usha & Shri Dinesh Damodar Rokhana",
    grandparents: "Late Smt. Manglaben & Late Shri Damodar Ramji Rokhana",
    family: "Rokhana Family",
    compliments: {
      from: "Late Shri Narayan Damodar Rokhana\n&\nSmt. Jayshree Paresh Chandan",
      note: "To mark the auspicious commencement of Karan & Bhoomi’s lifelong journey, your loving presence and shower of blessings will grace our family’s most treasured occasion",
      closing: "We look forward to welcoming you with open hearts",
      noteBlessings: "Blessings Only",
    },
  },

  groom: {
    name: "Karan Sundrani",
    short: "Karan",
    parents: "Smt. Kinnari & Shri Bhavesh Vijaysinh Sundrani",
    grandparents: "Late Smt. Sushila & Late Shri Vijaysinh Damodar Sundrani\n& Late Smt. Madhuri & Late Shri Bhupendra Jadhavji Palan",
    family: "Sundrani Family",
    compliments: {
      from: "",
      note: "To mark the auspicious commencement of Karan & Bhoomi’s lifelong journey, your loving presence and shower of blessings will grace our family’s most treasured occasion",
      closing: "We look forward to welcoming you with open hearts",
      noteBlessings: "With Love\n‘Sundrani Family’",
    },
  },

  // Dynamic countdown reads this Date (Wedding day)
  weddingDate: "2026-12-18T18:00:00+05:30",
  weddingDateLabel: "Friday, 18 December 2026",

  events: [
    {
      id: "mandap-muhurat",
      title: "Mandap Muhurat",
      tagline: "Invoking divine blessings\n for our auspicious journey ahead",
      time: "11:15 AM Onwards",
      dateLabel: "Thursday, 17th December 2026",
      venue: "Khazana Banquet, Discover Resorts",
      address: "Discover Resorts, Karjat",
      mapUrl: "https://maps.google.com/?q=Khazana+Banquet+Discover+Resorts+Karjat",
      attireTitle: "Kutchi Heritage & Royal Ethos",
      attireDetails: {
        ladies: "Traditional Gharchola, \nBandhni/ Festive Ethnic Grace",
        gents: "Ethno-Formal Kurta Sets\nwith Koti (Modi jackets)",
      },
      bgVideo: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/ganeshji.mp4",
      titleColor: "#AD024A",
      textColor: "#AD024A",
      accentColor: "#AD024A",
      topPadding: "pt-[15px] sm:pt-[75px]",
    },
    {
      id: "rings-and-rhythm",
      title: "Rings & Rhythm",
      tagline: "Swapping rings,\nstealing moments,\n& dancing under the stars",
      time: "06:30 PM Onwards",
      dateLabel: "Thursday, 17th December 2026",
      venue: "Centrum, Discover Resorts",
      address: "Discover Resorts, Karjat",
      mapUrl: "https://maps.google.com/?q=Centrum+Discover+Resorts+Karjat",
      attireTitle: "Glitz and Glam",
      attireDetails: {
        all: "Modern Indo-Western silhouettes\n for an evening of rings,\n music and dance",
      },
      bgVideo: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/WhatsApp_Video_2026-10-10_at_5.45.54_PM__1___1_.mp4",
      theme: "dark",
      topPadding: "pt-[5px] sm:pt-[20px]",
    },
    {
      id: "pithi-and-petals",
      title: "Pithi & Petals",
      tagline: "Shower the couple in love\nwith a bright morning of\nturmeric, petals and festive cheer!",
      time: "10:00 AM Onwards",
      dateLabel: "Friday, 18th December 2026",
      venue: "G Lawn, Discover Resorts",
      address: "Discover Resorts, Karjat",
      mapUrl: "https://maps.google.com/?q=G+Lawn+Discover+Resorts+Karjat",
      attireTitle: "Yellow Festive Casual Glow with Kaala Chashma",
      attireDetails: {
        all: "Breezy solid yellow festive casuals\n paired with your favourite sunglasses",
      },
      bgVideo: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/haldi.mp4",
      topPadding: "pt-[100px] sm:pt-[110px]",
    },
    {
      id: "band-baaja-baarat",
      title: "Band Baaja Baarat",
      tagline: "Witness total chaos,\nwild cousins, crazy dancing friends &\nclassic 90s uncle moves!",
      time: "03:30 PM Onwards",
      dateLabel: "Friday, 18th December 2026",
      venue: "Sunset Lawn, Discover Resorts",
      address: "Discover Resorts, Karjat",
      mapUrl: "https://maps.google.com/?q=Sunset+Lawn+Discover+Resorts+Karjat",
      attireTitle: "",
      bgVideo: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/barat-1__1_.mp4",
      topPadding: "pt-[40px] sm:pt-[50px]",
    },
    {
      id: "garlands-and-grace",
      title: "Garlands & Grace",
      tagline: "A garland of flowers,\na vow of grace—\nentwining two souls in eternal love",
      time: "05:00 PM Onwards",
      dateLabel: "Friday, 18th December 2026",
      venue: "Centrum, Discover Resorts",
      address: "Discover Resorts, Karjat",
      mapUrl: "https://maps.google.com/?q=Centrum+Discover+Resorts+Karjat",
      attireTitle: "",
      bgVideo: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/WhatsApp%20Video%202026-10-08%20at%206.02.39%20AM%20%281%29.mp4",
      topPadding: "pt-[20px] sm:pt-[30px]",
    },
    {
      id: "mangal-parinay",
      title: "Mangal Parinay",
      tagline: "Four Pheras around the holy Agni,\nthe sacred Mangalsutra woven with love,\nand the auspicious stroke of Sindoor—\njoin us in witnessing Karan & Bhoomi as they\n#BKomeOne∞",
      time: "06:00 PM Onwards",
      dateLabel: "Friday, 18th December 2026",
      venue: "Centrum, Discover Resorts",
      address: "Discover Resorts, Karjat",
      mapUrl: "https://maps.google.com/?q=Centrum+Discover+Resorts+Karjat",
      attireTitle: "Pauranik Sringara",
      attireDetails: {
        all: "Grand Traditional Attire to honor the auspicious ceremony",
      },
      bgVideo: "https://q7pv2gthbvkjs86k.public.blob.vercel-storage.com/templates/wedding/karan-weds-bhoomi/WhatsApp_Video_2026-10-10_at_6.17.36_PM__1___1_.mp4",
      theme: "dark",
      topPadding: "pt-[5px] sm:pt-[15px]",
    },
  ] as WeddingEvent[],

  story: [
    {
      year: "2021",
      title: "First Met",
      text: "We crossed paths and bonded over shared conversations, mutual dreams, and heartfelt laughter.",
    },
    {
      year: "2023",
      title: "Shared Dreams",
      text: "Countless adventures and unforgettable memories together, realizing we were made for each other.",
    },
    {
      year: "2025",
      title: "The Proposal",
      text: "Under a sky full of stars, Karan asked, and Bhoomi said yes to a lifetime of love!",
    },
    {
      year: "2026",
      title: "Forever Begins (#BKomeOne∞)",
      text: "Now we warmly invite you to celebrate as we embark on this sacred journey of marriage together.",
    },
  ],

  verse: {
    text: "Four Pheras around the holy fire, a sacred thread of love, and a stroke of crimson vermillion – entwining two souls in eternal love.",
    source: "#BKomeOne∞",
  },
};
