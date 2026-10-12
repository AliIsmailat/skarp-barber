export interface ImageEntry {
  file: string
  alt: string
  photographer: string
}

export interface Service {
  name: string
  description: string
  price: number
  duration: number
}

export interface Barber {
  name: string
  specialty: string
}

export interface OpeningDay {
  day: string
  open: string | null
  close: string | null
}

export interface NavLink {
  label: string
  href: string
}

export const theme = {
  colors: {
    ink: '#0B0B0C',
    surface: '#141416',
    line: '#2A2A2D',
    bone: '#EDE8DD',
    boneMuted: '#A8A398',
    brass: '#C9A45C',
  },
  fonts: {
    display: { family: 'Barlow Condensed', weights: [500, 700] },
    body: { family: 'Inter', weights: [400, 500, 600] },
  },
  radius: {
    ui: '0px',
  },
  imageFilter: 'grayscale' as 'grayscale' | 'none',
}

export const site = {
  name: 'Skarp Barber (Demo)',
  footerText: 'Demo, inte ett riktigt företag',
  skipLabel: 'Hoppa till innehållet',

  meta: {
    title: 'Skarp Barber (Demo) | Barbershop i Malmö',
    description:
      'Demosida för en påhittad barbershop i Malmö. Tjänster och priser, galleri, öppettider, karta och bokning av tid.',
  },

  nav: {
    label: 'Huvudmeny',
    openLabel: 'Öppna menyn',
    closeLabel: 'Stäng menyn',
    links: [
      { label: 'Tjänster', href: '#tjanster' },
      { label: 'Galleri', href: '#galleri' },
      { label: 'Om oss', href: '#om-oss' },
      { label: 'Öppettider', href: '#oppettider' },
      { label: 'Hitta hit', href: '#hitta-hit' },
      { label: 'Kontakt', href: '#kontakt' },
    ] satisfies NavLink[],
  },

  hero: {
    label: 'Barbershop i Malmö',
    heading: 'Skarpa klipp. Rena linjer.',
    subheading: 'Klippning, skägg och rakning med precision. Boka din tid på under en minut.',
  },

  services: {
    eyebrow: 'Tjänster',
    title: 'Tjänster och priser',
    intro: 'Fasta priser, ingen överraskning i kassan. Varje tid inkluderar rådgivning och styling.',
    items: [
      {
        name: 'Klippning',
        description: 'Klippning med maskin och sax, avslutad med styling.',
        price: 380,
        duration: 30,
      },
      {
        name: 'Skägg',
        description: 'Trimning och formning av skägget, med varm handduk och olja.',
        price: 280,
        duration: 30,
      },
      {
        name: 'Klippning + skägg',
        description: 'Hela paketet i en tid. Klippning, skäggformning och styling.',
        price: 620,
        duration: 60,
      },
      {
        name: 'Rakning',
        description: 'Klassisk rakning med rakkniv, varm handduk och efterbehandling.',
        price: 350,
        duration: 30,
      },
      {
        name: 'Barn',
        description: 'Klippning för barn upp till 12 år.',
        price: 280,
        duration: 30,
      },
    ] satisfies Service[],
  },

  gallery: {
    eyebrow: 'Galleri',
    title: 'Galleri',
    intro: 'Ett urval av vad som händer i stolarna.',
  },

  about: {
    eyebrow: 'Om oss',
    title: 'Om oss',
    text: 'Skarp Barber är en liten barbershop med få stolar och höga krav. Vi tar oss tid, lyssnar på vad du vill ha och levererar en klippning som sitter i veckor.',
    barbersLabel: 'Våra frisörer',
    barbers: [
      { name: 'Marcus Hed', specialty: 'Fade och klassisk herrklippning' },
      { name: 'Elias Nordin', specialty: 'Skäggformning och knivrakning' },
      { name: 'Sara Falk', specialty: 'Struktur, lockigt hår och barnklipp' },
    ] satisfies Barber[],
  },

  openingHours: {
    eyebrow: 'Öppettider',
    title: 'Öppettider',
    todayLabel: 'Idag',
    closedLabel: 'Stängt',
    note: 'Bokning rekommenderas. Du kan också titta förbi i mån av plats.',
    days: [
      { day: 'Måndag', open: '10:00', close: '19:00' },
      { day: 'Tisdag', open: '10:00', close: '19:00' },
      { day: 'Onsdag', open: '10:00', close: '19:00' },
      { day: 'Torsdag', open: '10:00', close: '20:00' },
      { day: 'Fredag', open: '10:00', close: '20:00' },
      { day: 'Lördag', open: '10:00', close: '17:00' },
      { day: 'Söndag', open: null, close: null },
    ] satisfies OpeningDay[],
  },

  location: {
    eyebrow: 'Hitta hit',
    title: 'Hitta hit',
    addressLines: ['Demogatan 3', '211 22 Malmö'],
    description:
      'Vi ligger centralt, en kort promenad från Malmö centralstation. Cykelparkering finns utanför dörren.',
    mapTitle: 'Karta över centrala Malmö där Skarp Barber (Demo) skulle ligga',
    mapLinkLabel: 'Öppna större karta',
    mapNote: 'Adressen är påhittad. Kartan visar ungefär var det skulle ligga.',
    map: { lat: 55.6059, lon: 13.0013 },
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Kontakt',
    intro: 'Frågor innan du bokar? Ring eller skriv, så svarar vi.',
    phoneLabel: 'Telefon',
    phoneDisplay: '040-000 00 01',
    phoneHref: 'tel:+46400000001',
    emailLabel: 'E-post',
    email: 'hej@skarpbarber.example',
    instagramLabel: 'Instagram',
    instagramHandle: '@skarpbarber.demo',
    instagramUrl: 'https://www.instagram.com/skarpbarber.demo',
  },

  booking: {
    href: '#boka',
    buttonLabel: 'Boka tid',
    eyebrow: 'Boka',
    title: 'Boka tid',
    intro:
      'Välj tjänst och frisör och klicka sedan på en ledig ruta i schemat. Det här är en demo av hur onlinebokningen kan fungera, så ingen bokning skickas.',
    daysAhead: 60,
    slotInterval: 30,
    takenPercent: 30,
    anyBarber: 'Valfri frisör',
    errorTitle: 'Kontrollera formuläret',
    labels: {
      service: 'Tjänst',
      barber: 'Frisör',
      people: 'Antal personer',
      date: 'Datum',
      time: 'Tid',
      name: 'Namn',
      phone: 'Telefon',
      email: 'E-post (valfritt)',
    },
    people: {
      one: 'person',
      many: 'personer',
      hint: 'Välj en tid per person. Tiderna kan vara olika.',
      decrease: 'Färre personer',
      increase: 'Fler personer',
    },
    schedule: {
      title: 'Välj tid i schemat',
      prevWeek: 'Föregående vecka',
      nextWeek: 'Nästa vecka',
      closed: 'Stängt',
      free: 'Ledig',
      taken: 'Upptagen',
      selected: 'Vald',
      chosen: 'Valda tider',
      of: 'av',
      none: 'Ingen tid vald än.',
      hint: 'Klicka på lediga rutor för att välja tid, en per person. Klicka igen för att ta bort. Du kan också använda piltangenterna.',
    },
    submitLabel: 'Boka tid',
    demoNote: 'Demo: ingen bokning skickas och inga uppgifter sparas.',
    errors: {
      time: 'Välj en tid i schemat.',
      timeMore: 'Välj en tid för varje person i schemat.',
      name: 'Skriv ditt namn.',
      phone: 'Skriv ett giltigt telefonnummer.',
      email: 'Skriv en giltig e-postadress eller lämna fältet tomt.',
    },
    confirm: {
      title: 'Din tid är bokad',
      thanks: 'Tack',
      message: 'Vi ser fram emot ditt besök.',
      price: 'Pris',
      again: 'Gör en ny bokning',
      edit: 'Ändra tid',
      cancel: 'Avboka',
    },
    cancelled: {
      title: 'Din tid är avbokad',
      message: 'Tiden är frigjord. Du är välkommen att boka en ny.',
      again: 'Boka en ny tid',
    },
  },
}

export const logo = {
  alt: 'Skarp Barber (Demo), till toppen av sidan',
}

export const images = {
  hero: {
    file: 'hero',
    alt: 'Bild på en barberare och kund framför en spegel',
    photographer: 'maksym-tymchyk',
  },
  about: {
    file: 'om-oss',
    alt: 'Bild på interiören av barbershopen',
    photographer: 'matt-connor',
  },
  gallery: [
    {
      file: 'galleri-1',
      alt: 'Bild av en barberare som klipper håret på ett barn',
      photographer: 'john-rodriguez',
    },
    {
      file: 'galleri-2',
      alt: 'Bild på en kund vars hår stylas med en kam',
      photographer: 'mostafa-meraji',
    },
    {
      file: 'galleri-3',
      alt: 'Bild på kund med rakkräm på ansiktet',
      photographer: 'arthur-humeau',
    },
    {
      file: 'galleri-4',
      alt: 'Bild på en kund vars hår klipps med sax',
      photographer: 'david-cano-soriano',
    },
    {
      file: 'galleri-5',
      alt: 'Bild på en kund vars skägg stylas med hårapparat',
      photographer: 'david-cano-soriano',
    },
    {
      file: 'galleri-6',
      alt: 'Bild på en färdigklippt kund med fade',
      photographer: 'toan-le',
    },
  ],
} satisfies { hero: ImageEntry; about: ImageEntry; gallery: ImageEntry[] }