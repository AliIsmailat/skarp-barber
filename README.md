# Skarp Barber (Demo)

Demo-landningssida för en påhittad barbershop i Malmö. Byggd som ett exempel på hur en lokal verksamhet kan få en snabb, tillgänglig och mobilanpassad webbplats med onlinebokning.

Live: lägg in Netlify-länken här

## Funktioner

- Mörk design med benvit text och mässingsaccent, skarpa hörn och tunna linjer
- Hamburgermeny på mobil och sticky header med "Boka tid"
- Bokningsschema i bio-stil: veckovy där man klickar på lediga rutor
- Boka för 1 till 3 personer, en tid per person
- Ändra eller avboka direkt på bekräftelsen
- Svartvita bilder via CSS-filter, optimerade till WebP med flera storlekar
- Semantisk HTML, tangentbordsnavigering och tydliga felmeddelanden

Bokningen är en demo. Ingen data skickas eller sparas, och upptagna tider genereras av en enkel funktion.

## Teknik

Vite, React, TypeScript och Tailwind CSS v3. Bilder hanteras med vite-imagetools.

## Kom igång

```bash
npm install
npm run dev
```

Andra kommandon:

```bash
npm run lint
npm run build
npm run preview
```

## Anpassa innehåll

All text, alla färger och typsnitt samt bildinformation finns i `src/content.ts`. Byt värden där så uppdateras hela sidan.

## Bilder

Lägg bilderna i `src/assets` med dessa filnamn:

- `hero`
- `om-oss`
- `galleri-1` till `galleri-6`

Filtyper som stöds är jpg, jpeg, png och webp. Saknas en bild visas en platshållare. Fotografens namn fylls i under `photographer` i `content.ts` och visas i sidfoten. Logotypen ligger i `src/assets/logo.svg` och används i headern och som favicon.

## Struktur

```
src/
  assets/         logotyp, bilder och platshållare
  components/     sidans sektioner och bokningen
  booking.ts      logik för tider och upptagna rutor
  buttonStyles.ts gemensamma knappstilar
  content.ts      all text, alla färger och bilder
```

## Obs

Verksamheten, adressen och kontaktuppgifterna är påhittade och finns bara för demonstration.
