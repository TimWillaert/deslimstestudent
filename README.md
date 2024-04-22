# Setup

1. Clone de repo
2. `npm install`
3. In `src`, pas `data.json` aan met de vragen en antwoorden
4. `npm run dev` om het op te starten

De data van het spel wordt opgeslagen in localStorage. Als je het spel meerdere keren speelt moet de data verwijdert worden:

- `F12` in de browser (open dev tools)
- Open tab `Application`
- Bij local storage, verwijder `data`

# Hotkeys

## Navigatie

- 1 = Overview pagina, toont alle scores
  - Manuele link: `/`
- 2 = 3-6-9
  - Manuele link: `/369`
- 3 = Puzzel 1 (teller van eerste speler begint meteen)
  - Manuele link: `/puzzel/1`
- 4 = Puzzel 2 (teller van eerste speler begint meteen)
  - Manuele link: `/puzzel/2`
- 5 = Puzzel 3 (teller van eerste speler begint meteen)
  - Manuele link: `/puzzel/3`
- 6 = Collectief Geheugen 1 (teller van eerste speler begint meteen)
  - Manuele link: `/collectiefgeheugen/1`
- 7 = Collectief Geheugen 2 (teller van eerste speler begint meteen)
  - Manuele link: `/collectiefgeheugen/2`
- 8 = Collectief Geheugen 3 (teller van eerste speler begint meteen)
  - Manuele link: `/collectiefgeheugen/3`

## 3-6-9

- J = Juist antwoord, springt naar volgende vraag. Geeft 10 seconden op vraag 3, 6, 9, en 12.
- F = Fout antwoord (of pas), springt naar volgende kandidaat. Als iedereen het fout heeft gaat het naar de volgende vraag.

## Puzzel

- P = Pas, tijd stopt en begint voor volgende kandidaat (in volgorde van laagste score). Wanneer de laatste kandidaat past (en P ingedrukt wordt), stopt het spel.
- Letters A, B en C worden tijdens het spel gebruikt om een goed antwoord aan te duiden en 30 seconden uit te delen. Als iedereen gespeeld heeft en er is een antwoord nog steeds niet gevonden, kan deze ook getoond worden door A, B of C in te drukken.

## Collectief Geheugen

- P = Pas, tijd stopt en begint voor volgende kandidaat (in volgorde van laagste score). Wanneer de laatste kandidaat past (en P ingedrukt wordt), stopt het spel.
- Letters A, B, C, D en E worden tijdens het spel gebruikt om een goed antwoord aan te duiden en 10-50 seconden uit te delen. Als iedereen gespeeld heeft en er is een antwoord nog steeds niet gevonden, kan deze ook getoond worden door A, B, C, D of E in te drukken.
