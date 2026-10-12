# Skarp Barber (Demo)

Demo-landningssida för en påhittad barbershop i Malmö. Barbershopen, adressen, telefonnumret och mejladressen är påhittade, och sidan är inte ett riktigt företag. Sidan har en mörk, stram och klassisk känsla, och målet är att besökaren ska boka tid.

**Live:** https://skarp-barber.netlify.app/

## Funktioner

- Mobilen först, responsiv från små mobiler till stora skärmar
- Ett enda mål: knappen "Boka tid", som finns i headern, i hero och längst ner i bokningsavsnittet
- Hamburgermeny på mobil och sticky header
- Sektioner: hero, tjänster med priser, galleri, om oss med frisörerna, öppettider, hitta hit (karta), kontakt och bokning
- Bokningsschema i bio-stil: veckovy där man klickar på lediga rutor, med förklaring för lediga, valda och upptagna tider
- Boka för 1 till 3 personer med plus- och minusknappar, en tid per person
- Ändra eller avboka direkt på bekräftelsen
- Tillgänglig bokning med tangentbordsnavigering (piltangenter i schemat), felsammanfattning och tydliga fokusmarkeringar
- Dagens veckodag markeras i öppettiderna
- Inbäddad karta från OpenStreetMap, ingen API-nyckel behövs
- Semantisk HTML och tillräcklig färgkontrast

Bokningen är en demo. Ingen bokning skickas, inga uppgifter sparas och de upptagna tiderna genereras av en enkel funktion i `src/booking.ts`.

## Prestanda

Uppmätt med Lighthouse (mobil):

| Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
| :---------: | :-----------: | :------------: | :-: | :--------------: |
|     92      |      100      |      100       | 100 |       2/2        |

Bilder skalas och konverteras till WebP vid bygget (max 1600 px bredd, flera storlekar via `srcset`). Alla bilder utom hero-bilden lazy-laddas.

## Design

- **Typsnitt:** Barlow Condensed till rubriker (versaler) och Inter till brödtext, via Google Fonts
- **Färger:** nästan svart bakgrund, benvit text och mässingsfärgad accent
- **Former:** skarpa hörn, tunna linjer och svartvita bilder via ett CSS-filter som går att stänga av i `content.ts`

## Teknik

- [Vite](https://vite.dev), [React](https://react.dev) och TypeScript
- [Tailwind CSS](https://tailwindcss.com) v3
- [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) för bildoptimering

## Komma igång

Du behöver Node.js installerat.

```bash
npm install
npm run dev
```

Öppna adressen som visas i terminalen, oftast `http://localhost:5173`.

Bygg och förhandsgranska produktionsversionen:

```bash
npm run build
npm run preview
```

## Projektstruktur

```
src/
├── content.ts            All kundspecifik data och designvärden
├── booking.ts            Logik för tider och upptagna rutor
├── buttonStyles.ts       Gemensamma knappstilar
├── App.tsx               Sätter ihop sektionerna i rätt ordning
├── index.css             Tailwind och grundstil
├── assets/               Bilder och logotyp
│   └── placeholders/     Platshållare som används tills riktiga bilder finns
└── components/
    ├── Header.tsx        Sticky header och hamburgermeny
    ├── Hero.tsx
    ├── Services.tsx
    ├── Gallery.tsx
    ├── About.tsx
    ├── OpeningHours.tsx
    ├── Location.tsx
    ├── Contact.tsx
    ├── Booking.tsx       Bokningsschema och formulär
    ├── BookButton.tsx    Knappen "Boka tid"
    ├── SectionHeading.tsx
    ├── Footer.tsx
    └── Picture.tsx       Visar bilder (lazy loading, srcset, platshållare)
```

## Byta till en annan kund

All kundspecifik information och alla designvärden ligger i `src/content.ts`:

1. **Texter, tjänster, frisörer, öppettider, adress och kontaktuppgifter** i `site`.
2. **Färger** i `theme.colors`, **typsnitt** i `theme.fonts` och **hörnradier** i `theme.radius`. Tailwind läser värdena därifrån. Bildfiltret byts i `theme.imageFilter`.
3. **Bokning:** antal dagar framåt, tidsintervall och andel upptagna tider i `site.booking`.
4. **Sidtitel och beskrivning** i `site.meta`. Google Fonts-länken, `<title>` och `<meta name="description">` i `index.html` fylls i automatiskt vid bygget av en liten plugin i `vite.config.ts`.
5. **Bilder:** lägg nya bilder i `src/assets/` med samma filnamn som i `images` (`hero`, `om-oss`, `galleri-1` till `galleri-6`, med ändelsen .jpg, .png eller .webp). De ersätter platshållarna automatiskt.
6. **Logotyp:** byt ut `src/assets/logo.svg`. Den används i headern och som favicon.

Skriv också in fotografens namn i `photographer` för varje bild, så visas de i sidfoten.

## Bildkrediter

Foton från [Unsplash](https://unsplash.com). Fotografernas namn visas i sidfoten.
